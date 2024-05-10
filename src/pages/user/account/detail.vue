<template>

    <navbar :parameter="parameter"></navbar>
    <view class="top-card">
        <view class="balance-row">
            余额
        </view>
        <view class="amount-row">
            <FormatPrice :priceData="formState.balance"></FormatPrice>
        </view>
        <view class="button-row">
            <view class="round-button">充值</view>
            <view class="round-button">提现</view>
        </view>
    </view>

    <view class="custom-tabs">
        <view v-for="(tab, index) in tabs" :key="index" :class="{ 'active-tab': activeTab === tab.action }" class="tab"
            @click="actionClick(tab.action)">
            <view>{{ tab.title }}</view>
        </view>
    </view>
    <block v-if="activeTab === 'account_detail'">
        <view class="log-main" v-if="filterState.length > 0">
            <block v-for="(item, index) in filterState" :key="index">
                <view class="item">
                    <view class="tit">{{ item.change_type_name }}</view>
                    <view class="time">{{ item.change_time }}</view>
                    <view class="real_total">
                        <text v-if="item.change_type_name === '增加'">+</text>
                        <text v-else>-</text>
                        <text>{{ item.balance }}</text>
                    </view>
                </view>
            </block>
        </view>
        <view class="empty-box" v-if="filterState.length === 0 && loadend === true">
            <view class="pictrue"><image src="/static/images/common/data_empty.png"></image></view>
            <view class="txt">暂无数据！</view>
        </view>
    </block>
    <block v-if="activeTab === 'account_log'">
        <view class="log-main" v-if="filterStateLog.length > 0">
            <block v-for="(item, index) in filterStateLog" :key="index">
                <view class="item">
                    <view class="tit">{{ item.type }}</view>
                    <view class="time">{{ item.add_time }}</view>
                    <view class="real_total">
                        <text>-</text>
                        <text>100</text>
                    </view>
                    <view class="actions">
                        <view class="txt">管理员备注：{{ item.postscript || '无' }}</view>
                        <view class="status">{{ item.status_type }}</view>
                    </view>
                </view>
            </block>
        </view>
        <view class="empty-box" v-if="filterStateLog.length === 0 && loadend === true">
            <view class="pictrue"><image src="/static/images/common/data_empty.png"></image></view>
            <view class="txt">暂无数据！</view>
        </view>
    </block>
    <view class="loading-box" v-if="filterParams.page > 1">
        <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
        <view v-else>没有更多了~</view>
    </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import navbar from "@/components/navbar/index.vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { getUser } from "@/api/user/user";
import { getAccountList, getRechargeOrderList } from "@/api/user/account";
import type { UserItem } from "@/types/user/user";
import type { AccountFilterParams, AccountDetailFilterState, AccountFilterState } from "@/types/user/account"

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "资金管理"
});

const formState = ref<UserItem>({} as UserItem);
const __getUser = async () => {
    try {
        const result = await getUser();
        Object.assign(formState.value, result.item);
    } catch (error: any) {
        console.log(error.message);
    }
};

const tabs = [
    { title: "账户明细", action: "account_detail" },
    { title: "申请记录", action: "account_log" }
];
const activeTab = ref('account_detail');
const actionClick = (value: string) => {
    if (value === activeTab.value) return;
    activeTab.value = value;
    filterParams.page = 1;
    filterState.value = [];
    filterStateLog.value = [];
    loaded.value = false;
    __getAccountList();
}

const total = ref(0);
const loaded = ref(false);
const loadend = ref(false);
const filterParams = reactive<AccountFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: 10,
    // status: 1
});
const filterState = ref<AccountDetailFilterState[]>([]);
const filterStateLog = ref<AccountFilterState[]>([]);
const __getAccountList = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    } else {
        uni.showLoading({
            title: "加载中"
        });
    }
    try {
        if (activeTab.value === 'account_detail') {
            await detail();
        } else if (activeTab.value === 'account_log') {
            await log();
        }
    } catch (error: any) {
        console.error(error);
    } finally {
        uni.hideLoading();
        loaded.value = false;
        loadend.value = true;
    }
}
const detail = async () => {
    try {
        const result = await getAccountList({ ...filterParams });
        total.value = result.total;
        filterState.value = [...filterState.value, ...result.filter_result];
    } catch (error: any) {
        console.error(error);
    }
}
const log = async () => {
    try {
        const result = await getRechargeOrderList({ ...filterParams });
        total.value = result.total;
        filterStateLog.value = [...filterStateLog.value, ...result.filter_result];
    } catch (error: any) {
        console.error(error);
    }
}

onLoad(() => {
    __getUser();
    __getAccountList();
})

onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        __getAccountList();
    }
})
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

.log-main {
    margin-top: 40rpx;
    .item {
        position: relative;
        padding: 40rpx;
        margin: 0 20rpx;
        background: #fff;
        border-radius: 18rpx;
        margin-bottom: 20rpx;
        .tit {
            font-size: 28rpx;
            color: #333;
            padding-bottom: 10rpx;
            padding-right: 200rpx;
        }
        .time {
            color: #999;
            position: relative;
            font-size: 24rpx;
        }
        .real_total {
            font-size: 32rpx;
            color: #fa0;
            font-weight: bold;
            position: absolute;
            right: 40rpx;
            top: 40rpx;
        }
        .actions {
            margin-top: 10rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #999;
            .txt {
                flex: 1 1 auto;
                font-size: 22rpx;
                padding-right: 20rpx;
            }
            .status {
                flex-shrink: 0;
                font-size: 24rpx;
            }
        }
    }
}
</style>
