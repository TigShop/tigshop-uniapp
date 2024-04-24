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
            <block v-if="paymentList?.length > 1">
                <view class="pay-list">
                    <radio-group class="radio-group" @change="paymentChange">
                        <van-radio-group v-model="paymentType">
                            <block v-for="(payment, idx) in paymentList" :key="idx">
                                <view class="item">
                                    <view class="payment-info">
                                        <view class="payment-info-text">
                                            {{ paymentText[payment] }}
                                        </view>

                                        <image
                                            v-if="payment !== 'offline'"
                                            class="payment-info-img"
                                            :src="'/src/static/images/payment/pay_' + payment + '.png'"
                                        ></image>
                                    </view>
                                    <van-radio :name="payment" checked-color="#ee0a24"> </van-radio>
                                </view>
                            </block>
                        </van-radio-group>
                    </radio-group>
                </view>
            </block>

            <block v-if="paymentType === 'offline'">
                <view class="offline-warp">
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
        <!-- #ifdef H5 -->
        <div ref="formContainer"></div>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";
import { orderPayInfo, creatPay } from "@/api/order/pay";
import type { Order, OfflinePaymentList } from "@/types/order/pay";
import { useConfigStore } from "@/store/config";
const configStore = useConfigStore();
const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "订单支付",
    returnUrl: "/pages/order/list"
});
const loading = ref(false);
const paymentList = ref<string[]>([]);
const paymentDisabled = ref(false);
const offline_payment_list = ref<OfflinePaymentList>();
const paymentType = ref("wechat");
const order = ref<Order>();
const activeName = ref("银行汇款");
const formContainer = ref<HTMLElement | null>(null);

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
            if (paymentList.value.length === 1) {
                paymentType.value = paymentList.value[0];
            }
            offline_payment_list.value = result.offline_payment_list;
        }
    } catch (error: any) {
        console.error(error.message);
        uni.showToast({
            title: error.message,
            duration: 1500,
            icon: 'none'
        });
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
            // 支付宝
            if (paymentType.value === "alipay") {
                alipay(result.pay_info.html);
            }

            // 微信
            if (paymentType.value === "wechat") {
                // onBridgeReady(result.pay_info);

                if (configStore.XClientType === "h5") {
                    // #ifdef APP-PLUS
                    plus.runtime.openURL(result.pay_info.url);
                    // #endif

                    // #ifdef H5
                    window.location.href = result.pay_info.url;
                    // #endif
                } else if (configStore.XClientType === "miniProgram") {
                    miniProgramPay(result.pay_info);
                }
            }
        }
    } catch (error: any) {
        console.error(error);
        uni.showToast({
            title: error.message,
            duration: 1500,
            icon: 'none'
        });
    } finally {
        paymentDisabled.value = false;
    }
};

const alipay = (html: string) => {
    if (formContainer.value) {
        formContainer.value.innerHTML = html;
        // 提交表单
        document.forms["alipaysubmit"]!.submit();
    }
};

/* 微信小程序调用 */
const miniProgramPay = (pay_info: any) => {
    uni.requestPayment({
        provider: "wxpay",
        orderInfo: {
            timeStamp: String(pay_info.timestamp),
            nonceStr: pay_info.nonceStr,
            package: "prepay_id=" + pay_info.prepay_id,
            signType: pay_info.signType,
            paySign: pay_info.paySign
        },
        success(res) {
            uni.showToast({
                title: "支付成功",
                duration: 1500
            });
            setTimeout(function () {
                // uni.redirectTo()
            }, 1500);
        },
        fail(e) {
            uni.showToast({
                title: "支付失败",
                duration: 1500,
                icon: 'none'
            });
            setTimeout(() => {
                console.log("跳转用户订单页面");
                // uni.redirectTo()
            }, 1500);
        }
    });
};

/* 微信公众号调用 */

// const onBridgeReady = (pay_info: any) => {
//     WeixinJSBridge.invoke(
//         "getBrandWCPayRequest",
//         {
//             ...pay_info
//         },
//         function (res) {
//             if (res.err_msg == "get_brand_wcpay_request:ok") {
//                 // 使用以上方式判断前端返回,微信团队郑重提示：
//                 //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
//             }
//         }
//     );
// };
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
    display: flex;
    align-items: center;
    justify-content: space-between;

    .payment-info {
        display: flex;
        align-items: center;

        .payment-info-text {
            min-width: 110rpx;
        }

        .payment-info-img {
            width: 66rpx;
            height: 66rpx;
        }
    }
}

.other-info {
    background: #fff;
    padding: 30rpx 36rpx 30rpx;
    border-radius: 18rpx;
    margin-top: 20rpx;
    margin-bottom: 40rpx;
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
.offline-warp {
    border-radius: 20rpx;
    padding: 10rpx;
    background-color: #fff;
    margin: 20rpx 0 0;
    overflow: hidden;
}
.offline-content {
    padding: 20rpx;
    line-height: 45rpx;
}
</style>
