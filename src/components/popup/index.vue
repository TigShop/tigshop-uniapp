<template>
    <van-popup
        v-model:show="show"
        :position="position"
        :round="round"
        :closeable="closeable"
        close-icon="close"
        :style="{ height: height, 'background-color': backgroundColor, 'padding-bottom': paddingBottom + 'rpx' }"
    >
        <view class="popup-container">
            <view class="popup-title" v-if="showTitle">{{ title }} </view>
            <view class="popup-content">
                <slot></slot>
            </view>
        </view>
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

.popup-container {
    height: 100%;
    box-sizing: border-box;
    position: relative;
}

.popup-title {
   
    font-size: 32rpx;
    font-weight: bold;
    text-align: left;
    height: 123rpx;
    line-height: 123rpx;
    padding-left: 30rpx;
    background: #fff;
}

.popup-content {
    top: 123rpx;
    overflow: hidden;
    overflow-y: auto;
    height: calc(100% - 123px);
}
</style>
