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
                <view class="item flex align-center" v-for="(item, index) in tabList" :key="item.value" :class="{active: tabIndex === item.value}" @click="onChangeTab(item)">
                    <text>{{ item.label }}</text>
                    <view class="price-ico-box flex flex-column" v-show="item.value === 'price' && tabIndex == item.value">
                        <text class="iconfont-h5 icon-shangjiantou" :class="{order: item.order === 'asc'}"></text>
                        <text class="iconfont-h5 icon-xiajiantou" :class="{order: item.order === 'desc'}"></text>
                    </view>
                </view>
                <view class="item">
                    <text>筛选</text>
                    <text class="iconfont-h5 icon-sanjiaoright"></text>
                </view>
            </view>
            <view class="tag-row">
                <view class="tag-list flex align-center">
                    <view class="tag-item">
                        <text>配饰 x</text>
                    </view>
                    <view class="tag-interval">></view>
                    <view class="tag-item">
                        <text>帽子 x</text>
                    </view>
                    <view class="tag-interval">></view>
                    <view class="tag-item">
                        <text>小黑伞 x</text>
                    </view>
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
const tabIndex = ref('default')
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
        order: "desc"
    }
]);

const onChangeTab = (item:any) => {
    if(item.value == 'price'){
        item.order = item.order === 'desc' ? 'asc' : 'desc';
    }else{
        item.order = ''
    }
    tabIndex.value = item.value;
    console.log('筛选条件:',item)
};
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
        width: 20%;
        text-align: center;
        margin: 30rpx 40rpx;
        color: #333;
        font-size: 24rpx;
        .price-ico-box {
            margin-left: 10rpx;
            .icon-shangjiantou, .icon-xiajiantou {
                font-size: 12rpx;
                color: #c3c0c0;
            }
            .order{
                color: #39bf3e;
            }
        }
        .icon-sanjiaoright {
            font-size: 22rpx;
            margin-left: 5rpx;
        }
    }
    .active{
        color: #39bf3e;
    }
}
.tag-row{
    background-color: #fff;
    padding: 0rpx 30rpx 20rpx 30rpx;
    .tag-list{
        .tag-item{
            padding: 10rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: center;
            color: #232326;
            background-color: #f0f2f5;
            border-radius: 3px;
            border: solid 1px #f0f2f5;
            font-size: 24rpx;
            border-radius: 27px;
            vertical-align: middle;
            color: #232326;
            background-color: #f7f7f7;
        }
        .tag-interval{
            margin: 0 10rpx;
            font-size: 18rpx;
        }
    }
}
</style>
<!-- 
    <view class="tag-row">
                <view class="tag-list">
                    <view class="tag-item">
                        <text>配饰x</text>
                    </view>
                    <view class="tag-interval">></view>
                    <view class="tag-item">
                        <text>帽子x</text>
                    </view>
                    <view class="tag-interval">></view>
                    <view class="tag-item">
                        <text>小黑伞x</text>
                    </view>
                </view>
            </view>
 -->