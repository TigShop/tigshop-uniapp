<template>
    <view class="invoice-management">
        <navbar :parameter="parameter"></navbar>
        <view class="invoice-menu">
            <block v-for="item in menuTypeList" :key="item.type">
                <view class="invoice-menu-item" :class="{ active: currentType === item.type }" @click="handleMenuType(item.type)">
                    <text class="invoice-menu-item-text">{{ item.value }}</text>
                </view>
            </block>
        </view>
        <view class="placeholder"></view>
        <view class="invoice-content">
            <invoiceList ref="invoiceListRef" v-if="currentType === 'list'"></invoiceList>
            <!-- <invoice-qualification v-if="currentType === 'invoice'"></invoice-qualification> -->
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import navbar from "@/components/navbar/index.vue";
import invoiceList from "./src/invoiceList.vue";

const menuTypeList = reactive([
    { type: "list", value: "已完成订单" },
    { type: "invoice", value: "增票资质" }
]);
const invoiceListRef = ref();
const currentType = ref("list");

const handleMenuType = (type: string) => {
    currentType.value = type;
};

const parameter = {
    navbar: "1",
    return: "1",
    title: "发票管理"
};

onReachBottom(() => {
    if (currentType.value === "list") {
        if (invoiceListRef.value.filterParams.page < Math.ceil(invoiceListRef.value.total / invoiceListRef.value.filterParams.size)) {
            invoiceListRef.value.filterParams.page++;
            invoiceListRef.value.__getOrderList();
        }
    }
});
</script>

<style lang="scss" scoped>
.placeholder {
    height: 88rpx;
}
.invoice-menu {
    background-color: #fff;
    display: flex;
    box-sizing: border-box;
    margin-bottom: 30rpx;
    position: fixed;
    width: 100%;
    z-index: 999;

    .invoice-menu-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 88rpx;
        position: relative;

        .invoice-menu-item-text {
            padding: 0 10rpx 0 0;
        }
        &.active {
            color: #333;
            font-weight: bold;

            &:after {
                content: "";
                position: absolute;
                bottom: 0;
                height: 5rpx;
                width: 60rpx;
                background-color: $tig-color-primary;
                border-radius: 10rpx;
            }
        }
    }
}

.invoice-content {
    padding: 20rpx;
}
</style>
