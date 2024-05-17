<template>
    <view :class="'module-ad-con  module-store_info ad-store_style__' + module.style">
        <view class="module-ad-content">
            <view class="cap-store-banner">
                <view class="cap-store-banner__cover" :style="'background-image: url(' + module.background.pic_thumb_format + ');'">
                    <view class="cap-store-banner__cover-mask"></view>
                </view>

                <view class="cap-store-nav-warp">
                    <view class="cap-store-nav-con">
                        <view class="store-search-con">
                            <view @tap.stop.prevent="search_form" id="search">
                                <text class="module_ico module-ico-sousuo"></text>
                                <input type="text" class="search-input" value="" placeholder="搜商品" />
                                <input v-if="!true" type="text" name="store_id" value="10" />
                            </view>
                        </view>
                        <view class="store-nav-con">
                            <view class="store-nav-item active">
                                <view class="store-nav-item-a">精选</view>
                            </view>
                            <view class="store-nav-item">
                                <navigator class="store-nav-item-a" :url="'/pages/goods_search/index?store_id=' + module.store_info.store_id">商品</navigator>
                            </view>
                            <view class="store-nav-item">
                                <navigator class="store-nav-item-a" url="/pages/store_cat/index?id=10">分类</navigator>
                            </view>
                            <block v-if="module.store_nav_list" v-for="(nav, index) in module.store_nav_list" :key="index">
                                <view class="store-nav-item">
                                    <navigator :url="nav.url" class="store-nav-item-a">{{ nav.name }}</navigator>
                                </view>
                            </block>
                        </view>
                        <view class="store-all-cat-con" style="display: none">
                            <text class="module_ico module-ico-fenlei"></text>
                        </view>
                    </view>
                </view>

                <view class="cap-store-banner__inner">
                    <view class="cap-store-banner__content">
                        <view class="cap-store-banner__logo">
                            <image lazy-load  :src="module.store_info.store_logo" mode="widthFix"></image>
                        </view>
                        <view class="cap-store-banner__right-content">
                            <view class="cap-store-banner__right-content-title--middle">
                                {{ module.store_info.store_title }}
                            </view>
                            <view class="cap-store-banner__sum-content">
                                <navigator :url="'/pages/goods_search/index?store_id=' + module.store_info.store_id">
                                    <view class="cap-store-banner__sum-content-total">全部商品 {{ module.goods_total }}</view>
                                </navigator>
                                <navigator :url="'store_category.html?store_id=' + module.store_info.store_id + '&intro=new'">
                                    <view class="cap-store-banner__sum-content-total">上新 {{ module.new_goods_total }}</view>
                                </navigator>
                            </view>
                        </view>
                        <view class="store-collect-button-con">
                            <view
                                v-if="module.is_collected"
                                class="store-collect-button store-collect-button-collected"
                                :data-id="module.store_info.store_id"
                                @tap.stop.prevent="delStoreCollect"
                            >
                                <text class="module_ico module-ico-31shoucangxuanzhong"></text>
                                已收藏
                            </view>
                            <view
                                v-if="!module.is_collected"
                                class="store-collect-button"
                                :data-id="module.store_info.store_id"
                                @tap.stop.prevent="storeCollect"
                            >
                                <text class="module_ico module-ico-31shoucangxuanzhong"></text>
                                收藏
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    }
});

const isCollected = ref(false);
const nav = ref({
    url: "",
    name: ""
});

const search_form = () => {
    uni.navigateTo({
        url: "/pages/search/index?&store_id=" + props.module.store_info.store_id
    });
};

const storeCollect = () => {
    // 暂无接口
};

