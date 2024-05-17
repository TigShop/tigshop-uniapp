<template>
    <view style="height: 100%">
        <block v-for="(module, index) in modules" :key="index">
            <block v-if="module.type == 'search_bar'">
                <searchBar :module="module.module"></searchBar>
            </block>

            <block v-if="module.type == 'cat_nav'">
                <catNav :module="module.module" :scrollTop="scrollTop" @change-cat-nav="onChangeCatNav"></catNav>
            </block>

            <block v-if="module.type == 'notice' && showCatNav == 0">
                <notice :module="module.module"></notice>
            </block>

            <block v-if="module.type == 'title_ad' && showCatNav == 0">
                <titleAd :module="module.module"></titleAd>
            </block>

            <block v-if="module.type == 'image_ad' && showCatNav == 0">
                <imageAd :module="module.module"></imageAd>
            </block>

            <block v-if="module.type == 'image_nav' && showCatNav == 0">
                <imageNav :module="module.module"></imageNav>
            </block>

            <block v-if="module.type == 'coupon' && showCatNav == 0">
                <coupon :module="module.module"></coupon>
            </block>

            <block v-if="module.type == 'seckill' && showCatNav == 0">
                <seckill :module="module.module"></seckill>
            </block>
            <block v-if="module.type == 'white_blank' && showCatNav == 0">
                <whiteBlank :module="module.module"></whiteBlank>
            </block>

            <block v-if="module.type == 'white_line' && showCatNav == 0">
                <whiteLine :module="module.module"></whiteLine>
            </block>

            <block v-if="module.type == 'image_square_ad' && showCatNav == 0">
                <imageSquareAd :module="module.module"></imageSquareAd>
            </block>

            <block v-if="module.type == 'image_hotarea' && showCatNav == 0">
                <imageHotarea :module="module.module"></imageHotarea>
            </block>

            <block v-if="module.type == 'product' && showCatNav == 0">
                <product :module="module.module" :module_index="module.module_index"></product>
            </block>
        </block>

        <block v-if="showCatNav == 1 && loading == false">
            <block v-if="imgUrl?.length > 0">
                <view class="bannerBox" :style="'background: ' + currentColor + ';'">
                    <view class="bannerWrap">
                        <view class="swiper-wrapper">
                            <swiper
                                :current="current"
                                :indicator-dots="false"
                                :autoplay="true"
                                :circular="true"
                                interval="3000"
                                duration="500"
                                indicator-color="rgba(255,255,255,0.6)"
                                indicator-active-color="#fff"
                            >
                                <block v-for="(item, index) in imgUrl" :key="index">
                                    <swiper-item>
                                        <view class="swiper-slide">
                                            <tigImage class="pictrue pic-btn" v-model:src="item.pic_url"> </tigImage>
                                        </view>
                                    </swiper-item>
                                </block>
                            </swiper>
                        </view>
                    </view>
                </view>
            </block>

            <block v-if="childCatInfo?.length > 0">
                <view class="categoryBox" :style="'background: ' + currentColor + ';'">
                    <view class="categoryWrap">
                        <block v-for="(item, index) in childCatInfo" :key="index">
                            <view class="item" v-if="index < 10">
                                <navigator :url="'/pages/goods_search/index?category=' + item.category_id + '&title=' + item.category_name">
                                    <!-- <image lazy-load  :src="item.category_pic"></image> -->
                                    <tigImage v-model:src="item.category_pic"></tigImage>
                                    <view class="txt">{{ item.category_name }}</view>
                                </navigator>
                            </view>
                        </block>
                    </view>
                </view>
            </block>

            <block v-if="brandInfo?.length > 0">
                <view class="brandBox">
                    <view class="brandWrap">
                        <block v-for="(brand, index) in brandInfo" :key="index">
                            <view class="item" v-if="index < 8">
                                <view class="itemWrap">
                                    <navigator :url="'/pages/goods_search/index?brand=' + brand.brand_id + '&title=' + brand.brand_name">
                                        <!-- <image lazy-load  :src="imageFormat(brand.brand_logo)"></image> -->
                                        <tigImage v-model:src="brand.brand_logo"></tigImage>
                                        <view class="txt">{{ brand.brand_name }}</view>
                                    </navigator>
                                </view>
                            </view>
                        </block>
                    </view>
                </view>
            </block>
        </block>
    </view>
</template>

<script lang="ts" setup>
import searchBar from "@/components/modules/searchBar/index.vue";
import catNav from "@/components/modules/catNav/index.vue";
import notice from "@/components/modules/notice/index.vue";
import titleAd from "@/components/modules/titleAd/index.vue";
import imageAd from "@/components/modules/imageAd/index.vue";
import whiteBlank from "@/components/modules/whiteBlank/index.vue";
import whiteLine from "@/components/modules/whiteLine/index.vue";
import imageSquareAd from "@/components/modules/imageSquareAd/index.vue";
import imageNav from "@/components/modules/imageNav/index.vue";
import coupon from "@/components/modules/coupon/index.vue";
import seckill from "@/components/modules/seckill/index.vue";
import imageHotarea from "@/components/modules/imageHotarea/index.vue";
import product from "@/components/modules/product/index.vue";
import { ref } from "vue";

interface Props {
    modules: any[];
    scrollTop: number;
}
const props = defineProps<Props>();
const emit = defineEmits(["load-goods-list"]);
const showCatNav = ref(0);
const cat_id = ref(0);
const loading = ref(false);
const loadend = ref(false);
const current = "";

interface CatNav {
    id: number;
    category_id: number;
    show_cat_nav: number;
    cat_color: string;
    child_cat_info: any[];
    brand_info: any[];
    img_url: any[];
}

const childCatInfo = ref();
const brandInfo = ref();
const imgUrl = ref();
const currentColor = ref("");

const onChangeCatNav = async (data: CatNav) => {
    const { category_id, cat_color } = data;
    if (category_id === cat_id.value) return;
    cat_id.value = category_id;
    loading.value = true;
    loadend.value = false;
    showCatNav.value = 0;
    if (cat_id.value > 0) {
        showCatNav.value = 1;
        loading.value = false;
        currentColor.value = cat_color;
    }
    emit("load-goods-list", category_id);
};
</script>
<style>
@import "../../static/css/modules.css";
</style>
