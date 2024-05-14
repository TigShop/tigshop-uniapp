<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="card-main">
            <view class="head-tabs-box" :style="'top:' + navH + 'rpx'">
                <view class="tabs flex align-center justify-between">
                    <view class="flex align-end">
                        <view class="tab" v-for="(tab, index) in tabs" :key="index" :class="{ 'active': activeTab === tab.account_type }" @click="actionClick(tab.account_type)">{{ tab.title }}</view>
                    </view>
                    <view class="clear-unread flex align-end" @click="__addAccountNo">
                        <text>添加账号</text>
                        <uni-icons type="auth" size="20" color="#999"></uni-icons>
                    </view>
                </view>
            </view>
            <view class="card-list" v-if="filterState.length > 0">
                <uni-swipe-action>
                    <block v-for="(item, index) in filterState" :key="index">
                        <view class="move-item">
                            <uni-swipe-action-item :threshold="0" autoClose>
                                <view class="mitem">
                                    <view class="card">
                                        <view class="txt-item">
                                            <view class="tit">真实姓名</view>
                                            <view class="txt">{{ item.account_name }}</view>
                                        </view>
                                        <view class="txt-item">
                                            <view class="tit">身份证号码</view>
                                            <view class="txt">{{ item.identity }}</view>
                                        </view>
                                        <view class="txt-item">
                                            <view class="tit">账户号码</view>
                                            <view class="txt">{{ item.account_no }}</view>
                                        </view>
                                        <view class="txt-item" v-if="filterParams.account_type===1">
                                            <view class="tit">银行卡详情</view>
                                            <view class="txt">{{ item.bank_name }}</view>
                                        </view>
                                    </view>
                                </view>
                                <template #right>
                                    <view class="card-move-box">
                                        <view class="btn-edit" @click="__editAccountNo(item.account_id)"><text>编辑</text></view>
                                        <view class="btn-del" @click="__delAccount(item, index)"><text>删除</text></view>
                                    </view>
                                </template>
                            </uni-swipe-action-item>
                        </view>
                    </block>
                </uni-swipe-action>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { ref, reactive } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { delAccount, getAccountNoList } from "@/api/user/account";
import type { AccountNoFilterParams, AccountInfo } from "@/types/user/account";
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
    filterParams.page = 1;
    filterParams.account_type = value;
    __getAccountNoList();
}

const loaded = ref(false);
const filterParams = reactive<AccountNoFilterParams>({   //初使化用于查询的参数
    page: 1,
    account_type: 1,
});
const filterState = ref<AccountInfo[]>([]);

const __getAccountNoList = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    } else {
        uni.showLoading({
            title: "加载中"
        });
    }
    try {
        const result = await getAccountNoList({ ...filterParams });
        filterState.value = result.filter_result;
    } catch (error: any) {
        console.error(error.message);
    } finally {
        uni.hideLoading();
        loaded.value = false;
    }
};

const __editAccountNo = (id: number) => {
    uni.navigateTo({
        url: `/pages/user/account/cardManagement/edit?id=${id}`
    })
}

const __addAccountNo = () => {
    uni.navigateTo({
        url: `/pages/user/account/cardManagement/edit`
    })
}

const __delAccount = (data: AccountInfo, index: number) => {
    uni.showModal({
        title: "提示",
        content: "确定删除这个账户吗？",
        success: async (res) => {
            if (res.confirm) {
                deleteAcNo(data, index);
            }
        }
    });
};

const deleteAcNo = async (data: AccountInfo, index: number) => {
    try {
        const result = await delAccount({ ...data });
        filterState.value.splice(index, 1);
        if (result.message) {
            uni.showToast({
                title: result.message,
                icon: "success"
            });
        }
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
}


onShow(() => {
    __getAccountNoList();
});

onLoad(() => {
    __getAccountNoList();
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
    .mitem {
        position: relative;
        border-radius: 10rpx;
        .card {
            position: relative;
            padding: 30rpx 20rpx;
            background-color: #fff;
            border-radius: 20rpx;
            .txt-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10rpx;
                &:last-child {
                    margin-bottom: 0;
                }
                .tit {
                    font-size: 24rpx;
                }
                .txt {
                    font-size: 22rpx;
                    color: #999;
                }
            }
        }
    }
}
.card-move-box {
    width: 300rpx;
    height: 100%;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    display: flex;
    text {
        display: block;
        position: absolute;
        top: 50%;
        margin-top: -20rpx;
        font-size: 24rpx;
        text-align: center;
        width: 100%;
    }
    .btn-edit {
        width: 150rpx;
        background: #ffa600;
        background: linear-gradient(138deg, #ffa600, #ffb000 77%, #ffbc00);
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        display: table-cell;
        position: relative;
    }
    .btn-del {
        width: 150rpx;
        background: #ff4f18;
        background: linear-gradient(-41deg, #ff4f18, #ff2000 24%, #f10000);
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        display: table-cell;
        position: relative;
    }
}
</style>
