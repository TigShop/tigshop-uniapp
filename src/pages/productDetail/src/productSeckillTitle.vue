<template>
    <view class="product-seckill-title flex justify-between align-center">
        <view class="seckill-price-box">
            <view class="title-top-price">
                <view class="price">
                    <FormatPrice :priceData="productPrice"></FormatPrice>
                </view>
                <view class="title-top-market_price flex align-center">
                    <view class="label flex align-center">
                        <view class="icon"><uni-icons type="fire-filled" size="14" color="#ef3647"></uni-icons></view>
                        <view class="txt">秒杀</view>
                    </view>
                    <view class="del">
                        <FormatPrice :priceData="productInfo.market_price"></FormatPrice>
                    </view>
                </view>
            </view>
        </view>
        <view class="seckill-time-box">
            <view class="title-top-time">距结束还剩</view>
            <tigCountdown :endTime="seckill_end_time" backgroundColor="#fff" color="#ef3647"></tigCountdown>
        </view>
    </view>
    <view class="product-title-info">
        <view class="title-info-top">
            <view class="title-info-bottom">
                <view>
                    {{ productInfo.product_name }}
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
    </view>
</template>

<script setup lang="ts">
import type { ProductItem } from "@/types/product/product";
import tigCountdown from '@/components/tigCountdown/index.vue'
import { reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getCollectProduct, delCollectProduct, updateCollectProduct } from "@/api/product/product";
interface Props {
    productInfo: ProductItem;
    productPrice: string;
    seckill_end_time: string;
}
const is_collect = ref(false);
const product_id = ref<number>(0)
const props = defineProps<Props>();
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
    margin:0 20rpx;
    border-radius: 10rpx;
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
.product-seckill-title{
    margin-bottom: 20rpx;
    background: linear-gradient(to right,#ef3390,#ef3647);
    padding:30rpx 20rpx 10rpx 25rpx;
    .title-top-price{
        .price{
            color: #fff;
            font-size: 40rpx;
            display: flex;
            align-items: center;
            line-height: 30rpx;
            margin-bottom: 10rpx;
            :deep(.util) {
                font-size: 24rpx;
                line-height: 40rpx;
                margin-right: 5rpx;
            }
        }
        .title-top-market_price{
            .label{
                font-size: 20rpx;
                margin-right: 10rpx;
                .icon{
                    background-color: #fff;
                    border-bottom: 1rpx solid #fff;
                    border-radius: 5rpx 0 0 5rpx;
                }
                .txt{
                    border: 1rpx solid #fff;
                    padding-left: 5rpx;
                    padding-right: 5rpx;
                    color: #fff;
                    border-radius: 0 5rpx 5rpx 0;
                }
            }
            .del{
                display: flex;
                position: relative;
                bottom: -5rpx;
                font-size: 22rpx;
                color: #fff;
                text-decoration: line-through;
                :deep(.util) {
                    font-size: 22rpx;
                }
            }
        }
    }
    .seckill-time-box{
        .title-top-time{
            text-align: end;
            font-size: 24rpx;
            color: #fff;
            margin-bottom: 10rpx;
        }
    }
}
</style>