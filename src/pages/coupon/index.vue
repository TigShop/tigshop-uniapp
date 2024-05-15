<template>
    <view style="height: 100%; padding-bottom: 20rpx">
        <navbar :parameter="parameter"></navbar>
        <block v-if="couponList && couponList.length">
            <view class="tmcscoupon-list">
                <block v-if="pageType == 1">
                    <view class='coupon-box'>
                        <view v-for="item in couponList" class="coupon-item">
                            <view class="left">
                                <view class="col-1">
                                    <view v-if="item.is_global" class="tag">全场券</view>
                                    <view v-if="Number(item.min_order_amount)==0" class="tag">无门槛</view>

                                </view>
                                <view class="col-1">
                                    <view class="title">{{ item.coupon_name }}</view>
                                </view>
                                <view v-if="item.coupon_desc" class="col-2">
                                    {{ item.coupon_desc }}
                                </view>
                                <view class="col-3">
                                    有效期：{{ item.use_end_date }}
                                </view>
                            </view>
                            <view class="right">
                                <view class="right-1">
                                    <block v-if="item.coupon_type === 2">
                                        <view class="zhekou"> {{ item.coupon_discount }}</view>
                                        <view class="zhe">折</view>
                                    </block>
                                    <block v-else>
                                        <FormatPrice :currencyStyle="{selfAlign:'end',fontSize:'24rpx'}" :fontStyle="{fontSize:'48rpx',lineHeight:1}" :priceData="item.coupon_money"></FormatPrice>
                                    </block>
                                </view>
                                <view class="right-2">
                                    <tigButton v-if="!item.is_receive" plainMainColor @click="handleReceiveCoupon(item.coupon_id)"> 马上领</tigButton>
                                    <tigButton :disabled="true" plainMainColor> 已领取</tigButton>
                                </view>
                            </view>
                            <view class="dotted-line"></view>
                        </view>
                    </view>
                </block>
                <block v-if="pageType == 2">
                    <view class='coupon-box'>
                        <view v-for="item in couponList" :class="(item.status != 1 && item.status != 2)?'grayScaleDiv':''" class="coupon-item">
                            <view class="left">
                                <view class="col-1">
                                    <view v-if="item.is_global" class="tag">全场券</view>
                                    <view v-if="Number(item.min_order_amount)==0" class="tag">无门槛</view>

                                </view>
                                <view class="col-1">
                                    <view class="title">{{ item.coupon_name }}</view>
                                </view>
                                <view v-if="item.coupon_desc" class="col-2">
                                    {{ item.coupon_desc }}
                                </view>
                                <view class="col-3">
                                    有效期：{{ item.end_date }}
                                </view>
                            </view>
                            <view class="right">
                                <view class="right-1">
                                    <block v-if="item.coupon_type === 2">
                                        <view class="zhekou"> {{ item.coupon_discount }}</view>
                                        <view class="zhe">折</view>
                                    </block>
                                    <block v-else>
                                        <FormatPrice :currencyStyle="{selfAlign:'end',fontSize:'24rpx'}" :fontStyle="{fontSize:'48rpx',lineHeight:1}" :priceData="item.coupon_money"></FormatPrice>
                                    </block>
                                </view>
                                <view class="right-2">
                                    <tigButton v-if="(item.status === 1 || item.status === 2)" plainMainColor @click="toPages(item)"> 立即使用</tigButton>
                                    <tigButton v-if="item.status === 4"> 已使用</tigButton>
                                    <tigButton v-if="item.status === 5"> 已过期</tigButton>
                                </view>
                            </view>
                            <view class="dotted-line"></view>
                        </view>
                    </view>
                </block>

                <view v-if="filterParams.page > 1" class="loading-box">
                    <view v-if="loaded" class="bottomLoading">
                        <image class="loading" lazy-load src="/static/images/common/loading.gif"></image>
                    </view>
                    <view v-else>没有更多了~</view>
                </view>
            </view>
        </block>
        <view v-if="couponList && couponList.length === 0" class="empty-box">
            <view class="pictrue">
                <image lazy-load src="/static/images/common/data_empty.png"></image>
            </view>
            <view class="txt">暂无优惠券！</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { reactive, ref } from "vue";
