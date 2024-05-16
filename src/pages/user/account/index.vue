<template>
    <navbar :parameter="parameter"></navbar>
    <view class="top-card">
        <view class="balance-row">
            可用余额
        </view>
        <view class="amount-row">
            <FormatPrice :priceData="formState.balance" :currencyStyle="{fontSize:'14px',lineHeight:'30px'}"></FormatPrice>
        </view>
        <view class="button-row">
            <view class="round-button" :class="{ 'active': activeTab === 'deposit' }" @click="actionClick('deposit')">充值</view>
            <view class="round-button" :class="{ 'active': activeTab === 'raplytocard' }"  @click="actionClick('raplytocard')">提现</view>
        </view>
    </view>
    <view class="custom-tabs" v-if="activeTab === 'detail' || activeTab === 'log'">
        <view v-for="(tab, index) in tabs" :key="index" :class="{ 'active-tab': activeTab === tab.action }" class="tab"
            @click="actionClick(tab.action)">
            <view>{{ tab.title }}</view>
        </view>
    </view>

    <block v-if="activeTab === 'detail'">
        <detail></detail>
    </block>

    <block v-if="activeTab === 'log'">
        <log></log>
    </block>

    <block v-if="activeTab === 'deposit'">
        <deposit @backDetail="backDetail" ></deposit>
    </block>

    <block v-if="activeTab === 'raplytocard'">
        <raplyToCard @backDetail="backDetail"></raplyToCard>
    </block>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import navbar from "@/components/navbar/index.vue";
import detail from "@/pages/user/account/src/detail.vue";
import log from "@/pages/user/account/src/log.vue";
import deposit from "@/pages/user/account/src/deposit.vue";
import raplyToCard from "@/pages/user/account/src/raplyToCard.vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { getUser } from "@/api/user/user";
import type { UserItem } from "@/types/user/user";

const formState = ref<UserItem>({} as UserItem);
const __getUser = async () => {
    try {
        const result = await getUser();
        Object.assign(formState.value, result.item);
    } catch (error: any) {
        console.log(error.message);
    }
};

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "资金管理"
});

const tabs = [
    { title: "账户明细", action: "detail" },
    { title: "申请记录", action: "log" }
];
const activeTab = ref('detail');
const actionClick = (value: string) => {
    if (value === activeTab.value) return;
    activeTab.value = value;
}

const backDetail = () =>{
    activeTab.value = "detail";
}

onLoad(() => {
    __getUser();
})

onReachBottom(() => {
    console.log('---');
})
</script>
<style lang="scss" scoped>
.top-card {
    // background: url("/src/static/images/user/background.png");
    background: $tig-color-primary;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 10rpx;
    margin: 20rpx;
    color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 60rpx;

    .balance-row,
    .amount-row,
    .button-row {
        text-align: center;
        margin: 20rpx 20rpx 0;
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
        gap: 20rpx;
        height: 60rpx;

        .round-button {
            height: 60rpx;
            line-height: 60rpx;
            border-radius: 46rpx;
            flex: 1;
            border: 2rpx solid white;
            color: white;
            outline: none;
            font-size: 24rpx;
            background-color: $tig-color-primary;
            &.active {
                background-color: #fff;
                color: $tig-color-primary;
                font-weight: 700;
            }
        }
    }
}
.custom-tabs {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 100rpx;
    margin: 20rpx 30rpx;
    .tab {
        padding: 20rpx;
        width: 100%;
        font-size: 28rpx;
        border-bottom: none;
        color: black;
        text-align: center;
    }
    & .active-tab {
        position: relative;
        color: $tig-color-primary;
        &::before {
            content: '';
            position: absolute;
            width: 30%;
            height: 4rpx;
            background-color: $tig-color-primary;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
        }
    }
}
</style>