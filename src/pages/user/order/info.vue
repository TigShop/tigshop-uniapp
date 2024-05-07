<template>
    <view class="order-info" style="padding-bottom: 100rpx">
        <navbar :parameter="parameter"></navbar>
        <block v-if="Object.keys(orderInfo).length">
            <view class="order-info-steps">
                <uni-steps active-color="#39bf3e" :options="orderInfo.step_status.steps" :active="orderInfo.step_status.current" />
            </view>

            <view class="order-info-content">
                <view class="order-card card-space">
                    <view class="order-card-item flex justify-between">
                        <view class="item-left">
                            <text class="order-item-label">订单编号：</text>
                            <text>{{ orderInfo.order_sn }}</text>
                        </view>
                        <view class="item-right">
                            <text class="order-item-label">订单状态：</text>
                            <text>{{ orderInfo.order_status_name }}</text>
                        </view>
                    </view>
                    <view class="order-card-item">
                        <text class="order-item-label">下单时间：</text>
                        <text>{{ orderInfo.add_time }}</text>
                    </view>
                    <view class="order-card-item">{{ oStatusInfo[orderInfo.order_status] }}</view>
                </view>
                <view class="expressage-card card-space" v-if="orderInfo.order_id && orderInfo.order_status === 2">
                    <view class=""> 快递公司 </view>
                </view>
                <view class="pay-card card-space">
                    <view class="pay-card-item">
                        <text class="order-item-label">收货信息：</text>
                        <text class="address-text">{{ orderInfo.user_address + orderInfo.consignee + orderInfo.mobile }}</text>
                    </view>
                    <view class="pay-card-item">
                        <text class="order-item-label">配送方式：</text>
                        <text>{{ orderInfo.shipping_type_name }}</text>
                    </view>
                    <view class="pay-card-item">
                        <text class="order-item-label">支付方式：</text>
                        <text>{{ orderInfo.pay_type_id === 1 ? "在线支付" : orderInfo.pay_type_id === 2 ? "货到付款" : "线下支付" }}</text>
                    </view>
                </view>
                <view class="product-card card-space">
                    <block v-for="item in orderInfo.items" :key="item.product_id">
                        <view class="product-card-item">
                            <view class="product-card-item-left">
                                <view class="left-img">
                                    <tigImage v-model:src="item.pic_thumb"></tigImage>
                                </view>
                            </view>
                            <view class="product-card-item-right">
                                <view class="right-title">
                                    <text>{{ item.product_name }}</text>
                                </view>
                                <view class="right-price">
                                    <FormatPrice class="right-price-pricenum" :priceData="item.price"></FormatPrice>
                                    <view class="right-price-quantity">x {{ item.quantity }}</view>
                                </view>
                            </view>
                            <view class="item-btn">
                                <view> 申请售后</view>
                            </view>
                        </view>
                    </block>
                </view>
                <view class="money-card card-space">
                    <view class="money-card-item">
                        <text class="order-item-label">商品总价：</text>
                        <text><FormatPrice :priceData="orderInfo.product_amount"></FormatPrice></text>
                    </view>
                    <view class="money-card-item" v-if="orderInfo.shipping_fee && orderInfo.shipping_fee > 0">
                        <text class="order-item-label">运费：</text>
                        <text><FormatPrice :priceData="orderInfo.shipping_fee"></FormatPrice></text>
                    </view>
                    <view class="money-card-item" v-if="orderInfo.balance && orderInfo.balance > 0">
                        <text class="order-item-label">使用余额：</text>
                        <text><FormatPrice :priceData="orderInfo.balance"></FormatPrice></text>
                    </view>
                    <view class="money-card-item" v-if="orderInfo.points_amount && orderInfo.points_amount > 0">
                        <text class="order-item-label">使用积分：</text>
                        <text><FormatPrice :priceData="orderInfo.points_amount"></FormatPrice></text>
                    </view>
                    <view class="money-card-item" v-if="orderInfo.coupon_amount && orderInfo.coupon_amount > 0">
                        <text class="order-item-label">使用优惠券：</text>
                        <text><FormatPrice :priceData="orderInfo.coupon_amount"></FormatPrice></text>
                    </view>
                    <view class="money-card-item" v-if="orderInfo.unpaid_amount && orderInfo.unpaid_amount > 0">
                        <text class="order-item-label">待支付金额：</text>
                        <text><FormatPrice :priceData="orderInfo.unpaid_amount"></FormatPrice></text>
                    </view>
                    <view class="money-card-item">
                        <text class="order-item-label" v-if="orderInfo.pay_status == 2">实付款：</text>
                        <text class="order-item-label" v-else>实付款：</text>
                        <text class="order-item-price"><FormatPrice :priceData="orderInfo.total_amount"></FormatPrice></text>
                    </view>
                </view>
            </view>
            <saveBottomBox height="90" backgroundColor="#fff" v-if="!orderInfo.available_actions.del_order">
                <view class="order-info-btn">
                    <view class="order-info-btn-box">
                        <view class="btn" v-if="orderInfo.available_actions.cancel_order" @click="handleCancelOrder(orderInfo.order_id)"> 取消订单 </view>
                        <view class="btn" v-if="orderInfo.available_actions.to_pay" @click="handlePay(orderInfo.order_id)"> 去付款 </view>
                        <view class="btn" v-if="orderInfo.available_actions.confirm_receipt" @click="handleConfirmReceipt(orderInfo.order_id)">
                            确认已收货
                        </view>
                        <view class="btn" v-if="orderInfo.available_actions.to_aftersales"> 整单售后 </view>
                    </view>
                </view>
            </saveBottomBox>
        </block>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import { getOrder, cancelOrder, confirmReceipt } from "@/api/user/order";
