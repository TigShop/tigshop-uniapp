<template>
    <div style="position: relative">
        <div style="display: flex;flex-wrap: wrap;justify-content: center;padding-top: 25rpx;">
            <div v-if="type === '2'" class="verify-img-out" :style="{ height: parseInt(setSize.imgHeight) + vSpace + 'px' }">
                <div
                    class="verify-img-panel"
                    :style="{
                        width: setSize.imgWidth,
                        height: setSize.imgHeight
                    }"
                >
                    <image lazy-load  v-if="backImgBase" :src="'data:image/png;base64,' + backImgBase" alt="" style="width: 100%; height: 100%; display: block"></image>

                    <div v-if="backImgBase" class="verify-refresh" @click="refresh" v-show="showRefresh"><i class="iconfont-pc icon-refresh"></i></div>
                    <transition name="tips">
                        <span :class="'verify-tips ' + (tipWords ? 'show ' : '') + (passFlag ? 'suc-bg' : 'err-bg')" v-if="1">{{ tipWords }}</span>
                    </transition>
                </div>
            </div>
            <!-- 公共部分 -->
            <div
                class="verify-bar-area"
                :style="{
                    width: setSize.imgWidth,
                    height: barSize.height,
                    'line-height': barSize.height
                }"
            >
                <span class="verify-msg" v-text="text"></span>
                <div
                    class="verify-left-bar"
                    :style="{
                        width: leftBarWidth !== undefined ? leftBarWidth : barSize.height,
                        height: barSize.height,
                        'border-color': leftBarBorderColor,
                        'background-color': leftBarBackgroundColor,
                        transaction: transitionWidth
                    }"
                >
                    <span class="verify-msg" v-text="finishText"></span>
                    <div
                        class="verify-move-block"
                        @touchstart="start"
                        @mousedown="start"
                        :style="{
                            width: barSize.height,
                            height: barSize.height,
                            'background-color': moveBlockBackgroundColor,
                            left: moveBlockLeft,
                            transition: transitionLeft
                        }"
                    >
                        <i :class="['verify-icon iconfont-pc', iconClass]" :style="{ color: iconColor }"></i>
                        <div
                            v-if="type === '2'"
                            class="verify-sub-block"
                            :style="{
                                width: Math.floor((parseInt(setSize.imgWidth) * 47) / 310) + 'px',
                                height: setSize.imgHeight,
                                top: '-' + (parseInt(setSize.imgHeight) + vSpace) + 'px',
                                'background-size': setSize.imgWidth + ' ' + setSize.imgHeight
                            }"
                        >
                            <image lazy-load 
                                v-if="blockBackImgBase"
                                :src="'data:image/png;base64,' + blockBackImgBase"
                                alt=""
                                style="width: 100%; height: 100%; display: block; -webkit-user-drag: none"
                            ></image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * VerifySlide
 * @description 滑块
 * */
