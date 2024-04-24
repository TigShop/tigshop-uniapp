<template>
    <view style="height: 100%">
        <view class="preview-box" v-if="configStore.previewId > 0">
            <view class="container">预览：&emsp;<text>移动端</text></view>
        </view>
        <view v-if="configStore.previewId > 0" style="padding: 58rpx;"></view>
        <navbar :parameter="parameter" :logoUrl="logoUrl || ''" v-if="showCatNav == 0"></navbar>
        <view>
            <view class="index_empty" v-if="loading">
                <image lazy-load  src="/static/images/common/index_empty.png" mode="widthFix"></image>
            </view>
            <view class="index" v-else>
                <view class="decorate-page-window">
                    <modules :modules="modulesData" :scrollTop="scrollTop" @load-goods-list="loadGoodsList"></modules>
                </view>
            </view>
            <!-- 加载商品模块 -->
            <view class="goods-container" v-if="categoryId > 0">
                <masonry :commodityList="commodityList"></masonry>
            </view>
            <view class="bottomLoading" v-if="bottomLoading && categoryId > 0"><image lazy-load  class="loading" src="/static/images/common/loading.gif"></image></view>
            <view v-if="loadend && categoryId > 0" class="noMore">没有更多了~</view>
        </view>
        <tabbar></tabbar>
        <tigBackTop v-if="scrollTop > 100"></tigBackTop>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onReachBottom, onPageScroll, onHide, onShow, onPullDownRefresh } from "@dcloudio/uni-app";
import { getIndex } from "@/api/home/home";
import modules from "@/components/modules/index.vue";
import navbar from "@/components/navbar/index.vue";
import masonry from "@/components/masonry/masonry.vue";
import tigBackTop from '@/components/tigBackTop/index.vue'
import { getCateProduct } from "@/api/home/home";
import type { GetProductFilterResult } from "@/types/home/home";
import { useConfigStore } from "@/store/config";

const configStore = useConfigStore()

const showCatNav = ref(0);
const parameter = ref({
    navbar: "1",
    title: "",
    class: "",
    color: false,
    return: "0"
});
const logoUrl = "";
const loading = ref(false);
const modulesData = ref<any[]>([]);
const scrollTop = ref(0);
onPageScroll((e) => {
    scrollTop.value = e.scrollTop;
});
const categoryId = ref(0);
const page = ref(1);
const loadend = ref(false);
const bottomLoading = ref(false);
const commodityList = ref<GetProductFilterResult[]>([]);

const loadGoodsList = (category_id: number) => {
    categoryId.value = category_id;
    if (categoryId.value === 0) return;
    page.value = 1;
    loadend.value = false;
    commodityList.value = [];
    getProductList();
};
const getProductList = async () => {
    bottomLoading.value = true;
    try {
        const result = await getCateProduct({ category_id: categoryId.value, page: page.value });
        if (result.filter_result.length > 0) {
            commodityList.value = [...commodityList.value, ...result.filter_result];
            loadend.value = false;
        } else {
            loadend.value = true;
        }
    } catch (error) {
        console.error(error);
    } finally {
        bottomLoading.value = false;
    }
};

