<template>
    <view style="height: 100%">
        <navbar :parameter="parameter"></navbar>
        <view class="searchGood">
            <view class="search-warp acea-row">
                <view class="search-input acea-row">
                    <text class="iconfont icon-neirongsousuo"></text>
                    <input type="text" v-model="keyWords" @confirm="searchSubmit" placeholder="点击搜索商品" placeholder-class="placeholder" />
                </view>
                <view class="bnt" @click="searchSubmit">搜索</view>
            </view>
            <view class="search_init_box" v-if="searchHistory">
                <view class="search_history_box">
                    <view class="title">
                        搜索历史
                        <view class="clear_history" @click.stop="clearHistory"><text class="iconfont-h5 icon-shanchu"></text></view>
                    </view>
                    <view class="list acea-row">
                        <block v-for="(item, index) in searchHistory" :key="index">
                            <view class="item" @click="searchKeywords(item)">{{ item }}</view>
                        </block>
                    </view>
                </view>
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
const searchHistory = ref<any[]>([]);

onLoad((options: any) => {
    if (uni.getStorageSync("searchHistory")) {
        searchHistory.value = uni.getStorageSync("searchHistory");
    }
});
const searchSubmit = () => {
    if (keyWords.value) {
        searchHistory.value.unshift(keyWords.value);
        searchHistory.value = [...new Set(searchHistory.value)];
        if (searchHistory.value.length > 10) {
            searchHistory.value.splice(10, searchHistory.value.length - 10);
        }
        uni.setStorageSync("searchHistory", searchHistory.value);
        uni.navigateTo({
            url: `/pages/search/result?keyWords=${keyWords.value}`
        });
    } else {
        uni.showToast({
            title: "请输入搜索内容",
            icon: "none"
        });
    }
};
const clearHistory = () => {
    searchHistory.value = [];
    uni.removeStorageSync("searchHistory");
};

const searchKeywords = (item: any) => {
    uni.navigateTo({
        url: `/pages/search/result?keyWords=${item}`
    });
};
</script>
<style scoped>
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
