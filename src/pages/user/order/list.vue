<template>
    <view class="order">
        <navbar :parameter="parameter"></navbar>
        <view class="order-menu">
            <block v-for="item in menuTypeList" :key="item.type">
                <view class="order-menu-item" :class="{ active: currentType === item.type }" @click="handleMenuType(item.type)">
                    <uni-badge v-if="item.num > 0" class="badgecolor" :text="item.num" absolute="rightTop" size="small">
                        <text class="order-menu-item-text">{{ item.value }}</text>
                    </uni-badge>
                    <text v-else class="order-menu-item-text">{{ item.value }}</text>
                </view>
            </block>
        </view>
        <view class="placeholder"></view>
        <view class="order-list">
            <block v-for="item in orderList" :key="item.order_id">
                <view class="order-list-item">
                    <view class="order-list-item-header">
                        <text class="special-text"
                            >订单编号：<text class="special-color">{{ item.order_sn }}</text>
                        </text>
                        <text>{{ item.order_status_name }}</text>
                    </view>
                    <view class="order-list-item-content">
                        <view class="item-content-text">
                            <view> 收件人：{{ item.username }} </view>
                            <view class="special-color">{{ item.add_time }}</view>
                        </view>
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
                                <view class="pay-item pay-type">
                                    {{ item.pay_type_id === 1 ? "在线支付" : item.pay_type_id === 2 ? "货到付款" : "线下支付" }}</view
                                >
                                <view class="pay-item total-money">总额：<FormatPrice :priceData="item.total_amount"></FormatPrice></view>
                                <view class="pay-item" v-if="item.order_status === 0 && Number(item.unpaid_amount) > 0">
                                    应付：<FormatPrice :priceData="item.unpaid_amount"></FormatPrice>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="order-list-item-btn">
                        <view class="item-btn-box">
                            <view class="base-item-btn detail" @click="handleOrederDetail(item.order_id)"> 订单详情 </view>
                            <view class="base-item-btn" v-if="item.available_actions.to_pay" @click="handlePay(item.order_id)"> 去付款 </view>
                            <view class="base-item-btn" v-if="item.available_actions.cancel_order" @click="handleCancelOrder(item.order_id)"> 取消订单 </view>
                            <view class="base-item-btn" v-if="item.available_actions.del_order" @click="handleDelOrder(item.order_id)"> 删除订单 </view>
                            <view class="base-item-btn" v-if="item.available_actions.rebuy" @click="handleBuyAgain(item.order_id)"> 再次购买 </view>
                            <view class="base-item-btn" v-if="item.available_actions.to_comment" @click="handleEvaluate(item.order_id)"> 去评价 </view>
                            <view class="base-item-btn" v-if="item.available_actions.confirm_receipt" @click="handleConfirmReceipt(item.order_id)">
                                确认收货
                            </view>
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
import { reactive, ref } from "vue";
import { getOrderList, getOrderNum, cancelOrder, delOrder, orderBuyAgain, confirmReceipt } from "@/api/user/order";
import type { OrderListFilterParams, OrderListFilterResult } from "@/types/user/order";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
const parameter = {
    navbar: "1",
    return: "1",
    title: "我的订单",
    showHome: true,
    color: false
};
interface MenuType {
    type: string;
    value: string;
    num: number;
}
const menuTypeList = reactive<MenuType[]>([
    { type: "all", value: "全部订单", num: 0 },
    { type: "await_pay", value: "待支付", num: 0 },
    { type: "await_shipping", value: "待发货", num: 0 },
    { type: "await_received", value: "待收货", num: 0 },
    { type: "await_comment", value: "待评价", num: 0 }
]);

const __getOrderNum = async () => {
    try {
        const result = await getOrderNum();
        menuTypeList.forEach((item) => {
            if (result.item[item.type]) {
                item.num = result.item[item.type];
            }
        });
        __getOrderList();
    } catch (error) {
        console.error(error);
    }
};
const currentType = ref<string>("all");
const filterParams = reactive<OrderListFilterParams>({
    page: 1,
    size: 10,
    order_status: -1,
    comment_status: -1
});

