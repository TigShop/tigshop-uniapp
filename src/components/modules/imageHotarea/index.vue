<template>
    <view
        :class="'module-ad-con module-ad-con-' + module_id + ' ad-radio_style__' + module.radio_style"
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom"
    >
        <view class="module-ad-content" :style="module.background_color + module.box_radius">
            <commonTitle v-if="module.title.show_title" :module="module.title"></commonTitle>

            <view class="image-ad-warp image-hotarea-warp" :style="frameFormat.inner_padding">
                <view class="image-ad-con">
                    <block v-for="(item, index) in module.pic_list" :key="item.pic_id">
                        <view class="image-ad-item">
                            <view class="item-content" :style="format.img_padding">
                                <view class="item-content-hotatrea">
                                    <tigImage class="item-img-bg" v-model:src="item.pic_url" mode="widthFix"></tigImage>
                                    <block v-for="(subItem, index) in item.hotarea" :key="index">
                                        <view
                                            @click="handleToPage(subItem.link)"
                                            class="image-hotarea-link"
                                            :data-width="subItem.width"
                                            :data-height="subItem.height"
                                            :data-left="subItem.pageX"
                                            :data-top="subItem.pageY"
                                            :style="subItem.position"
                                        >
                                            <text class="area_box_con_text">{{ subItem.link.name }}</text>
                                        </view>
                                    </block>
                                </view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import commonTitle from "@/components/modules/commonTitle/index.vue";
import { formatFrame } from "@/components/modules";
import { urlFormat } from "@/utils/format";
const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    }
});
const frameFormat = computed(() => {
    return formatFrame(props.module.frame ?? {});
});

const format = computed(() => {
    return {
        img_padding: "padding:" + props.module?.img_padding + "rpx;"
    };
});

const module_id = ref("");
const handleToPage = (data: string | { path: string; [key: string]: any }) => {
    uni.navigateTo({
        url: urlFormat(data)
    });
}
</script>
<style>
@import "../../../static/css/modules.css";
/*热图广告*/
.image-hotarea-warp .image-ad-item {
    width: 100%;
    position: relative;
}
.image-hotarea-warp .image-ad-item .item-content-hotatrea {
    position: relative;
    width: 100%;
    height: 100%;
}
.image-hotarea-warp .image-ad-item .item-img-bg {
    width: 100%;
}
.image-hotarea-warp .image-ad-item .image-hotarea-link {
    position: absolute;
}
.image-hotarea-warp .image-ad-item .image-hotarea-link .area_box_con_text {
    display: none;
}
</style>
