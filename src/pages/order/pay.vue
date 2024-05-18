<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="page-loading" v-if="loading">
            <view class="ico"></view>
        </view>
        <view class="order-pay-warp" v-if="order">
            <view class="order_infos">
                <view class="order_amount">
                    <block v-if="typeText !== 'recharge'">
                        <FormatPrice :priceData="order.unpaid_amount"></FormatPrice>
                    </block>
                    <block v-else>
                        <FormatPrice :priceData="order.amount"></FormatPrice>
                    </block>
                </view>
                <view class="order_sn">
                    订单号：
                    <text>{{ order.order_sn }}</text>
                </view>
            </view>
            <block v-if="paymentList?.length > 1">
                <payment v-model="paymentType" :paymentList="paymentList"></payment>
            </block>

            <block v-if="paymentType === 'offline'">
                <offline :offline_payment_list="offline_payment_list"></offline>
            </block>
            <block v-if="typeText !== 'recharge'">
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
            </block>

            <saveBottomBox height="110" backgroundColor="#fff" v-if="!(paymentType === 'offline')">
                <view class="btn-box">
                    <tigButton style="width: 100%; height: 70rpx" :disabled="paymentDisabled" @click="handlePay"> 立即支付</tigButton>
                </view>
            </saveBottomBox>
        </view>
        <!-- #ifdef H5 -->
        <div ref="formContainer"></div>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import payment from "./src/payment.vue";
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import offline from "./src/offline.vue";
import { onLoad } from "@dcloudio/uni-app";
import { onBeforeUnmount, reactive, ref } from "vue";
import { orderPayInfo, creatPay, checkPayStatus, rechargeOrderPay, rechargeOrderCreate } from "@/api/order/pay";
import type { Order, OfflinePaymentList } from "@/types/order/pay";
import { useConfigStore } from "@/store/config";
const configStore = useConfigStore();
const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "订单支付",
    returnUrl: "/pages/user/order/list"
});

const loading = ref(false);
const paymentList = ref<string[]>([]);
const paymentDisabled = ref(false);
const offline_payment_list = ref<OfflinePaymentList>({} as OfflinePaymentList);
const paymentType = ref("wechat");
const order = ref<Order>();
const formContainer = ref<HTMLElement | null>(null);
const typeText = ref("");

const orderId = ref<number | null>(null);
onLoad((options) => {
    if (options && options.order_id) {
        console.log(options);
        if (!options.type) {
            loadOrderPayInfo(options.order_id);
        } else {
            typeText.value = options.type;
            parameter.title = "充值支付";
            getRechargeOrderPay(options.order_id);
        }
    }
});

// 订单信息
const loadOrderPayInfo = async (id: number) => {
    loading.value = true;
    try {
        const result = await orderPayInfo(id);
        order.value = result.order;
        paymentList.value = result.payment_list;
        paymentType.value = paymentList.value[0];
        offline_payment_list.value = result.offline_payment_list;
        orderId.value = result.order.order_id;
    } catch (error: any) {
        console.error(error.message);
        uni.showToast({
            title: error.message,
            duration: 1500,
            icon: "none"
        });

        uni.redirectTo({
            url: "/pages/user/order/list?type=await_pay"
        });
    } finally {
        loading.value = false;
    }
};

// 充值信息
const getRechargeOrderPay = async (id: number) => {
    try {
        const result = await rechargeOrderPay({ order_id: id });
        order.value = result.order;
        paymentList.value = result.payment_list;
        paymentType.value = paymentList.value[0];
        orderId.value = result.order.order_id;
    } catch (error: any) {
        console.error(error.message);
        uni.showToast({
            title: error.message,
            duration: 1500,
            icon: "none"
        });
        uni.navigateBack();
    } finally {
        loading.value = false;
    }
};

let intervalId: any = null; // 存储定时器 ID，便于后续清除
const count = ref(0);
const handlePay = async () => {
    paymentDisabled.value = true;

    try {
        if (orderId.value) {
            let result;
            if (typeText.value === "recharge") {
                result = await rechargeOrderCreate({
                    id: orderId.value,
                    type: paymentType.value
                });
            } else {
                result = await creatPay({
                    id: orderId.value,
                    type: paymentType.value
                });
            }

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

            //每隔三秒检查支付状态，超过20次则认为支付失败
            intervalId = setInterval(() => {
                __checkPayStatus();
                count.value++;
                if (count.value === 50) {
                    clearInterval(intervalId!); // 清除定时器，停止执行
                    uni.showToast({
                        title: "支付已超时",
                        duration: 1500,
                        icon: "none"
                    });
                    uni.redirectTo({
                        url: "/pages/user/order/list?type=await_pay"
                    });
                }
            }, 2000);
        }
    } catch (error: any) {
        console.error(error);
        uni.showToast({
            title: error.message,
            duration: 1500,
            icon: "none"
        });

        uni.redirectTo({
            url: "/pages/user/order/list?type=await_pay"
        });
    } finally {
        paymentDisabled.value = false;
    }
};

const __checkPayStatus = async () => {
    try {
        const result = await checkPayStatus({ id: orderId.value });
        if (result.pay_status == 1) {
            clearInterval(intervalId);
        }
    } catch (error) {
        console.error(error);
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
                uni.redirectTo({
                    url: "/pages/user/order/list?type=await_pay"
                });
            }, 1500);
        },
        fail(e) {
            uni.showToast({
                title: "支付失败",
                duration: 1500,
                icon: "none"
            });
            setTimeout(() => {
                uni.redirectTo({
                    url: "/pages/user/order/list?type=await_pay"
                });
            }, 1500);
        }
    });
};

onBeforeUnmount(() => {
    clearInterval(intervalId);
});

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
.btn-box {
    padding: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
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
    font-size: 46rpx;
    color: $tig-color-primary;
    font-weight: bold;
    :deep(.util) {
        font-size: 30rpx;
        font-weight: normal;
        position: relative;
        top: -5rpx;
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

    .offline-menu {
        height: 100rpx;
        width: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        box-sizing: content-box;
        margin-bottom: 15rpx;

        .offline-menu-item {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28rpx;
            color: #999;
            position: relative;

            &.active {
                color: #333;
                font-weight: bold;

                &:after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    height: 5rpx;
                    width: 80rpx;
                    background-color: #e93b3d;
                    border-radius: 10rpx;
                }
            }
        }
    }
}
.offline-content {
    padding: 20rpx;
    line-height: 45rpx;
}
</style>
