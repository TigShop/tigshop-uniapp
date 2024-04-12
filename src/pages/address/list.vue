<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="address-list">
            <van-radio-group v-model="isChecked">
                <block v-for="item in addressList" :key="item.address_id">
                    <van-swipe-cell>
                        <view class="address-item">
                            <view class="address-item-content">
                                <view class="address-item-left flex-center">
                                    <van-radio :name="item.address_id" checked-color="#ee0a24" @click="getCurrentAddress(item.address_id)"></van-radio>
                                </view>
                                <view class="address-item-middle">
                                    <view class="user-info">
                                        <view class="name">{{ item.consignee }}</view>

                                        <view class="phone">{{ item.mobile }}</view>
                                    </view>
                                    <view class="address">{{ item.region_name }} {{ item.address }}</view>
                                </view>
                                <view class="address-item-right flex-center" @click="handleEdit(item.address_id)">
                                    <view class="iconfont icon-bianji"> </view>
                                </view>
                            </view>
                        </view>
                        <template #right>
                            <view class="address-del" @click="handleDel(item.address_id)"> 删除 </view>
                        </template>
                    </van-swipe-cell>
                </block>
            </van-radio-group>
        </view>
        <view class="loading-box" v-if="filterParams.page > 1">
            <van-loading v-if="loaded" size="36rpx" type="spinner" />
            <view v-else>没有更多了~</view>
        </view>
        <view style="height: 90rpx"></view>
        <view class="bottom">
            <view class="addressBnt" @click="handleAdd">
                <text class="iconfont icon-dizhi"></text>
                添加新地址
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { getAddressList, delAddress, selectedAddress } from "@/api/user/address";
import { reactive, ref } from "vue";
import { onLoad, onReachBottom, onShow, onUnload } from "@dcloudio/uni-app";
import type { AddressFilterResult } from "@/types/user/address";
import { showConfirmDialog } from "vant";
const pages = getCurrentPages();
const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "添加地址"
});
const addressList = ref<AddressFilterResult[]>([]);
const filterParams = reactive({
    page: 1,
    size: 10
});
const total = ref(0);
const loaded = ref(false);
const isChecked = ref<number>();
const __getAddressList = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    }
    try {
        const result = await getAddressList({ ...filterParams });
        total.value = result.total;
        addressList.value = [...addressList.value, ...result.filter_result];
        if (addressList.value.length > 0) {
            isChecked.value = addressList.value.find((item) => item.is_selected === 1)?.address_id;
        }
    } catch (error) {
        console.error(error);
    } finally {
        loaded.value = false;
    }
};
onLoad(() => {
    __getAddressList();
});

const handleDel = (id: number) => {
    showConfirmDialog({
        title: "确定删除吗？"
    })
        .then(async () => {
            __delAddress(id);
        })
        .catch(() => {});
};
const __delAddress = async (id: number) => {
    try {
        const result = await delAddress({ id });
        if (result.message) {
            uni.showToast({
                title: result.message,
                icon: "none"
            });
        }
        __getAddressList();
    } catch (error) {
        console.error(error);
    }
};

const handleEdit = (id: number) => {
    uni.navigateTo({
        url: "/pages/address/editRegion?id=" + id
    });
};
const handleAdd = () => {
    uni.navigateTo({
        url: "/pages/address/editRegion"
    });
};

const getCurrentAddress = (id: number) => {
    isChecked.value = id;
    __selectedAddress();
};

const __selectedAddress = async () => {
    uni.showLoading({
        title: "切换中"
    });
    try {
        const result = await selectedAddress({ id: isChecked.value });
        console.log('pages', pages[0])
        if(pages[0].route === 'pages/order/check'){
            uni.navigateBack()
        }
    } catch (errore) {
        console.error(errore);
    } finally {
        uni.hideLoading();
    }
};

onShow(() => {
    uni.$on("refreshData", () => {
        __getAddressList();
    });
});

onUnload(() => {
    uni.$off("refreshData");
});

onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        __getAddressList();
    }
});
</script>

<style lang="scss" scoped>
.address-list {
    padding: 20rpx;

    .address-item {
        border-radius: 10rpx;
        background-color: #fff;
        padding: 20rpx;
        margin-bottom: 20rpx;

        .address-item-content {
            display: flex;

            .flex-center {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .address-item-left {
                width: 60rpx;
            }

            .address-item-middle {
                width: 100%;
                padding-left: 10rpx;
                .user-info {
                    color: #333;
                    display: block;
                    font-size: 30rpx;
                    font-weight: bold;
                    display: flex;
                }
                .name {
                    margin-right: 10rpx;
                }

                .address {
                    color: #666;
                    display: block;
                    font-size: 24rpx;
                    overflow: hidden;
                    padding-top: 16rpx;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .address-item-right {
                width: 60rpx;
            }
        }
    }
    .address-del {
        height: 100%;
        background-color: #ee0a24;
        width: 100rpx;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22rpx;
    }
}

.bottom {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    height: 106rpx;
    padding: 0 20rpx;
    padding-bottom: env(safe-area-inset-bottom) !important;

    .addressBnt {
        background-color: #ee0a24;
        width: 100%;
        height: 76rpx;
        border-radius: 50rpx;
        text-align: center;
        line-height: 76rpx;
        font-size: 30rpx;
        color: #fff;
    }
}

.loading-box {
    display: flex;
    justify-content: center;
    padding-bottom: 30rpx;
}
</style>