import { addCoupon, getCouponList, getMyCouponList } from "@/api/coupon/coupon";
import type { CouponFilterParams, CouponFilterResult, CouponResponse } from "@/types/coupon/coupon";
import { onLoad, onReachBottom, onShow } from "@dcloudio/uni-app";
import { hasToken } from "@/utils";

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "优惠券",
    color: false
});

const filterParams = reactive<CouponFilterParams>({
    page: 1,
    size: 10
});
const pageType = ref<number>(1);
const total = ref(0);
const couponList = ref<CouponFilterResult[]>([]);
const loaded = ref(false);
const __getCouponList = async () => {
    if (filterParams.page > 1) loaded.value = true;

    uni.showLoading({
        title: "加载中..."
    });
    try {
        let result = {} as CouponResponse;
        if (pageType.value == 1) {
            result = await getCouponList(filterParams);
        } else {
            result = await getMyCouponList(filterParams);
        }

        if (result.filter_result.length === 0) return (loaded.value = true);
        couponList.value = [...couponList.value, ...result.filter_result];
        total.value = result.total;
    } catch (error) {
        console.error(error);
    } finally {
        uni.hideLoading();
        loaded.value = false;
    }
};
const handleDetail = async (id: number) => {
    uni.navigateTo({
        url: `/pages/coupon/detail?id=${id}`
    });
};

const handleReceiveCoupon = async (id: number) => {
    uni.showLoading({
        title: "加载中..."
    });
    try {
        const result = await addCoupon({ coupon_id: id });
        uni.showToast({
            title: "领取成功",
            duration: 1500
        });
        filterParams.page = 1;
        couponList.value = [];
        __getCouponList();
    } catch (error: any) {
        console.error(error);
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1500
        });
    } finally {
        uni.hideLoading();
    }
};
const toPages = (item: any) => {
    uni.navigateTo({
        url: "/pages/search/result",
        query: {
            keyword: item.name
        }
    });
};
onLoad((options) => {
    if (options && options.type) {
        pageType.value = options.type;
    }
});
onShow(() => {
    const res = hasToken();
    if (res) return res();
    filterParams.page = 1;
    couponList.value = [];
    __getCouponList();
});

onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        __getCouponList();
    }
});
</script>

<style lang="scss" scoped>
/* 优惠券 */
.price {
    font-size: 48rpx;
    color: #666;
    display: flex;

    :deep(.util) {
        font-size: 30rpx;
        padding-left: 5rpx;
        height: 100%;
        position: relative;
        top: 8rpx;
    }

    .tmcscoupon-name {
        font-size: 26rpx;
        padding-left: 20rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
        width: 280rpx;
    }
}

.tmcscoupon-list .tmcscoupon-item-1 {
    margin: 20rpx;
    height: 160rpx;
    overflow: hidden;
    background: #fff;
    border-radius: 12rpx;
}

.tmcscoupon-list .tmcscoupon-item-1 .tmcscoupon-item {
    flex-shrink: 0;
    width: 100%;
    display: flex;
    position: relative;
    background: #fff5c5;
}

.tmcscoupon-list .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m {
    flex: 1;
    height: 160rpx;
    margin-left: 32rpx;
    box-sizing: border-box;
    position: relative;
    min-width: 0;
}

.tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m:before,
.tmcscoupon-list .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    width: 16rpx;
    height: 16rpx;
    background: #f0f2f5;
}

.tmcscoupon-list .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m:before {
    top: -8rpx;
    right: -8rpx;
}

.tmcscoupon-list .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m .tmcscoupon-item_m-info {
    display: flex;
    align-items: baseline;
    font-weight: 700;
    height: 70rpx;
    line-height: 80rpx;
}