const getIndexData = async () => {
    loading.value = true;
    try {
        const res = await getIndex();
        modulesData.value = res.module_list;
        showCatNav.value = 1;
        uni.stopPullDownRefresh();
        console.log("modulesData.value=>", modulesData.value);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

onLoad((options: any) => {
    if (options && options.preview_id) {
        configStore.previewId = options.preview_id;
    }
    getIndexData();
});
onPullDownRefresh(() => {
    categoryId.value = 0;
    getIndexData();
});
onReachBottom(() => {
    if (categoryId.value > 0 && !loading.value && !loadend.value) {
        page.value++;
        getProductList();
    }
});
onShow(() => {
    uni.hideTabBar();
});
onHide(() => {
    scrollTop.value = 0;
});
</script>
<style lang="scss" scoped>
.preview-box {
    padding: 40rpx;
    background-color: #fff;
    border-bottom: 1px solid #ebeef5;
    position: fixed;
    width: 100%;
    z-index: 999;
    left: 0;
    top: 0;
}
.preview-box text {
    position: relative;
    display: inline-block;
    font-size: 28rpx;
}
.preview-box text::after {
    content: "";
    position: absolute;
    top: 50rpx;
    left: 0;
    width: 100%;
    height: 4rpx;
    background-color: #155bd4;
}

page {
    background-color: #f6f6f6 !important;
}

:deep(.van-back-top) {
    background-color: #fff;
}

.line-through {
    text-decoration: line-through;
}
.index_empty {
    padding-bottom: 200rpx;
    background: #fff;
}
.index_empty image {
    width: 100%;
}
.index .index-bg {
    width: 100%;
    height: 350rpx;
    position: relative;
}
.index .index-bg swiper {
    height: 100%;
    position: relative;
    overflow: hidden;
    z-index: 2;
}
.index .index-bg .slide-navigator {
    height: 100%;
    padding: 0 30rpx;
}
.index .dist_s {
    height: 401rpx;
    position: absolute;
    top: -300rpx;
    left: 0;
    width: 100%;
    background-color: #fc4141;
}
.index .dist_base {
    height: 150rpx;
    position: absolute;
    top: 100rpx;
    left: 0;
    width: 100%;
    overflow: hidden;
}
.index .dist_base:after {
    position: absolute;
    left: -10%;
    right: -10%;
    bottom: 0rpx;
    z-index: -1;
    content: "";
    height: 150rpx;
    border-radius: 0 0 100% 100%;
    background-color: #fc4141;
}
.index .index-bg .slide-navigator .slide-image {
    width: 100%;
    height: 100%;
    border-radius: 15rpx;
}
.index .index-bg .wx-swiper-dot {
    width: 20rpx;
    height: 5rpx;
    border-radius: 3rpx;
}
.index .index-bg .wx-swiper-dots.wx-swiper-dots-horizontal {
    margin-bottom: 5rpx;
}
.index .nav {
    padding-top: 26rpx;
}
.index .nav .item {
    width: 25%;
    text-align: center;
    font-size: 26rpx;
    margin-bottom: 35rpx;
}
.index .nav .item .pictrue {
    width: 90rpx;
    height: 90rpx;
    margin: 0 auto 15rpx auto;
}
.index .nav .item .pictrue image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.index .news {
    height: 77rpx;
    border-top: 1rpx solid #f4f4f4;
    padding: 0 30rpx;
    box-shadow: 0 10rpx 30rpx #f5f5f5;
}
.index .news .pictrue {
    width: 124rpx;
    height: 28rpx;
    border-right: 1rpx solid #ddd;
    padding-right: 23rpx;
    box-sizing: content-box;
}
.index .news .pictrue image {
    width: 100%;
    height: 100%;
}
.index .news .swiperTxt {
    width: 523rpx;
    height: 100%;
    line-height: 77rpx;
    overflow: hidden;
}
.index .news .swiperTxt .text {
    width: 480rpx;
}
.index .news .swiperTxt .text .label {
    font-size: 20rpx;
    color: #ff4c48;
    width: 64rpx;
    height: 30rpx;
    border-radius: 40rpx;
    text-align: center;
    line-height: 28rpx;
    border: 2rpx solid #ff4947;
}
.index .news .swiperTxt .text .newsTitle {
    width: 397rpx;
    font-size: 24rpx;
    color: #666;
}
.index .news .swiperTxt .iconfont {
    font-size: 28rpx;
    color: #888;
}
.index .news .swiperTxt swiper {
    height: 100%;
}
.index .specialArea {
    padding: 30rpx;
}
.index .specialArea .assemble {
    width: 260rpx;
    height: 260rpx;
    position: relative;
}
.index .specialArea .assemble image {
    width: 100%;
    height: 100%;
    border-radius: 5rpx;
}
.index .specialArea .assemble .text {
    position: absolute;
    top: 37rpx;
    left: 22rpx;
}
.index .specialArea .name {
    font-size: 30rpx;
    color: #fff;
}
.index .specialArea .infor {
    font-size: 22rpx;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 5rpx;
}
.index .specialArea .list {
    height: 260rpx;
    width: 416rpx;
}
.index .specialArea .item {
    width: 100%;
    height: 124rpx;
    position: relative;
}
.index .specialArea .item image {
    width: 100%;
    height: 100%;
}
.index .specialArea .item .text {
    position: absolute;
    top: 23rpx;
    left: 28rpx;
}
.index .wrapper .title {
    border-top: 1rpx solid #eee;
    padding-top: 34rpx;
    margin: 0 30rpx;
}
.index .wrapper .title .text {
    font-size: 24rpx;
    color: #999;
    width: 530rpx;
}
.index .wrapper .title .text .name {
    color: #282828;
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 5rpx;
    position: relative;
}
.index .wrapper .title .text .name .new {
    position: absolute;
    top: 2rpx;
    left: 130rpx;
    font-size: 16rpx;
    font-weight: bold;
}
.index .wrapper .title .more {
    font-size: 26rpx;
    color: #333;
}
.index .wrapper .title .more .iconfont {
    margin-left: 9rpx;
    font-size: 26rpx;
    vertical-align: 3rpx;
}
.index .wrapper .scroll-product {
    white-space: nowrap;
    margin-top: 38rpx;
    padding: 0 30rpx 37rpx 30rpx;
}
.index .wrapper .scroll-product .item {
    width: 180rpx;
    display: inline-block;
    margin-right: 19rpx;
    border-bottom: 4rpx solid #47b479;
    box-shadow: 0 40rpx 30rpx -10rpx #eee;
}
.index .wrapper .scroll-product .item:nth-of-type(3n) {
    border-bottom: 4rpx solid #ff6960;
}
.index .wrapper .scroll-product .item:nth-of-type(3n-1) {
    border-bottom: 4rpx solid #579afe;
}
.index .wrapper .scroll-product .item:nth-last-child(1) {
    margin-right: 0;
}
.index .wrapper .scroll-product .item .goods-item {
    width: 100%;
    height: 180rpx;
}
.index .wrapper .scroll-product .item .goods-item image {
    width: 100%;
    height: 100%;
    border-radius: 6rpx 6rpx 0 0;
}
.index .wrapper .scroll-product .item .pro-info {
    font-size: 24rpx;
    color: #282828;
    text-align: center;
    height: 60rpx;
    line-height: 60rpx;
    border: 1rpx solid #f5f5f5;
    border-bottom: 0;
    border-top: 0;
    padding: 0 10rpx;
}
.index .wrapper .boutique {
    width: 690rpx;
    height: 300rpx;
    margin: 28rpx auto 0 auto;
}
.index .wrapper .boutique swiper {
    width: 100%;
    height: 100%;
    position: relative;
}
.index .wrapper .boutique image {
    width: 100%;
    height: 260rpx;
}
.index .wrapper .boutique .wx-swiper-dot {
    width: 7rpx;
    height: 7rpx;
    border-radius: 50%;
}
.index .wrapper .boutique .wx-swiper-dot-active {
    width: 20rpx;
    border-radius: 5rpx;
}
.index .wrapper .boutique .wx-swiper-dots.wx-swiper-dots-horizontal {
    margin-bottom: -8rpx;
}
.index .hotList .hot-bg {
    width: 100%;
    height: 215rpx;
    background-image: url("data:image/png;base64,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");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    color: #fff;
    margin-top: 15rpx;
}
.index .hotList .hot-bg .title {
    height: 87rpx;
}
.index .hotList .hot-bg .title .text {
    width: 575rpx;
}
.index .hotList .hot-bg .title .text .label {
    font-size: 30rpx;
    font-weight: bold;
    margin-right: 20rpx;
}
.index .hotList .hot-bg .title .more {
    font-size: 26rpx;
}
.index .hotList .hot-bg .title .more .iconfont {
    font-size: 25rpx;
    vertical-align: 2rpx;
    margin-left: 10rpx;
}
.index .hotList .list {
    width: 690rpx;
    height: 330rpx;
    border-radius: 20rpx;
    background-color: #fff;
    margin: -128rpx auto 0 auto;
    padding: 0 22rpx;
    box-sizing: border-box;
    box-shadow: 0 0 30rpx -10rpx #aaa;
}
.index .hotList .list .item {
    width: 200rpx;
}
.index .hotList .list .item ~ .item {
    margin-left: 22rpx;
}
.index .hotList .list .item .pictrue {
    width: 100%;
    height: 200rpx;
    position: relative;
}
.index .hotList .list .item .pictrue image {
    width: 100%;
    height: 100%;
    border-radius: 10rpx;
}
.index .hotList .list .item .pictrue .numPic {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    position: absolute;
    top: 7rpx;
    left: 7rpx;
}
.index .hotList .list .item .name {
    font-size: 26rpx;
    color: #282828;
    margin-top: 12rpx;
}
.index .hotList .list .item .money {
    font-size: 20rpx;
    font-weight: bold;
    margin-top: 4rpx;
}
.index .hotList .list .item .money .num {
    font-size: 28rpx;
}
.index .adver {
    width: 100%;
    height: 180rpx;
    margin-top: 37rpx;
}
.index .adver image {
    width: 100%;
    height: 100%;
}
.index .wrapper .newProducts {
    white-space: nowrap;
    padding: 0 30rpx;
    margin: 35rpx 0 42rpx 0;
}
.index .wrapper .newProducts .item {
    display: inline-block;
    width: 240rpx;
    margin-right: 20rpx;
    border: 1rpx solid #eee;
    border-radius: 12rpx;
}
.index .wrapper .newProducts .item:nth-last-child(1) {
    margin-right: 0;
}
.index .wrapper .newProducts .item .goods-item {
    width: 100%;
    height: 240rpx;
}
.index .wrapper .newProducts .item .goods-item image {
    width: 100%;
    height: 100%;
    border-radius: 12rpx 12rpx 0 0;
}
.index .wrapper .newProducts .item .pro-info {
    font-size: 28rpx;
    color: #333;
    text-align: center;
    padding: 19rpx 10rpx 0 10rpx;
}
.index .wrapper .newProducts .item .money {
    padding: 0 10rpx 18rpx 10rpx;
    text-align: center;
    font-size: 26rpx;
    font-weight: bold;
}

.index .overseas_cat_wrapper {
    padding: 0 30rpx;
    margin-top: 20rpx;
}
.index .overseas_cat {
    padding: 30rpx 20rpx 30rpx;
    white-space: nowrap;
    background: #fff;
    border-radius: 15rpx;
}
.index .overseas_cat .flexbox {
    display: flex;
    flex-wrap: nowrap;
}
.index .overseas_cat .item {
    text-align: center;
    font-size: 24rpx;
    height: 100%;
    width: 20%;
    flex-shrink: 0;
}
.index .overseas_cat .item .goods-item {
    padding: 10rpx 0;
}
.index .overseas_cat .item .goods-item image {
    width: 60rpx;
    height: auto;
    height: 60rpx;
}
.index .overseas_cat .wx-swiper-dots.wx-swiper-dots-horizontal {
    margin-bottom: 5rpx;
    border-radius: 4rpx;
    overflow: hidden;
}
.index .overseas_cat .wx-swiper-dot {
    width: 30rpx;
    height: 5rpx;
    border-radius: 0;
    margin: 0;
    background: #ccc;
}

.index .overseas_cat .wx-swiper-dot-active {
    width: 30rpx;
    border-radius: 0;
    background: #e93323;
}

.index .overseas_cat_wrapper1 swiper {
    height: 320rpx;
}
.index .overseas_cat_wrapper1.min_height swiper {
    height: 165rpx;
}
.index .overseas_cat_wrapper2 swiper {
    height: 180rpx;
}
.index .overseas_cat_wrapper2.min_height swiper {
    height: 165rpx;
}
.index .overseas_cat_wrapper.no_page .overseas_cat .wx-swiper-dots.wx-swiper-dots-horizontal {
    display: none;
}

.index .recommend_wrapper {
    padding: 0 30rpx;
    margin-top: 20rpx;
    min-height: 800rpx;
}
.index .recommend_wrapper .title {
    padding: 20rpx 0;
}
.index .recommend_wrapper .title .text {
    font-size: 24rpx;
    color: #999;
}
.index .recommend_wrapper .title .text .name {
    color: #282828;
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 5rpx;
    display: inline-block;
}
.index .recommend_wrapper .title .text .desc {
    display: inline-block;
    padding-left: 20rpx;
}


/* 优惠券模块 */
.index .tmcscoupon {
    padding: 0;
    margin: 20rpx 30rpx;
    padding-bottom: 24rpx;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
    -webkit-border-radius: 12rpx;
    -moz-border-radius: 12rpx;
    border-radius: 15rpx;
    position: relative;
}
.index .tmcscoupon .coupon-header {
    padding: 24rpx 24rpx 0;
    margin-bottom: 20rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 44rpx;
}
.index .tmcscoupon .coupon-header .coupon-header_title {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.index .tmcscoupon .coupon-header .coupon-header_title .main_title {
    font-size: 32rpx;
    line-height: 32rpx;
    color: #2a3145;
    font-weight: 700;
}
.index .tmcscoupon .coupon-header .coupon-header_title .sub_title {
    margin-left: 16rpx;
    font-size: 24rpx;
    color: #aaa;
}
.index .tmcscoupon .coupon-header .coupon-header_more {
    font-size: 26rpx;
    color: #aaa;
}
.index .tmcscoupon .coupon-header .iconfont {
    font-size: 26rpx;
    vertical-align: 3rpx;
}
.index .tmcscoupon swiper {
    height: 140rpx;
}
.index .tmcscoupon .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 20rpx 20rpx 0 0;
}
.index .tmcscoupon .swiper-wrapper .flexbox {
    display: flex;
    flex-wrap: nowrap;
}
.index .tmcscoupon .tmcscoupon-item-1 {
    display: flex;
    _width: 50%;
    width: 312rpx;
    overflow: hidden;
    margin-left: 20rpx;
    height: 120rpx;
    overflow: hidden;
    background: #fff;
    -webkit-border-radius: 12rpx;
    -moz-border-radius: 12rpx;
    border-radius: 12rpx;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item {
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
    display: flex;
    position: relative;
    background: #fff5c5;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 120rpx;
    margin-left: 12rpx;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    min-width: 0;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m:after,
.tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m:before {
    content: "";
    position: absolute;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    width: 16rpx;
    height: 16rpx;
    background: #f7f7f7;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m:before {
    top: -8rpx;
    right: -8rpx;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m:after {
    bottom: -8rpx;
    right: -8rpx;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m .tmcscoupon-item_m-info {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: baseline;
    -webkit-align-items: baseline;
    -moz-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
    font-weight: 700;
    height: 70rpx;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m .tmcscoupon-item_m-info .item_m-info_tag {
    font-size: 28rpx;
    color: #2a3145;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m .tmcscoupon-item_m-info .item_m-info_price {
    font-size: 48rpx;
    color: #2a3145;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m .tmcscoupon-item_m-info .item_m-info_title {
    font-size: 24rpx;
    margin-left: 8rpx;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 0;
    color: #2a3145;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m .tmcscoupon-item_m-rule {
    font-size: 20rpx;
    color: #999;
    margin-top: 6rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_m .tmcscoupon-item_m-date {
    font-size: 20rpx;
    color: #999;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_r {
    width: 64rpx;
    height: 120rpx;
    color: #ff9400;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    font-size: 24rpx;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_r:before {
    content: "";
    height: 80rpx;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAABeAgMAAAB5il18AAAACVBMVEVHcEz/xy7/xi4WmQdzAAAAAnRSTlMAtc2YijsAAAAUSURBVAjXY9BggEARBhgQYRgiYgDQigepHfzaGwAAAABJRU5ErkJggg==);
    width: 4rpx;
    margin-left: -2rpx;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -40rpx;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
}
.index .tmcscoupon .tmcscoupon-item-1 .tmcscoupon-item .tmcscoupon-item_r .btn {
    width: 120rpx;
    height: 54rpx;
    background: #ff9400;
    -webkit-border-radius: 28rpx;
    -moz-border-radius: 28rpx;
    border-radius: 28rpx;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 28rpx;
    font-weight: 700;
    color: #fff;
}
/* 限时抢购 */
.rush-buy {
    background-color: #fff;
    border-radius: 15rpx;
    margin: 0 30rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.08);
}
.rush-buy .rush-head {
    display: flex;
    padding: 20rpx;
    position: relative;
}
.rush-buy .rush-head .head-tit {
    margin-right: 20rpx;
    line-height: 32rpx;
    color: #212121;
    font-size: 28rpx;
    font-weight: 700;
}
.rush-buy .rush-head .head-desc {
    width: 200rpx;
    font-size: 24rpx;
    vertical-align: middle;
    color: #999;
    overflow: hidden;
}
.rush-buy .rush-head .last-wrap {
    position: absolute;
    right: 20rpx;
}
.rush-buy .rush-head .last-wrap .seckill-time-div .cout_time {
    display: inline-block;
    width: 36rpx;
    height: 36rpx;
    line-height: 36rpx;
    border-radius: 10rpx;
    background-color: #333;
    color: #fff;
    font-size: 20rpx;
    text-align: center;
}
.rush-buy .rush-head .last-wrap .seckill-time-div .cout_format {
    display: inline-block;
    padding: 0 6rpx;
    height: 36rpx;
    line-height: 36rpx;
    text-align: center;
    font-size: 28rpx;
    color: #333;
    font-weight: 700;
}
/* 限时抢购商品样式 */
.goods-box-content {
    background: #fff;
    border-radius: 15rpx;
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    white-space: nowrap;
}
.goods-box-content .product-list {
    padding: 20rpx 0;
}
.goods-box-content .product-list .product-item {
    display: inline-block;
    width: 30%;
    font-size: 28rpx;
    vertical-align: top;
}
.goods-box-content .product-list .product-item.last {
    width: 66rpx;
    margin: 0;
}
.goods-box-content .product-list .product-item .product-box {
    display: block;
    width: 100%;
}
.goods-box-content .product-list .product-item .product-box .pic-wrap {
    background-color: #fff;
    padding: 16rpx;
}
.goods-box-content .product-list .product-item .product-box .pic-wrap .pic {
    position: relative;
    background-size: 120rpx auto;
}
.goods-box-content .product-list .product-item .product-box .pic-wrap .pic image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.goods-box-content .product-list .product-item .product-box .pic-wrap .pic .tag {
    font-size: 20rpx;
    color: #fff;
    background: #f23030;
    text-align: center;
    line-height: 22rpx;
    border: 1rpx solid #f23030;
    position: absolute;
    left: 0;
    top: -20rpx;
    display: block;
    width: 70rpx;
    height: 24rpx;
    border-radius: 14rpx 4rpx 14rpx 4rpx;
}
.goods-box-content .product-list .product-item .product-box .pic-wrap .pic::after {
    content: "";
    display: block;
    width: 100%;
    padding-top: 100%;
}
.goods-box-content .product-list .product-item .product-box .price-box {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-top: 20rpx;
}
.goods-box-content .product-list .product-item .product-box .now-price {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    line-height: 24rpx;
    overflow: hidden;
    text-align: center;
}
.goods-box-content .product-list .product-item .product-box .now-price .price {
    font-size: 24rpx;
}
.goods-box-content .product-list .product-item .product-box .market-price {
    font-size: 20rpx;
    color: #999;
}
.goods-box-content .product-list .product-item .product-box .reference {
    text-align: center;
    overflow: hidden;
}
.goods-box-content .product-list .product-item .product-box .reference .jayemart-buy {
    width: 45rpx;
    height: 45rpx;
}
.goods-box-content .product-list .product-item .product-box .reference .jayemart-buy image {
    width: 100%;
    height: 100%;
}
.goods-box-content .product-see-all {
    box-sizing: border-box;
    position: relative;
    width: 66rpx;
    height: 226rpx;
    padding: 20rpx;
    color: #95969f;
    font-size: 24rpx;
    line-height: 40rpx;
}
/* cat_goods2 */
.index .special-mod .special-mod-con {
    padding: 0 30rpx;
    margin-top: 20rpx;
}
.index .special-mod .special-mod-con .section {
    margin: 0 0 15rpx;
    -webkit-box-shadow: 0 10rpx 35rpx -5rpx rgba(0, 0, 0, 0.1);
    box-shadow: 0 10rpx 35rpx -5rpx rgba(0, 0, 0, 0.1);
    border-radius: 15rpx;
    overflow: hidden;
    overflow: hidden;
}
.index .special-mod .special-mod-con .area-conunter-banner {
    width: 100%;
}
.index .special-mod .special-mod-con image {
    width: 100%;
    height: 240rpx;
}
.index .special-mod .special-mod-con .special-mod-container {
    padding: 20rpx 20rpx 0;
    margin-top: -50rpx;
    border-top-left-radius: 30rpx;
    background: #fff;
    overflow: hidden;
    position: relative;
}
.index .special-mod .special-mod-con .special-mod-container swiper {
    height: 400rpx;
}
.index .special-mod .special-mod-con .special-mod-container .pro-flexbox {
    flex-wrap: nowrap;
    display: flex;
}
.index .special-mod .special-mod-con .special-mod-container .pro-item {
    width: 33.33%;
    overflow: hidden;
    font-size: 24rpx;
    height: 100%;
    flex-shrink: 0;
    padding: 10rpx;
    box-sizing: border-box;
}
.index .special-mod .special-mod-con .special-mod-container .pro-item .pro-txt {
    padding: 10rpx 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.index .special-mod .special-mod-con .special-mod-container .pro-item .pro-txt.pro-txt-small {
    font-size: 20rpx;
    color: #999;
    padding: 0;
}
.index .special-mod .wx-swiper-dots.wx-swiper-dots-horizontal {
    margin-bottom: 5rpx;
    border-radius: 4rpx;
    overflow: hidden;
}
.index .special-mod .wx-swiper-dot {
    width: 30rpx;
    height: 5rpx;
    border-radius: 0;
    margin: 0;
    background: #ccc;
}
.index .special-mod .wx-swiper-dot-active {
    width: 30rpx;
    border-radius: 0;
    background: #e93323;
}
.index .special-mod .special-mod-con .cat-default-tit {
    height: 120rpx;
    width: 100%;
    color: #fff;
    position: relative;
}
.index .special-mod .special-mod-con .cat-default-tit .name {
    color: #fff;
    padding: 16rpx 10rpx 0 20rpx;
    display: block;
    margin-left: 20rpx;
    line-height: 40rpx;
    position: relative;
    font-size: 26rpx;
    font-weight: bold;
}
.index .special-mod .special-mod-con .cat-default-tit .name text {
    position: absolute;
    left: 0;
    top: 22rpx;
    width: 6rpx;
    height: 28rpx;
    border-radius: 4rpx;
    background: #fff;
}
.index .special-mod .special-mod-con .cat-default-tit .more {
    position: absolute;
    right: 20rpx;
    top: 16rpx;
    color: #fff;
    font-size: 26rpx;
}
.index .special-mod .special-mod-con .cat-default-tit .more text {
    font-size: 26rpx;
}

.home_ads-1 {
    padding: 10rpx 30rpx 0;
}
.home_ads-1 image {
    overflow: hidden;
    border-radius: 15rpx;
    width: 690rpx;
    height: 230rpx;
    margin-top: 20rpx;
}
/*广告位*/
#m-board,
#m-channel,
#m-icon-entrance,
#m-life,
#m-often-buy,
#m-promo,
.home_ads,
.home_rec_goods,
.m-pop-entrance,
.m-special-mod-con {
    margin-left: 30rpx;
    margin-right: 30rpx;
}
#m-board,
#m-life,
#m-promo {
    border-radius: 15rpx;
}
#m-board .board-header,
#m-life .life-header,
.promo-header {
    padding-left: 14rpx !important;
}
#m-board .board-content,
#m-life .life-content,
.promo-content {
    padding: 0 14rpx 20rpx !important;
}
.board-header .h1,
.channel-header .h1,
.channel-item .h1,
.life-header .h1,
.promo-header .h1,
.social-header .h1 {
    font-size: 28rpx;
    white-space: nowrap;
}
/* mould 2 */
#m-promo {
    background-color: #fff;
    position: relative;
    margin-bottom: 18rpx;
}
#m-promo .promo-header .h1,
.promo-header text {
    display: inline-block;
    font-weight: 600;
}
#m-promo .promo-header .h1 {
    color: #333;
}
#m-promo .promo-header text {
    margin-left: 6rpx;
    color: #1b5;
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transform: scale(1.14285714);
    transform: scale(1.14285714);
}
#m-promo .promo-header {
    font-size: 28rpx;
    position: relative;
    padding: 4% 0 2.67% 4%;
    color: #666;
    line-height: 1.213;
    position: absolute;
    top: 0;
    margin-top: 0;
    z-index: 2;
    background: 0 0;
}
#m-promo .promo-content {
    overflow: hidden;
}
#m-promo .promo-content-brand {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin: 0 0 0.87%;
    margin-top: 78rpx;
}
#m-promo .promo-content-brand::before {
    content: "\20";
    padding-top: 43.19%;
    display: block;
}
#m-promo .promo-content-brand .scroller {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
#m-promo .promo-brand-item {
    display: block;
    width: 100%;
    height: 100%;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    position: relative;
}
#m-promo .promo-brand-item image {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
}
#m-promo .promo-content__item {
    overflow: hidden;
    width: 32.75%;
    float: left;
    position: relative;
}
#m-promo .promo-content__item::before {
    content: "\20";
    padding-top: 115.04%;
    display: block;
}
#m-promo .promo-content__item image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
#m-promo .promo-content__item:nth-of-type(2) {
    margin: 0 0.87%;
}
/* mould 3 */
#m-board {
    overflow: hidden;
    background: #fff;
    margin-bottom: 18rpx;
}
#m-board .board-header {
    background-color: #fff;
    font-size: 28r;
    padding: 4% 0 2.67% 4%;
    color: #666;
    line-height: 1.213;
    margin-top: 0 !important;
    position: relative;
}
#m-board .board-header text {
    margin-left: 6rpx;
    color: #1b5;
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transform: scale(1.14285714);
    transform: scale(1.14285714);
}
#m-board .board-header .h1,
.board-header text {
    display: inline-block;
    font-weight: 600;
}
#m-board .board-content {
    display: block;
    overflow: hidden;
}
#m-board .board-content swiper {
    height: 306rpx;
}
#m-board .board-content .board-content-flexbox {
    flex-wrap: nowrap;
    display: flex;
}
#m-board .board-exclusive {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    border-radius: 8rpx;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: -webkit-linear-gradient(310deg, #f9c279 0, #eb8d31 100%);
    background: linear-gradient(140deg, #f9c279 0, #eb8d31 100%);
    background-size: 100% auto !important;
    color: #fff;
    line-height: 1.231;
    padding: 4.93% 2.9% 4.35% 4.35%;
}
#m-board .board-exclusive-main {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
}
#m-board .board-exclusive-title {
    color: inherit;
    font-size: 32rpx;
    font-weight: 600;
}
#m-board .board-exclusive-desc {
    color: rgba(255, 255, 255, 0.9);
    font-size: 24rpx;
    font-weight: 400;
    margin-top: 4rpx;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
}
#m-board .board-exclusive-item {
    display: block;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 17.19%;
    background: #fff;
    overflow: hidden;
    border-radius: 4rpx;
    position: relative;
    margin-left: 1.56%;
}
#m-board .board-exclusive-item::before {
    content: "\20";
    padding-top: 123.64%;
    display: block;
}
#m-board .board-exclusive-item image {
    position: absolute;
    width: 100%;
    height: 80.88%;
    bottom: 0;
    left: 0;
    background-color: transparent;
}
#m-board .board-recommend {
    overflow: hidden;
    display: block;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    line-height: 1.231;
    width: 31.6%;
    position: relative;
    padding-right: 16rpx;
}
#m-board .board-recommend .board-recommend-bg {
    padding: 20rpx 0;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 8rpx;
}
#m-board .board-recommend-img {
    display: block;
    width: 87.16%;
    position: relative;
    margin: 0 auto 4.59%;
}
#m-board .board-recommend-img::before {
    content: "\20";
    padding-top: 100%;
    display: block;
}
#m-board .board-recommend-img image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
}
#m-board .board-recommend-img::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.03);
}
#m-board .board-recommend-main {
    bottom: 0;
    width: 100%;
}
#m-board .board-recommend-title {
    font-size: 28r;
    color: #9b775b;
    font-weight: 600;
    text-align: center;
}
#m-board .board-recommend-desc {
    color: #999;
    text-align: center;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    margin-top: 4rpx;
    -webkit-transform: scale(0.92);
    transform: scale(0.92);
}
#m-board .board-content-line--gap {
    margin-top: 2.61%;
}
/* mould 4 */
#m-life,
.life-header {
    background-color: #fff;
    position: relative;
}
#m-life {
    margin-bottom: 18rpx;
    overflow: hidden;
}
#m-life .life-header {
    font-size: 28rpx;
    padding: 4% 0 2.67% 4%;
    color: #666;
    line-height: 1.213;
    margin-top: 0 !important;
}
#m-life .life-header .h1,
.life-header text {
    display: inline-block;
    font-weight: 600;
}
#m-life .life-header text {
    margin-left: 6rpx;
    color: #1b5;
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transform: scale(1.14285714);
    transform: scale(1.14285714);
}
#m-life .life-content {
    display: block;
    overflow: hidden;
    position: relative;
}
#m-life .life-item {
    position: relative;
    z-index: 1;
    width: 31.3%;
    -webkit-flex-shrink: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    border-radius: 8rpx;
    overflow: hidden;
    float: left;
}
#m-life .life-item:nth-child(1),
.life-item:nth-child(3) {
    margin-bottom: 5.8%;
}
#m-life .life-img-wrapper {
    margin: 14rpx 28rpx;
    position: relative;
}
#m-life .life-img-wrapper::before {
    content: "\20";
    padding-top: 100%;
    display: block;
}
#m-life .life-img-wrapper image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
#m-life .life-item-title__content2 {
    position: absolute;
    top: 0;
    -webkit-transform: translate3d(0, -120%, 0);
    transform: translate3d(0, -120%, 0);
    will-change: transform opacity;
    opacity: 0.2;
    z-index: 1;
}
#m-life .life-item-title__content {
    color: #fff;
    text-align: center;
    width: 100%;
    height: 52rpx;
    line-height: 52rpx;
    font-size: 28rpx;
    font-weight: 600;
    will-change: opacity;
    -webkit-transition: opacity 0.15s ease;
    transition: opacity 0.15s ease;
}
#m-life .life-item--show-next .life-img-wrapper__img2,
#m-life .life-item--show-next .life-item-title__content2 {
    -webkit-animation: dropIn 0.72s both;
    animation: dropIn 0.72s both;
}
#m-life .life-item--show-next .life-item-title {
    background-color: #ff8356;
}
#m-life .life-item .life-item-title {
    background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), to(rgba(255, 255, 255, 0.45)));
    background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.45));
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.45));
    background-color: #ff7979;
    -webkit-transition: background-color 1.5s ease;
    transition: background-color 1.5s ease;
}
#m-life .life-item-title {
    position: relative;
    overflow: hidden;
    height: 52rpx;
}
#m-life .life-item::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8rpx;
    background-color: rgba(0, 0, 0, 0.03);
}
#m-life .life-item:nth-child(2) {
    margin: 0 2.9% 5.8%;
}
#m-life .life-item:nth-child(1),
.life-item:nth-child(3) {
    margin-bottom: 5.8%;
}
#m-life .life-item:nth-child(5) {
    margin: 0 2.9%;
}
#m-life .life-item--show-next .life-item-title {
    background-color: #ff8356;
}
#m-life .life-item--show-next:nth-child(2) .life-item-title {
    background-color: #ff75a5;
}
#m-life .life-item--show-next:nth-child(3) .life-item-title {
    background-color: #8795e5;
}
#m-life .life-item--show-next:nth-child(4) .life-item-title {
    background-color: #5bc9b3;
}
#m-life .life-item--show-next:nth-child(5) .life-item-title {
    background-color: #e1b798;
}
#m-life .life-item--show-next:nth-child(6) .life-item-title {
    background-color: #f9ae0d;
}