const loaded = ref(false);
const orderList = ref<OrderListFilterResult[]>([]);
const total = ref(0);
const handleMenuType = (type: string) => {
    currentType.value = type;
    filterParams.page = 1;
    orderList.value = [];
    if (type === "await_comment") {
        filterParams.comment_status = 0;
        filterParams.order_status = -1;
    } else {
        filterParams.order_status = formatOrderStatus(type);
        filterParams.comment_status = -1;
    }
    __getOrderList();
};
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
        orderList.value = [...orderList.value, ...result.filter_result];
        total.value = result.total;
    } catch (error) {
        console.error(error);
    } finally {
        uni.hideLoading();
        loaded.value = false;
    }
};

const handleCancelOrder = async (id: number) => {
    uni.showModal({
        title: "提示",
        content: "确认要取消该订单吗？",
        success: async (res) => {
            if (res.confirm) {
                try {
                    const result = await cancelOrder({ id });
                    filterParams.page = 1;
                    orderList.value = [];
                    __getOrderNum();
                } catch (error: any) {
                    uni.showToast({
                        title: error.message,
                        icon: "none"
                    });
                } finally {
                }
            }
        }
    });
};

const handleDelOrder = async (id: number) => {
    uni.showModal({
        title: "提示",
        content: "确认要删除该订单吗？",
        success: async (res) => {
            if (res.confirm) {
                try {
                    const result = await delOrder({ id });
                    filterParams.page = 1;
                    orderList.value = [];
                    __getOrderNum();
                } catch (error: any) {
                    uni.showToast({
                        title: error.message,
                        icon: "none"
                    });
                } finally {
                }
            }
        }
    });
};

const handleBuyAgain = async (id: number) => {
    try {
        const result = await orderBuyAgain({ id });

        uni.navigateTo({
            url: "/pages/cart/index"
        });
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        });
    }
};

const handlePay = (id: number) => {
    uni.navigateTo({
        url: `/pages/order/pay?order_id=${id}`
    });
};

const handleOrederDetail = (id: number) => {
    uni.navigateTo({
        url: `/pages/user/order/info?id=${id}`
    });
};
const handleEvaluate = (id: number) => {
    uni.navigateTo({
        url: `/pages/user/comment/info?id=${id}`
    });
};
const handleConfirmReceipt = (id: number) => {
    uni.showModal({
        title: "提示",
        content: "确认收货吗？",
        success: async (res) => {
            if (res.confirm) {
                try {
                    const result = await confirmReceipt({ id });
                    uni.redirectTo({
                        url: "/pages/user/order/list?type=await_comment"
                    })
                } catch (error: any) {
                    uni.showToast({
                        title: error.message,
                        icon: "none"
                    });
                } finally {
                }
            }
        }
    });
};
const formatOrderStatus = (status: string) => {
    switch (status) {
        case "all":
            return -1;
        case "await_pay":
            return 0;
        case "await_shipping":
            return 1;
        case "await_received":
            return 2;
        default:
            return -1;
    }
};

onLoad((options) => {
    if (options && options.type) {
        if (options.type === "await_comment") {
            filterParams.comment_status = 0;
        } else {
            filterParams.order_status = formatOrderStatus(options.type);
        }
        currentType.value = options.type;
    }
    __getOrderNum();
});

onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        __getOrderList();
    }
});
</script>

<style lang="scss" scoped>
.placeholder {
    height: 88rpx;
}

.badgecolor {
    :deep(.uni-badge--error) {
        background-color: $tig-color-primary;
    }
}

.order-menu {
    background-color: #fff;
    display: flex;
    box-sizing: border-box;
    margin-bottom: 30rpx;
    position: fixed;
    width: 100%;
    z-index: 999;

    .order-menu-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 88rpx;
        position: relative;

        .order-menu-item-text {
            padding: 0 10rpx 0 0;
        }
        &.active {
            color: #333;
            font-weight: bold;

            &:after {
                content: "";
                position: absolute;
                bottom: 0;
                height: 5rpx;
                width: 60rpx;
                background-color: $tig-color-primary;
                border-radius: 10rpx;
            }
        }
    }
}

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
