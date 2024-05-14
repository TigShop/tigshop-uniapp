<template>
    <view class="paymentType">
        <view class="pay-list">
            <radio-group class="radio-group" @change="paymentChange">
                <block v-for="(payment, idx) in paymentList" :key="idx">
                    <view class="item">
                        <view class="payment-info">
                            <view class="payment-info-text">
                                {{ paymentText[payment!] }}
                            </view>

                            <image v-if="payment !== 'offline'" class="payment-info-img" :src="'/src/static/images/payment/pay_' + payment + '.png'"></image>
                        </view>
                        <radio
                            :value="payment"
                            activeBackgroundColor="#ee0a24"
                            :checked="payment === modelValue"
                            style="margin-right: 20rpx; transform: scale(0.9)"
                        ></radio>
                    </view>
                </block>
            </radio-group>
        </view>
    </view>
</template>

<script setup lang="ts">
interface Props {
    paymentList: string[];
    modelValue: string;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
interface PaymentText {
    [key: string]: string;
}
const paymentText: PaymentText = {
    wechat: "微信支付",
    alipay: "支付宝支付",
    offline: "线下支付"
};

const paymentChange = (e: any) => {
    emit("update:modelValue", e.detail.value);
};
</script>

<style lang="scss" scoped>
.pay-list {
    background: #fff;
    padding: 5rpx 36rpx 15rpx;
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
    display: flex;
    align-items: center;
    justify-content: space-between;

    .payment-info {
        display: flex;
        align-items: center;

        .payment-info-text {
            min-width: 145rpx;
        }

        .payment-info-img {
            width: 66rpx;
            height: 66rpx;
        }
    }
}
</style>
