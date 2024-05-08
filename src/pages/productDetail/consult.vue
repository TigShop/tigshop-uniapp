<template>
    <navbar :parameter="parameter"></navbar>
    <view class="product-info flex">
        <view class="product-info-img"><image lazy-load class="product-img" :src="imageFormat(product.pic_thumb || '')"></image></view>
        <view>
            <view class="product-info-title line2">{{ product.product_name }}</view>
            <view class="product-info-price">
                <FormatPrice :priceData="product.market_price"></FormatPrice>
            </view>
        </view>
    </view>
    <view class="product-consult-card">
        <view class="consult-item" v-for="(item, index) in consultationList" :key="index">
            <view class="consult-item-tit flex justify-between">
                <view class="time">{{ item.add_time }}</view>
                <view class="name">{{ item.username }}</view>
            </view>
            <view class="consult-con line1">
                <text>Q</text>
                {{ item.content }}
            </view>
            <view class="consult-con line1 reply" v-if="item.reply">
                <text>A</text>
                {{ item.reply.content }}
            </view>
        </view>
    </view>
    <view class="loading-box">
        <view class="bottomLoading" v-if="loading"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
        <view v-else>没有更多了~</view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { reactive, ref } from "vue";
import { imageFormat } from "@/utils/format";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { getProductConsultationList, getProductDetail } from "@/api/product/product";
import type { ProductConsultationItem, ProductItem } from "@/types/product/product";
const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "商品咨询",
    class: "pageGoods"
});
const product = ref<ProductItem>({
    product_id: 0,
    product_stock: 0
});
const loading = ref(false);
const page = ref<number>(1);
const size = ref(10);
const total = ref(0);
const loaded = ref(false);
const consultationList = ref<ProductConsultationItem[]>([]);
const consultationTotal = ref(0);
const __getProductDetail = async (id: string) => {
    try {
        let result = await getProductDetail(id);
        product.value = result.item;
        console.log('咨询商品', product.value);
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    }
};
const fetchConsultation = async () => {
    if (page.value > 1) {
        loaded.value = true;
    }
    uni.showLoading({
        title: "请求加载中..."
    });
    try {
        const result = await getProductConsultationList({ product_id: productId.value, page: page.value, size: size.value });
        consultationList.value = [...consultationList.value, ...result.filter_result];
        console.log('咨询列表', consultationList.value);
        consultationTotal.value = result.total;
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    } finally {
        loaded.value = false;
        uni.hideLoading();
    }
};
const productId = ref<any>("")
onLoad((option) => {
    if (option) {
        const { id } = option;
        if (id) {
            productId.value = id;
            __getProductDetail(id)
            fetchConsultation();
        }
    }
});
onReachBottom(() => {
    if (page.value < Math.ceil(total.value / size.value)) {
        page.value++;
        fetchConsultation();
    }
});
</script>

<style lang="scss" scoped>

.loading-box{
    padding: 30rpx;
    font-size: 24rpx;
}
.product-info{
    border-top: 1rpx solid #eee;
    padding: 20rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    .product-info-img{
        image{
            width: 160rpx;
            height: 160rpx;
        }
    }
    .product-info-title{
        font-size: 26rpx;
    }
    .product-info-price {
            color: $tig-color-primary;
            font-weight: bold;
            font-size: 36rpx;
            display: flex;
            align-items: center;
            line-height: 36rpx;
            margin-top: 10rpx;
            :deep(.util) {
                font-size: 24rpx;
            }
        }
}
.product-consult-card{
    .consult-item{
        padding: 20rpx;
        background-color: #fff;
        margin-bottom: 20rpx;
        .consult-item-tit{
            padding: 10rpx 0;
            .time, .name{
                color: #666;
                font-size: 22rpx;
            }
        }
        .consult-con{
            padding: 10rpx 0;
            color: #666;
                font-size: 22rpx;
            text{
                display: inline-block;
                width: 35rpx;
                height: 35rpx;
                text-align: center;
                line-height: 35rpx;
                background-color: $tig-color-error;
                color: #fff;
                font-size: 22rpx;
                border-radius: 10rpx;
                margin-right: 8rpx;
            }
        }
    }
}
</style>

<!-- 
    <view class="product-consult-card">
        <view class="consult-item" v-for="(item, index) in consultationList" :key="index">
            <view class="consult-item-tit">
                <view class="time">{{ item.add_time }}</view>
                <view class="name">{{ item.username }}</view>
            </view>
            <view class="consult-con">
                <text>Q</text>
                {{ item.content }}
            </view>
            <view class="consult-con reply" v-if="item.reply">
                <text>A</text>
                {{ item.reply.content }}
            </view>
        </view>
    </view> -->