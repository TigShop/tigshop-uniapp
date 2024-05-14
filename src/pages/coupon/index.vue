<template>
    <view style="height: 100%; padding-bottom: 20rpx">
        <navbar :parameter="parameter"></navbar>
        <block v-if="couponList && couponList.length">
            <view class="tmcscoupon-list">
                <block v-if="pageType == 1">
                    <view class="tmcscoupon-item-1" v-for="(item, index) in couponList" :key="index">
                        <view class="tmcscoupon-item">
                            <view class="tmcscoupon-item_m" @click="handleDetail(item.coupon_id)">
                                <view class="tmcscoupon-item_m-info">
                                    <view class="price">
                                        <block v-if="item.coupon_type == 1">
                                            <FormatPrice class="item-left-money" :priceData="item.coupon_money"></FormatPrice>
                                        </block>
                                        <block v-else>
                                            <view>{{ item.coupon_discount }}折</view>
                                        </block>
                                        <text class="tmcscoupon-name">{{ item.coupon_name }}</text>
                                    </view>
                                </view>
                                <view class="tmcscoupon-item_m-rule">{{ item.coupon_desc }}</view>
                                <view class="tmcscoupon-item_m-date">{{ item.use_start_date }} - {{ item.use_end_date }}</view>
                            </view>
                            <view class="tmcscoupon-item_r">
                                <view v-if="item.is_receive" class="btn" style="background: #f2f2f2; color: #ccc">已经领取</view>
                                <view v-else class="btn" @click="handleReceiveCoupon(item.coupon_id)">立即领取</view>
                            </view>
                        </view>
                    </view>
                </block>
                <block v-if="pageType == 2">
                    <view class="tmcscoupon-item-2" v-for="(item, index) in couponList" :key="index">
                        <view class="coupon-detail">
                            <view class="coupon-detail-item">
                                <view class="coupon-detail-item-left">
                                    <block v-if="item!.coupon_type == 1">
                                        <FormatPrice class="item-left-money" :priceData="item?.coupon_money"></FormatPrice>
                                    </block>
                                    <block v-else>
                                        <view class="item-left-money">{{ item?.coupon_discount }}折</view>
                                    </block>
                                    <view class="item-left-desc">
                                        {{ item?.coupon_desc }}
                                    </view>
                                </view>
                                <view class="coupon-detail-item-right">
                                    <view class="item-right-name">
                                        {{ item?.coupon_name }}
                                        <text v-if="pageType == 2">({{ item.status === 2 ? "未使用" : item.status_name }})</text>
                                    </view>
                                    <view class="item-right-time"> 截止{{ item?.end_date }} </view>
                                    <view class="tmcscoupon-item-btn">
                                        <tigButton v-if="(item.status === 1 || item.status === 2)" :plain="true" plainMainColor  @click="toPages(item)"> 立即使用 </tigButton>
                                        <tigButton v-if="item.status === 4" :plain="true"> 已使用 </tigButton>
                                        <tigButton v-if="item.status === 5" :plain="true"> 已过期 </tigButton>
                                </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </block>
                
                <view class="loading-box" v-if="filterParams.page > 1">
                    <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
                    <view v-else>没有更多了~</view>
                </view>
            </view>
        </block>
        <view class="empty-box" v-if="couponList && couponList.length === 0">
            <view class="pictrue"><image lazy-load src="/static/images/common/data_empty.png"></image></view>
            <view class="txt">暂无优惠券！</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { reactive, ref } from "vue";
import { getCouponList, addCoupon, getMyCouponList } from "@/api/coupon/coupon";
import type { CouponFilterResult, CouponFilterParams, CouponResponse } from "@/types/coupon/coupon";
import { onReachBottom, onShow, onLoad } from "@dcloudio/uni-app";
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
const pageType = ref<number>(1)
const total = ref(0);
const couponList = ref<CouponFilterResult[]>([]);
const loaded = ref(false);
const __getCouponList = async () => {
    if (filterParams.page > 1) loaded.value = true;

    uni.showLoading({
        title: "加载中..."
    });
    try {
        let result = {} as CouponResponse
        if(pageType.value == 1){
            result = await getCouponList(filterParams);
        }else{
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
const toPages = (item:any) => {
    uni.navigateTo({
        url: "/pages/search/result",
        query: {
            keyword: item.name
        }
    });
};
onLoad((options) => {
    if(options && options.type){
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
        padding:0 20rpx;
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
                .item-left-discount{
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
                .tmcscoupon-item-btn{
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
</style>
