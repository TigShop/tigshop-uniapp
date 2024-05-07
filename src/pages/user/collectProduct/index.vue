<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="history-product" v-if="collectList.length > 0">
            <uni-swipe-action>
                <block v-for="item in collectList" :key="item.product_id">
                    <view class="move-item">
                        <uni-swipe-action-item :threshold="0" autoClose>
                            <view class="history-product-item" @click="handleLink(item.product_id)">
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
                                    </view>
                                </view>
                            </view>
                            <template #right>
                                <view class="cart-move-box">
                                    <view class="btn-del" @click="deleteASiteCollection(item.product_id)"><text>取消收藏</text></view>
                                </view>
                            </template>
                        </uni-swipe-action-item>
                    </view>
                </block>
            </uni-swipe-action>
        </view>
        <view class="empty-box" v-else>
            <view class="pictrue"><image src="/static/images/common/data_empty.png"></image></view>
            <view class="txt">暂无收藏记录！</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { collectProductList, delCollectProduct } from "@/api/user/collectProduct";
import type { CollectProductList } from "@/types/user/collectProduct";
const parameter = {
    navbar: "1",
    return: "1",
    title: "商品收藏",
    color: false
};
const collectList = ref<CollectProductList[]>([]);
const getCollectProductList = async () => {
    uni.showLoading({
        title: "加载中..."
    });
    try {
        const result = await collectProductList();
        collectList.value = result.list;
    } catch (error) {
        console.error(error);
    } finally {
        uni.hideLoading();
    }
};
const handleLink = (id: number) => {
    uni.redirectTo({
        url: '/pages/productDetail/index?id=' + id
    })
}

const deleteASiteCollection = async (value: number) => {
    console.log(value);
    
    // try {
    //     // loading.value = true;
    //     const result = await delCollectProduct({ id: value });
    //     // message.success(result.message);
    // } catch (error: any) {
    //     // message.error(error.message);
    // } finally {
    //     // loading.value = false;
    // }
};

onLoad(() => {
    getCollectProductList();
});
</script>

<style lang="scss" scoped>
.history-product {
    padding: 25rpx 25rpx;
    .move-item {
        margin-bottom: 20rpx;
    }

    .history-product-item {
        padding: 10rpx;
        background-color: #fff;
        border-radius: 20rpx;
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
            }
        }
    }
}
.cart-move-box {
    width: 150rpx;
    height: 100%;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    display: flex;
}
.cart-move-box text {
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -20rpx;
    font-size: 24rpx;
    text-align: center;
    width: 100%;
}
.cart-move-box .btn-del {
    width: 150rpx;
    background: #ff4f18;
    background: linear-gradient(-41deg, #ff4f18, #ff2000 24%, #f10000);
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    display: table-cell;
    position: relative;
}
.cart-move-box .btn-collect {
    width: 150rpx;
    background: #ffa600;
    background: linear-gradient(138deg, #ffa600, #ffb000 77%, #ffbc00);
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    display: table-cell;
    position: relative;
}
</style>
