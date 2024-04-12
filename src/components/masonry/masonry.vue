<template>
    <view class="menu-card">
        <block v-for="(item, index) in commodityList" :key="index">
            <goods-item :item="item"></goods-item>
        </block>
    </view>
</template>

<script lang="ts" setup>
import goodsItem from "@/components/productItem/index.vue";
import type { GetProductFilterResult } from "@/types/home";
interface Iprops {
    commodityList: GetProductFilterResult[];
}
const props = defineProps<Iprops>();
</script>
<style>
.menu-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0 15rpx;
}
</style>
@/types/home/home