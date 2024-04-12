<template>
    <view class="coupon-info">
        <view class="coupon">
            <view class="coupon-title">优惠券</view>
            <view class="coupon-content" @click="handleCoupon">
                <view class="coupon-text">优惠￥9</view>
                <image class="more-ico" src="/static/images/common/more.png"></image>
            </view>
        </view>

        <popup v-model:show="show" title="优惠券" height="60%" backgroundColor="#f5f5f5" paddingBottom="90">
            <view>
                <van-tabs v-model:active="tabsActive" swipeable sticky>
                    <van-tab title="可用优惠券">
                        <view class="coupon-list">
                            <view class="bonus-box">
                                <view :class="'bonus-bd enable_select'" v-for="(item, idx) in couponList.enable_coupons" :key="idx">
                                    <view class="bonus-left">
                                        <view class="bonus-amount price">
                                            {{ item.coupon_type === 2 ? `${item.coupon_money} 折` : priceFormat(Number(item.coupon_money)) }}
                                        </view>
                                        <view class="bonus-desc">{{ item.coupon_name }}</view>
                                    </view>

                                    <view class="bonus-right">
                                        <view class="bonus-name">{{ item.is_global ? "[全场券]" : "" }} </view>
                                        <view class="bonus-time">截止时间 {{ item.end_date }}</view>
                                    </view>
                                    <view class="coupon-btn">
                                        <van-checkbox v-model="item.selected" checked-color="#ee0a24" @click="handleCheck(item)"></van-checkbox>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </van-tab>
                    <van-tab title="不可用优惠券">
                        <view class="coupon-list">
                            <view class="bonus-box">
                                <view :class="'bonus-bd disabled'" v-for="(item, idx) in couponList.disable_coupons" :key="idx">
                                    <view class="bonus-left">
                                        <view class="bonus-amount price">
                                            {{ item.coupon_type === 2 ? `${item.coupon_money} 折` : priceFormat(Number(item.coupon_money)) }}
                                        </view>
                                        <view class="bonus-desc">{{ item.coupon_name }}</view>
                                    </view>

                                    <view class="bonus-right">
                                        <view class="bonus-name">{{ item.is_global ? "[全场券]" : "" }} </view>
                                        <view class="bonus-time">截止时间 {{ item.end_date }}</view>
                                    </view>
                                    <view class="coupon-btn">
                                        <van-checkbox disabled v-model="item.selected"></van-checkbox>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </van-tab>
                </van-tabs>
                <view class="button-position">
                    <van-button round type="danger" style="width: 100%" @click="handlecConfirm">确定</van-button>
                </view>
            </view>
        </popup>
    </view>
</template>

<script lang="ts" setup>
import type { CouponList } from "@/types/order/check";
import { ref } from "vue";
import { priceFormat } from "@/utils/format";
import popup from "@/components/popup/index.vue";
interface Props {
    couponList: CouponList;
    useCouponIds: number[];
}
const props = defineProps<Props>();

const selectedIds = ref(props.useCouponIds);
const show = ref(false);
const tabsActive = ref("可用优惠券");
const handleCoupon = () => {
    show.value = true;
};
const handleCheck = (item: any) => {
    console.log(item);
    if (item.selected) {
    } else {
        // const isSelectedId = isSelected(item.id);
        // if (isSelectedId) {
        //     const index = selectedIds.value.findIndex((id) => id === item.id);
        //     if (index !== -1) {
        //       selectedIds.value.splice(index, 1);
        //     }
        // }
    }
};

const isSelected = (couponId: number): boolean => {
    return selectedIds.value.includes(couponId);
};

const handlecConfirm = () => {
    // show.value = false;
};
</script>

<style lang="scss" scoped>
:deep(.van-tabs__line) {
    background: #ee0a24;
}

.coupon {
    border-radius: 18rpx;
    background: #fff;
    margin-bottom: 20rpx;
    padding: 30rpx 32rpx 35rpx;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
    font-size: 28rpx;
    font-weight: 700;
    padding-right: 6rpx;
    vertical-align: middle;
}
.bonus-box .bonus-bd .bonus-amount {
    font-size: 60rpx;
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
</style>
