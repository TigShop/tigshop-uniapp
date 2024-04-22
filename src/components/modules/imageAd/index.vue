<template>
    <div
        :class="
            'module-ad-con module-image_ad ' +
            ' ad-pic_type__' +
            module.pic_type +
            ' ad-pic_page_type__' +
            module.pic_page_type +
            ' ad-radio_style__' +
            module.pic_radio_style +
            ' '
        "
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom"
    >
        <view class="module-ad-content" :style="module.background_color + module.box_radius">
            <commonTitle v-if="module.title.show_title" :module="module.title"></commonTitle>
            <block v-if="module.pic_type == 2">
                <view class="image-ad-warp" :style="frameFormat.inner_padding">
                    <view class="image-ad-con">
                        <Swiper :swiperOption="swiperOption" v-model="module.pic_list">
                            <template v-slot:default="{ item }">
                                <div class="image-ad-item">
                                    <div class="item-content" :style="format.img_padding">
                                        <div class="item-img-a" :url="item.pic_link ? item.pic_link.link : ''">
                                            <image lazy-load  class="item-img" :src="imageFormat(item.pic_url)" mode="widthFix"></image>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Swiper>
                    </view>
                </view>
            </block>
            <block v-else>
                <div class="image-ad-warp" :style="frameFormat.inner_padding">
                    <div class="image-ad-con">
                        <template v-if="module.pic_list" v-for="(pic, key) in module.pic_list">
                            <div class="image-ad-item">
                                <div class="item-content" :style="format.img_padding">
                                    <div class="item-img-a" :url="pic.pic_link ? pic.pic_link.link : ''">
                                        <image lazy-load  class="item-img" :src="imageFormat(pic.pic_url)" mode="widthFix"></image>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </block>
        </view>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import commonTitle from "@/components/modules/commonTitle/index.vue";
import { formatFrame } from "@/components/modules";
import { imageFormat } from "@/utils/format";
import Swiper from "@/components/Swiper/index.vue";
// 在modules加入要使用的模块
import "swiper/css";
import "swiper/css/pagination"; // 轮播图底面的小圆点
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
        img_padding: "padding:" + props.module?.img_padding + "px;"
    };
});
const swiperPageColor = computed(() => {
    return props.module.swiper_page_color || "#333";
});

const swiperOption = ref<any>({
    autoplay: {
        delay: 3000,
        disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay
        pauseOnMouseEnter: true //鼠标置于swiper是否时暂停自动切换
    },
    pagination: {
        clickable: true
    }
});
</script>
<style lang="scss" scoped>
@import "../../../static/css/modules.css";
/*图片类型*/
:deep(.swiper-pagination-bullet-active) {
    background: v-bind("swiperPageColor") !important;
}

.module-image_ad .module-ad-content {
    overflow: hidden;
}
.image-ad-warp {
    position: relative;
}
.image-ad-warp .image-ad-con {
    display: flex;
    flex-wrap: wrap;
}
.image-ad-warp .image-ad-con .image-ad-item .item-img {
    width: 100%;
    height: 100%;
}
.ad-pic_type__1 .image-ad-warp .image-ad-con {
    flex-wrap: wrap;
}
.ad-pic_type__1 .image-ad-warp .image-ad-con .image-ad-item {
    width: 100%;
}

.ad-pic_type__2 .image-ad-warp {
    overflow: hidden;
    height: 100%;
}
.ad-pic_type__2 .image-ad-warp .image-ad-con {
    display: block;
    flex-wrap: nowrap;
    padding: 0 !important;
    height: 100%;
}
.ad-pic_type__2 .image-ad-warp swiper {
    height: 100%;
    position: relative;
    overflow: hidden;
}
.ad-pic_type__2 .image-ad-warp .image-ad-con .image-ad-item {
    flex: none;
    width: 100%;
    height: 100%;
}
.ad-pic_type__2 .image-ad-warp .image-ad-con .image-ad-item .item-content {
    height: 100%;
}
.ad-pic_type__2 .image-ad-warp .image-ad-con .item-img-a {
    border-radius: 16rpx;
    overflow: hidden;
    display: block;
    height: 100%;
}

