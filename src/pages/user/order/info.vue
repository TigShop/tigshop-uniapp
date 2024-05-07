<template>
    <view class="order-info">
        <navbar :parameter="parameter"></navbar>
        <view class="order-info-steps">
            <uni-steps :options="orderInfo.step_status.steps" :active="orderInfo.step_status.current" />
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
            <view class="expressage-card card-space">
                <view class=""> 快递公司 </view>
            </view>
            <view class="pay-card card-space">
                <view class="pay-card-item">
                    <text class="order-item-label">收货信息：</text>
                    <text>{{ orderInfo.user_address }} {{ orderInfo.consignee }} {{ orderInfo.mobile }}</text>
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
                <view class="product-card-item">
                    <view calss="">

                    </view>
                </view>
            </view>
            <view class="money-card card-space"></view>
        </view>
        <view class="order-info-btn"> </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import { getOrder } from "@/api/user/order";
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
    try {
        const result = await getOrder({ id: id.value });
        orderInfo.value = result.item;
    } catch (error) {
        console.error(error);
    }
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
            padding: 12rpx 0;
        }
    }
    
}
</style>
