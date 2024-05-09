<template>
    <view class="after-sale-info">
        <block v-if="Object.keys(infoData).length">
            <view class="after-sal-info-steps">
                <uni-steps active-color="#39bf3e" :options="infoData.step_status.steps" :active="infoData.step_status.current" />
            </view>
            <view class="refuse-reply" v-if="infoData.status === 3">
                <view class="refuse-reply-title">
                    拒绝原因:
                </view>
                <view class="refuse-reply-content line1">
                    {{ infoData.reply }}
                </view>
            </view>
            <view class="negotiate">
                <view class="negotiate-text">
                    查看协商记录
                </view>
                <view class="negotiate-icon ">
                    <uni-icons type="right" size="20" color="#999"></uni-icons>
                </view>
            </view>

            <view class="info-content">
                <view class="info-content-title">
                    售后信息
                </view>
                <view class="info-content-product">
                    <view class="info-content-product-item" v-for="item in infoData.aftersales_items" :key="item.aftersales_item_id">
                        <view class="product-item-left">
                            <tigImage v-model:src="item.pic_thumb"></tigImage>
                        </view>
                        <view class="product-item-right">
                            <view class="product-item-name line2">{{ item.product_name}}</view>
                            <view class="product-item-info"></view>
                        </view>
                    </view>
                </view>

            </view>
        </block>
    </view>
</template>

<script setup lang="ts">
import { aftersalesViewRecord } from "@/api/user/afterSale";
import type { afterSaleInfoItem } from "@/types/user/afterSale";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

onLoad((options) => {
    if (options && options.id) {
        id.value = Number(options.id);
        getAftersalesViewRecord();
    }
});
const id = ref<number>();
const infoData = ref<afterSaleInfoItem>({} as afterSaleInfoItem);
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
        infoData.value = result.item

    } catch (error: any) {
        console.error(error);
        uni.showToast({
            title: error.message,
            icon: "none"
        });
    }
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
    margin-bottom: 20rpx;
    background-color: #fff;

    .negotiate-text {
        font-weight: 500;
        color: #000;
    }
}

.info-content {
    background-color: #fff;
    padding: 20rpx 0;

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
            }
        }
    }

}

:deep(.uni-steps__row-desc) {
    font-size: 20rpx;
}
</style>
