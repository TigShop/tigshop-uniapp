<template>
    <view class="log-main" v-if="filterStateLog.length > 0">
        <block v-for="(item, index) in filterStateLog" :key="index">
            <view class="item">
                <view class="tit">{{ item.type }}</view>
                <view class="time">{{ item.add_time }}</view>
                <view class="real_total">
                    <FormatPrice :priceData="item.amount"></FormatPrice>
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
    <view class="loading-box" v-if="filterParams.page > 1">
        <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
        <view v-else>没有更多了~</view>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { getRechargeOrderList } from "@/api/user/account";
import type { AccountFilterParams, AccountFilterState } from "@/types/user/account";

const total = ref(0);
const loaded = ref(false);
const loadend = ref(false);
const filterParams = reactive<AccountFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: 10,
});
const filterStateLog = ref<AccountFilterState[]>([]);
const __log = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    } else {
        uni.showLoading({
            title: "加载中"
        });
    }
    try {
        const result = await getRechargeOrderList({ ...filterParams });
        total.value = result.total;
        filterStateLog.value = [...filterStateLog.value, ...result.filter_result];
    } catch (error: any) {
        console.error(error);
    } finally {
        uni.hideLoading();
        loaded.value = false;
        loadend.value = true;
    }
}

onLoad(() => {
    __log();
})

onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        __log();
    }
})
</script>
<style lang="scss" scoped>
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