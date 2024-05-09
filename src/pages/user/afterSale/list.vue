<template>
    <view class="after-sale-list">
        <navbar :parameter="parameter"></navbar>
        <view class="after-sale-list-content">
            
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { reactive, ref } from "vue";
const parameter = {
    navbar: "1",
    return: "1",
    title: "申请列表",
};
</script>

<style lang="scss" scoped></style>