.home-bar-live {
    display: flex;
}
.home-bar-live .line {
    height: 30rpx;
    border-left: 1rpx solid #ddd;
    position: absolute;
    right: 0;
    top: 15rpx;
}
.home-bar-live .item {
    width: 50%;
    text-align: center;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 28rpx;
    position: relative;
    font-weight: bold;
}
.home-bar-live .item-live image {
    width: 50rpx;
    height: 50rpx;
    padding-left: 6rpx;
    vertical-align: middle;
    margin-top: -2rpx;
}
.home-bar-live .item .arrow {
    background: #fc4141;
    height: 5rpx;
    width: 40%;
    position: absolute;
    left: 30%;
    right: 30%;
    border-radius: 6rpx;
    bottom: 0rpx;
}

.live-list-warp {
    padding: 30rpx 30rpx 50rpx 30rpx;
    overflow: hidden;
}
.live-list .live-item {
    background: #fff;
    width: 335rpx;
    border-radius: 10rpx;
    float: left;
    height: 600rpx;
    overflow: hidden;
    position: relative;
    margin-bottom: 20rpx;
}
.live-list .live-item:nth-child(2n) {
    float: right;
}
.live-list .live-item .bg_img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}
.live-list .live-item .shadow_bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0) linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.1) 80%, #000000 130%) repeat scroll 0 0;
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
}
.live-list .live-item .live-content {
    position: absolute;
    bottom: 0;
    height: 100rpx;
    width: 100%;
    z-index: 3;
    color: #fff;
}
.live-list .live-item .live-content .title {
    font-size: 22rpx;
    padding-left: 15rpx;
    padding-bottom: 10rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 20rpx;
    overflow: hidden;
}
.live-list .live-item .live-content .name {
    font-size: 22rpx;
    padding-left: 15rpx;
}
.live-list .live-item .live-content .anchor_img {
    width: 40rpx;
    height: 40rpx;
    border-radius: 40rpx;
    border: 2rpx solid #fff;
    display: inline-block;
    margin-right: 10rpx;
    vertical-align: middle;
}
.live-list .live-item .live-status {
    position: absolute;
    top: 20rpx;
    left: 10rpx;
    z-index: 3;
}
.live-list .live-item .live-status .status-ico {
    background: #fc4141;
    color: #fff;
    padding: 0 10rpx 0 30rpx;
    height: 35rpx;
    line-height: 35rpx;
    font-size: 22rpx;
    position: relative;
}
.live-list .live-item .live-status .status-ico .status-dot {
    background: #fff;
    height: 10rpx;
    width: 10rpx;
    border-radius: 100%;
    left: 10rpx;
    top: 15rpx;
    position: absolute;
}
.live-list .live-item .live-status .status-ico.status-gray {
    background: #bbb;
}
.live-list .live-item .live-status .status-ico image {
    width: 15rpx;
    height: 15rpx;
    padding-left: 8rpx;
}

