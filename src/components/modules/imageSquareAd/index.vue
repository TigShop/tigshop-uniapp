<template>
    <view
        :class="
            'module-ad-con module-image_ad ' +
            ' ad-pic_type__' +
            ' ad-pic_page_type__' +
            module.pic_page_type +
            ' ad-radio_style__' +
            module.pic_radio_style +
            ' '
        "
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom"
    >
        <view class="module-ad-content" :style="frameFormat.background_color + ' ' + frameFormat.box_radius">
            <commonTitle v-if="module.title.show_title" :module="module.title"></commonTitle>
            <view class="module-ad-empty empty-image_ad" v-if="module.pic_list.length == 0">
                <view class="image-empty-bg"></view>
                <view class="desc">点击添加模块图片广告</view>
            </view>
            <template v-else>
                <view class="image-ad-warp" :style="frameFormat.inner_padding">
                    <view class="image-ad-con">
                        <template v-if="module.pic_list">
                            <template v-if="module.pic_type == 5">
                                <view class="image-square-layout image-square-layout-height2">
                                    <view class="image-ad-item">
                                        <view class="item-content" :style="format.img_padding">
                                            <navigator class="item-img-a" :url="urlFormat(module.pic_list[0].pic_link)">
                                                <!-- <image lazy-load class="item-img" :src="imageFormat(module.pic_list[0]?.pic_url)" mode=""></image> -->
                                                <tigImage class="item-img" v-model:src="module.pic_list[0].pic_url"></tigImage>
                                            </navigator>
                                        </view>
                                    </view>
                                    <view class="grid-layout-2">
                                        <view class="image-ad-item">
                                            <view class="item-content" :style="format.img_padding">
                                                <navigator class="item-img-a" :url="urlFormat(module.pic_list[1].pic_link)">
                                                    <!-- <image lazy-load class="item-img" :src="imageFormat(module.pic_list[1]?.pic_url)" mode=""></image> -->
                                                    <tigImage class="item-img" v-model:src="module.pic_list[1].pic_url"></tigImage>
                                                </navigator>
                                            </view>
                                        </view>
                                        <view class="image-ad-item">
                                            <view class="item-content" :style="format.img_padding">
                                                <navigator class="item-img-a" :url="urlFormat(module.pic_list[2].pic_link)">
                                                    <!-- <image lazy-load class="item-img" :src="imageFormat(module.pic_list[2]?.pic_url)" mode=""></image> -->
                                                    <tigImage class="item-img" v-model:src="module.pic_list[2].pic_url"></tigImage>
                                                </navigator>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </template>
                            <template v-else-if="module.pic_type == 7">
                                <view class="image-square-layout2">
                                    <view class="image-ad-item">
                                        <view class="item-content" :style="format.img_padding">
                                            <navigator class="item-img-a" :url="urlFormat(module.pic_list[0].pic_link)">
                                                <!-- <image lazy-load class="item-img" :src="imageFormat(module.pic_list[0]?.pic_url)" mode="widthFix"></image> -->
                                                <tigImage class="item-img" v-model:src="module.pic_list[0].pic_url" mode="widthFix"></tigImage>
                                            </navigator>
                                        </view>
                                    </view>
                                    <view class="grid-layout-2">
                                        <view class="image-ad-item">
                                            <view class="item-content" :style="format.img_padding">
                                                <navigator class="item-img-a" :url="urlFormat(module.pic_list[1].pic_link)">
                                                    <!-- <image lazy-load class="item-img" :src="imageFormat(module.pic_list[1]?.pic_url)" mode="widthFix"></image> -->
                                                    <tigImage class="item-img" v-model:src="module.pic_list[1].pic_url" mode="widthFix"></tigImage>
                                                </navigator>
                                            </view>
                                        </view>
                                        <view class="image-ad-item">
                                            <view class="item-content" :style="format.img_padding">
                                                <navigator class="item-img-a" :url="urlFormat(module.pic_list[2].pic_link)">
                                                    <!-- <image lazy-load class="item-img" :src="imageFormat(module.pic_list[2]?.pic_url)" mode="widthFix"></image> -->
                                                    <tigImage class="item-img" v-model:src="module.pic_list[2].pic_url" mode="widthFix"></tigImage>
                                                </navigator>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </template>
                            <template v-else-if="module.pic_type == 6">
                                <view class="image-square-layout image-square-layout3 image-square-layout-height2">
                                    <view class="image-ad-item">
                                        <view class="item-content" :style="format.img_padding">
                                            <navigator class="item-img-a" :url="urlFormat(module.pic_list[0].pic_link)">
                                                <!-- <image lazy-load class="item-img" :src="imageFormat(module.pic_list[0]?.pic_url)" mode=""></image> -->
                                                <tigImage class="item-img" v-model:src="module.pic_list[0].pic_url"></tigImage>
                                            </navigator>
                                        </view>
                                    </view>
                                    <view class="grid-layout-2">
                                        <view>
                                            <view class="image-ad-item">
                                                <view class="item-content" :style="format.img_padding">
                                                    <navigator class="item-img-a" :url="urlFormat(module.pic_list[1].pic_link)">
                                                        <!-- <image lazy-load class="item-img" :src="imageFormat(module.pic_list[1]?.pic_url)" mode=""></image> -->
                                                        <tigImage class="item-img" v-model:src="module.pic_list[1].pic_url" mode="widthFix"></tigImage>
                                                    </navigator>
                                                </view>
                                            </view>
                                        </view>
                                        <view class="grid-layout-3">
                                            <view class="image-ad-item">
                                                <view class="item-content" :style="format.img_padding">
                                                    <navigator class="item-img-a" :url="urlFormat(module.pic_list[2].pic_link)"
                                                        ><image lazy-load class="item-img" :src="imageFormat(module.pic_list[2]?.pic_url)" mode="widthFix"></image
                                                    ></navigator>
                                                </view>
                                            </view>
                                            <view class="image-ad-item">
                                                <view class="item-content" :style="format.img_padding">
                                                    <navigator class="item-img-a" :url="urlFormat(module.pic_list[3].pic_link)">
                                                        <tigImage class="item-img" v-model:src="module.pic_list[3].pic_url" mode="widthFix"></tigImage>
                                                    </navigator>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </template>
                            <template v-else>
                                <view :class="'image-square-layout-' + module.pic_type + ' image-square-layout-height1'">
                                    <view class="image-ad-item" v-for="(pic, key) in module.pic_list" :key="key">
                                        <view class="item-content" :style="format.img_padding">
                                            <view class="item-img-a" :url="pic.pic_link ? pic.pic_link.link : ''">
                                                <tigImage class="item-img" v-model:src="pic.pic_url" mode="widthFix"></tigImage>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </template>
                        </template>
                    </view>
                </view>
            </template>
        </view>
    </view>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { imageFormat, urlFormat } from "@/utils/format";
