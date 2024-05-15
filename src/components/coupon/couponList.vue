<template>
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
                    <block v-else >
                        <FormatPrice :fontStyle="{fontSize:'48rpx',lineHeight:1}" :currencyStyle="{selfAlign:'end',fontSize:'24rpx'}" :priceData="item.coupon_money"></FormatPrice>
                    </block>
                </view>
                <view class="right-2">
                    <tigButton  @click="getCoupon(item)" :disabled="item.is_receive===1"> {{ item.is_receive ? "已领取" : "马上领" }}</tigButton>
                </view>
            </view>
            <view class="dotted-line"></view>
        </view>
    </view>
</template>
<script lang="ts" setup>
import type { ProductCouponItem } from "@/types/product/product";
import { addCoupon } from "@/api/coupon/coupon";
import { getProductCouponList } from "@/api/product/product";
import {  ref } from "vue";
const props = defineProps({
    productId: {
        type: Number,
        default: 0
    }
});

const getCoupon = async (value: any) => {
    if (value.is_receive === 1) return;
    try {
        const result = await addCoupon({ coupon_id: value.coupon_id });
        // showCoupon.value = false;
        uni.showToast({
            title: "领取成功"
        });
        await getCouponList();
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        });
    } finally {
        // showCoupon.value = false;
    }
};
const couponList = ref<ProductCouponItem[]>([]);
const getCouponList = async () => {
    try {
        const result = await getProductCouponList(Number(props.productId));
        couponList.value = result.list;
    } catch (error: any) {
        console.error(error.message);
    }
};
getCouponList()
</script>
<style lang="scss" scoped>
.coupon-box {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    padding: 30rpx 30rpx 150rpx 30rpx;


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

                .zhekou{
                    font-size: 48rpx;
                    line-height: 1; /* 添加这行 */
                }
                .zhe{
                    margin-left: 8rpx;
                    font-size: 24rpx;
                    self-align: end; /* 添加这行 */
                }

            }
            .right-2{
                display: flex;
                justify-content: center;
                align-items: center;
                .coupon-btn-con{
                    font-size: 22rpx;
                    padding: 10rpx 25rpx;
                    border-radius: 40rpx;

                    color: #fff;
                    background-image: -webkit-linear-gradient(left, #609dde 20%, #6781da);
                    &:active {
                        opacity: 0.7;
                    }
                    &.disabled {
                        background-image: -webkit-linear-gradient(left, #aaa 20%, #aaa);
                    }
                }
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
}

</style>
