<template>
    <view class="order-info">
        <saveContentbox :specialNum="110">
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
                        <view class="shippingInfo-box" v-if="shippingInfo.length > 0">
                            <view class="shippingInfo-box-content" :class="{ dim: !showMore, 'more-height': showMore }">
                                <up-steps :current="0" dot activeColor="#39bf3e" direction="column">
                                    <up-steps-item v-for="(item, index) in shippingInfo" :key="index" :title="item.StatusDescription" :desc="item.Date">
                                    </up-steps-item>
                                </up-steps>
                            </view>
                            <view class="shippingInfo-btn" @click="showMore = !showMore"
                                >{{ showMore ? "收起" : "展开"
                                }}<uni-icons class="btn-icon" :class="{ rotate: showMore }" type="down" size="18" color="#999"></uni-icons
                            ></view>
                        </view>
                        <view class="emptyText" v-else>
                            {{ emptyText }}
                        </view>
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
                                    <tigButton :plain="true" v-if="!item.aftersales_item" @click="handleAfterSale(item.item_id)"> 申请售后 </tigButton>
                                    <tigButton :plain="true" v-else @click="handleAfterSaleDetail(item.aftersales_item.aftersale_id)"> 售后详情 </tigButton>
                                    <!-- <tigButton :plain="true" v-if="orderInfo.available_actions.cancel_order" @click="handleCancelOrder(orderInfo.order_id)"> 取消订单 </tigButton> -->
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
                <saveBottomBox
                    height="90"
                    backgroundColor="#fff"
                    v-if="
                        orderInfo.available_actions.cancel_order ||
                        orderInfo.available_actions.to_pay ||
                        orderInfo.available_actions.confirm_receipt ||
                        orderInfo.available_actions.to_aftersales
                    "
                >
                    <view class="order-info-btn">
                        <view class="order-info-btn-box">
                            <tigButton class="btn" :plain="true" v-if="orderInfo.available_actions.cancel_order" @click="handleCancelOrder(orderInfo.order_id)">
                                取消订单
                            </tigButton>
                            <tigButton class="btn" :plain="true" v-if="orderInfo.available_actions.to_pay" @click="handlePay(orderInfo.order_id)">
                                去付款
                            </tigButton>
                            <tigButton
                                class="btn"
                                :plain="true"
                                v-if="orderInfo.available_actions.confirm_receipt"
                                @click="handleConfirmReceipt(orderInfo.order_id)"
                            >
                                确认已收货
                            </tigButton>
                            <tigButton class="btn" :plain="true" v-if="orderInfo.available_actions.to_aftersales" @click="handleAfterSale(null)">
                                整单售后
                            </tigButton>
                        </view>
                    </view>
                </saveBottomBox>
            </block>
        </saveContentbox>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import { getOrder, cancelOrder, confirmReceipt, getShippingInfo } from "@/api/user/order";
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
const showMore = ref(false);

const id = ref<null | number>();
onLoad((option: any) => {
    if (option && option.id) {
        id.value = option.id;
        __getOrder();
        __getShippingInfo();
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

const shippingInfo = ref<any>([]);
const emptyText = ref<string>("");
const __getShippingInfo = async () => {
    try {
        const result = await getShippingInfo({ id: id.value });
        if (typeof result.list === "string") {
            emptyText.value = result.list;
        } else {
            shippingInfo.value = result.list;
        }
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

const handleAfterSale = (item_id: null | number) => {
    if (item_id) {
        uni.navigateTo({
            url: `/pages/user/afterSale/edit?item_id=${item_id}&order_id=${orderInfo.value.order_id}`
        });
    } else {
        uni.navigateTo({
            url: `/pages/user/afterSale/edit?order_id=${orderInfo.value.order_id}`
        });
    }
};

const handleAfterSaleDetail = (id: number) => {
    uni.navigateTo({
        url: `/pages/user/afterSale/info?id=${id}`
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
        padding-right: 15rpx;
    }
}

.shippingInfo-box {
    padding: 20rpx;
    .shippingInfo-box-content {
        height: 400rpx;
        overflow: hidden;
        position: relative;

        &.dim::after {
            width: 100%;
            height: 200rpx;
            content: "";
            position: absolute;
            left: 0;
            bottom: 0rpx;
            background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 80%);
        }

        &.more-height {
            height: auto;
        }
    }

    .shippingInfo-btn {
        display: flex;
        flex-direction: row;
        justify-content: center;

        .btn-icon {
            &.rotate {
                transition: all 0.3s;
                transform: rotate(180deg);
            }
        }
    }
}

.emptyText {
    padding-top: 15rpx;
}
</style>
