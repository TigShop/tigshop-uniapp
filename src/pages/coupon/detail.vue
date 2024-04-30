<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <block v-if="detailData">
            <view class="coupon-detail">
                <view class="coupon-detail-item">
                    <view class="coupon-detail-item-left">
                        <block v-if="detailData!.coupon_type == 1">
                            <FormatPrice class="item-left-money" :priceData="detailData?.coupon_money"></FormatPrice>
                        </block>
                        <block v-else>
                            <view>{{ detailData?.coupon_discount }}折</view>
                        </block>
                        <view class="item-left-desc">
                            {{ detailData?.coupon_desc }}
                        </view>
                    </view>
                    <view class="coupon-detail-item-right">
                        <view class="item-right-name">
                            {{ detailData?.coupon_name }}
                        </view>
                        <view class="item-right-time"> {{ detailData?.use_start_date }} 至 {{ detailData?.use_end_date }} </view>
                    </view>
                </view>
            </view>
            <view class="button-position">
                <view class="safe-padding">
                    <button hover-class="base-button-hover" :disabled="detailData!.is_receive === 1" class="base-button" @click="handleSubmit">
                        {{ detailData!.is_receive ? "已领取" : "领取" }}
                    </button>
                </view>
            </view>
        </block>
    </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import navbar from "@/components/navbar/index.vue";
import { getMyCouponInfo, addCoupon } from "@/api/coupon/coupon";
import type { CouponDetailItem } from "@/types/coupon/coupon";
const parameter = {
    navbar: "1",
    return: "1",
    title: "优惠券详情",
    color: false
};
const detailData = ref<CouponDetailItem>();
const id = ref<number>();
const getDetail = async () => {
    uni.showLoading({
        title: "加载中"
    });

    try {
        if (id.value) {
            const result = await getMyCouponInfo({ id: id.value });
            detailData.value = result.item;
        }
    } catch (error) {
        console.error(error);
    } finally {
        uni.hideLoading();
    }
};

onLoad((options) => {
    if (options && options.id) {
        id.value = Number(options.id);
        getDetail();
    }
});

const handleSubmit = async () => {
    try {
        if (id.value) {
            const result = await addCoupon({ coupon_id: id.value });
            uni.showToast({
                title: "领取成功",
                duration: 1500
            });
        }
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1500
        });
        console.error(error);
    }
};
</script>

<style lang="scss" scoped>
.coupon-detail {
    box-sizing: border-box;
    margin-top: 15rpx;
    padding: 20rpx;
    .coupon-detail-item {
        display: flex;
        height: 260rpx;
        background-color: #fff;

        .coupon-detail-item-left {
            width: 300rpx;
            flex-shrink: 0;
            background-color: #609dde;
            background-image: -webkit-linear-gradient(left, #609dde 20%, #6781da);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            .item-left-money {
                font-size: 48rpx;
                font-weight: bold;
                padding-bottom: 10rpx;
                :deep(.util) {
                    font-size: 30rpx;
                    padding-left: 5rpx;
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
            display: flex;
            flex-direction: column;
            padding-left: 20rpx;
            color: #666;
            .item-right-name {
                font-size: 32rpx;
                font-weight: bold;
                margin-top: 20rpx;
                padding-bottom: 60rpx;
            }

            .item-right-time {
                font-size: 24rpx;
                color: #999;
            }
        }
    }
}
</style>
