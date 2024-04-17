<template>
    <view style="height: 100%; padding-bottom: 100rpx; overflow: hidden; overflow-y: auto">
        <navbar :parameter="parameter"></navbar>
        <view class="page-loading" v-if="myLoading && Object.keys(addressList).length === 0">
            <view class="ico"></view>
        </view>
        <view v-if="Object.keys(addressList).length > 0">
            <addressInfo :data="getAddressInfo"></addressInfo>
            <paymentMode v-model:payTypeId="formState.pay_type_id" :availablePaymentType="availablePaymentType" @change="updateOrderCheck"></paymentMode>
            <stroeCard
                v-model:shippingType="formState.shipping_type"
                :cartList="cartList"
                :shippingTypeList="shippingTypeList"
                @change="updateOrderCheck"
            ></stroeCard>
            <couponInfo
                :balance="balanceNum ?? 0"
                :points="pointsData"
                :availablePoints="availablePoints"
                :pointsAmount="totalData?.points_amount ?? 0"
                :couponAmount="totalData?.coupon_amount ?? 0"
                :couponList="couponList"
                v-model:useCouponIds="formState.use_coupon_ids"
                v-model:use-point="formState.use_point"
                @sendBalanceStatus="getBalanceStatus"
                @change="updateOrderCheck"
            ></couponInfo>
            <invoiceInfo></invoiceInfo>
            <totalCard :total="totalData"></totalCard>
            <view class="submit-btn">
                <!-- <view class="submit-btn-price">{{ totalData?.unpaid_amount }}</view> -->
                <view class="submit-btn-price">
                    <FormatPrice class="price" :priceData="totalData?.unpaid_amount"></FormatPrice>
                </view>
                <view>
                    <van-button
                        :loading="submitLoading"
                        loading-type="spinner"
                        round
                        block
                        type="danger"
                        size="normal"
                        style="width: 260rpx; height: 70rpx"
                        @click="submit"
                    >
                        提交
                    </van-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import addressInfo from "./src/addressInfo.vue";
import paymentMode from "./src/paymentMode.vue";
import stroeCard from "./src/stroeCard.vue";
import couponInfo from "./src/couponInfo.vue";
import invoiceInfo from "./src/invoiceInfo.vue";
import totalCard from "./src/totalCard.vue";
import FormatPrice from "@/components/format/Price.vue";
import { computed, reactive, ref, watch } from "vue";
import { getOrderCheckData, updateOrderCheckData, orderSubmit } from "@/api/order/check";
import { onShow } from "@dcloudio/uni-app";
import type { AddressList, AvailablePaymentType, CartList, Total, StoreShippingType } from "@/types/order/check";
import { Toast, showFailToast } from "vant";
const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "提交订单"
});
const myLoading = ref(false);

// 当前结算表单数据
const formState = reactive({
    shipping_type: [],
    pay_type_id: 1,
    use_point: 0,
    use_balance: 0,
    use_coupon_ids: [],
    buyer_note: ""
});
watch(
    formState,
    (newVal) => {
        console.log(newVal);
        // updateOrderCheck();
    },
    {
        deep: true
    }
);

const addressList = ref<AddressList[]>([]);
const availablePaymentType = ref<AvailablePaymentType[]>([]);
const cartList = ref<CartList[]>([]);
const totalData = ref<Total>();
const shippingTypeList = ref<Array<StoreShippingType[]>>([]);
const couponList = ref<any>([]);
const balanceNum = ref(0);
const pointsData = ref(0);
const availablePoints = ref(0);

const getOrderInfo = async () => {
    uni.showLoading({
        title: "加载中"
    });
    // myLoading.value = true;
    try {
        const result = await getOrderCheckData();
        Object.assign(formState, result.item);
        const { address_list, available_payment_type, cart_list, total, store_shipping_type, coupon_list, balance, points, available_points } = result;
        addressList.value = address_list;
        availablePaymentType.value = available_payment_type;
        cartList.value = cart_list;
        totalData.value = total;
        shippingTypeList.value = store_shipping_type;
        couponList.value = coupon_list;
        balanceNum.value = balance;
        pointsData.value = points;
        availablePoints.value = available_points;
    } catch (error) {
        console.error(error);
    } finally {
        uni.hideLoading();
        // myLoading.value = false;
    }
};
const getAddressInfo = computed(() => {
    return addressList.value.find((item) => item.is_selected === 1) || {};
});

const updateOrderCheck = async (type = "") => {
    uni.showLoading({
        title: "加载中"
    });
    try {
        const result = await updateOrderCheckData(type, formState);
        totalData.value = result.total;
        availablePaymentType.value = result.available_payment_type;
        shippingTypeList.value = result.store_shipping_type;
        return result;
    } catch (error: any) {
        Toast(error.message);
    } finally {
        uni.hideLoading();
    }
};

const getBalanceStatus = (status: boolean) => {
    if (status) {
        formState.use_balance = balanceNum.value;
    } else {
        formState.use_balance = 0;
    }
    updateOrderCheck();
};
const submitLoading = ref(false);
const submit = async () => {
    if (submitLoading.value) return;
    if (formState.pay_type_id === 0) return showFailToast("请选择付款方式");
    if (formState.shipping_type.length === 0) return showFailToast("请选择配送方式");
    submitLoading.value = true;
    try {
        const result = await orderSubmit(formState);
    } catch (error) {
        console.error(error);
    } finally {
        submitLoading.value = false;
    }
};

onShow(() => {
    getOrderInfo();
});
</script>

<style lang="scss" scoped>
.submit-btn {
    background-color: #fff;
    width: 100%;
    height: 100rpx;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: env(safe-area-inset-bottom);
    border-top: 1rpx solid #f5f5f5;

    .submit-btn-price {
        color: #f23030;
        font-size: 40rpx;
        font-weight: bold;
    }
}
</style>
