<template>
    <view class="product-pic-con">
        <!-- <view v-if="false" class="outsale">售罄</view> -->
        <view class="product-bg" v-if="picList.length > 0">
            <swiper :indicator-dots="false" :circular="true" interval="3000" duration="500" @change="swiperChange">
                <block v-for="(item, index) in picList" :key="index">
                    <swiper-item>
                        <image lazy-load @click="swiperImagePreview(index)" :src="imageFormat(item.pic_url)" class="slide-image" />
                    </swiper-item>
                </block>
            </swiper>
            <view :class="'pages ' + (picList || productInfo?.pic_url ? 'show' : '')">
                <text>{{ currentPic }}</text>
                /{{ picList.length || 1 }}
            </view>
        </view>
        <view class="product-bg" v-if="picList.length == 0">
            <swiper :indicator-dots="false" :circular="true" interval="3000" duration="500">
                <swiper-item>
                    <image
                        lazy-load
                        @click="imagePreview(imageFormat(productInfo?.pic_url || ''))"
                        :src="imageFormat(productInfo?.pic_url || '')"
                        class="slide-image"
                    />
                </swiper-item>
            </swiper>
        </view>
        <slot></slot>
    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { imageFormat } from "@/utils/format";
import type { PicList, ProductItem } from "@/types/product/product";
import { onHide } from "@dcloudio/uni-app";
interface Iprops {
    picList: PicList[];
    productInfo: ProductItem;
}
const props = defineProps<Iprops>();
const currentPic = ref(1);
const swiperChange = (e: any) => {
    currentPic.value = e.detail.current + 1;
};
const swiperImagePreview = (index: number) => {
    const images = props.picList.map((item) => imageFormat(item.pic_url));
    uni.previewImage({
        current: images[index],
        urls: images
    });
};

const imagePreview = (url: string) => {
    uni.previewImage({
        urls: [url]
    });
};

onHide(() => {
    uni.closePreviewImage();
});
</script>

<style lang="scss" scoped>
.product-bg {
    width: 100%;
    height: 750rpx;
    position: relative;
    background: #fff;
}
.product-bg swiper {
    width: 100%;
    height: 100%;
    position: relative;
}
.product-bg .slide-image {
    width: 100%;
    height: 100%;
}
.product-bg .pages {
    visibility: hidden;
    transition: all 500ms ease-in-out 0s;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
    height: 40rpx;
    padding: 0 40rpx 0 30rpx;
    border-radius: 40rpx 0 0 40rpx;
    right: 0;
    bottom: 30rpx;
    line-height: 40rpx;
    font-size: 20rpx;
    color: #fff;
}
.product-bg .pages.show {
    visibility: visible;
}
.product-bg .pages text {
    font-weight: bold;
    font-size: 30rpx;
}
.product-bg .slide-navigator .slide-image {
    width: 100%;
    height: 100%;
    border-radius: 15rpx;
}
.product-bg .wx-swiper-dot {
    width: 20rpx;
    height: 5rpx;
    border-radius: 3rpx;
}
.product-bg .wx-swiper-dots.wx-swiper-dots-horizontal {
    margin-bottom: 5rpx;
}

.product-pic-con {
    height: 750rpx;
    width: 750rpx;
    position: relative;
    background: #f2f2f2;
}
</style>
