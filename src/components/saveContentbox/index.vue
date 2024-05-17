<template>
    <view :style="{ 'padding-bottom': bottomNum + 'rpx', 'padding-top': topNum + 'rpx' }">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { usetabbarStore } from "@/store/tabbar";
import { useConfigStore } from "@/store/config";
import { computed } from "vue";
const props = defineProps({
    has_tabbar: {
        type: Boolean,
        default: false
    },
    specialNum: {
        type: Number,
        default: 0
    },
    saveTop: {
        type: Boolean,
        default: false
    }
});
const tabbarStore = usetabbarStore();
const configStore = useConfigStore();

const bottomNum = computed(() => {
    let value = props.specialNum;
    if (props.has_tabbar) {
        value += tabbarStore.tabbarHeightNum + configStore.saveBottom;
    } else {
        value += configStore.saveBottom;
    }
    return value;
});

const topNum = computed(() => {
    return props.saveTop ? configStore.saveTop + 20 : 0;
});
</script>

<style lang="scss" scoped></style>
