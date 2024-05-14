<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="card-main">
            <view class="head-tabs-box" :style="'top:' + navH + 'rpx'">
                <view class="tabs flex align-center justify-between">
                    <view class="flex align-end">
                        <view class="tab" v-for="(tab, index) in tabs" :key="index" :class="{ 'active': activeTab === tab.account_type }" @click="actionClick(tab.account_type)">{{ tab.title }}</view>
                    </view>
                </view>
            </view>
            <view class="card-list">
                
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { ref, reactive } from "vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { getCollectProductList, delCollectProduct } from "@/api/user/collectProduct";
import type { CollectProductList, CollectProductFilterParams } from "@/types/user/collectProduct";
import { useConfigStore } from "@/store/config";
const configStore = useConfigStore();
const navH = configStore.navHeight;
const parameter = {
    navbar: "1",
    return: "1",
    title: "卡管理",
    color: false
};

const tabs = [
    { title: "银行卡", account_type: 1 },
    { title: "支付宝", account_type: 2 },
    { title: "微信", account_type: 3 }
];
const activeTab = ref(1);
const actionClick = async (value: number) => {
    if (value === activeTab.value) return;
    activeTab.value = value;
}

onLoad(() => {
});

onReachBottom(() => {
});
</script>

<style lang="scss" scoped>
.head-tabs-box{
    position: fixed;
    width: 100%;
    z-index: 99;
    .tabs{
        background-color: #fff;
        padding: 30rpx;
        .tab{
            font-size: 26rpx;
            margin-right: 40rpx;
            color: #666;
        }
        .active{
            color: $tig-color-primary;
            font-weight: bold;
            font-size: 32rpx;
        }
        .clear-unread{
            font-size: 26rpx;
            color: #999;
        }
    }
}
.card-list {
    position: relative;
    padding: 0 20rpx;
    margin-top: 120rpx;
    .move-item {
        margin-bottom: 10rpx;
    }
}
</style>