.ad-pic_type__2.ad-pic_page_type__1 .image-ad-warp .swiper-pagination-con {
    position: absolute;
    bottom: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.ad-pic_type__2.ad-pic_page_type__1 .image-ad-warp .swiper-pagination {
    display: inline-block;
    width: 24rpx;
    border-radius: 0;
    height: 4rpx;
    margin: 0 2rpx;
    background: #000;
    opacity: 0.2;
}
.ad-pic_type__2.ad-pic_page_type__1 .image-ad-warp .swiper-pagination.active {
    opacity: 1;
    background-color: #fff;
}
.ad-pic_type__2.ad-pic_page_type__2 .image-ad-warp .swiper-pagination-con {
    position: absolute;
    bottom: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.ad-pic_type__2.ad-pic_page_type__2 .image-ad-warp .swiper-pagination {
    margin: 0 6rpx;
    background: #333;
    width: 12rpx;
    height: 12rpx;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: 0.2;
}
.ad-pic_type__2.ad-pic_page_type__2 .image-ad-warp .swiper-pagination.active {
    opacity: 1;
}
.ad-pic_type__2.ad-pic_page_type__3 .image-ad-warp .swiper-pagination-con {
    text-align: center;
    right: 0;
    position: absolute;
    width: 110rpx;
    bottom: 20rpx;
}
.ad-pic_type__2.ad-pic_page_type__3 .image-ad-warp .swiper-pagination {
    position: absolute;
    text-align: center;
    z-index: 10;
    bottom: 0;
    left: 0;
    width: 100%;
}
.ad-pic_type__2.ad-pic_page_type__3 .image-ad-warp .swiper-pagination {
    text-align: right;
    background: #000;
    opacity: 0.3;
    border-radius: 200rpx;
    padding: 2rpx 10rpx;
    display: inline-block;
    width: auto;
    color: #fff;
    font-size: 24rpx;
}

.ad-pic_type__3 .image-ad-warp {
    overflow: hidden;
}
.ad-pic_type__3 .image-ad-warp .image-ad-con {
    flex-wrap: nowrap;
    overflow-x: scroll;
    margin-bottom: -40rpx;
    padding-bottom: 40rpx !important;
    -webkit-overflow-scrolling: touch;
}
.ad-pic_type__3 .image-ad-warp .image-ad-con .image-ad-item {
    flex: none;
    width: 80%;
}
.ad-pic_type__4 .image-ad-warp {
    overflow: hidden;
}
.ad-pic_type__4 .image-ad-warp .image-ad-con {
    flex-wrap: nowrap;
    overflow-x: scroll;
    margin-bottom: -40rpx;
    padding-bottom: 40rpx !important;
    -webkit-overflow-scrolling: touch;
}
.ad-pic_type__4 .image-ad-warp .image-ad-con .image-ad-item {
    flex: none;
    width: 40%;
}
.ad-pic_type__5 .image-ad-warp .image-ad-con {
    flex-wrap: wrap;
}
.ad-pic_type__5 .image-ad-warp .image-ad-con .image-ad-item {
    width: 50%;
}
.ad-pic_type__6 .image-ad-warp .image-ad-con {
    flex-wrap: wrap;
}
.ad-pic_type__6 .image-ad-warp .image-ad-con .image-ad-item {
    width: 33.33333%;
}
.ad-pic_type__7 .image-ad-warp .image-ad-con {
    flex-wrap: wrap;
}
.ad-pic_type__7 .image-ad-warp .image-ad-con .image-ad-item {
    width: 25%;
}
.ad-radio_style__2 .image-ad-warp .image-ad-con .item-img-a {
    border-radius: 16rpx;
    overflow: hidden;
    display: block;
    height: 100%;
}

</style>
