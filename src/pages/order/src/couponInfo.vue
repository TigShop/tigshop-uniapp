<template>
    <view class="coupon-info">
        <view class="coupon">
            <view class="coupon-title">优惠券</view>
            <view class="coupon-content" @click="handleCoupon">
                <view class="coupon-text">优惠￥{{ couponAmount }}</view>
                <image lazy-load class="more-ico" src="/static/images/common/more.png"></image>
            </view>
        </view>
        <view class="points">
            <view class="points-title"
                >积分
                <view class="points-text"
                    >当前账户积分：<text class="red">{{ points }}</text>
                </view>
            </view>
            <view class="points-content" @click="handlePoints">
                <view class="points-text" v-if="pointsAmount > 0">共抵扣：￥{{ pointsAmount }}</view>
                <view class="points-text" v-else-if="points === 0 && pointsAmount === 0">暂无可用积分</view>
                <view class="points-text" v-else>最多可用{{ availablePoints }} 积分</view>
                <image lazy-load class="more-ico" src="/static/images/common/more.png"></image>
            </view>
        </view>
        <view class="balance">
            <view class="balance-title" @click="handleToBalance"
                >余额
                <view class="balance-text"
                    >当前账户余额：<text class="red">{{ balance }}</text></view
                >
            </view>
            <view>
                <switch :checked="isBalance" color="#ee0a24" @change="handleBalance" style="transform: scale(0.8)" />
            </view>
        </view>
        <tigpopup v-model:show="show" title="优惠券" height="60vh" backgroundColor="#f5f5f5">
            <view class="coupon-container">
                <view class="coupon-menu">
                    <view class="coupon-menu-item" :class="{ active: tabsActive === '可用优惠券' }" @click="handleTabsActive('可用优惠券')"
                        >可用优惠券({{ couponListData!.enable_coupons.length }})</view
                    >
                    <view class="coupon-menu-item" :class="{ active: tabsActive === '不可用优惠券' }" @click="handleTabsActive('不可用优惠券')"
                        >不可用优惠券({{ couponListData!.disable_coupons.length }})</view
                    >
                </view>

                <view class="coupon-container-content">
                    <block v-if="tabsActive === '可用优惠券'">
                        <view class="coupon-list">
                            <view class="bonus-box">
                                <view :class="'bonus-bd enable_select'" v-for="(item, idx) in couponListData!.enable_coupons" :key="idx">
                                    <view class="bonus-left">
                                        <view class="bonus-amount price">
                                            {{ item.coupon_type === 2 ? `${item.coupon_discount} 折` : priceFormat(Number(item.coupon_money)) }}
                                        </view>
                                        <view class="bonus-desc">{{ item.coupon_name }}</view>
                                    </view>

                                    <view class="bonus-right">
                                        <view class="bonus-name">{{ item.is_global ? "[全场券]" : "" }} </view>
                                        <view class="bonus-time">截止时间 {{ item.end_date }}</view>
                                    </view>
                                    <view class="coupon-btn">
                                        <tigCheckbox checked-color="#ee0a24" v-model:checked="item.selected" @change="handleCheck(item)"></tigCheckbox>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <block v-if="couponListData!.enable_coupons.length === 0">
                            <view class="coupon-empty">暂无优惠券</view>
                        </block>
                    </block>
                    <block v-if="tabsActive === '不可用优惠券'">
                        <view class="coupon-list">
                            <view class="bonus-box">
                                <view :class="'bonus-bd disabled'" v-for="(item, idx) in couponListData!.disable_coupons" :key="idx">
                                    <view class="bonus-left">
                                        <view class="bonus-amount price">
                                            {{ item.coupon_type === 2 ? `${item.coupon_discount} 折` : priceFormat(Number(item.coupon_money)) }}
                                        </view>
                                        <view class="bonus-desc">{{ item.coupon_name }}</view>
                                    </view>

                                    <view class="bonus-right">
                                        <view class="bonus-name">{{ item.is_global ? "[全场券]" : "" }} </view>
                                        <view class="bonus-time">截止时间 {{ item.end_date }}</view>
                                    </view>
                                    <view class="coupon-btn">
                                        <tigCheckbox :disabled="true" v-model:checked="item.selected"></tigCheckbox>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <block v-if="couponListData!.disable_coupons.length === 0">
                            <view class="coupon-empty">暂无优惠券</view>
                        </block>
                    </block>
                </view>
            </view>
            <saveBottomBox height="110" backgroundColor="#fff">
                <view class="btn-box">
                    <tigButton style="width: 100%; height: 70rpx" @click="handlecConfirm"> 确定</tigButton>
                </view>
            </saveBottomBox>
        </tigpopup>

        <tigpopup v-model:show="showPoints" title="积分" backgroundColor="#f5f5f5">
            <view class="points-popup">
                <view class="form-usePoints">
                    <uni-forms ref="pointsForm" :modelValue="formData">
                        <uni-forms-item label="使用积分" name="usePoints">
                            <uni-easyinput
                                primaryColor="rgb(192, 196, 204)"
                                :inputBorder="false"
                                type="number"
                                v-model="formData.usePoints"
                                placeholder="请输入积分"
                            />
                        </uni-forms-item>
                    </uni-forms>
                </view>

                <saveBottomBox height="110" backgroundColor="#fff">
                    <view class="btn-box">
                        <tigButton style="width: 100%; height: 70rpx" @click="onSubmit"> 确定</tigButton>
                    </view>
                </saveBottomBox>

                <view class="points-popup-text">该订单最多可用{{ points }} 积分<text class="text-clolor">【如何获得积分？】</text></view>
            </view>
        </tigpopup>
    </view>