/*首页 - 底部推荐商品模块头部*/
.homeTopBar {
    width: 100%;
    height: 120rpx;
    overflow: hidden;
    position: relative;
}
.homeTopBar .title-box {
    display: flex;
    padding: 20rpx;
}
.homeTopBar .title-box.topnavFixed {
    position: fixed;
    width: 100%;
    height: 130rpx;
    top: 265rpx;
    background: #fff;
    z-index: 1;
}
.homeTopBar .title-box.topnavAbsolute {
    position: absolute;
    width: 100%;
    height: 130rpx;
    top: 0 !important;
    background: #fff;
    z-index: 1;
}
.homeTopBar .title-box .title {
    height: 120rpx;
    line-height: 60rpx;
    text-align: center;
    position: relative;
    font-size: 24rpx;
    flex: 1;
}
.homeTopBar .title-box .title .text-fit {
    white-space: nowrap;
}
.homeTopBar .title-box .title:last-child {
    margin-right: 0;
}
.homeTopBar .title-box .title .name {
    color: #333;
}
.homeTopBar .title-box .title.current .name {
    color: #f23030;
    font-size: 120% !important;
    font-weight: 500;
}
.homeTopBar .title-box .title .desc {
    font-size: 20rpx;
    height: 40rpx;
    line-height: 40rpx;
}
.homeTopBar .title-box .title.current .desc {
    background: linear-gradient(to right, #f23030, #f23030);
    color: #fff;
    border-radius: 0 20rpx 20rpx 20rpx;
}
/*首页 - 头条*/
.headlines-box {
    position: relative;
    height: 60rpx;
    margin: 10rpx 30rpx;
    background: #fff;
    border-radius: 18rpx;
}
.headlines-box .headlines-box-wrap {
    display: flex;
}
.headlines-box .headlines-img {
    width: 100%;
    height: 32rpx;
}
.headlines-box .headlines-left {
    width: 160rpx;
    min-width: 160rpx;
    margin-right: 20rpx;
    padding: 10rpx;
    height: 56rpx;
}
.headlines-box .headlines-right {
    width: 90%;
    height: 60rpx;
    line-height: 60rpx;
    overflow: hidden;
}
.headlines-box .headlines-link {
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 24rpx;
}
</style>
@/types/home/home
