<template>
    <view class="product-title-info">
        <view class="title-info-top">
            <view class="title-top-price">
                <FormatPrice :priceData="productPrice"></FormatPrice>
                <view class="title-top-market_price">
                    <FormatPrice :priceData="productInfo.market_price"></FormatPrice>
                </view>
            </view>
            <view class="title-top-panle">
                <view class="title-top-panle-collect" @click="addCollect(is_collect)">
                    <view class="iconfont icon-shoucang1" :class="{ 'icon-shoucang2': is_collect }"></view>
                    <view class="title-panle-collect-text">收藏</view>
                </view>
                <view class="title-top-panle-share">
                    <text class="iconfont icon-Artboard"></text>
                    <text class="title-panle-collect-text">分享</text>
                </view>
            </view>
        </view>
        <view class="title-info-bottom">
            <view>
                {{ productInfo.product_name }}
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { ProductItem } from "@/types/product/product";
import { reactive, ref } from "vue";
import type { PropType } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getCollectProduct, delCollectProduct, updateCollectProduct } from "@/api/product/product";
const is_collect = ref(false);
const product_id = ref<number>(0)
const props = defineProps({
    productInfo: {
        type: Object as PropType<ProductItem>,
        default: () => ({})
    },
    productPrice: {
        type: String,
        default: ""
    }
});
const getCollect = async (id:any) => {
    try {
        const result = await getCollectProduct({ id });
        is_collect.value = result.item;
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    }
};
const addCollect = async (is_collect: boolean) => {
    try {
        let result: any = {};
        if (!is_collect) {
            result = await updateCollectProduct({
                product_id: product_id.value
            });
        } else {
            result = await delCollectProduct({
                id: product_id.value
            });
        }
        await getCollect(product_id.value);
        uni.showToast({
            title: result.message,
            icon: "none"
        })
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    }
};
onLoad((option) => {
    if (option) {
        const { id } = option;
        if (id) {
            product_id.value = id;
            getCollect(id);
        }
    }
});
</script>

<style lang="scss" scoped>
.product-title-info {
    background-color: #fff;
    padding: 15rpx 0 15rpx 15rpx;
    border-radius: 20rpx;
    margin-top: 20rpx;

    .title-info-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title-top-price {
            color: $tig-color-primary;
            font-weight: bold;
            font-size: 36rpx;
            display: flex;
            align-items: center;

            :deep(.util) {
                font-size: 24rpx;
            }
        }

        .title-top-market_price {
            display: flex;
            position: relative;
            bottom: -5rpx;
            margin-left: 15rpx;
            font-size: 22rpx;
            color: #999;
            text-decoration: line-through;
            :deep(.util) {
                font-size: 22rpx;
            }
        }
        .title-top-panle {
            display: flex;

            .title-top-panle-collect {
                color: #999;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                top: -5rpx;
                padding-right: 10rpx;
                .icon-shoucang1,
                .icon-shoucang2 {
                    font-size: 55rpx;
                }
                .icon-shoucang2 {
                    color: #fe9600;
                }

                .title-panle-collect-text {
                    position: relative;
                    top: -10rpx;
                    font-size: 20rpx;
                }
            }

            .title-top-panle-share {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 140rpx;
                height: 70rpx;
                padding-left: 10rpx;
                border-radius: 30px 0 0 30px;
                background-color: #f6f6f6;
                .title-panle-collect-text {
                    font-size: 28rpx;
                    color: #999;
                }
                .icon-Artboard {
                    font-size: 45rpx;
                }
            }
        }
    }

    .title-info-bottom {
        font-size: 32rpx;
        font-weight: bold;
        padding:0 15rpx 0;
    }
}
</style>
