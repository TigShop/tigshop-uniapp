<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="page-loading" v-if="loading">
            <view class="ico"></view>
        </view>
        <view class="order-pay-warp" v-if="order">
            <view class="order_infos">
                <view class="order_amount">
                    <FormatPrice :priceData="order.unpaid_amount"></FormatPrice>
                </view>
                <view class="order_sn">
                    订单号：
                    <text>{{ order.order_sn }}</text>
                </view>
            </view>
            <view class="pay-list">
                <radio-group class="radio-group" @change="paymentChange">
                    <van-radio-group v-model="paymentType">
                        <block v-for="(payment, idx) in paymentList" :key="idx">
                            <view class="item">
                                <van-radio :name="payment" checked-color="#ee0a24">{{ payment }}</van-radio>
                            </view>
                        </block>
                    </van-radio-group>
                </radio-group>
            </view>
            <block v-if="paymentType === 'offline'">
                <view>
                    <van-tabs v-model:active="activeName" swipeable>
                        <van-tab title="银行汇款">
                            <view class="offline-content">
                                <rich-text :nodes="offline_payment_list?.offline_pay_bank"></rich-text>
                            </view>
                        </van-tab>
                        <van-tab title="企业汇款">
                            <view class="offline-content">
                                <rich-text :nodes="offline_payment_list?.offline_pay_company"></rich-text>
                            </view>
                        </van-tab>
                    </van-tabs>
                </view>
            </block>
            <view class="other-info">
                <view class="tit">其它信息</view>
                <view class="item">
                    支付方式：
                    <text>在线支付</text>
                </view>
                <view class="item">
                    配送方式：
                    <text>{{ order.shipping_type_name || "专线物流" }}</text>
                </view>
                <view class="item">
                    下单时间：
                    <text>{{ order.add_time }}</text>
                </view>
            </view>
            <view class="pay-btn-warp x_bottom_fix">
                <view class="pay-btn">
                    <van-button :disabled="paymentDisabled" round block type="danger" size="normal" style="height: 100%" @click="handlePay">
                        立即支付
                    </van-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { showFailToast } from "vant";
import { orderPayInfo, creatPay } from "@/api/order/pay";
import type { Order, OfflinePaymentList } from "@/types/order/pay";
const parameter = {
    navbar: "1",
    return: "1",
    title: "订单支付"
};
const loading = ref(false);
const paymentList = ref<string[]>();
const paymentDisabled = ref(false);
const offline_payment_list = ref<OfflinePaymentList>();
const paymentType = ref("wechat");
const order = ref<Order>();
const activeName = ref("银行汇款");

const orderId = ref<number | null>(null);
onLoad((options) => {
    if (options && options.order_id) {
        orderId.value = options.order_id;
        loadOrderPayInfo();
    }
});

const loadOrderPayInfo = async () => {
    loading.value = true;
    try {
        if (orderId.value) {
            const result = await orderPayInfo(orderId.value);
            order.value = result.order;
            paymentList.value = result.payment_list;
            offline_payment_list.value = result.offline_payment_list;
        }
    } catch (error: any) {
        console.error(error.message);
        showFailToast(error.message);
        // 跳转用户订单页面
    } finally {
        loading.value = false;
    }
};

const paymentChange = () => {};
const handlePay = async () => {
    paymentDisabled.value = true;

    try {
        if (orderId.value) {
            const result = await creatPay({
                id: orderId.value,
                type: paymentType.value
            });
        }
    } catch (error: any) {
        console.error(error);
        showFailToast(error.message);
    } finally {
        paymentDisabled.value = false;
    }
};
</script>

<style lang="scss" scoped>
:deep(.van-tabs__line) {
    background: #ee0a24;
}
.order-pay-warp {
    padding-bottom: 100rpx;
}
.order_infos {
    text-align: center;
    background: #fff;
    padding: 50rpx 0 60rpx;
    border-radius: 0 0 18rpx 18rpx;
}
.order_infos .order_amount {
    color: #777;
}
.order_infos .price {
    font-size: 46rpx;
    color: #f23030;
    font-weight: bold;
    :deep(.util) {
        font-size: 30rpx;
        font-weight: normal;
        position: relative;
        top: -5rpx;
    }
}
.order_infos .order_sn {
    color: #888;
    font-size: 24rpx;
    padding-top: 20rpx;
}
.order_infos .order_sn text {
    color: #333;
}

.pay-list {
    background: #fff;
    padding: 30rpx 36rpx 15rpx;
    border-radius: 18rpx;
    margin-top: 40rpx;
}
.pay-list .item:last-child {
    border: 0;
}
.pay-list .item {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100rpx;
    border-bottom: 1rpx solid #eee;
    padding-top: 20rpx;
    // margin-bottom: 20rpx;
}
.pay-list .item .bank_img {
    width: 66rpx;
    display: block;
    position: absolute;
    left: 4rpx;
    top: 20rpx;
}
.pay-list .item .bank_img image {
    width: 60rpx;
    height: 60rpx;
}
.pay-list .item radio {
    position: absolute;
    right: 20rpx;
    top: 30rpx;
}
.pay-list .item .pay-title {
    position: absolute;
    left: 100rpx;
    top: 14rpx;
    color: #333;
    font-size: 30rpx;
}
.pay-list .item .pay-info {
    position: absolute;
    left: 100rpx;
    top: 60rpx;
    color: #999;
    font-size: 22rpx;
}

.other-info {
    background: #fff;
    padding: 30rpx 36rpx 30rpx;
    border-radius: 18rpx;
    margin-top: 40rpx;
}
.other-info .tit {
    font-size: 22rpx;
    font-weight: bold;
}
.other-info .item {
    color: #888;
    font-size: 24rpx;
    padding-top: 20rpx;
}
.other-info .item text {
    color: #333;
}

.pay-btn-warp {
    position: fixed;
    display: block;
    background: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
}
.pay-btn-warp .pay-btn {
    text-align: center;
    height: 80rpx;
    line-height: 80rpx;
    padding: 0;
    display: block;
    margin: 20rpx 30rpx;
}
.offline-content {
    padding: 20rpx;
}
</style>
