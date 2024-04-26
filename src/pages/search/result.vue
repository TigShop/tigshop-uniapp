<template>
    <view style="height: 100%">
        <navbar :parameter="parameter"></navbar>
        <view class="pageMain productSort" v-if="loading">
            <view class="header acea-row row-center-wrapper" :style="'top:' + navH + 'rpx'">
                <view @click.stop="toSearch" class="acea-row row-between-wrapper input">
                    <text class="iconfont-h5 icon-sousuo"></text>
                    <view class="txt"> 请输入搜索内容 </view>
                </view>
            </view>
            <view class="tab-box flex align-center justify-between">
                <view class="item flex align-center" v-for="item in tabList" :key="item.value">
                    <text>{{ item.label }}</text>
                    <view class="price-ico-box flex flex-column">
                        <text class="iconfont-h5 icon-shangjiantou"></text>
                        <text class="iconfont-h5 icon-xiajiantou"></text>
                    </view>
                </view>
                <view class="item">
                    <text>筛选</text>
                    <text class="iconfont-h5 icon-sanjiaoright"></text>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { useConfigStore } from "@/store/config";
import { imageFormat } from "@/utils/format";
import type { Brand, filterSeleted, ProductFilterParams, ProductList } from "@/types/search/search";
import { getCategoryTree, getCategoryProductFilter, getCategoryProduct } from "@/api/search/search";
import { Label } from "@dcloudio/uni-h5";
const configStore = useConfigStore();
const parameter = ref({
    navbar: "1",
    return: "1",
    title: "商品搜索"
});
const navH = configStore.navHeight;
const loading = ref(true);
const tabList = ref([
    {
        label: "默认",
        value: "default"
    },
    {
        label: "销量",
        value: "sales"
    },
    {
        label: "价格",
        value: "price",
        order: "asc"
    }
]);

const toSearch = () => {
    uni.navigateTo({
        url: "/pages/search/index"
    });
};
onLoad(() => {});

onShow(() => {
    uni.hideTabBar();
});
</script>
<style lang="scss" scoped>
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
.tab-box {
    padding-top: 99rpx;
    background-color: #fff;
    .item {
        margin: 30rpx;
        color: #333;
        font-size: 24rpx;
        .price-ico-box {
            margin-left: 10rpx;
            .icon-shangjiantou, .icon-xiajiantou {
                font-size: 12rpx;
                color: $tig-color-grey;
            }
            .order{
                color: $tig-color-primary;
            }
        }
        .icon-sanjiaoright {
            font-size: 22rpx;
            margin-left: 5rpx;
        }
    }
}
</style>
<!-- 
    <view class="tab-box flex align-center justify-between">
                <view class="item flex align-center" v-for="item in tabList" :key="item.value">
                    <text>{{ item.label }}</text>
                    <view class="price-ico-box flex flex-column">
                        <text class="iconfont-h5 icon-shangjiantou"></text>
                        <text class="iconfont-h5 icon-xiajiantou"></text>
                    </view>
                    
                </view>
                <view class="item">
                    <text>筛选</text>
                    <text class="iconfont-h5 icon-sanjiaoright"></text>
                </view>
            </view>
 -->
