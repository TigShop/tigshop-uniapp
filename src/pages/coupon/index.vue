<template>
    <view style="height: 100%; padding-bottom: 20rpx">
        <navbar :parameter="parameter"></navbar>
        <view class="page-loading" v-if="loading && !loadend"><view class="ico"></view></view>

        <block v-if="!loading && couponList && couponList.length">
            <view class="tmcscoupon-list">
                <view class="tmcscoupon-item-1" v-for="(item, index) in couponList" :key="index">
                    <view class="tmcscoupon-item">
                        <view class="tmcscoupon-item_m" @click="handleDetail(item.coupon_id)">
                            <view class="tmcscoupon-item_m-info">
                                <view class="price">
                                    {{ priceFormat(Number(item.coupon_money)) }}
                                    <text>{{ item.coupon_name }}</text>
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
                <view v-if="loadend" class="noMore">没有更多了~</view>
                <view class="bottomLoading" v-if="bottomLoading"><image class="loading" src="/static/images/common/loading.gif"></image></view>
            </view>
        </block>
        <view class="empty-box" v-if="!loading && couponList && couponList.length === 0">
            <view class="pictrue"><image src="/static/images/common/data_empty.png"></image></view>
            <view class="txt">暂无优惠券！</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { priceFormat } from "@/utils/format";
import { reactive, ref } from "vue";
import { getCouponList } from "@/api/coupon/coupon";
import type { CouponFilterResult, CouponFilterParams } from "@/types/coupon/coupon";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "优惠券",
    color: false
});

const params = reactive<CouponFilterParams>({
    page: 1,
    size: 10
});
const couponList = ref<CouponFilterResult[]>([]);
const loading = ref(false);
const loadend = ref(false);
const bottomLoading = ref(false);
const __getCouponList = async () => {
    if (couponList.value.length === 0) {
        loading.value = true;
    } else {
        bottomLoading.value = true;
    }

    try {
        const result = await getCouponList(params);
        if (result.filter_result.length === 0) return (loadend.value = true);
        couponList.value = [...couponList.value, ...result.filter_result];
        loadend.value = false;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
        bottomLoading.value = false;
    }
};
const handleDetail = (id: number) => {};

const handleReceiveCoupon = (id: number) => {};
onLoad((options) => {
    __getCouponList();
});
onReachBottom(() => {
    if (!loading.value && !loadend.value && !loadend.value) {
        params.page++;
        __getCouponList();
    }
});
</script>

<style>
/* 优惠券 */
.price text {
    font-size: 28rpx;
}
.price {
    font-size: 50rpx;
    color: #666;
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
