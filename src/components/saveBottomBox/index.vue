<template>
    <view class="save-bottom-box" :style="{'padding-bottom': configStore.saveBottom + 'rpx'}">
        <view style="height: 100%;width: 100%;">
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/store/config";
const configStore = useConfigStore();
const props = defineProps({
    height: {
        type: [Number, String],
        default: 0,
        required: true
    },
    backgroundColor: {
        type: String,
        default: "transparent"
    }
});
</script>

<style lang="scss" scoped>
.save-bottom-box {
    width: 100%;
    height: v-bind("props.height + 'rpx'");
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: v-bind("props.backgroundColor");
    border-top: 1px solid #eee;
    box-sizing: content-box;
}
</style>
