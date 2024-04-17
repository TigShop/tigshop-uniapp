<template>
    <view>
        <view class="payment">
            <view class="payment-title">支付方式</view>
            <view class="payment-content" @click="handlePaymentMode">
                <view class="payment-text">{{ paymentTypeText }}</view>
                <image class="more-ico" src="/static/images/common/more.png"></image>
            </view>
        </view>

        <popup v-model:show="show" title="选择支付方式">
            <view class="payment-popup">
                <view class="payment-btn">
                    <block v-for="(item, index) in availablePaymentType" :key="item.type_id">
                        <view
                            class="payment-btn-item"
                            :class="{ active: getActive(index, item.type_id), disabled: item.disabled }"
                            @click="handlePaymentType(index, item.disabled)"
                            v-if="item.is_show"
                            >{{ item.type_name }}</view
                        >
                    </block>
                </view>
                <view class="payment-desc">
                    <view class="payment-desc-title">在线支付</view>
                    <view class="payment-desc-text"> 支持微信即时到账（绝大数银行借记卡及部分银行信用卡） </view>
                </view>

                <view class="button-position">
                    <van-button round type="danger" style="width: 100%" @click="handlecConfirm">确定</van-button>
                </view>
            </view>
        </popup>
    </view>
</template>

<script setup lang="ts">
import popup from "@/components/popup/index.vue";
import { ref, watch } from "vue";
import type { AvailablePaymentType } from "@/types/order/check";
import { showFailToast } from "vant";
interface Props {
    availablePaymentType: AvailablePaymentType[];
    payTypeId: number;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:payTypeId", "change"]);

watch(
    () => props.availablePaymentType,
    () => {
        const data: AvailablePaymentType[] = props.availablePaymentType.filter((item) => item.disabled);
        if (data[0] && data[0].type_id === props.payTypeId) {
            emit("update:payTypeId", 0);
            currentIndex.value = null;
            paymentTypeText.value = data[0].disabled_desc;
            showFailToast(data[0].disabled_desc);
        }
    }
);

const paymentTypeText = ref(props.availablePaymentType[0].type_name);

const show = ref(false);
const currentIndex = ref<null | number>();
const getActive = (index: number, id: number) => {
    if (currentIndex.value !== null && currentIndex.value !== undefined && currentIndex.value >= 0) {
        return currentIndex.value === index;
    } else {
        return id === props.payTypeId;
    }
};
const handlePaymentType = (index: number, disabled: boolean) => {
    if (disabled) return;
    currentIndex.value = index;
};
const handlePaymentMode = () => {
    show.value = true;
};

const handlecConfirm = () => {
    if (currentIndex.value !== null && currentIndex.value !== undefined && currentIndex.value >= 0) {
        paymentTypeText.value = props.availablePaymentType[currentIndex.value].type_name;
        emit("update:payTypeId", props.availablePaymentType[currentIndex.value].type_id);
        emit("change")
        show.value = false;
    } else {
        showFailToast("请选择付款方式");
    }
};
</script>

<style lang="scss" scoped>
.payment {
    border-radius: 18rpx;
    background: #fff;
    margin-bottom: 20rpx;
    padding: 30rpx 32rpx 35rpx;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .payment-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .more-ico {
        width: 36rpx;
        height: 36rpx;
        padding-left: 10rpx;
    }
}

.payment-popup {
    padding: 40rpx 40rpx 0;

    .payment-btn {
        display: flex;
        margin-bottom: 40rpx;
        .payment-btn-item {
            background: #f2f2f2;
            color: #282828;
            padding: 13rpx 36rpx;
            border-radius: 50rpx;
            font-size: 25rpx;
            display: inline-block;
            margin-right: 28rpx;
            margin-bottom: 10rpx;

            &.active {
                color: #fff;
                background-color: #ff3700;
            }

            &.disabled {
                color: #bbb;
            }
        }
    }

    .payment-desc {
        border-top: 1rpx solid #f2f2f2;
        padding-top: 20rpx;

        .payment-desc-text {
            font-weight: bold;
        }
    }

    .button-position {
        position: fixed;
        bottom: 30rpx;
        left: 0;
        right: 0;
        padding: 0 30rpx;
        padding-bottom: env(safe-area-inset-bottom) !important;
    }
}
</style>