import { aesEncrypt } from "./../utils/ase";
import { resetSize } from "./../utils/util";
import { computed, onMounted, reactive, ref, watch, nextTick, toRefs, watchEffect, getCurrentInstance } from "vue";
import request from "@/utils/request";
//  "captchaType":"blockPuzzle",
export default {
    name: "VerifySlide",
    props: {
        captchaType: {
            type: String
        },
        type: {
            type: String,
            default: "1"
        },
        //弹出式pop，固定fixed
        mode: {
            type: String,
            default: "fixed"
        },
        vSpace: {
            type: Number,
            default: 5
        },
        explain: {
            type: String,
            default: "向右拖动滑块填充拼图"
        },
        imgSize: {
            type: Object,
            default() {
                return {
                    width: "310px",
                    height: "155px"
                };
            }
        },
        blockSize: {
            type: Object,
            default() {
                return {
                    width: "50px",
                    height: "50px"
                };
            }
        },
        barSize: {
            type: Object,
            default() {
                return {
                    width: "310px",
                    height: "40px"
                };
            }
        }
    },
    setup(props, context) {
        const { mode, captchaType, vSpace, imgSize, barSize, type, blockSize, explain } = toRefs(props);
        const { proxy } = getCurrentInstance();
        let secretKey = ref(""), //后端返回的ase加密秘钥
            passFlag = ref(""), //是否通过的标识
            backImgBase = ref(""), //验证码背景图片
            blockBackImgBase = ref(""), //验证滑块的背景图片
            backToken = ref(""), //后端返回的唯一token值
            startMoveTime = ref(""), //移动开始的时间
            endMovetime = ref(""), //移动结束的时间
            tipsBackColor = ref(""), //提示词的背景颜色
            tipWords = ref(""),
            text = ref(""),
            finishText = ref(""),
            setSize = reactive({
                imgHeight: 0,
                imgWidth: 0,
                barHeight: 0,
                barWidth: 0
            }),
            top = ref(0),
            left = ref(0),
            moveBlockLeft = ref(undefined),
            leftBarWidth = ref(undefined),
            // 移动中样式
            moveBlockBackgroundColor = ref(undefined),
            leftBarBorderColor = ref("#ddd"),
            leftBarBackgroundColor = ref("#d1e0f1"),
            iconColor = ref(undefined),
            iconClass = ref("icon-right"),
            status = ref(false), //鼠标状态
            isEnd = ref(false), //是够验证完成
            showRefresh = ref(true),
            transitionLeft = ref(""),
            transitionWidth = ref(""),
            startLeft = ref(0);

        const barArea = computed(() => {
            return proxy.$el.querySelector(".verify-bar-area");
        });
        function init() {
            text.value = explain.value;
            getPictrue();
            nextTick(() => {
                let { imgHeight, imgWidth, barHeight, barWidth } = resetSize(proxy);
                setSize.imgHeight = imgHeight;
                setSize.imgWidth = imgWidth;
                setSize.barHeight = barHeight;
                setSize.barWidth = barWidth;
                proxy.$emit("ready", proxy);
            });

            window.removeEventListener("touchmove", function (e) {
                move(e);
            });
            window.removeEventListener("mousemove", function (e) {
                move(e);
            });

            //鼠标松开
            window.removeEventListener("touchend", function () {
                end();
            });
            window.removeEventListener("mouseup", function () {
                end();
            });

            window.addEventListener("touchmove", function (e) {
                move(e);
            });
            window.addEventListener("mousemove", function (e) {
                move(e);
            });

            //鼠标松开
            window.addEventListener("touchend", function () {
                end();
            });
            window.addEventListener("mouseup", function () {
                end();
            });
        }
        watch(type, () => {
            init();
        });
        onMounted(() => {
            // 禁止拖拽
            init();
            proxy.$el.onselectstart = function () {
                return false;
            };
        });
        //鼠标按下
        function start(e) {
            e = e || window.event;
            if (!e.touches) {
                //兼容PC端
                var x = e.clientX;
            } else {
                //兼容移动端
                var x = e.touches[0].pageX;
            }
            console.log(barArea);
            startLeft.value = Math.floor(x - barArea.value.getBoundingClientRect().left);
            startMoveTime.value = +new Date(); //开始滑动的时间
            if (isEnd.value == false) {
                text.value = "";
                moveBlockBackgroundColor.value = "#1991fa";
                leftBarBorderColor.value = "#1991fa";
                leftBarBackgroundColor.value = "#d1e0f1";
                iconColor.value = "#fff";
                // e.stopPropagation();
                status.value = true;
            }
        }
        //鼠标移动
        function move(e) {
            e = e || window.event;
            if (status.value && isEnd.value == false) {
                if (!e.touches) {
                    //兼容PC端
                    var x = e.clientX;
                } else {
                    //兼容移动端
                    var x = e.touches[0].pageX;
                }
                var bar_area_left = barArea.value.getBoundingClientRect().left;
                var move_block_left = x - bar_area_left; //小方块相对于父元素的left值
                if (move_block_left >= barArea.value.offsetWidth - parseInt(parseInt(blockSize.value.width) / 2) - 2) {
                    move_block_left = barArea.value.offsetWidth - parseInt(parseInt(blockSize.value.width) / 2) - 2;
                }
                if (move_block_left <= 0) {
                    move_block_left = parseInt(parseInt(blockSize.value.width) / 2);
                }
                //拖动后小方块的left值
                moveBlockLeft.value = move_block_left - startLeft.value + "px";
                leftBarWidth.value = move_block_left - startLeft.value + 40 + "px";
            }
        }

        //鼠标松开
        function end() {
            endMovetime.value = +new Date();
            //判断是否重合
            if (status.value && isEnd.value == false) {
                var moveLeftDistance = parseInt((moveBlockLeft.value || "").replace("px", ""));
                moveLeftDistance = (moveLeftDistance * 310) / parseInt(setSize.imgWidth);
                let data = {
                    captchaType: captchaType.value,
                    pointJson: secretKey.value
                        ? aesEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey.value)
                        : JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
                    token: backToken.value
                };
                request({
                    url: "common/verification/check/",
                    method: "post",
                    data: data
                })
                    .then((result) => {
                        if (result.errcode === 0) {
                            moveBlockBackgroundColor.value = "#52ccba";
                            leftBarBorderColor.value = "#52ccba";
                            leftBarBackgroundColor.value = "#d2f4ef";
                            iconColor.value = "#fff";
                            iconClass.value = "icon-check";
                            showRefresh.value = false;
                            isEnd.value = true;
                            if (mode.value == "pop") {
                                setTimeout(() => {
                                    proxy.$parent.clickShow = false;
                                    refresh();
                                }, 1500);
                            }
                            passFlag.value = true;
                            tipWords.value = `${((endMovetime.value - startMoveTime.value) / 1000).toFixed(2)}s验证成功`;
                            var captchaVerification = secretKey.value
                                ? aesEncrypt(backToken.value + "---" + JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey.value)
                                : backToken.value + "---" + JSON.stringify({ x: moveLeftDistance, y: 5.0 });
                            setTimeout(() => {
                                tipWords.value = "";
                                proxy.$emit("close");
                                proxy.$emit("success", { verifyToken: captchaVerification });
                            }, 1000);
                        } else {
                            moveBlockBackgroundColor.value = "#d9534f";
                            leftBarBorderColor.value = "#d9534f";
                            leftBarBackgroundColor.value = "#fce1e1";
                            iconColor.value = "#fff";
                            iconClass.value = "icon-close";
                            passFlag.value = false;
                            setTimeout(function () {
                                refresh();
                            }, 1000);
                            proxy.$emit("error", proxy);
                            tipWords.value = "验证失败";
                            setTimeout(() => {
                                tipWords.value = "";
                            }, 1000);
                        }
                    })
                    .catch((error) => {});
                status.value = false;
            }
        }

        const refresh = () => {
            showRefresh.value = true;
            finishText.value = "";

            transitionLeft.value = "left .3s";
            moveBlockLeft.value = 0;

            leftBarWidth.value = undefined;
            transitionWidth.value = "width .3s";

            leftBarBorderColor.value = "#ddd";
            leftBarBackgroundColor.value = "#d1e0f1";
            moveBlockBackgroundColor.value = "#fff";
            iconColor.value = "#666";
            iconClass.value = "icon-right";
            isEnd.value = false;

            getPictrue();
            setTimeout(() => {
                transitionWidth.value = "";
                transitionLeft.value = "";
                text.value = explain.value;
            }, 300);
        };

        // 请求背景图片和验证图片
        function getPictrue() {
            let data = {
                captchaType: captchaType.value
            };
            request({
                url: "common/verification/captcha/",
                method: "post",
                data: data
            })
                .then((result) => {
                    backImgBase.value = result.originalImageBase64;
                    blockBackImgBase.value = result.jigsawImageBase64;
                    backToken.value = result.token;
                    secretKey.value = result.secretKey;
                })
                .catch((error) => {
                    tipWords.value = error.message;
                });
        }
        return {
            secretKey, //后端返回的ase加密秘钥
            passFlag, //是否通过的标识
            backImgBase, //验证码背景图片
            blockBackImgBase, //验证滑块的背景图片
            backToken, //后端返回的唯一token值
            startMoveTime, //移动开始的时间
            endMovetime, //移动结束的时间
            tipsBackColor, //提示词的背景颜色
            tipWords,
            text,
            finishText,
            setSize,
            top,
            left,
            moveBlockLeft,
            leftBarWidth,
            // 移动中样式
            moveBlockBackgroundColor,
            leftBarBorderColor,
            leftBarBackgroundColor,
            iconColor,
            iconClass,
            status, //鼠标状态
            isEnd, //是够验证完成
            showRefresh,
            transitionLeft,
            transitionWidth,
            barArea,
            refresh,
            start
        };
    }
};
</script>
<style lang="scss">
.verifybox .ant-modal-content {
    padding: 0;
}
.verifybox .ant-modal-body {
    padding: 15px !important;
}
.verifybox .ant-modal-header {
    padding: 16px 24px;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    margin-bottom: 0;
}

