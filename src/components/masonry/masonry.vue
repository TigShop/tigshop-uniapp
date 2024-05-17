<template>
    <view class="menu-card">
        <block v-for="(item, index) in commodityList" :key="index">
            <goods-item :item="item" @callback="$emit('callback')"></goods-item>
        </block>
    </view>
    <block v-if="commodityList.length === 0">
        <view class="no-data">没有找到对应的商品!</view>
    </block>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import goodsItem from "@/components/productItem/index.vue";
const props = defineProps({
    commodityList: {
        type: Array as PropType<any[]>,
        default: ""
    }
});
const emits = defineEmits(["callback"]);
</script>
<style lang="scss" scoped>
.menu-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0 15rpx;
}
.no-data {
    width: 100%;
    text-align: center;
    font-size: 24rpx;
    margin-top: 20rpx;
    color: $tig-color-grey;
}
</style>
