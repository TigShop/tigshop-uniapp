<template>
    <view class="tig-back-top" :style="styleFormat.bottom + styleFormat.right + styleFormat.width + styleFormat.height">
        <view class="tig-back-top-content" @click="handleBackTop">
            <slot>
                <image class="tig-back-top-content-img" src="/src/static/images/common/scroll-to-top.png" mode="widthFix"></image>
            </slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useConfigStore } from "@/store/config";
const configStore = useConfigStore();
const props = defineProps({
    height: {
        type: Number,
        default: 75
    },
    width: {
        type: Number,
        default: 75
    },
    right: {
        type: Number,
        default: 20
    },
    bottom: {
        type: Number,
        default: 50
    },
    duration: {
        type: Number,
        default: 500
    }
});

const styleFormat = computed(() => {
    return {
        right: `right:${props.right}rpx;`,
        bottom: `bottom:${props.bottom + configStore.tabbarHeightNum}rpx;`,
        width: `width:${props.width}rpx;`,
        height: `height:${props.height}rpx;`
    };
});

const handleBackTop = () => {
    uni.pageScrollTo({
        scrollTop: 0,
        duration: props.duration
    });
}
</script>

<style lang="scss" scoped>
.tig-back-top {
    position: fixed;
    z-index: 999;
    overflow: hidden;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    .tig-back-top-content {
        &-img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
