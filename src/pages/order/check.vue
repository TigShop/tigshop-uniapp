<template>
    <view style="height: 100%">
        <navbar :parameter="parameter"></navbar>
        <view class="page-loading" v-if="myLoading && Object.keys(addressList).length === 0">
            <view class="ico"></view>
        </view>
        <view v-if="Object.keys(addressList).length > 0">
            <addressInfo :data="getAddressInfo"></addressInfo>
            <paymentMode v-model:payTypeId="formState.pay_type_id" :availablePaymentType="availablePaymentType"></paymentMode>
            <stroeCArd v-model:shippingType="formState.shipping_type" :cartList="cartList" :shippingTypeList="shippingTypeList"></stroeCArd>
            <couponInfo :couponAmount="totalData?.coupon_amount ?? 0" :couponList="couponList" v-model:useCouponIds="formState.use_coupon_ids" @sendBalanceStatus="getBalanceStatus"></couponInfo>
            <invoiceInfo></invoiceInfo>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import addressInfo from "./src/addressInfo.vue";
import paymentMode from "./src/paymentMode.vue";
import stroeCArd from "./src/stroeCArd.vue";
import couponInfo from "./src/couponInfo.vue";
import invoiceInfo from "./src/invoiceInfo.vue";
import { computed, reactive, ref, watch } from "vue";
import { getOrderCheckData, updateOrderCheckData } from "@/api/order/check";
import { onShow } from "@dcloudio/uni-app";
import type { AddressList, AvailablePaymentType, CartList, Total, StoreShippingType } from "@/types/order/check";
import { Toast } from "vant";
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
        console.log(newVal)
        updateOrderCheck();
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
const couponList = ref<any>([])
const balanceNum = ref(0)

const getOrderInfo = async () => {
    uni.showLoading({
        title: "加载中"
    });
    // myLoading.value = true;
    try {
        const result = await getOrderCheckData();
        Object.assign(formState, result.item);
        const { address_list, available_payment_type, cart_list, total, store_shipping_type, coupon_list, balance } = result;
        addressList.value = address_list;
        availablePaymentType.value = available_payment_type;
        cartList.value = cart_list;
        totalData.value = total;
        shippingTypeList.value = store_shipping_type;
        couponList.value = coupon_list;
        balanceNum.value = balance
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
        availablePaymentType.value = result.available_payment_type
        shippingTypeList.value = result.store_shipping_type
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
};

onShow(() => {
    getOrderInfo();
});
</script>

<style lang="scss" scoped></style>
