<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="history-product" v-if="historyList.length > 0">
            <block v-for="item in historyList" :key="item.product_id">
                <view class="history-product-item">
                    <view class="history-product-item-left">
                        <view class="img-box">
                            <tigImage v-model:src="item.pic_thumb"></tigImage>
                        </view>
                    </view>
                    <view class="history-product-item-right">
                        <view class="title">{{ item.product_name }}</view>
                        <view class="item-bottom">
                            <view class="price">
                                <FormatPrice :priceData="item.product_price"></FormatPrice>
                            </view>
                            <productBuy :id="item.product_id" :disabled="item.product_stock == 0">
                                <view class="buy_btn"><image style="width: 100%;height: 100%;" lazy-load src="/static/images/common/cart.png"></image></view>
                            </productBuy>
                        </view>
                    </view>
                </view>
            </block>
        </view>
        <view class="empty-box" v-else>
            <view class="pictrue"><image src="/static/images/common/data_empty.png"></image></view>
            <view class="txt">暂无浏览记录！</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import productBuy from '@/components/productBuy/index.vue'
import { historyProductList } from "@/api/user/historyProduct";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import type { HistoryProductList } from "@/types/user/historyProduct";
const parameter = {
    navbar: "1",
    return: "1",
    title: "浏览记录",
    color: false
};
const historyList = ref<HistoryProductList[]>([]);
const getHistoryProductList = async () => {
    uni.showLoading({
        title: "加载中..."
    });
    try {
        const result = await historyProductList();
        historyList.value = result.list;
    } catch (error) {
        console.error(error);
    } finally {
        uni.hideLoading();
    }
};

onLoad(() => {
    getHistoryProductList();
});
</script>

<style lang="scss" scoped>
.history-product {
    padding: 25rpx 25rpx;

    .history-product-item {
        padding: 10rpx;
        background-color: #fff;
        border-radius: 20rpx;
        margin-bottom: 20rpx;
        display: flex;
        overflow: hidden;

        .history-product-item-left {
            .img-box {
                width: 150rpx;
                height: 150rpx;
            }
        }

        .history-product-item-right {
            width: 100%;
            padding-top: 15rpx;
            padding-left: 12rpx;
            .title {
                width: 500rpx;
                font-size: 28rpx;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .item-bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 25rpx;

                .price {
                    font-size: 32rpx;
                    line-height: 56rpx;
                    color: #f23030;

                    :deep(.util) {
                        font-weight: normal;
                        font-size: 22rpx;
                        position: relative;
                        top: 4rpx;
                    }
                }

                .buy_btn {
                    font-size: 24rpx;
                    margin-right: 20rpx;
                    margin-top: 6rpx;
                    width: 45rpx;
                    height: 45rpx;
                }
            }
        }
    }
}
</style>
