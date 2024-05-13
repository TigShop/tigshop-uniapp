<template>
    <view class="">
        <view class="invoice-list">
            <block v-for="item in invoiceList" :key="item.order_id">
                <view class="invoice-list-item">
                    <view class="invoice-list-item-header">
                        <text class="special-text"
                            >订单编号：<text class="special-color">{{ item.order_sn }}</text>
                        </text>
                        <text v-if="item.invoice_data">{{ formatText(item.invoice_data.status) }}</text>
                        <text v-else="item.invoice_data">可申请</text>
                    </view>
                    <view class="invoice-list-item-content">
                        <view class="item-content-product">
                            <block v-for="subItem in item.items" :key="subItem.item_id">
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
                        <view class="item-content-pay">
                            <view class="item-content-pay-box">
                                <view class="pay-item total-money">总额：<FormatPrice :priceData="item.total_amount"></FormatPrice></view>
                            </view>
                        </view>
                    </view>
                    <view class="invoice-list-item-btn">
                        <view class="item-btn-box">
                            <block v-if="item.invoice_data">
                                <tigButton :plain="true" :plainMainColor="true" @click="handleShowInfo(item.invoice_data, item.order_sn)"> 查看 </tigButton>
                            </block>
                            <tigButton v-else :plain="true" :plainMainColor="true" @click="handleApply"> 申请 </tigButton>
                        </view>
                    </view>
                </view>
            </block>
            <view class="loading-box" v-if="filterParams.page > 1">
                <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
                <view v-else>没有更多了~</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { getOrderList } from "@/api/user/order";
import type { OrderListFilterResult, OrderListInvoiceData } from "@/types/user/order";

const invoiceList = ref<OrderListFilterResult[]>([]);

const filterParams = reactive({
    page: 1,
    size: 10,
    order_status: 5
});
const loaded = ref(false);
const total = ref(0);
const __getOrderList = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    } else {
        uni.showLoading({
            title: "加载中"
        });
    }
    try {
        const result = await getOrderList(filterParams);
        invoiceList.value = [...invoiceList.value, ...result.filter_result];
        total.value = result.total;
    } catch (error) {
        console.error(error);
    } finally {
        uni.hideLoading();
        loaded.value = false;
    }
};

const formatText = (status: number) => {
    switch (status) {
        case 0:
            return "待审核";
        case 1:
            return "通过";
        default:
            return "失败/作废";
    }
};

const handleApply = () => {
    uni.navigateTo({
        url: "/pages/user/invoiceManagement/applyInvoice"
    });
};

const handleShowInfo = (data: OrderListInvoiceData, order_sn: string) => {
    data.order_sn = order_sn;
    const invoice_data = encodeURIComponent(JSON.stringify(data));
    uni.navigateTo({
        url: "/pages/user/invoiceManagement/invoiceInfo?invoice_data=" + invoice_data
    });
};

onMounted(() => {
    __getOrderList();
});
defineExpose({
    __getOrderList,
    filterParams,
    total
});
</script>

<style lang="scss" scoped>
.invoice-list {
    padding: 10rpx 10rpx;

    .invoice-list-item {
        background-color: #fff;
        border-radius: 10rpx;
        margin-bottom: 20rpx;
        padding: 20rpx;
        font-size: 24rpx;

        &:last-child {
            margin-bottom: 0;
        }

        .invoice-list-item-header {
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

        .invoice-list-item-content {
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

        .invoice-list-item-btn {
            display: flex;
            justify-content: flex-end;
            padding-top: 25rpx;

            .item-btn-box {
                display: flex;
            }
        }
    }
}
</style>
