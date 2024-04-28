<template>
    <view style="height: 100%">
        <navbar :parameter="parameter"></navbar>
        <view class="page-loading" v-if="loading || !partAllLoading"><view class="ico"></view></view>
        <view class="pageMain" v-if="partAllLoading">
            <block v-if="showCatLevel == 0">
                <view class="productSort">
                    <view class="header acea-row row-center-wrapper" :style="'top:' + navH + 'rpx'">
                        <view @click.stop="toSearch" class="acea-row row-between-wrapper input">
                            <text class="iconfont-h5 icon-sousuo"></text>
                            <view class="txt"> 点击搜索商品信息 </view>
                        </view>
                    </view>
                    <view class="aside" :style="'top:' + navH + 'rpx;margin-top:98rpx;padding-bottom:' + tabbarStore.tabbarHeight">
                        <view :class="'item acea-row row-center-wrapper ' + (cat_id == 0 ? 'on' : '')" data-cat_id="0" @click="changeCat(0)"
                            ><text>推荐</text></view
                        >
                        <block v-for="(item, index) in productList" :key="index">
                            <view
                                :class="'item acea-row row-center-wrapper ' + (cat_id == item.category_id ? 'on' : '')"
                                :data-cat_id="item.category_id"
                                @click="changeCat(item.category_id, item)"
                            >
                                <text v-if="item.cat_short_name">{{ item.cat_short_name }}</text>
                                <text v-else>{{ item.category_name }}</text>
                            </view>
                        </block>
                    </view>
                    <view class="conter">
                        <block v-if="!loading">
                            <block v-if="cat_id == 0">
                                <view class="listw">
                                    <view class="title acea-row row-center-wrapper">
                                        <view class="name">热门分类</view>
                                    </view>
                                    <view class="list acea-row">
                                        <block v-for="(hot, index) in hotCat" :key="index">
                                            <navigator
                                                hover-class="none"
                                                :url="'/pages/search/index?category=' + hot.category_id + '&title=' + hot.category_name"
                                                class="item acea-row row-column row-middle"
                                            >
                                                <view class="picture">
                                                    <!-- <image lazy-load :src="imageFormat(hot.category_pic || '')" mode="aspectFill"></image> -->
                                                    <tigImage v-model:src="hot.category_pic"  mode="aspectFill"></tigImage>
                                                </view>
                                                <view class="name line1">{{ hot.category_name }}</view>
                                            </navigator>
                                        </block>
                                    </view>
                                </view>
                            </block>
                            <block v-if="cat_id > 0" v-for="(cat, index) in childCat" :key="index">
                                <view class="listw" :id="'b' + index">
                                    <view class="title acea-row row-center-wrapper">
                                        <navigator
                                            hover-class="none"
                                            :url="'/pages/search/index?category=' + cat.category_id + '&title=' + cat.category_name"
                                            class="item acea-row row-column row-middle"
                                        >
                                            <view class="name">{{ cat.category_name }}</view>
                                        </navigator>
                                    </view>
                                    <view class="list acea-row">
                                        <block v-for="(childCatItem, index1) in cat.children" :key="index1">
                                            <navigator
                                                hover-class="none"
                                                :url="'/pages/search/index?category=' + childCatItem.category_id + '&title=' + childCatItem.category_name"
                                                class="item acea-row row-column row-middle"
                                            >
                                                <!-- <view class="picture" v-if="childCatItem.cat_pic"
                                                    ><image lazy-load  :src="childCatItem.cat_pic"></image
                                                ></view> -->
                                                <view class="name line1">{{ childCatItem.category_name }}</view>
                                            </navigator>
                                        </block>
                                    </view>
                                </view>
                            </block>
                        </block>
                    </view>
                </view>
            </block>
        </view>
        <view :style="{ height: tabbarStore.tabbarHeight }"></view>
        <tabbar></tabbar>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { useConfigStore } from "@/store/config";
import { usetabbarStore } from "@/store/tabbar";

import { imageFormat, priceFormat } from "@/utils/format";
import { getCategoryAll, getCategoryHot } from "@/api/productCate/productCate";
import type { filterSeleted } from "@/types/productCate/productCate";
const tabbarStore = usetabbarStore();
const configStore = useConfigStore();

const productList = ref<any>([]);
const parameter = ref({
    navbar: "1",
    return: "0",
    title: "产品分类"
});
const navH = configStore.navHeight;
const cat_id = ref(0);
const childCat = ref<filterSeleted[]>([]);
const hotCat = ref<filterSeleted[]>([]);
const partAllLoading = ref(false);
const loading = ref(true);
const showCatLevel = ref(0);

const infoScroll = () => {
    uni.pageScrollTo({
        scrollTop: 0,
        duration: 10
    });
};

const toSearch = () => {
    uni.navigateTo({
        url: "/pages/search/index"
    });
};
onLoad(() => {
    getAllCategory();
    getHotCatList();
});
const getAllCategory = async () => {
    partAllLoading.value = true;
    try {
        const result = await getCategoryAll();
        productList.value = result.category_tree || [];
    } catch (err) {
        console.error(err);
    }
};

const changeCat = (id: number, item?: any) => {
    infoScroll();
    cat_id.value = id;
    if (item) childCat.value = item.children;
};
const getHotCatList = async () => {
    try {
        const result = await getCategoryHot();
        hotCat.value = result.category || [];
        console.log(hotCat.value);
        loading.value = false;
    } catch (err) {
        console.error(err);
    }
};

onShow(() => {
    uni.hideTabBar();
});
</script>
<style scoped>
page {
    background-color: #fff !important;
}
.productSort .header {
    width: 100%;
    height: 99rpx;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 9;
    border-bottom: 1rpx solid #f5f5f5;
}
.productSort .header .input {
    width: 700rpx;
    height: 60rpx;
    background-color: #f5f5f5;
    border-radius: 50rpx;
    box-sizing: border-box;
    padding: 0 25rpx;
}
.productSort .header .input .iconfont {
    font-size: 35rpx;
    color: #555;
}
.productSort .header .input .txt {
    color: #999;
    width: 93%;
    font-size: 26rpx;
}
.productSort .aside {
    position: fixed;
    width: 180rpx;
    left: 0;
    bottom: 0;
    background-color: #f7f7f7;
    overflow-y: auto;
    overflow-x: hidden;
}
.productSort .aside .item {
    height: 80rpx;
    width: 100%;
    font-size: 26rpx;
    color: #424242;
}
.productSort .aside .item.on {
    background-color: #fff;
    width: 100%;
    text-align: center;
    color: #fc4141;
    font-weight: bold;
}
.productSort .conter {
    margin: 98rpx 0 0 180rpx;
    padding: 0 14rpx;
    padding-bottom: 180rpx;
}
.productSort .conter .listw {
    padding-top: 20rpx;
}
.productSort .conter .listw .title {
    height: 50rpx;
    justify-content: left;
}
.productSort .conter .listw .title .line {
    width: 100rpx;
    height: 2rpx;
    background-color: #999;
}
.productSort .conter .listw .title .name {
    font-size: 28rpx;
    color: #333;
    margin: 0 30rpx;
    font-weight: bold;
}
.productSort .conter .list {
    flex-wrap: wrap;
}
.productSort .conter .list .item {
    width: 177rpx;
    margin-top: 26rpx;
}
.productSort .conter .list .item .picture {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
}
.productSort .conter .list .item .picture image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.productSort .conter .list .item .name {
    font-size: 24rpx;
    color: #333;
    height: 56rpx;
    line-height: 56rpx;
    width: 120rpx;
    text-align: center;
}
</style>
