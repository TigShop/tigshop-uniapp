<template>
    <view class="total-card">
        <view class="total-card-item">
            <view class="total-card-item-left">商品总价</view>
            <view class="total-card-item-right"><FormatPrice :priceData="total.product_amount"></FormatPrice></view>
        </view>
        <view class="total-card-item">
            <view class="total-card-item-left"
                >配送费用
            </view>
            <view class="total-card-item-right special-text">+ <FormatPrice :priceData="total.shipping_fee"></FormatPrice></view>
        </view>
        <view class="total-card-item" v-if="total.balance > 0">
            <view class="total-card-item-left">使用余额</view>
            <view class="total-card-item-right">- <FormatPrice :priceData="total.balance"></FormatPrice></view>
        </view>
        <view class="total-card-item" v-if="total.points_amount > 0">
            <view class="total-card-item-left">使用积分</view>
            <view class="total-card-item-right">- <FormatPrice :priceData="total.points_amount"></FormatPrice></view>
        </view>
        <view class="total-card-item" v-if="total.coupon_amount > 0">
            <view class="total-card-item-left">使用优惠券</view>
            <view class="total-card-item-right">- <FormatPrice :priceData="total.coupon_amount"></FormatPrice></view>
        </view>
        <view v-if="false" class="total-card-tig"> * 该订单完成后，您将获得 <text class="special-text">111111</text> 积分 </view>
    </view>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from "vue";
const props = defineProps({
    total: {
        type: Object,
        default: () => ({ product_amount: 0, shipping_fee: 0, balance: 0, points_amount: 0, coupon_amount: 0 })
    },
    cartList: {
        type: Array as PropType<any[]>,
        default: () => []
    }
});
const show = ref(false);
const handleDispatching = () => {
    show.value = true;
};
</script>

<style lang="scss" scoped>
.total-card {
    background-color: #fff;
    box-sizing: border-box;
    padding: 20rpx 30rpx;
    border-radius: 18rpx;
    margin-top: 20rpx;

    .total-card-item {
        padding-bottom: 35rpx;
        display: flex;
        justify-content: space-between;
        &:last-child {
            padding-bottom: 0;
        } 

        .total-card-item-left {
            display: flex;
            align-items: center;
        }

        .red {
            color: $tig-color-primary;
        }

        .total-card-ico {
            margin-left: 10rpx;
        }
    }

    .total-card-tig {
        display: flex;
        justify-content: flex-end;
        font-size: 24rpx;
        color: #999;
        padding-bottom: 10rpx;

        .special-text {
            color: #333;
            padding: 0 5rpx;
        }
    }
}
</style>