import type { OrderInfoResponseItem } from "@/types/user/order";
import { ref } from "vue";

const parameter = {
    navbar: "1",
    return: "1",
    title: "我的订单",
    showHome: true,
    color: false
};

interface IoStatusInfo {
    [key: number]: string;
}

const oStatusInfo = ref<IoStatusInfo>({
    0: "您的订单已提交成功，请尽快完成付款哦！",
    1: "感谢您在本店的购物，您的订单已提交成功，我们会尽快为您发货！",
    2: "您的订单已经发货，请注意查收，祝您购物愉快！",
    3: '您的订单已被取消，您可以通过"再次购买"，重新购买订单中的商品。',
    4: '您的订单被认定为无效订单，订单已被关闭。您可以通过"再次购买"，重新购买订单中的商品。给您造成的不便请多多谅解！',
    5: "您的订单已经确认收货，感谢您在本店购物，祝您生活愉快！"
});

const orderInfo = ref<OrderInfoResponseItem>({} as OrderInfoResponseItem);

const id = ref<null | number>();
onLoad((option: any) => {
    if (option && option.id) {
        id.value = option.id;
        __getOrder();
    }
});

const __getOrder = async () => {
    uni.showLoading({
        title: "加载中"
    });
    try {
        const result = await getOrder({ id: id.value });
        orderInfo.value = result.item;
    } catch (error) {
        console.error(error);
    } finally {
        uni.hideLoading();
    }
};

const handleCancelOrder = (id: number) => {
    uni.showModal({
        title: "提示",
        content: "确认要取消该订单吗？",
        success: async (res) => {
            if (res.confirm) {
                try {
                    const result = await cancelOrder({ id });
                    __getOrder();
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

const handlePay = (id: number) => {
    uni.navigateTo({
        url: `/pages/order/pay?order_id=${id}`
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
                    __getOrder();
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
</script>

<style lang="scss" scoped>
.card-space {
    padding: 20rpx;
    border-radius: 20rpx;
    background-color: #fff;
    margin-top: 20rpx;
}

.order-item-label {
    color: #999;
}

.order-info-steps {
    padding: 25rpx;
    background-color: #fff;
    border-radius: 0 0 20rpx 20rpx;
    overflow: hidden;
}

.order-info-content {
    .order-card {
        .order-card-item {
            align-items: center;
            display: flex;
            font-size: 24rpx;
            padding: 12rpx 0;
        }
    }

    .pay-card {
        font-size: 24rpx;
        .pay-card-item {
            padding: 20rpx 0;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f2f2f2;

            &:last-child {
                border-bottom: none;
                padding-bottom: 0;
            }
        }
    }

    .product-card {
        .product-card-item {
            display: flex;
            position: relative;
            margin-bottom: 20rpx;
            &:last-child {
                margin-bottom: 0;
            }

            .product-card-item-left {
                .left-img {
                    width: 160rpx;
                    height: 160rpx;
                    border-radius: 10rpx;
                    overflow: hidden;
                    margin-right: 20rpx;
                    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
                }
            }

            .product-card-item-right {
                font-size: 24rpx;

                .right-title {
                    font-weight: bold;
                }

                .right-price {
                    display: flex;
                    font-size: 28rpx;
                    padding-top: 20rpx;
                    .right-price-pricenum {
                        font-weight: bold;
                        color: $tig-color-primary;
                        padding-right: 10rpx;
                        :deep(.util) {
                            font-size: 22rpx;
                            font-weight: normal;
                        }
                    }

                    .right-price-quantity {
                        color: #999;
                    }
                }
            }
            .item-btn {
                position: absolute;
                right: 0;
                bottom: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 35rpx;
                padding: 15rpx 20rpx;
                border: 1px solid #f2f2f2;
                font-size: 24rpx;

                &:active {
                    background-color: #d9d9d9;
                }
            }
        }
    }

    .money-card {
        font-size: 24rpx;
        .money-card-item {
            display: flex;
            justify-content: space-between;
            padding: 20rpx 0;
            border-bottom: 1px solid #f2f2f2;
            &:last-child {
                padding-bottom: 0;
                border-bottom: none;
            }

            .order-item-price {
                font-weight: bold;
                color: $tig-color-primary;
                padding-right: 10rpx;
                font-size: 28rpx;
                :deep(.util) {
                    font-size: 22rpx;
                    font-weight: normal;
                }
            }
        }
    }
}

.order-info-btn {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .order-info-btn-box {
        display: flex;
        align-items: center;

        .btn {
            border-radius: 35rpx;
            padding: 15rpx 28rpx;
            border: 1px solid #f2f2f2;
            font-size: 24rpx;
            margin-right: 15rpx;
            &:active {
                background-color: #d9d9d9;
            }
        }
    }
}
</style>
