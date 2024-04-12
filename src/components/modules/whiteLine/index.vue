<template>
    <view :class="'module-ad-con  module-white_line ad-style__' + module.style + ' ad-line_style__' + module.line_style">
        <view class="white-line-warp" :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom">
            <view class="white-line-con" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
                <view class="white-line-item" >
                    <view class="item-content">
                        <view class="item-line"></view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { formatFrame } from "@/components/modules";
const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    }
});
const { frame } = props.module;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
</script>
<style>
@import "../../../static/css/modules.css";
/*线条*/
.white-line-warp .white-line-con {
    padding-top: 30rpx;
    padding-bottom: 30rpx;
}
.white-line-warp .white-line-con .white-line-item {
    height: 2rpx;
    width: 100%;
    border-bottom: 2rpx solid #e5e5e5;
}
.ad-line_style__2 .white-line-warp .white-line-con .white-line-item {
    border-bottom: 2rpx dashed #e5e5e5;
}
.ad-line_style__3 .white-line-warp .white-line-con .white-line-item {
    border-bottom: 2rpx dotted #e5e5e5;
}
</style>
