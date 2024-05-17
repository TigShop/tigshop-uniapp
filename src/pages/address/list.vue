<template>
    <view class="safe-padding">
        <navbar :parameter="parameter"></navbar>
        <view class="address-list">
            <radio-group @change="getCurrentAddress">
                <uni-swipe-action>
                    <block v-for="item in addressList" :key="item.address_id">
                        <view class="address-item">
                            <uni-swipe-action-item :threshold="0" autoClose>
                                <view class="address-item-content">
                                    <view class="address-item-left flex-center">
                                        <radio
                                            :value="item.address_id.toString()"
                                            :activeBackgroundColor="checkedColor"
                                            :checked="item.is_selected === 1"
                                            style="margin-right: 20rpx; transform: scale(0.9)"
                                        ></radio>
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
                                <template #right>
                                    <view class="address-del" @click="handleDel(item.address_id)"> 删除 </view>
                                </template>
                            </uni-swipe-action-item>
                        </view>
                    </block>
                </uni-swipe-action>
            </radio-group>
        </view>
        <view class="loading-box" v-if="filterParams.page > 1">
            <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
            <view v-else>没有更多了~</view>
        </view>
        <view style="height: 90rpx"></view>
        <saveBottomBox :height="90" backgroundColor="#fff">
            <view class="btn-box">
                <tigButton style="width: 100%; font-size: 28rpx" @click="handleAdd"> <text class="iconfont icon-dizhi"></text> 添加新地址 </tigButton>
            </view>
        </saveBottomBox>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import { getAddressList, delAddress, selectedAddress } from "@/api/user/address";
import { reactive, ref, computed } from "vue";
import { onLoad, onReachBottom, onShow, onUnload } from "@dcloudio/uni-app";
import type { AddressFilterResult } from "@/types/user/address";
import { useThemeStore } from "@/store/theme";

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

const themeStore = useThemeStore();
const checkedColor = computed(() => {
    return themeStore.themeStyle["--general"] || "#ee0a24";
});

const __getAddressList = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    }
    try {
        const result = await getAddressList({ ...filterParams });
        total.value = result.total;
        addressList.value = [...addressList.value, ...result.filter_result];
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
    uni.showModal({
        title: "提示",
        content: "确定删除吗？",
        success: async (res) => {
            if (res.confirm) {
                __delAddress(id);
            }
        }
    });
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
        filterParams.page = 1;
        addressList.value = [];
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

const isCheckedId = ref();
const getCurrentAddress = (e: any) => {
    isCheckedId.value = e.detail.value;
    __selectedAddress();
};

const __selectedAddress = async () => {
    uni.showLoading({
        title: "切换中"
    });
    const pages = getCurrentPages();
    try {
        const result = await selectedAddress({ id: isCheckedId.value });
        filterParams.page = 1;
        addressList.value = [];
        if (pages.length > 1) {
            const prevRoute = pages[pages.length - 2].route;
            console.log(pages);
            if (prevRoute === "pages/order/check") {
                uni.navigateBack();
            }
        }

        __getAddressList();
    } catch (error: any) {
        console.error(error);
        uni.showToast({
            title: error.message,
            icon: "none"
        });
    } finally {
        uni.hideLoading();
    }
};

onShow(() => {
    uni.$on("refreshData", () => {
        filterParams.page = 1;
        addressList.value = [];
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
.btn-box {
    padding: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 28rpx;
}
.address-list {
    padding: 20rpx;

    .address-item {
        border-radius: 10rpx;
        background-color: #fff;
        margin-bottom: 20rpx;

        .address-item-content {
            display: flex;
            padding: 20rpx;
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
        background-color: $tig-color-primary;
        width: 100rpx;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22rpx;
    }
}
</style>
