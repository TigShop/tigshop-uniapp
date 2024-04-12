<template>
    <view class="store-card" v-for="(item, index) in cartList" :key="index">
        <view class="store-card-item">
            <view class="store-card-item-title">
                <view class="store-card-item-label">自营</view>
                <!-- <view class="store-card-item-name">LYESC</view> -->
                <view class="store-card-item-name">{{ item.store_id === 0 ? "自营" : item.store_title }}</view>
            </view>
            <block v-for="(subItem, subIndex) in item.carts" :key="subIndex">
                <view class="store-card-item-content">
                    <navigator :url="'/pages/productDetail/index?id=' + subItem.product_id" class="flex">
                        <view class="store-card-item-content-left">
                            <image :src="imageFormat(subItem.pic_thumb)"></image>
                        </view>
                        <view class="store-card-item-content-right">
                            <view class="store-card-item-content-right-title">{{ subItem.product_name }}</view>
                            <view class="store-card-item-content-right-price">{{ priceFormat(Number(subItem.price)) }}</view>
                            <view class="store-card-item-content-right-num">x {{ subItem.quantity }}</view>
                        </view>
                    </navigator>
                </view>
            </block>
            <view class="payment">
                <view class="payment-title">配送方式</view>
                <view class="payment-content" @click="handleDistributionMode(index)">
                    <view class="payment-text">{{ getShippingTypeText(index) }}</view>
                    <image class="more-ico" src="/static/images/common/more.png"></image>
                </view>
            </view>
        </view>
        <popup v-model:show="show" title="选择配送方式">
            <view class="payment-popup">
                <view class="payment-btn">
                    <block v-for="(item, index) in shippingTypeList[shippingTypeIndex]" :key="item.shipping_type_id">
                        <view
                            class="payment-btn-item"
                            :class="{ active: getActive(index, item.shipping_type_id) }"
                            @click="handleShippingType(index, item.shipping_type_id)"
                            >{{ item.shipping_type_name }}</view
                        >
                    </block>
                </view>
                <view class="payment-desc">
                    <view class="payment-desc-title">{{ currentShippingType.shipping_type_name }}</view>
                    <view class="payment-desc-text"> {{ currentShippingType.shipping_time_desc }} {{ currentShippingType.shipping_type_desc }} </view>
                </view>

                <view class="button-position">
                    <van-button round type="danger" style="width: 100%" @click="handlecConfirm">确定</van-button>
                </view>
            </view>
        </popup>
    </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { CartList, StoreShippingType } from "@/types/order/check";
import { imageFormat, priceFormat, urlFormat } from "@/utils/format";
import popup from "@/components/popup/index.vue";
import { showFailToast } from "vant";
interface Props {
    cartList: CartList[];
    shippingTypeList: Array<StoreShippingType[]>;
    shippingType: Array<{ type_id: number; type_name: string; store_id: number }>;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:shippingType"]);
const show = ref(false);
const shippingTypeIndex = ref(0);
const currentShippingType = computed(() => {
    return props.shippingTypeList[shippingTypeIndex.value][currentIndex.value];
});
const getShippingTypeText = (index: number) => {
    return props.shippingType[index]?.type_name || "该收货地址不支持配送";
};

const handleDistributionMode = (index: number) => {
    if (props.shippingTypeList[index].length === 0) {
        return showFailToast("该收货地址不支持配送");
    }
    show.value = true;
    shippingTypeIndex.value = index;
};

const currentIndex = ref(0);
const getActive = (index: number, id: number) => {
    if(currentTypeID.value){
        return currentTypeID.value === id;
    }else {
        return props.shippingType[shippingTypeIndex.value]?.type_id === id;
    }
};
const currentTypeID = ref<null | number>();
const handleShippingType = (index: number, id: number) => {
    currentIndex.value = index;
    currentTypeID.value = id;
};
const handlecConfirm = () => {
    const list = JSON.parse(JSON.stringify(props.shippingType));
    const { shipping_type_id, shipping_type_name } = props.shippingTypeList[shippingTypeIndex.value][currentIndex.value];
    list[shippingTypeIndex.value].store_id = props.cartList[shippingTypeIndex.value].store_id;
    list[shippingTypeIndex.value].type_id = shipping_type_id;
    list[shippingTypeIndex.value].type_name = shipping_type_name;
    emit("update:shippingType", list);
    show.value = false;
};
</script>

<style lang="scss" scoped>
.payment {
    border-radius: 18rpx;
    background: #fff;
    margin-bottom: 20rpx;
    padding: 30rpx 0rpx 15rpx;

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

.store-card {
    box-sizing: border-box;
    background-color: #fff;
    padding: 20rpx;
    border-radius: 15rpx;
    margin-top: 20rpx;

    .store-card-item-title {
        min-height: 90rpx;
        display: flex;
        align-items: center;

        .store-card-item-label {
            background-color: #e93b3d;
            border-radius: 4rpx;
            color: #fff;
            font-size: 22rpx;
            height: 32rpx;
            line-height: 32rpx;
            margin-right: 20rpx;
            padding: 0 8rpx;
        }

        .store-card-item-name {
            font-weight: bold;
            color: #333;
            font-size: 28rpx;
        }
    }

    .store-card-item-content {
        padding: 20rpx 0 10rpx;
        .store-card-item-content-left {
            image {
                width: 150rpx;
                height: 150rpx;
                box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
            }
        }

        .store-card-item-content-right {
            padding-left: 18rpx;

            .store-card-item-content-right-price {
                font-size: 32rpx;
                line-height: 56rpx;
                font-weight: bold;
                color: #f23030;
                display: inline-block;
                margin-right: 10rpx;
            }

            .store-card-item-content-right-num {
                display: inline-block;
            }
        }

        .flex {
            display: flex;
        }
    }
}
</style>