import { formatFrame } from "@/components/modules";
import commonTitle from "@/components/modules/commonTitle/index.vue";
const props = defineProps({
    module: {
        type: Object,
        default: () => {}
    }
});
const { frame } = props.module;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
const format = computed(() => {
    return {
        img_padding: "padding:" + props.module.img_padding + "px;"
    };
});
</script>
<style lang="scss" scoped>
.image-ad-item {
    height: 100%;
    width: 100%;
}
.item-content {
    height: 100%;
    width: 100%;
}
.item-img-a {
    height: 100%;
    width: 100%;
}
.item-img {
    height: 100%;
    width: 100%;
}
.image-square-layout-height1 {
    width: 100%;
}
.image-square-layout-height2 {
    height: 500rpx;
    width: 100%;
}

.image-square-layout-1 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.image-square-layout-2 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.image-square-layout-3 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.image-square-layout-4 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);

    .image-ad-item:nth-child(2) {
        grid-column: 1 / 2;
    }
    .image-ad-item:nth-child(3) {
        grid-row: 1 / 2;
        grid-column: 2 / 2;
    }
}

.image-square-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    & .grid-layout-2 {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
    }

    &.image-square-layout3 {
        & .grid-layout-3 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }
}

.image-square-layout2 {
    & .grid-layout-2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