const delStoreCollect = () => {
    // 暂无接口
}
</script>
<style>
@import '../../../static/css/modules.css';
/*店铺信息*/
.module-store_info {
    position: relative;
    font-size: 24rpx;
    background-color: #fff;
}
.module-store_info .cap-store-banner .cap-store-banner__cover {
    position: relative;
    height: 290rpx;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
}
.module-store_info .cap-store-banner .cap-store-banner__cover-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.15);
}
.module-store_info .cap-store-banner .cap-store-banner__inner {
    position: absolute;
    top: 30rpx;
    width: 100%;
}
.module-store_info .cap-store-banner .cap-store-banner__content {
    position: relative;
    padding-left: 30rpx;
    overflow: hidden;
}
.module-store_info .cap-store-banner .cap-store-banner__logo {
    float: left;
    width: 116rpx;
    height: 116rpx;
    overflow: hidden;
    vertical-align: bottom;
    background-color: #fff;
    border: 2rpx solid #fff;
}
.module-store_info .cap-store-banner .cap-store-banner__logo image {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    border: none;
}
.module-store_info .cap-store-banner .cap-store-banner__right-content {
    margin-left: 140rpx;
}
.module-store_info .cap-store-banner .cap-store-banner__right-content .cap-store-banner__right-content-title--middle {
    max-width: 440rpx;
    margin-top: 20rpx;
    color: #fff;
    font-weight: 700;
    font-size: 36rpx;
    line-height: 44rpx;
    text-shadow: 0 2rpx 30rpx rgba(0, 0, 0, 0.5);
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.module-store_info .cap-store-banner .cap-store-banner__sum-content {
    margin-top: 30rpx;
    line-height: 24rpx;
}
.module-store_info .cap-store-banner .cap-store-banner__sum-content navigator {
    color: #fff;
    display: inline-block;
}
.module-store_info .cap-store-banner .cap-store-banner__sum-content-total {
    position: relative;
    display: inline-block;
    padding: 0 20rpx;
    vertical-align: middle;
}
.module-store_info .cap-store-banner .cap-store-banner__sum-content navigator:first-child view {
    padding-left: 0;
}
.module-store_info .cap-store-banner .cap-store-banner__sum-content navigator:first-child view:after {
    position: absolute;
    top: 0;
    right: 0;
    width: 4rpx;
    height: 24rpx;
    color: #e5e5e5;
    font-size: 20rpx;
    content: "|";
}
.module-store_info .cap-store-banner .store-collect-button-con {
    position: absolute;
    top: 14rpx;
    right: 20rpx;
    display: block;
    text-align: center;
}
.module-store_info .cap-store-banner .store-collect-button {
    position: relative;
    display: block;
    background: #e93b3d;
    border: 2rpx solid #e93b3d;
    border-radius: 30rpx;
    overflow: hidden;
    box-sizing: border-box;
    height: 56rpx;
    line-height: 56rpx;
    padding: 0 20rpx;
    white-space: nowrap;
    font-size: 28rpx;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.module-store_info .cap-store-banner .store-collect-button.store-collect-button-collected {
    border-color: #fff;
    background: none;
}
.module-store_info .cap-store-banner .store-collect-button text {
    font-size: 28rpx;
}
.module-store_info .cap-store-banner .cap-store-nav-warp {
    position: absolute;
    height: 100rpx;
    top: 180rpx;
    z-index: 9;
    width: 100%;
}
.module-store_info .cap-store-banner .cap-store-nav-warp .cap-store-nav-con {
    display: flex;
    flex-wrap: nowrap;
    height: 100rpx;
    align-items: center;
}
.module-store_info .cap-store-banner .cap-store-nav-warp .store-search-con {
    width: 164rpx;
    height: 60rpx;
    margin: 0 20rpx;
    padding: 0 20rpx 0 60rpx;
    background: rgba(250, 250, 255, 0.8);
    line-height: 60rpx;
    border-radius: 60rpx;
    position: relative;
}
.module-store_info .cap-store-banner .cap-store-nav-warp .store-search-con .module-ico-sousuo {
    position: absolute;
    left: 0;
    top: 0;
    width: 60rpx;
    text-align: center;
}
.module-store_info .cap-store-banner .cap-store-nav-warp .store-search-con .search-input {
    background: transparent;
    border: 0;
    padding: 0;
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    display: block;
}
.module-store_info .cap-store-banner .cap-store-nav-warp .store-search-con .search-input::-webkit-input-placeholder {
    color: #666;
}
.module-store_info .cap-store-banner .cap-store-nav-warp .store-search-con .search-input:focus {
    border: 0;
    box-shadow: none;
}
.module-store_info .cap-store-banner .cap-store-nav-warp .store-nav-con {
    display: flex;
    flex-wrap: nowrap;
    padding-left: 20rpx;
    overflow-x: auto;
    margin-right: 30rpx;
    height: 60rpx;
    position: relative;
    top: 6rpx;
    -webkit-overflow-scrolling: touch;
    flex: 1;
}
.module-store_info .cap-store-banner .cap-store-nav-warp .store-nav-con .store-nav-item {
    margin-right: 40rpx;
    flex: none;
}
.module-store_info .cap-store-banner .cap-store-nav-warp .store-nav-con .store-nav-item.active navigator:after {
    content: "";
    display: block;
    width: 100%;
    height: 4rpx;
    position: absolute;
    left: 0;
    bottom: -10rpx;
    background: #fff;
    border-radius: 10rpx;
}
.module-store_info .cap-store-banner .cap-store-nav-warp .store-nav-con .store-nav-item navigator {
    position: relative;
    display: inline-block;
    height: 42rpx;
    font-size: 28rpx;
    line-height: 42rpx;
    font-weight: 700;
    color: #fff;
}
.module-store_info .cap-store-banner .cap-store-nav-warp .store-all-cat-con {
    width: 52rpx;
    text-align: center;
    color: #fff;
}
.ad-store_style__2 {
    height: 476rpx;
}
.ad-store_style__2 .cap-store-banner .cap-store-banner__cover-mask {
    background-color: initial;
    background-image: -webkit-linear-gradient(bottom, #000, transparent);
    background-image: linear-gradient(0deg, #000, transparent);
}
.ad-store_style__2 .cap-store-banner .cap-store-banner__inner {
    top: 210rpx;
}
.ad-store_style__2 .cap-store-banner .cap-store-nav-warp {
    top: 0;
}
.ad-store_style__2 .cap-store-banner .cap-store-banner__logo {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
}
.ad-store_style__2 .cap-store-banner .cap-store-banner__logo image {
    border-radius: 50%;
}
.ad-store_style__2 .cap-store-banner .cap-store-banner__right-content {
    margin-left: 164rpx;
}
.ad-store_style__2 .cap-store-banner .cap-store-banner__sum-content navigator {
    color: #999;
}
.ad-store_style__3 {
    height: 516rpx;
}
.ad-store_style__3 .cap-store-banner .cap-store-banner__cover {
    height: 300rpx;
}
.ad-store_style__3 .cap-store-banner .cap-store-banner__inner {
    top: 136rpx;
}
.ad-store_style__3 .cap-store-banner .cap-store-nav-warp {
    top: 0;
}
.ad-store_style__3 .cap-store-banner .store-collect-button-con {
    top: 80rpx;
}
.ad-store_style__3 .cap-store-banner .cap-store-banner__cover-mask {
    background-color: initial;
    background-image: -webkit-linear-gradient(bottom, #000, transparent);
    background-image: linear-gradient(0deg, #000, transparent);
}
.ad-store_style__3 .cap-store-banner .cap-store-banner__content {
    padding-left: 0;
    text-align: center;
}
.ad-store_style__3 .cap-store-banner .cap-store-banner__logo {
    display: inline-block;
    float: none;
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
}
.ad-store_style__3 .cap-store-banner .cap-store-banner__right-content {
    margin-left: 0;
}
.ad-store_style__3 .cap-store-banner .cap-store-banner__right-content .cap-store-banner__right-content-title--middle {
    display: inline-block;
    max-width: 100%;
    margin-top: 40rpx;
    color: #333;
    text-shadow: none;
}
.ad-store_style__3 .cap-store-banner .cap-store-banner__sum-content {
    margin-top: 20rpx;
}
.ad-store_style__3 .cap-store-banner .cap-store-banner__sum-content navigator {
    color: #999;
}
.ad-store_style__4 .cap-store-banner {
    height: 440rpx;
}
.ad-store_style__4 .cap-store-banner .cap-store-banner__cover {
    height: 100%;
}
.ad-store_style__4 .cap-store-banner .cap-store-banner__inner {
    top: 30rpx;
}
.ad-store_style__4 .cap-store-banner .cap-store-nav-warp {
    top: 340rpx;
}
.ad-store_style__4 .cap-store-banner .store-collect-button-con {
    top: 0;
}
.ad-store_style__4 .cap-store-banner .cap-store-banner__content {
    padding-left: 0;
    text-align: center;
}
.ad-store_style__4 .cap-store-banner .cap-store-banner__logo {
    display: inline-block;
    float: none;
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
}
.ad-store_style__4 .cap-store-banner .cap-store-banner__right-content {
    margin-left: 0;
}
.ad-store_style__4 .cap-store-banner .cap-store-banner__right-content .cap-store-banner__right-content-title--middle {
    display: inline-block;
    max-width: 100%;
    margin-top: 40rpx;
    padding-bottom: 20rpx;
    color: #fff;
    text-shadow: none;
    border-bottom: 2rpx solid hsla(0, 0%, 100%, 0.5);
}
.ad-store_style__4 .cap-store-banner .cap-store-banner__sum-content {
    margin-top: 10rpx;
}
</style>
