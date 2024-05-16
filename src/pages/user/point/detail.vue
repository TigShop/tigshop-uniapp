<template>
<view>
    <navbar :parameter="parameter"></navbar>
    <view class="top-card">
        <view class="balance-row">
            我的积分
        </view>
        <view class="amount-row">
            {{user_points}}
        </view>
    </view>
    <view class="log-main" v-if="filterState.length > 0">
        <block v-for="(item, index) in filterState" :key="index">
            <view class="item">
                <view class="tit">{{ item.change_desc }}</view>
                <view class="time">{{ item.change_time }}</view>
                <view class="real_total">
                    <text v-if="item.change_type_name === '增加'">+</text>
                    <text v-else>-</text>
                    <text>{{ item.points }}</text>
                </view>
            </view>
        </block>
    </view>
    <view class="empty-box" v-if="filterState.length === 0 && loadend === true">
        <view class="pictrue"><image src="/static/images/common/data_empty.png"></image></view>
        <view class="txt">暂无数据！</view>
    </view>
    <view class="loading-box" v-if="filterParams.page > 1">
        <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
        <view v-else>没有更多了~</view>
    </view>
</view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import type { AccountFilterParams, AccountDetailFilterState } from "@/types/user/account";
import { getPointList } from "@/api/user/point";
import type { PointFilterState } from "@/types/user/point";
import navbar from "@/components/navbar/index.vue";
const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "积分明细"
});
const total = ref(0);
const loaded = ref(false);
const loadend = ref(false);
const filterParams = reactive<AccountFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: 10,
    status: 1
});
const user_points = ref(0)
const filterState = ref<PointFilterState[]>([]);
const __detail = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    } else {
        uni.showLoading({
            title: "加载中"
        });
    }
    try {
        const result = await getPointList({ ...filterParams });
        total.value = result.total;
        filterState.value = [...filterState.value, ...result.filter_result];
        user_points.value = result.user_points
    } catch (error: any) {
        console.error(error);
    } finally {
        uni.hideLoading();
        loaded.value = false;
        loadend.value = true;
    }
}

onLoad(() => {
    __detail();
})

onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        __detail();
    }
})
</script>
<style lang="scss" scoped>
.top-card {
    background: url("/static/images/user/background2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5px;
    margin: 10px;
    color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 40rpx;

    .balance-row,
    .amount-row,
    .button-row {

        margin: 25rpx 30px 0;
    }

    .balance-row {
        font-size: 36rpx
    }

    .amount-row {
        font-size: 52rpx;
        font-weight: 400;
    }

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