.tmcscoupon-list .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m .tmcscoupon-item_m-rule {
    font-size: 24rpx;
    color: #999;
    margin-top: 6rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.tmcscoupon-list .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m .tmcscoupon-item_m-date {
    font-size: 20rpx;
    color: #999;
}

.tmcscoupon-list .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m:after {
    bottom: -8rpx;
    right: -8rpx;
}

.tmcscoupon-list .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_r:before {
    content: "";
    height: 130rpx;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAABeAgMAAAB5il18AAAACVBMVEVHcEz/xy7/xi4WmQdzAAAAAnRSTlMAtc2YijsAAAAUSURBVAjXY9BggEARBhgQYRgiYgDQigepHfzaGwAAAABJRU5ErkJggg==);
    width: 4rpx;
    margin-left: -2rpx;
    position: absolute;
    top: 35%;
    left: 0;
    margin-top: -40rpx;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
}

.tmcscoupon-list .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_r {
    width: 208rpx;
    height: 160rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.tmcscoupon-list .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_r .btn {
    width: 160rpx;
    height: 54rpx;
    background: #ff9400;
    border-radius: 28rpx;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-weight: 700;
    color: #fff;
}

.tmcscoupon-list .tmcscoupon-item-2 {
    .coupon-detail {
        box-sizing: border-box;
        margin-top: 20rpx;
        padding: 0 20rpx;

        .coupon-detail-item {
            display: flex;
            height: 200rpx;
            background-color: #fff;

            .coupon-detail-item-left {
                width: 260rpx;
                flex-shrink: 0;
                background-color: #609dde;
                background-image: -webkit-linear-gradient(left, #609dde 20%, #6781da);
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #fff;

                .item-left-discount {
                    font-size: 40rpx;
                }

                .item-left-money {
                    font-size: 48rpx;
                    font-weight: bold;

                    :deep(.util) {
                        font-size: 30rpx;
                        padding-left: 5rpx;
                        line-height: 48rpx;
                    }
                }

                .item-left-desc {
                    color: #fff;
                    font-size: 24rpx;
                    margin-top: 10rpx;
                }

                &::before {
                    content: "";
                    z-index: 99;
                    width: 50rpx;
                    height: 100%;
                    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTQ2MEVGOUEwQUM4MTFFQTgwNkNDRDQzRDE5RjkyMzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTQ2MEVGOUIwQUM4MTFFQTgwNkNDRDQzRDE5RjkyMzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NDYwRUY5ODBBQzgxMUVBODA2Q0NENDNEMTlGOTIzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NDYwRUY5OTBBQzgxMUVBODA2Q0NENDNEMTlGOTIzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrE8tH0AAAGJSURBVHja7Jq/K4VRGMfPq0t5F3U3dRdhMtxBmfwNDBZZDCz+A6SEEqtRCIOSDCw2k0lRkpIfWW7Joqh7FeX1OXnVzeDt3lLn+Xaf+gx3uMOne875Puc5N0qSxClUkxMpGZFcpVKp+8txHAf1ixSgWWFpHcAi9FgWisrl8s+xdQ17sA131pZWtYivT7iEWTiCd0t75PfnImzAFLRbP37zMA3z0GU9R1pgDBagI/gcydpDMJzunQl4tZ7sI+kB0KrQovhlNqQg0gaT0KnQNPr0H1fpfkfTrDEv4kNyUOU+MpDmjHmRXuhXuSH2qYgUVUS6VUQKKiJ5FRGnIvKsIlJSEblVEblQETlVEDmDEwWRQ5cxvLMg8ui+58Xmc2QrtI1ej8gVrFlP9hdYgnvrIuuwb73X2oE5eAtVJGv2699OdmHGBTz3zRLxOeFfr5bhIfQ2PvdHi74Cq2luOGsiNT29hSpS82NoaCLncAybcAMfFq+6XsTPcZ+sClSLlJxARY2/OTVE/qe+BBgAWkdOeDEfg30AAAAASUVORK5CYII=");
                    background-size: 17rpx 17rpx;
                    background-repeat: repeat-y;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }

            .coupon-detail-item-right {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding-left: 20rpx;
                color: #333;
                position: relative;

                .item-right-name {
                    font-size: 30rpx;
                    margin-top: 20rpx;
                    padding-bottom: 15rpx;
                }

                .item-right-time {
                    font-size: 24rpx;
                    color: #999;
                }

                .tmcscoupon-item-btn {
                    width: 170rpx;
                    position: absolute;
                    right: 10rpx;
                    bottom: 20rpx;
                }
            }
        }
    }
}

/*通用暂无数据样式*/
.empty-box {
    background-color: #fff;
    padding: 60rpx 0;
}

.empty-box .pictrue {
    width: 200rpx;
    height: 200rpx;
    margin: 0 auto;
}

.empty-box .pictrue image {
    width: 100%;
    height: 100%;
}

.empty-box .txt {
    color: #999;
    text-align: center;
}

.coupon-box {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    padding: 30rpx;

    .grayScaleDiv {
        filter: grayscale(100%); /* 全部转为灰度 */
    }

    .coupon-item {
        box-shadow: 0px 0px 5px #f5f5f5;
        border-radius: 10rpx;
        box-sizing: border-box;
        background-color: #FFFFFF;
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: space-between;

        .left {
            padding: 30rpx;
            display: flex;
            flex-direction: column;
            width: 60%;


            .col-1 {
                display: flex;
                gap: 8px;
                align-items: center;
                width: 100%;
                margin-bottom: 10rpx;

                .tag {
                    background-color: $tig-color-primary;
                    color: white;
                    font-size: 18rpx;
                    border-radius: 5rpx;
                    padding: 2rpx 6rpx;
                    min-width: 70rpx;
                }

                .title {
                    font-weight: bold;
                    font-size: 28rpx;
                    overflow: hidden; /* 隐藏超出 div 元素的内容 */
                    white-space: nowrap; /* 防止文本在 div 內换行 */
                    text-overflow: ellipsis; /* 当内容超出 div 元素时显示省略号 */
                }
            }

            .col-2 {
                font-size: 24rpx;
                color: #333;
                margin-bottom: 20rpx;
            }

            .col-3 {
                font-size: 22rpx;
            }
        }

        .right {
            padding: 30rpx;
            display: flex;
            flex-direction: column;
            width: 40%;
            gap: 18rpx;
            justify-content: center;

            .right-1 {
                color: $tig-color-primary;
                display: flex;
                flex-direction: row;
                font-weight: bold;
                justify-content: center;
                align-items: flex-end;

                .zhekou {
                    font-size: 48rpx;
                    line-height: 1; /* 添加这行 */
                }

                .zhe {
                    margin-left: 8rpx;
                    font-size: 24rpx;
                    self-align: end; /* 添加这行 */
                }

            }

            .right-2 {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .dotted-line {
            position: absolute;
            top: 20rpx;
            bottom: 20rpx;
            left: 60%;
            border-left: 1px dashed #ddd; /* 设置为虚线 */
            transform: translateX(-50%);
        }
    }

    .coupon-item::before {
        content: "";
        position: absolute;
        top: 0; /* 将圆形定位到元素顶部的60%位置 */
        left: 60%; /* 将圆形定位到元素左侧的50%位置 */
        transform: translate(-50%, -50%); /* 保证圆形正好在这个位置上 */
        width: 30rpx; /* 圆形的宽度，可以根据需要调整 */
        height: 30rpx; /* 圆形的高度，可以根据需要调整 */
        background-color: #f5f5f5; /* 圆形的颜色，可以根据需要调整 */
        border-radius: 50%; /* 使元素成为完美的圆形 */
    }

    .coupon-item::after {
        content: "";
        position: absolute;
        bottom: -30rpx; /* 将圆形定位到元素底部的40%位置 */
        left: 60%; /* 将圆形定位到元素左侧的50%位置 */
        transform: translate(-50%, -50%); /* 保证圆形正好在这个位置上 */
        width: 30rpx; /* 圆形的宽度，可以根据需要调整 */
        height: 30rpx; /* 圆形的高度，可以根据需要调整 */
        background-color: #f5f5f5; /* 圆形的颜色，可以根据需要调整 */
        border-radius: 50%; /* 使元素成为完美的圆形 */

    }

    .grayScaleDiv::after {
        content: "已失效";
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-20deg);
        width: 120rpx;
        height: 120rpx;
        line-height: 120rpx;
        text-align: center;
        border: 1.5px solid #818181;
        background-color: white;
        border-radius: 50%;
        color: #818181;
        font-weight: 500;
        font-size: 16px;
    }
}
</style>
