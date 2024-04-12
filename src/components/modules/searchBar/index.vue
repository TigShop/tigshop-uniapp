<template>
    <view :class="'module-ad-con module-search_bar'" :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom">
        <view class="module-ad-content" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
            <view class="searchBar-warp">
                <view class="searchBar-con">
                    <view class="searchBar-item">
                        <view class="item-content">
                            <view class="item-search-con">
                                <view
                                    @click="search"
                                    class="item-search-form"
                                    :style="allFormat.item_background_color + allFormat.item_border_radius + allFormat.item_height + allFormat.text_color"
                                >
                                    <view class="module_ico module-ico-sousuo"></view>
                                    <view class="item-search-input">{{ module?.text }}</view>
                                </view>
                            </view>
                        </view>
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
    return formatFrame(frame);
});
const allFormat = computed(() => {
    return {
        item_background_color: `background-color: ${props.module?.frame?.item_background_color};`,
        item_height: `height: ${props.module?.frame?.item_height}px;`,
        item_border_radius: `border-radius: ${props.module?.frame?.item_radius}px;`,
        text_color: `color: ${props.module?.frame?.text_color};`
    };
});

const search = () => {
    uni.navigateTo({
        url: "/pages/search/index"
    });
};
</script>
<style>
@import "../../../static/css/modules.css";
.searchBar-warp .item-search-con .item-search-form {
    background: #fff;
    height: 60rpx;
    display: flex;
    align-items: center;
    padding: 0;
    color: #555555;
}
.searchBar-warp .item-search-con .item-search-form .module_ico {
    margin-left: 20rpx;
}
.searchBar-warp .item-search-con .item-search-form .item-search-input {
    margin-left: 10rpx;
}
</style>