.verifybox .ant-modal-header {
    padding: 16px 15px !important;
}

.verifybox-top {
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    text-align: left;
    font-size: 16px;
    color: #45494c;
    border-bottom: 1px solid #e4e7eb;
    box-sizing: border-box;
}

.verifybox-bottom {
    padding: 15px;
    box-sizing: border-box;
}

.verifybox-close {
    position: absolute;
    top: 13px;
    right: 9px;
    width: 24px;
    height: 24px;
    text-align: center;
    cursor: pointer;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    /* display: none; */
    transition: all 0.5s;
}

.verify-tips {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 0;
    transition: all 0.2s linear;
    line-height: 30px;
    text-indent: 10px;
    color: #fff;
}

.verify-tips.show {
    height: 30px;
}

.suc-bg {
    background-color: rgba(92, 184, 92, 0.5);
    filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7f5CB85C, endcolorstr=#7f5CB85C);
}

.err-bg {
    background-color: rgba(217, 83, 79, 0.5);
    filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7fD9534F, endcolorstr=#7fD9534F);
}

.tips-enter,
.tips-leave-to {
    bottom: -30px;
}

.tips-enter-active,
.tips-leave-active {
    transition: bottom 0.5s;
}

/* ---------------------------- */
/*常规验证码*/
.verify-code {
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 5px;
    border: 1px solid #ddd;
}

