<template>
    <view class="offline-warp">
        <view class="offline-menu">
            <view class="offline-menu-item" :class="{ active: activeName === '银行汇款' }" @click="handleTabsActive('银行汇款')">银行汇款</view>
            <view class="offline-menu-item" :class="{ active: activeName === '企业汇款' }" @click="handleTabsActive('企业汇款')">企业汇款</view>
        </view>
        <block v-if="activeName === '银行汇款'">
            <view class="offline-content">
                <rich-text :nodes="offline_payment_list?.offline_pay_bank"></rich-text>
            </view>
        </block>
        <block v-if="activeName === '企业汇款'">
            <view class="offline-content">
                <rich-text :nodes="offline_payment_list?.offline_pay_company"></rich-text>
            </view>
        </block>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type {OfflinePaymentList } from "@/types/order/pay";

interface Props {
    offline_payment_list: OfflinePaymentList
}
const props = defineProps<Props>();

const handleTabsActive = (str: string) => {
    activeName.value = str;
};
const activeName = ref("银行汇款");
</script>

<style lang="scss" scoped></style>
