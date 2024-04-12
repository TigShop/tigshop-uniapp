<template>
    <view
        :class="'module-ad-con  module-title_ad  ad-title_align__' + module?.title?.title_align"
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom"
    >
        <view class="module-ad-content" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
            <view class="title-ad-warp">
                <view class="title-ad-con">
                    <view class="title-ad-item">
                        <view class="item-content" style="">
                            <view :class="'image-ad-title ad-title_style__' + module?.title?.title_style" style="">
                                <view class="image-ad-title-l" style="">
                                    <view class="image-ad-title-h" :style="allFormat.title_color">{{ module.title.title_text }}</view>
                                    <view class="image-ad-title-d" :style="allFormat.desc_color">{{ module.title.desc_text }}</view>
                                </view>
                                <block v-if="module.title.show_more === 1">
                                    <view class="image-ad-title-r">
                                        <navigator class="more-link" :url="module.title.more_link[0]" :style="allFormat.more_color">
                                            <text>查看更多</text>
                                            <text class="module_ico module-ico-youjiantou"></text>
                                        </navigator>
                                    </view>
                                </block>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import {  computed } from "vue";
import { formatFrame } from "@/components/modules";
const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    }
});
console.log('titleAd', props.module)
const { frame } = props.module
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
const allFormat = computed(() => {
    return {
        desc_color: `color: ${props.module?.title?.desc_color};`,
        more_color: `color: ${props.module?.title?.more_color};`,
        title_color: `color: ${props.module?.title?.title_color};`,
    };
});
</script>
<style>
@import "../../../static/css/modules.css";
.title-ad-warp .title-ad-item {
    padding: 0;
    min-height: 40rpx;
}
.title-ad-warp .title-ad-item .item-name-con {
    display: flex;
    flex-wrap: nowrap;
}
.title-ad-warp .title-ad-item .item-name {
    line-height: 40rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #323233;
    word-break: break-all;
}
.title-ad-warp .title-ad-item .item-desc {
    line-height: 36rpx;
    padding-top: 16rpx;
    color: #8c8c8c;
    font-size: 24rpx;
    word-break: break-all;
}
.ad-title_align__2 .title-ad-warp .image-ad-title {
    justify-content: center;
}
.ad-title_align__2 .title-ad-warp .image-ad-title .image-ad-title-r {
    position: absolute;
    right: 0;
}
</style>
