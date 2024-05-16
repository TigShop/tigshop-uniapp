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
    background: url("/static/images/user/background.png");
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
            &.active {
                background-color: #fff;
                color: #fa0;
            }
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
