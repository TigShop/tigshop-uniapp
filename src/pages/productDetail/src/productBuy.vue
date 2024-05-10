<template>
    <view :class="'buy ' + (disabled == true ? 'disabled' : '')" @click="_addToCart">
        <slot></slot>
    </view>
</template>
<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { addToCart } from "@/api/product/product";
const props = defineProps({
    id: { type: String, default: "" },
    number: { type: Number, default: 1 },
    skuId: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false },
    isQuick: { type: Boolean, default: false }
});
const emit = defineEmits(["callback"]);
const loading = ref(false);
const { disabled, number } = toRefs(props);
const _addToCart = async () => {
    if (disabled.value) return false;
    try {
        if (loading.value == true) {
            return;
        }
        loading.value = true;
        const result = await addToCart({
            id: props.id ?? "",
            number: number.value,
            sku_id: props.skuId,
            is_quick: props.isQuick ? 1 : 0
        });
        if (props.isQuick == true) {
            uni.navigateTo({
                url: "/pages/order/check"
            });
        } else {
            uni.showToast({
                title: '加入购物车成功',
                icon: "none"
            })
            emit("callback");
        }
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    } finally {
        loading.value = false;
    }
    return;
};
</script>
<style lang="scss" scoped>
.buy {
    display: inline-flex;
}
</style>
