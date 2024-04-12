<template>
    <view :class="'module-ad-con module-notice'" :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom">
        <view class="notice-ad-warp">
            <view class="notice-con" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
                <view class="notice-item">
                    <view class="item-content">
                        <view class="item-notice-con" :style="itemFormat.item_background_color + itemFormat.item_height + itemFormat.item_radius">
                            <view class="item-notice-ico">
                                <image :src="module?.ico_pic?.pic_url" mode="widthFix"></image>
                            </view>
                            <view class="item-notice-list">
                                <view class="item-notice-input" :style="itemFormat.text_color">{{ module?.text }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import {formatFrame } from "@/components/modules";
const props = defineProps({
    module: {
        type: Object,
        default: () => {}
}})
const { frame } = props.module
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
const itemFormat = computed(() => {
    return {
        item_background_color: `background-color:${props.module?.frame?.item_background_color};`,
        item_radius: `border-radius:${props.module?.frame?.item_radius}px;`,
        item_height: `height:${props.module?.frame?.item_height}px;`,
        text_color: `color:${props.module?.frame?.text_color};`
    };
});
</script>
<style>
@import "../../../static/css/modules.css";
.notice-ad-warp .item-notice-con {
    background: #fff;
    height: 40rpx;
    display: flex;
    align-items: center;
    padding: 10rpx 0;
    color: #555555;
}
.notice-ad-warp .item-notice-con .item-notice-ico {
    margin-left: 20rpx;
    width: 32rpx;
    height: 32rpx;
}
.notice-ad-warp .item-notice-con .item-notice-ico image {
    width: 100%;
    height: 100%;
}
.notice-ad-warp .item-notice-con .item-notice-list {
    margin-left: 16rpx;
}
</style>
