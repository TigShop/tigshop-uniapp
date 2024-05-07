<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="collect-product" v-if="collectList.length > 0">
            <uni-swipe-action>
                <block v-for="item in collectList" :key="item.product_id">
                    <view class="move-item">
                        <uni-swipe-action-item :threshold="0" autoClose>
                            <view class="collect-product-item" @click="handleLink(item.product_id)">
                                <view class="collect-product-item-left">
                                    <view class="img-box">
                                        <tigImage v-model:src="item.pic_thumb"></tigImage>
                                    </view>
                                </view>
                                <view class="collect-product-item-right">
                                    <view class="title">{{ item.product_name }}</view>
                                    <view class="item-bottom">
                                        <view class="price">
                                            <FormatPrice :priceData="item.actual_price"></FormatPrice>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <template #right>
                                <view class="collect-move-box">
                                    <view class="btn-del" @click="__delCollect(item.product_id)"><text>取消收藏</text></view>
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
        <view class="loading-box" v-if="filterParams.page > 1">
            <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
            <view v-else>没有更多了~</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { ref, reactive } from "vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { getCollectProductList, delCollectProduct } from "@/api/user/collectProduct";
import type { CollectProductList, CollectProductFilterParams } from "@/types/user/collectProduct";
const parameter = {
    navbar: "1",
    return: "1",
    title: "商品收藏",
    color: false
};
const filterParams = reactive<CollectProductFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: 10,
    keyword: ""
});
const total = ref(0);
const loaded = ref(false);
const collectList = ref<CollectProductList[]>([]);
const __getCollectProductList = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    }
    try {
        const result = await getCollectProductList({ ...filterParams });
        total.value = result.total;
        collectList.value = [...collectList.value, ...result.filter_result];
        // collectList.value = Object.assign(collectList.value, result.filter_result)
    } catch (error) {
        console.error(error);
    } finally {
        loaded.value = false;
    }
};

const handleLink = (id: number) => {
    uni.redirectTo({
        url: '/pages/productDetail/index?id=' + id
    })
}

const __delCollect = (id: number) => {
    uni.showModal({
        title: "提示",
        content: "确定取消收藏吗？",
        success: async (res) => {
            if (res.confirm) {
                deleteASiteCollection(id);
            }
        }
    });
};

const deleteASiteCollection = async (value: number) => {
    try {
        const result = await delCollectProduct({ id: value });
        if (result.message) {
            uni.showToast({
                title: result.message,
                icon: "none"
            });
        }
        filterParams.page = 1;
        collectList.value = [];
        __getCollectProductList();
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
};

onLoad(() => {
    __getCollectProductList();
});

onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        __getCollectProductList();
    }
});
</script>

<style lang="scss" scoped>
.collect-product {
    padding: 25rpx 25rpx;
    .move-item {
        margin-bottom: 20rpx;
    }

    .collect-product-item {
        padding: 10rpx;
        background-color: #fff;
        border-radius: 20rpx;
        display: flex;
        overflow: hidden;

        .collect-product-item-left {
            .img-box {
                width: 150rpx;
                height: 150rpx;
            }
        }

        .collect-product-item-right {
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
.collect-move-box {
    width: 150rpx;
    height: 100%;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    display: flex;
    text {
        display: block;
        position: absolute;
        top: 50%;
        margin-top: -20rpx;
        font-size: 24rpx;
        text-align: center;
        width: 100%;
    }
    .btn-collect {
        width: 150rpx;
        background: #ffa600;
        background: linear-gradient(138deg, #ffa600, #ffb000 77%, #ffbc00);
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        display: table-cell;
        position: relative;
    }
    .btn-del {
        width: 150rpx;
        background: #ff4f18;
        background: linear-gradient(-41deg, #ff4f18, #ff2000 24%, #f10000);
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        display: table-cell;
        position: relative;
    }
}
</style>
