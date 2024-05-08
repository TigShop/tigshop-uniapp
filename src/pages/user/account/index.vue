<template>

    <navbar :parameter="parameter"></navbar>
    <view class="top-card">
        <view class="balance-row">
            余额
        </view>
        <view class="amount-row">
            ¥28374.34
        </view>
        <view class="button-row">
            <view class="round-button">充值</view>
            <view class="round-button">提现</view>
        </view>
    </view>

    <view class="custom-tabs">
        <view v-for="(tab, index) in tabs"
              :key="index"
              :class="{ 'active-tab': activeTab === index }"
              class="tab"
              @click="activeTab = index"
        >
            <view>{{ tab.title }}</view>
        </view>
    </view>
    <view v-if="activeTab === 0">

    </view>
    <view v-if="activeTab === 1">

    </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import navbar from "@/components/navbar/index.vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "资金管理"
});

const tabs = [{ title: "账户明细" }, { title: "申请记录" }];
const activeTab = ref(0);
</script>
<style lang="scss" scoped>
.top-card {
    background: url("/src/static/images/user/background.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5px;
    margin: 10px;
    color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 60rpx;

    .balance-row,
    .amount-row,
    .button-row {
        text-align: center;
        margin: 20rpx 10px 0;
    }

    .balance-row {
        font-size: 36rpx
    }

    .amount-row {
        font-size: 52rpx;
        font-weight: 400;
    }

    .button-row {
        display: flex;
        margin-top: 60rpx;
        justify-content: space-evenly;
        gap: 10px;
        height: 60rpx;

        .round-button {
            height: 60rpx;
            line-height: 60rpx;
            border-radius: 46rpx;
            flex: 1;
            border: 1px solid white;
            color: white;
            outline: none;
            cursor: pointer;
            font-size: 24rpx;
            background-color: #fa0;
        }
    }
}

.custom-tabs {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 120rpx;
    margin: 20rpx;

    .tab {
        padding: 10px;
        width: 100%;
        font-size: 28rpx;
        border-bottom: none;
        color: black;
        text-align: center;
    }
}

.custom-tabs .active-tab {
    border-bottom: 2px solid #fa0;
    color: #fa0;
}


</style>