.cerify-code-panel {
    height: 100%;
    overflow: hidden;
}

.verify-code-area {
    float: left;
}

.verify-input-area {
    float: left;
    width: 60%;
    padding-right: 10px;
}

.verify-change-area {
    line-height: 30px;
    float: left;
}

.varify-input-code {
    display: inline-block;
    width: 100%;
    height: 25px;
}

.verify-change-code {
    color: #337ab7;
    cursor: pointer;
}

.verify-btn {
    width: 200px;
    height: 30px;
    background-color: #337ab7;
    color: #ffffff;
    border: none;
    margin-top: 10px;
}

/*滑动验证码*/
.verify-bar-area {
    position: relative;
    background: #f7f9fa;
    text-align: center;
    box-sizing: content-box;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.verify-bar-area .verify-move-block {
    position: absolute;
    top: 0px;
    left: 0;
    background: #fff;
    color: #666;
    cursor: pointer;
    box-sizing: content-box;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    transition: background 0.2s linear;
    border-radius: 1px;
    border: 0;
}

.verify-bar-area .verify-move-block:hover {
    background-color: #1991fa;
    color: #ffffff;
}

.verify-bar-area .verify-left-bar {
    position: absolute;
    top: -1px;
    left: -1px;
    background: #d1e0f1;
    cursor: pointer;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    border: 1px solid #ddd;
    border-radius: 0 2px 2px 0;
}

.verify-img-panel {
    margin: 0;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    border-radius: 3px;
    position: relative;
}

.verify-img-panel .verify-refresh {
    width: 25px;
    height: 25px;
    text-align: center;
    padding: 5px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
}

.verify-img-panel .icon-refresh {
    font-size: 20px;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.65);
}

.verify-img-panel .verify-gap {
    background-color: #fff;
    position: relative;
    z-index: 2;
    border: 1px solid #fff;
}

.verify-bar-area .verify-move-block .verify-sub-block {
    position: absolute;
    text-align: center;
    z-index: 3;
    /* border: 1px solid #fff; */
}

.verify-bar-area .verify-move-block .verify-icon {
    font-size: 18px;
}

.verify-bar-area .verify-msg {
    z-index: 3;
}

.icon-check:before {
    content: "\e6e9";
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    background-size: contain;
}

.icon-close:before {
    content: "\e6bb";
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    background-size: contain;
}

.icon-right:before {
    content: "\e676";
    display: block;
    width: 16px;
    height: 16px;
    position: absolute;
    line-height: 16px;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    z-index: 9999;
    background-size: contain;
}

.icon-refresh:before {
    content: "\e616";
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    background-size: contain;
}
</style>
