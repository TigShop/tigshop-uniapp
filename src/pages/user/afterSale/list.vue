<template>
    <view class="after-sale-list">
        <navbar :parameter="parameter"></navbar>
        <view class="order-list">
            <block v-for="item in afterSaleList" :key="item.order_id">
                <view class="order-list-item">
                    <view class="order-list-item-header">
                        <text class="special-text"
                            >售后编号：<text class="special-color">{{ item.aftersales_sn }}</text>
                        </text>
                        <text>{{ item.status_name }}</text>
                    </view>
                    <view class="order-list-item-content">
                        <view class="item-content-product">
                            <block v-for="subItem in item.aftersales_items" :key="subItem.aftersales_item_id">
                                <navigator :url="'/pages/productDetail/index?id=' + subItem.product_id" hover-class="navigator-hover">
                                    <view class="item-content-product-item">
                                        <view class="item-content-product-img">
                                            <tigImage v-model:src="subItem.pic_thumb"></tigImage>
                                        </view>
                                        <view class="item-content-product-info">
                                            <view class="product-item-title">
                                                {{ subItem.product_name }}
                                            </view>
                                            <view class="product-item-price">
                                                <FormatPrice class="product-item-pricenum" :priceData="subItem.price"></FormatPrice>
                                                <view class="product-item-quantity">x {{ subItem.quantity }}</view>
                                            </view>
                                        </view>
                                    </view>
                                </navigator>
                            </block>
                        </view>
                    </view>
                    <view class="order-list-item-btn">
                        <view class="item-btn-box">
                            <view class="base-item-btn detail" @click="handleAfterSaleDetail(item.aftersale_id)"> 售后详情 </view>
                        </view>
                    </view>
                </view>
            </block>
        </view>
        <view class="loading-box" v-if="filterParams.page > 1">
            <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
            <view v-else>没有更多了~</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import tigButton from '@/components/tigButton/index.vue'
import { reactive, ref } from "vue";
import { aftersalesRecord } from "@/api/user/afterSale";
import type { AfterSaleListFilterResult } from "@/types/user/afterSale";
import { onShow, onReachBottom } from "@dcloudio/uni-app";
const parameter = {
    navbar: "1",
    return: "1",
    title: "申请列表"
};

const filterParams = reactive({
    page: 1,
    size: 10
});
const loaded = ref(false);
const afterSaleList = ref<AfterSaleListFilterResult[]>([]);
const total = ref(0);
const getList = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    } else {
        uni.showLoading({
            title: "加载中"
        });
    }
    try {
        const result = await aftersalesRecord(filterParams);
        afterSaleList.value = [...afterSaleList.value, ...result.filter_result];
        total.value = result.total;
    } catch (error) {
        console.error(error);
    } finally {
        uni.hideLoading();
        loaded.value = false;
    }
};

const handleAfterSaleDetail = (id: number) => {
    uni.navigateTo({
        url: `/pages/user/afterSale/info?id=${id}`
    });
};

const handleNavigateTo = (url: string) => {
    uni.navigateTo({
        url
    });
};

onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        getList();
    }
});

onShow(() => {
    filterParams.page = 1;
    afterSaleList.value = [];
    getList();
});
</script>

<style lang="scss" scoped>
.order-list {
    padding: 10rpx 20rpx;

    .order-list-item {
        background-color: #fff;
        border-radius: 10rpx;
        margin-bottom: 20rpx;
        padding: 20rpx;
        font-size: 24rpx;

        &:last-child {
            margin-bottom: 0;
        }

        .order-list-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 20rpx;
            .special-text {
                font-size: 26rpx;
                font-weight: bold;
            }
            .special-color {
                color: #999;
                font-weight: normal;
            }
        }

        .order-list-item-content {
            .item-content-text {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10rpx;

                .special-color {
                    color: #999;
                }
            }

            .item-content-product-item {
                padding-bottom: 15rpx;

                &:first-child {
                    padding-top: 15rpx;
                }

                display: flex;
                .item-content-product-img {
                    width: 140rpx;
                    height: 140rpx;
                }
                .item-content-product-info {
                    width: 495rpx;
                    padding-left: 25rpx;

                    .product-item-title {
                        font-weight: bold;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .product-item-price {
                        display: flex;
                        padding-top: 25rpx;
                        .product-item-pricenum {
                            // color: $tig-color-primary;
                            font-size: 30rpx;
                            :deep(.util) {
                                font-size: 22rpx;
                            }
                        }

                        .product-item-quantity {
                            font-size: 28rpx;
                            color: #999;
                            padding-left: 15rpx;
                        }
                    }
                }
            }

            .item-content-pay {
                display: flex;
                justify-content: flex-end;

                .item-content-pay-box {
                    display: flex;
                    .pay-item {
                        padding: 0 10rpx;

                        &.pay-type {
                            color: #999;
                        }

                        &.total-money {
                            .price-content {
                                color: $tig-color-primary;
                            }
                        }
                    }
                }
            }
        }

        .order-list-item-btn {
            display: flex;
            justify-content: flex-end;
            padding-top: 25rpx;

            .item-btn-box {
                display: flex;
                .base-item-btn {
                    padding: 10rpx 25rpx;
                    border: 1px solid #ddd;
                    border-radius: 30rpx;
                    margin-left: 10rpx;
                    &.detail {
                        border: 1px solid $tig-color-primary;
                        color: $tig-color-primary;
                    }

                    &:active {
                        opacity: 0.6;
                    }
                }
            }
        }
    }
}
</style>
