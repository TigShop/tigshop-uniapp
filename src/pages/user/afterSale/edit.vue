<template>
    <view class="after-sale">
        <view class="after-sale-product">
            <block v-for="item in infoData.list" :key="item.item_id">
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
                    <view class="btn-box">
                        <view class="btn-box-content">
                            <text class="btn-box-content-text">可退换数量{{ item.quantity }}</text>
                            <uni-number-box :max="item.quantity" v-model="item.number" />
                        </view>
                    </view>
                </view>
            </block>
        </view>

        <view class="after-sale-form">
            <uni-forms ref="formRef" :modelValue="form" label-width="170rpx">
                <uni-forms-item label="退款方式：" name="regionNames">
                    <!-- <uni-easyinput
                        style="background-color: #fff"
                        suffixIcon="right"
                        primaryColor="rgb(192, 196, 204)"
                        :inputBorder="false"
                        v-model="aftersale_type_text"
                        placeholder="请选择"
                    /> -->
                    <picker @change="getAftersaleType" :value="aftersaleTypeIndex" range-key="label" :range="aftersale_type_list">
                        <view class="uni-input">{{ aftersaleTypeIndex ? aftersale_type_list[aftersaleTypeIndex!].label : "请选择" }}</view>
                    </picker>
                </uni-forms-item>
            </uni-forms>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive } from "vue";
import { getAftersalesEdit } from "@/api/user/afterSale";
import type { afterSaleEditResponse } from "@/types/user/afterSale";
const orderId = ref<number | null>();
const itemId = ref<number | null>();
onLoad((options) => {
    if (options && options.order_id) {
        orderId.value = options.order_id;
        itemId.value = options.item_id;
        __getAftersalesEdit();
    }
});

const infoData = ref<afterSaleEditResponse>({} as afterSaleEditResponse);
const aftersale_type_list = ref([
    {
        value: 1,
        label: "仅退款"
    },
    {
        value: 2,
        label: "退货退款"
    }
]);
const __getAftersalesEdit = async () => {
    try {
        if (orderId.value) {
            const result = await getAftersalesEdit({
                item_id: itemId.value,
                order_id: orderId.value
            });
            infoData.value = result;
            infoData.value.list.forEach((item) => {
                item.number = item.quantity;
            });
        }
    } catch (error) {
        console.error(error);
    }
};

interface Iform {
    pics_list: any[];
    items: Item[];
    pics: any[];
    refund_amount: string;
    refund_amount_max: string;
    order_id: number;
    aftersale_type: number;
    aftersale_reason: string;
    description: string;
}

interface Item {
    order_item_id: number;
    number: number;
}
const form = reactive<Iform>({
    pics_list: [],
    items: [],
    pics: [],
    refund_amount: "",
    refund_amount_max: "",
    order_id: 0,
    aftersale_type: 0,
    aftersale_reason: "",
    description: ""
});

const aftersaleTypeIndex = ref<null | number>();

const getAftersaleType = (e: any) => {
    aftersaleTypeIndex.value = e.detail.value;
    form.aftersale_type = aftersale_type_list.value[aftersaleTypeIndex.value!].value;
};
</script>

<style lang="scss" scoped>
.after-sale {
    .after-sale-product {
        background-color: #fff;
        border-radius: 20rpx;
        padding: 20rpx;
        margin-bottom: 20rpx;

        .product-card-item {
            display: flex;
            position: relative;
            margin-bottom: 25rpx;
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

            .btn-box {
                position: absolute;
                right: 0;
                bottom: 0;

                .btn-box-content {
                    display: flex;
                    // align-items: center;
                    .btn-box-content-text {
                        font-size: 24rpx;
                        color: #999;
                        display: flex;
                        align-items: end;
                        padding-right: 10rpx;
                    }
                }
            }
        }
    }

    .after-sale-form {
        background-color: #fff;
    }

    .uni-forms-item {
        padding: 0 10rpx 0 25rpx;
    }
}
</style>
