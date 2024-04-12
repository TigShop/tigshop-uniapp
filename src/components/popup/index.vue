<template>
    <van-popup
        v-model:show="show"
        :position="position"
        :round="round"
        :closeable="closeable"
        close-icon="close"
        :style="{ height: height, 'background-color': backgroundColor, 'padding-bottom': paddingBottom + 'rpx'}"
    >
        <view class="popup-title" v-if="showTitle">{{ title }} </view>
        <slot></slot>
    </van-popup>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
        required: true
    },
    height: {
        type: String,
        default: "50%"
    },
    round: {
        type: Boolean,
        default: true
    },
    closeable: {
        type: Boolean,
        default: true
    },
    position: {
        type: String,
        default: "bottom"
    },
    showTitle: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: ""
    },
    backgroundColor: {
        type: String,
        default: "#fff"
    },
    paddingBottom: {
        type: String,
        default: "0"
    }
});
const emit = defineEmits(["update:show"]);
const show = computed({
    get: () => props.show,
    set: () => {
        emit("update:show", false);
    }
});
</script>

<style lang="scss" scoped>
.popup-title {
    box-sizing: border-box;
    font-size: 32rpx;
    font-weight: bold;
    text-align: left;
    height: 123rpx;
    line-height: 123rpx;
    position: relative;
    padding-left: 30rpx;
    background: #fff;
}
</style>
