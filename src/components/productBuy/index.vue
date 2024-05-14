<template>
    <view class="buy" @click.stop="handleBuy">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {addToCart} from '@/api/product/product'
const props = defineProps({
    id: Number,
    number: { type: Number, default: 1 },
    skuId: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false },
    isQuick: { type: Boolean, default: false }
});
const emit = defineEmits(["callback"]);
const loading = ref(false);
const handleBuy = async () => {
    if (props.disabled) return;
    try {
        if (loading.value == true) {
            return;
        }
        loading.value = true;
        const result = await addToCart({
            id: props.id ?? 0,
            number: props.number,
            sku_id: props.skuId,
            is_quick: props.isQuick ? 1 : 0
        });
        if (props.isQuick == true) {
            uni.navigateTo({ url: "/pages/order/check" });
        } else {
            uni.showToast({title: '加入购物车成功', duration: 1500})
            emit("callback");
        }
    } catch (error: any) {
        uni.showToast({title: error.message, icon: 'none', duration: 1500})
    } finally {
        loading.value = false;
    }
};
</script>

<style lang="scss" scoped></style>
