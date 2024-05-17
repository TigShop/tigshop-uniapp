<template>
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
    <view class="loading-box" v-if="filterParams.page > 1">
        <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
        <view v-else>没有更多了~</view>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { getAccountList } from "@/api/user/account";
import type { AccountFilterParams, AccountDetailFilterState } from "@/types/user/account";

const total = ref(0);
const loaded = ref(false);
const loadend = ref(false);
const filterParams = reactive<AccountFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: 10,
    status: 1
});
const filterState = ref<AccountDetailFilterState[]>([]);
const __detail = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    } else {
        uni.showLoading({
            title: "加载中"
        });
    }
    try {
        const result = await getAccountList({ ...filterParams });
        total.value = result.total;
        filterState.value = [...filterState.value, ...result.filter_result];
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
            color: $tig-color-primary;
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