</template>

<script lang="ts" setup>
import type { CouponList, EnableCoupon } from "@/types/order/check";
import tigCheckbox from "@/components/tigCheckbox/index.vue";
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import { reactive, ref, watch } from "vue";
import { priceFormat } from "@/utils/format";
interface Props {
    couponList: CouponList;
    useCouponIds: number[];
    couponAmount: number;
    balance: number;
    points: number;
    availablePoints: number;
    pointsAmount: number;
    usePoint: number;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:useCouponIds", "sendBalanceStatus", "change", "update:usePoint"]);

const selectedDatas = ref<EnableCoupon[]>([]);
const couponListData = ref<CouponList>({
    enable_coupons: [],
    disable_coupons: []
});
watch(
    () => couponListData,
    (newVal) => {
        selectedDatas.value = newVal.value.enable_coupons.filter((item) => item.selected);
    },
    {
        deep: true,
        immediate: true
    }
);
const show = ref(false);
const isBalance = ref(false); // 是否使余额
const tabsActive = ref("可用优惠券");
const handleTabsActive = (str: string) => {
    tabsActive.value = str;
};
const handleCoupon = () => {
    couponListData.value = JSON.parse(JSON.stringify(props.couponList));
    show.value = true;
};
const handleCheck = (item: any) => {
    if (item.selected) {
        if (item.is_global) {
            couponListData.value!.enable_coupons.forEach((data) => {
                if (data.is_global && data.id !== item.id) {
                    data.selected = false;
                }
            });
            selectedDatas.value = selectedDatas.value.filter(({ is_global }) => is_global === 0);
            selectedDatas.value.push(item);
        } else {
            couponListData.value!.enable_coupons.forEach((data) => {
                if (!data.is_global && data.id !== item.id) {
                    data.selected = false;
                }
            });
            selectedDatas.value = selectedDatas.value.filter(({ is_global }) => is_global === 1);
            selectedDatas.value.push(item);
        }
    } else {
        selectedDatas.value = selectedDatas.value.filter(({ id }) => id !== item.id);
    }
};

const handlecConfirm = () => {
    const selectedIds = selectedDatas.value.map(({ id }) => id);
    emit("update:useCouponIds", selectedIds);
    emit("change");
    show.value = false;
};

const showPoints = ref(false);
const formData = reactive({
    usePoints: 0
});
const pointsForm = ref();
const rules = {
    usePoints: {
        rules: [
            { required: true, errorMessage: "请输入积分" },
            {
                validateFunction: function (rule: any, value: number, data: any, callback: any) {
                    if (value > props.availablePoints) callback("积分不能大于可用积分");
                    if (value < 0) callback("积分不能小于0");
                    return true;
                }
            }
        ]
    }
};
watch(showPoints, (value) => {
    if (value) {
        setTimeout(() => {
            console.log("pointsForm", pointsForm.value);
            pointsForm.value.setRules(rules);
        }, 1000);
    }
});

const handlePoints = () => {
    if (props.points === 0 && props.pointsAmount === 0) {
        return uni.showToast({
            title: "暂无可用积分",
            duration: 1500,
            icon: "none"
        });
    }
    showPoints.value = true;
    formData.usePoints = props.usePoint;
};

const onSubmit = () => {
    pointsForm.value
        .validate()
        .then((res: any) => {
            console.log(formData.usePoints);
            if (!formData.usePoints) {
                formData.usePoints = 0;
            }

            emit("update:usePoint", Number(formData.usePoints));
            emit("change");

            showPoints.value = false;
        })
        .catch((err: any) => {
            console.log("表单错误信息：", err);
        });
};

const handleBalance = () => {
    isBalance.value = !isBalance.value;
    emit("sendBalanceStatus", isBalance.value);
};

const handleToBalance = () =>{
    uni.navigateTo({
        url: "/pages/user/account/index"
    });
}
</script>

<style lang="scss" scoped>
.btn-box {
    padding: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.coupon {
    border-radius: 18rpx 18rpx 0 0;
    background: #fff;
    padding: 30rpx 32rpx 0;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .coupon-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .more-ico {
        width: 36rpx;
        height: 36rpx;
        padding-left: 10rpx;
    }
}
.points {
    background: #fff;
    padding: 30rpx 32rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .points-content {
        display: flex;
        align-items: center;
        justify-content: center;

        .points-text {
            font-size: 26rpx;
        }
    }
    .more-ico {
        width: 36rpx;
        height: 36rpx;
        padding-left: 10rpx;
    }
}

.balance {
    border-radius: 0 0 18rpx 18rpx;
    background: #fff;
    margin-bottom: 20rpx;
    padding: 30rpx 32rpx 25rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.coupon-list {
    height: 100%;
}

.button-position {
    position: fixed;
    bottom: 30rpx;
    left: 0;
    right: 0;
    padding: 0 30rpx;
    padding-bottom: env(safe-area-inset-bottom) !important;
}

.bonus-box {
    padding: 20rpx;
    overflow: hidden;
    // position: absolute;
}
.bonus-box .bonus-bd {
    display: flex;
    background: #fff;
    height: 195rpx;
    position: relative;
    overflow: hidden;
    font-size: 28rpx;
    margin-bottom: 20rpx;
    align-items: center;
}
.bonus-box .bonus-bd .bonus-left {
    width: 45%;
    color: #333;
    flex-shrink: 0;
    background-color: #609dde;
    background-image: -webkit-linear-gradient(left, #609dde 20%, #6781da);
    color: #fff;
    text-align: center;
    padding: 24rpx 20rpx;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.bonus-box .bonus-bd .bonus-left::before {
    content: "";
    z-index: 99;
    width: 50rpx;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTQ2MEVGOUEwQUM4MTFFQTgwNkNDRDQzRDE5RjkyMzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTQ2MEVGOUIwQUM4MTFFQTgwNkNDRDQzRDE5RjkyMzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NDYwRUY5ODBBQzgxMUVBODA2Q0NENDNEMTlGOTIzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NDYwRUY5OTBBQzgxMUVBODA2Q0NENDNEMTlGOTIzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrE8tH0AAAGJSURBVHja7Jq/K4VRGMfPq0t5F3U3dRdhMtxBmfwNDBZZDCz+A6SEEqtRCIOSDCw2k0lRkpIfWW7Joqh7FeX1OXnVzeDt3lLn+Xaf+gx3uMOne875Puc5N0qSxClUkxMpGZFcpVKp+8txHAf1ixSgWWFpHcAi9FgWisrl8s+xdQ17sA131pZWtYivT7iEWTiCd0t75PfnImzAFLRbP37zMA3z0GU9R1pgDBagI/gcydpDMJzunQl4tZ7sI+kB0KrQovhlNqQg0gaT0KnQNPr0H1fpfkfTrDEv4kNyUOU+MpDmjHmRXuhXuSH2qYgUVUS6VUQKKiJ5FRGnIvKsIlJSEblVEblQETlVEDmDEwWRQ5cxvLMg8ui+58Xmc2QrtI1ej8gVrFlP9hdYgnvrIuuwb73X2oE5eAtVJGv2699OdmHGBTz3zRLxOeFfr5bhIfQ2PvdHi74Cq2luOGsiNT29hSpS82NoaCLncAybcAMfFq+6XsTPcZ+sClSLlJxARY2/OTVE/qe+BBgAWkdOeDEfg30AAAAASUVORK5CYII=");
    background-size: 17rpx 17rpx;
    background-repeat: repeat-y;
}
.bonus-box .bonus-bd .bonus-left.had_use {
    background-color: #fd7173;
    background-image: -webkit-linear-gradient(left, #fd7173 20%, #fc5d5b);
}
.bonus-box .bonus-bd .bonus-left.overdue {
    background-color: #5dd5cf;
    background-image: -webkit-linear-gradient(left, #5dd5cf 20%, #54d1b8);
}
.bonus-box .bonus-bd .bonus-right {
    flex-grow: 1;
    padding: 20rpx 0 20rpx 20rpx;
    flex-shrink: 1;
    position: relative;
}
.bonus-box .bonus-bd .bonus-right checkbox {
    position: absolute;
    right: 20rpx;
    top: 60rpx;
}
.bonus-box .bonus-bd .bonus-amount b {
    font-size: 24rpx;
    font-weight: 700;
    padding-right: 6rpx;
    vertical-align: middle;
}
.bonus-box .bonus-bd .bonus-amount {
    font-size: 48rpx;
    font-weight: 700;
    color: #fff;
}
.bonus-box .bonus-bd .bonus-desc {
    height: 40rpx;
    overflow: hidden;
    font-size: 24rpx;
}
.bonus-box .bonus-bd .bonus-name {
    height: 50rpx;
    line-height: 50rpx;
    overflow: hidden;
    color: #333;
}
.bonus-box .bonus-bd .bonus-brief {
    height: 65rpx;
    line-height: 50rpx;
    overflow: hidden;
    color: #999;
    font-size: 20rpx;
}
.bonus-box .bonus-bd .bonus-time {
    position: relative;
    font-size: 24rpx;
    color: #999;
}
.bonus-box .bonus-bd .bonus-btn {
    border: 1rpx solid;
    padding: 6rpx 20rpx;
    border-radius: 30rpx;
    color: #e93b3d;
    position: absolute;
    top: 0;
    right: 0;
}

.bonus-bd {
    opacity: 0.7;
}
.bonus-bd.enable_select {
    opacity: 1;
}
.bonus-bd.checked {
    opacity: 1;
}

.bonus-box .bonus-bd.disabled .bonus-left {
    background: #aaa;
}
.bonus-box .bonus-bd.disabled .bonus-name {
    color: #aaa;
}
.bonus-box .bonus-bd.disabled .bonus-brief {
    color: #aaa;
}
.bonus-box .bonus-bd .bonus-right .disabled_text {
    position: absolute;
    right: 20rpx;
    top: 116rpx;
    font-size: 20rpx;
    color: #aaa;
}

.coupon-btn {
    width: 76rpx;
}

.balance-title {
    display: flex;

    .balance-text {
        font-size: 22rpx;
        padding-left: 15rpx;
        display: flex;
        align-items: flex-end;
    }
}
.points-title {
    display: flex;

    .points-text {
        font-size: 22rpx;
        padding-left: 15rpx;
        display: flex;
        align-items: flex-end;
    }
}
.red {
    color: #f23030;
}

.points-popup {
    padding: 30rpx 0;

    .points-popup-text {
        padding-top: 20rpx;
        margin-left: 40rpx;

        .text-clolor {
            color: #09f;
        }
    }

    .form-usePoints {
        background-color: #fff;
        margin: 0 20rpx;
        padding: 0 20rpx;
    }
}

.coupon-container {
    height: 100%;
    width: 100%;
    .coupon-menu {
        height: 100rpx;
        width: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        box-sizing: content-box;
        margin-bottom: 15rpx;

        .coupon-menu-item {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28rpx;
            color: #999;
            position: relative;

            &.active {
                color: #333;
                font-weight: bold;

                &:after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    height: 5rpx;
                    width: 80rpx;
                    background-color: #e93b3d;
                    border-radius: 10rpx;
                }
            }
        }
    }
}

.button-position {
    position: fixed;
    bottom: 30rpx;
    left: 0;
    right: 0;
    padding: 0 30rpx;
    padding-bottom: env(safe-area-inset-bottom) !important;
}

.coupon-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 300rpx;
}
</style>
