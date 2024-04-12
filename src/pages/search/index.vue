<template>
    <view style="height: 100%">
        <navbar :parameter="parameter"></navbar>
        <view class="searchGood">
            <view class="search-warp acea-row">
                <view class="search-input acea-row">
                    <text class="iconfont icon-neirongsousuo"></text>
                    <input
                        type="text"
                        :value="keyWords"
                        @confirm="searchSubmit"
                        :focus="focus"
                        placeholder="点击搜索商品"
                        placeholder-class="placeholder"
                        @input="setValue"
                    />
                </view>
                <view class="bnt" @click="searchSubmit">搜索</view>
            </view>
            <view class="search_init_box" v-if="!searchGuessList">
                <view class="search_history_box">
                    <view class="title">
                        搜索历史
                        <view class="clear_history" @click.stop="clearHistory"><text class="iconfont icon-lajitong"></text></view>
                    </view>
                    <view class="list acea-row">
                        <template v-if="searchHistory.length > 0">
                            <block v-for="(item, index) in searchHistory" :key="index">
                                <view class="item" @click="searchKeywords" :data-item="item">{{ item }}</view>
                            </block>
                        </template>
                    </view>
                </view>

                <view class="search_hot_box" v-if="hotSearchList" style="display: none">
                    <view class="title">热门搜索</view>
                    <view class="list acea-row">
                        <block v-for="(item, index) in hotSearchList" :key="index">
                            <view class="item" @click="searchKeywords(item.real_value)">{{ item.real_value }}</view>
                        </block>
                    </view>
                </view>
            </view>
            <view class="search_guess_box">
                <block v-for="(item, key_index) in searchGuessList" :key="key_index">
                    <view class="item-li" @click="searchKeywords" :data-item="key_index">
                        <rich-text class="item-key" :nodes="item.key"></rich-text>
                        <text class="item-count">约{{ item.count }}个商品</text>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const app = getApp();

const parameter = ref({
    navbar: "1",
    return: "1",
    title: "搜索商品",
    color: false
});

const keyWords = ref("");
const storeId = ref("");
const focus = ref(true);
const hotSearchList = ref([]);
const searchHistory = ref([]);
const searchGuessList = ref(null);
const storeCatId = ref("");
const Brand = ref("");
const keyIndex = ref("");

onLoad((options: any) => {
    const { store_id, keywords, store_cat_id, brand } = options;
    if (store_id && store_id > 0) {
        parameter.value.title = "搜索店铺商品";
    } else {
        keyWords.value = keywords ?? "";
        storeId.value = store_id ?? "";
        storeCatId.value = store_cat_id ?? "";
        Brand.value = brand ?? "";
    }
});

const getHotSearch = () => {
    let searchHistory = uni.getStorageSync("searchHistory");
    searchHistory = searchHistory.split(",");
};

const searchSubmit = () => {};
const setValue = () => {};
const clearHistory = () => {};
const searchKeywords = () => {};
</script>
<style>
page {
    background-color: #fff !important;
}

.search_init_box .title {
    font-size: 24rpx;
    color: #333;
    margin: 50rpx 30rpx 25rpx 30rpx;
    font-weight: bold;
    position: relative;
}
.search_init_box .list {
    padding-left: 10rpx;
}
.search_init_box .list .item {
    font-size: 24rpx;
    color: #666;
    padding: 0 28rpx;
    height: 50rpx;
    border-radius: 30rpx;
    line-height: 50rpx;
    margin: 0 0 20rpx 20rpx;
    background: #f6f6f6;
}

.search_guess_box {
    padding: 30rpx;
}
.search_guess_box .item-li {
    height: 80rpx;
    border-bottom: 1rpx solid #eee;
}
.search_guess_box .item-li .item-key {
    float: left;
    width: 60%;
    height: 80rpx;
    line-height: 80rpx;
    overflow: hidden;
    font-size: 24rpx;
}
.search_guess_box .item-li .item-key .highlight_b {
    color: #e93323;
}
.search_guess_box .item-li .item-count {
    font-size: 20rpx;
    color: #666;
    padding: 0 20rpx;
    height: 40rpx;
    border-radius: 30rpx;
    line-height: 40rpx;
    background: #f6f6f6;
    float: right;
    margin-top: 20rpx;
}

.clear_history {
    position: absolute;
    right: 0;
    top: 0;
    font-weight: normal;
    font-size: 26rpx;
    padding: 20rpx;
    top: -20rpx;
}
</style>
