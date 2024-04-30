<template>
    <view class="order">
        <navbar :parameter="parameter"></navbar>
        <view class="order-menu">
            <view class="order-menu-item active">
                <uni-badge class="uni-badge-left-margin" :text="10" absolute="rightTop" size="small" :customStyle="{ background: '#4335d6' }">
                    <text>全部</text>
                </uni-badge>
            </view>
            <view class="order-menu-item">
                <text>待付款</text>
            </view>
            <view class="order-menu-item">
                <text>待发货</text>
            </view>
            <view class="order-menu-item">
                <text>待收货</text>
            </view>
            <view class="order-menu-item">
                <text>待评价</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
const parameter = {
    navbar: "1",
    return: "1",
    title: "我的订单",
    showHome: true,
    color: false
};
</script>

<style lang="scss" scoped>
.order-menu {
    background-color: #fff;
    display: flex;
    box-sizing: border-box;

    .order-menu-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 88rpx;
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
</style>
