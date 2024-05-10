<template>
    <view class="after-sale-info">
        <block v-if="Object.keys(infoData).length">
            <view class="after-sal-info-steps">
                <uni-steps active-color="#39bf3e" :options="infoData.step_status.steps" :active="infoData.step_status.current" />
            </view>
            <view class="refuse-reply" v-if="infoData.status === 3">
                <view class="refuse-reply-title"> 拒绝原因: </view>
                <view class="refuse-reply-content line1">
                    {{ infoData.reply }}
                </view>
            </view>
            <view class="negotiate" @click="handleNegotiate">
                <view class="negotiate-text"> 查看协商记录 </view>
                <view class="negotiate-icon">
                    <uni-icons type="right" size="20" color="#999"></uni-icons>
                </view>
            </view>
            <view class="negotiate" @click="handleShipments" v-if="infoData.status === 4">
                <!-- <view class="negotiate" @click="handleShipments" v-if="true"> -->
                <view class="negotiate-text"> 去发货 </view>
                <view class="negotiate-icon">
                    <uni-icons type="right" size="20" color="#999"></uni-icons>
                </view>
            </view>

            <view class="info-content">
                <view class="info-content-title"> 售后信息 </view>
                <view class="info-content-product">
                    <view
                        class="info-content-product-item"
                        @click="handleProduct(item.product_id)"
                        v-for="item in infoData.aftersales_items"
                        :key="item.aftersales_item_id"
                    >
                        <view class="product-item-left">
                            <tigImage v-model:src="item.pic_thumb"></tigImage>
                        </view>
                        <view class="product-item-right">
                            <view class="product-item-name line2">{{ item.product_name }}</view>
                            <view class="right-price">
                                <FormatPrice class="right-price-pricenum" :priceData="item.price"></FormatPrice>
                                <view class="right-price-quantity">x {{ item.number }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="refund-info">
                    <view class="refund-info-item" v-if="Number(infoData.refund_amount) > 0">
                        <view class="label">退款金额：</view>
                        <view class="value price"><FormatPrice :priceData="infoData.refund_amount"></FormatPrice></view>
                    </view>
                    <view class="refund-info-item">
                        <view class="label">售后方式：</view>
                        <view class="value">{{ infoData.aftersales_type_name }}</view>
                    </view>
                    <view class="refund-info-item">
                        <view class="label">退款原因：</view>
                        <view class="value">{{ infoData.aftersale_reason }}</view>
                    </view>
                </view>
                <view class="after-sale">
                    <view class="after-sale-item">
                        <view class="label">售后编号：</view>
                        <view class="value">{{ infoData.aftersales_sn }}</view>
                    </view>
                    <view class="after-sale-item">
                        <view class="label">申请时间：</view>
                        <view class="value">{{ infoData.add_time }}</view>
                    </view>
                    <view class="after-sale-item">
                        <view class="label">退货数量：</view>
                        <view class="value">{{ quantityNum }}</view>
                    </view>
                </view>
            </view>
            <view class="info-content" v-if="infoData.logistics_name && infoData.tracking_no">
                <view class="info-content-title"> 退货信息 </view>
                <view class="after-sale">
                    <view class="after-sale-item">
                        <view class="label">快递公司：</view>
                        <view class="value">{{ infoData.logistics_name }}</view>
                    </view>
                    <view class="after-sale-item">
                        <view class="label">快递单号：</view>
                        <view class="value">{{ infoData.tracking_no }}</view>
                    </view>
                </view>
            </view>
            <saveBottomBox height="90" backgroundColor="#fff">
                <view class="after-sale-btn">
                    <view class="after-sale-btn-box">
                        <view class="btn" @click="handleRevocation"> 撤销申请 </view>
                        <view class="btn special" @click="handleEdit"> 修改申请 </view>
                    </view>
                </view>
            </saveBottomBox>
        </block>
    </view>
</template>

<script setup lang="ts">
import { aftersalesViewRecord, aftersalesCancel } from "@/api/user/afterSale";
import type { afterSaleInfoItem } from "@/types/user/afterSale";
import { onLoad, onShow, onUnload } from "@dcloudio/uni-app";
import { ref } from "vue";
import saveBottomBox from "@/components/saveBottomBox/index.vue";

onLoad((options) => {
    if (options && options.id) {
        id.value = Number(options.id);
        getAftersalesViewRecord();
    }
});

onShow(() => {
    uni.$on("refreshInfo", (data: number) => {
        id.value = data;
        getAftersalesViewRecord();
    });
});

onUnload(() => {
    uni.$off("refreshInfo");
});

const id = ref<number>();
const infoData = ref<afterSaleInfoItem>({} as afterSaleInfoItem);
const quantityNum = ref(0);
const getAftersalesViewRecord = async () => {
    try {
        const result = await aftersalesViewRecord(id.value!);
        // result.item.step_status.steps = result.item.step_status.steps.map((item:any) => {
        //     return {
        //         title: item.title,
        //         desc: item.description,
        //         ...item
        //     }
        // })
        infoData.value = result.item;
        infoData.value.aftersales_items.forEach((item: any) => {
            quantityNum.value += item.number;
        });
    } catch (error: any) {
        console.error(error);
        uni.showToast({
            title: error.message,
            icon: "none"
        });
    }
};

const handleRevocation = () => {
    uni.showModal({
        title: "提示",
        content: "确认要撤销申请吗？",
        success: async (res) => {
            if (res.confirm) {
                try {
                    const result = await aftersalesCancel({ aftersale_id: infoData.value.aftersale_id });
                    uni.showToast({
                        title: "撤销成功"
                    });
                    console.log("跳转售后申请列表");
                    uni.redirectTo({
                        url: "/pages/user/afterSale/list"
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    });
};

const handleEdit = async () => {
    try {
        const result = await aftersalesCancel({ aftersale_id: infoData.value.aftersale_id });
        if (infoData.value.aftersales_items.length === 1) {
            uni.redirectTo({
                url: `/pages/user/afterSale/edit?order_id=${infoData.value.order_id}&item_id=${infoData.value.aftersales_items[0].order_item_id}`
            });
        } else {
            uni.redirectTo({
                url: `/pages/user/afterSale/edit?order_id=${infoData.value.order_id}`
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const handleProduct = (id: number) => {
    uni.navigateTo({
        url: `/pages/productDetail/index?id=${id}`
    });
};

const handleNegotiate = () => {
    uni.navigateTo({
        url: "/pages/user/afterSale/negotiate?id=" + infoData.value.aftersale_id
    });
};
const handleShipments = () => {
    uni.navigateTo({
        url: "/pages/user/afterSale/shipments?id=" + infoData.value.aftersale_id
    });
};
</script>

<style lang="scss" scoped>
.after-sal-info-steps {
    background-color: #fff;
    padding: 20rpx;
    margin-bottom: 20rpx;
}
.refuse-reply {
    background-color: #fff;
    padding: 20rpx;
    margin-bottom: 20rpx;
    display: flex;
    font-size: 28rpx;
    .refuse-reply-title {
        color: #999;
    }
    .refuse-reply-content {
        padding-left: 15rpx;
        width: 550rpx;
    }
}

.negotiate {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    background-color: #fff;
    .negotiate-text {
        font-weight: 500;
        color: #000;
    }
}

.info-content {
    background-color: #fff;
    padding: 20rpx 0;
    margin-top: 20rpx;

    .info-content-title {
        color: #000;
        font-weight: 500;
        padding: 10rpx 20rpx;
    }

    .info-content-product {
        padding: 10rpx 20rpx;
        background-color: #fafafa;

        .info-content-product-item {
            display: flex;
            padding: 10rpx 0;

            .product-item-left {
                width: 160rpx;
                height: 160rpx;
                border-radius: 10rpx;
                overflow: hidden;
            }

            .product-item-right {
                padding-left: 20rpx;

                .product-item-name {
                    font-weight: bold;
                    width: 500rpx;
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
        }
    }

    .refund-info {
        padding: 15rpx 20rpx;
        border-bottom: 1rpx solid #f5f5f5;
        .refund-info-item {
            display: flex;
            padding: 10rpx 0;

            .price {
                color: $tig-color-primary;
            }
        }
    }

    .after-sale {
        padding: 0 20rpx;
        padding-top: 15rpx;
        .after-sale-item {
            display: flex;
            padding: 10rpx 0;
        }
    }
}

.after-sale-btn {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .after-sale-btn-box {
        display: flex;
        align-items: center;

        .btn {
            border-radius: 35rpx;
            padding: 15rpx 28rpx;
            border: 1px solid #f2f2f2;
            font-size: 24rpx;
            margin-right: 15rpx;

            &.special {
                color: $tig-color-primary;
                border-color: $tig-color-primary;
            }
            &:active {
                background-color: #d9d9d9;
            }
        }
    }
}

.label {
    color: #6a6a6a;
    font-size: 24rpx;
}
.value {
    color: #000;
    font-size: 24rpx;
}

:deep(.uni-steps__row-desc) {
    font-size: 20rpx;
}
</style>
