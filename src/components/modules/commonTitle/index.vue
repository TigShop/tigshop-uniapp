<template>
    <template v-if="module.show_title">
        <view :class="'image-ad-title ad-title_style__' + module.title_style" :style="titleFormat.title_background + titleFormat.title_radius">
            <view class="image-ad-title-l">
                <view class="image-ad-title-h" :style="'color: ' + module.title_color">{{ module.title_text }}</view>
                <view class="image-ad-title-d" :style="'color: ' + module.desc_color">{{ module.desc_text }}</view>
            </view>
            <block v-if="module.show_more">
                <view class="image-ad-title-r">
                    <navigator class="more-link" :url="module.more_link ? module.more_link.link : ''" :style="'color: ' + module.more_color">
                        <text>查看更多</text>
                        <text class="module_ico module-ico-youjiantou"></text>
                    </navigator>
                </view>
            </block>
        </view>
    </template>
</template>
<script lang="ts" setup>
import type { ModuleTitleType } from "@/types/decorate/decorate.d.ts";
import { computed } from "vue";
// 在modules加入要使用的模块
const props = defineProps<{
    module: ModuleTitleType;
}>();
const titleFormat = computed(() => {
    return {
        title_background: props.module.title_background ? "background-color:" + props.module.title_background + ";" : "",
        title_radius: "border-radius:" + props.module.title_radius + "px " + props.module.title_radius + "px " + "0 0;"
    };
});
</script>
<style>
@import "../../../static/css/modules.css";
</style>
