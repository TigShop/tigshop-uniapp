<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <productImg v-if="productInfo" :picList="picList" :productInfo="productInfo"></productImg>
        <view class="productDetail-content">
            <productTitleInfo :productInfo="productInfo"></productTitleInfo>
            <!-- /static/images/common/more.png -->
            <view class="product-card-row">
                <view class="cart-item flex align-center justify-between">
                    <view class="flex align-center">
                        <view class="title">
                            已选
                        </view>
                        <view class="label">
                            1 件
                        </view>
                    </view>
                    <view>
                        <image src="/static/images/common/more.png"/>
                    </view>
                </view>
                <view class="cart-item flex justify-between">
                    <view class="flex">
                        <view class="title">
                            送至
                        </view>
                        <view class="label">
                            <view class="text">广东省广州市天河区 <uni-icons type="location" size="16" color="#bfbfbf"></uni-icons></view>
                            <view class="tips">由 LYECS 配送并提供售后服务</view>
                        </view>
                    </view>
                    <view>
                        <image src="/static/images/common/more.png"/>
                    </view>
                </view>
                <view class="cart-item flex align-center justify-between">
                    <view class="flex align-center">
                        <view class="title">
                            参数
                        </view>
                        <view class="label attr_text line1">
                            功能.防水,防水登记,原装配件,防水深度,防水深度,机身类型,地方撒发大水发萨芬
                        </view>
                    </view>
                    <view>
                        <image src="/static/images/common/more.png"/>
                    </view>
                </view>
                <view class="cart-item traceability-item flex align-center">
                    <image src="/static/images/product/traceability.png"/>
                    <text>从田野地头到您手中的全链路溯源</text>
                </view>
            </view>
            <productComment :productId="productInfo.product_id"></productComment>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import productImg from "./src/productImg.vue";
import productTitleInfo from './src/productTitleInfo.vue'
import productComment from './src/productComment.vue'
import { reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getProductDetail } from "@/api/product/product";
import type { ProductDetailPicList, ProductDetailItem } from "@/types/product/product";

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "商品详情",
    class: "pageGoods"
});

onLoad((option) => {
    console.log(option);
    if (option) {
        const { id } = option;
        if (id) {
            __getProductDetail(id);
        }
    }
});
const picList = ref<ProductDetailPicList[]>([]);
const productInfo = ref<ProductDetailItem>({} as ProductDetailItem);

const __getProductDetail = async (id: string) => {
    try {
        const result = await getProductDetail(id);
        const { pic_list, item } = result;
        picList.value = pic_list;
        productInfo.value = item;
    } catch (error) {
        console.error(error);
    }
};

const handleShare = () => {};
const isCollect = ref(false);
const handleCollect = () => {};
const goodsService = () => {};
const selecAttr = () => {};
</script>
<style lang="scss" scoped>
.productDetail-content {
    padding: 20rpx;
    .product-card-row{
        background-color: #fff;
        padding: 20rpx;
        border-radius: 20rpx;
        margin: 20rpx 0;
        .cart-item{
            font-size: 26rpx;
            margin: 15rpx 0;
            .title{
                width: 90rpx;
                color: #81838e;
            }
            .attr_text{
                display: block;
                width: 66vw;
            }
            .label{
                .tips{
                    color: $tig-color-primary;
                    font-size: 24rpx;
                    margin-top: 5rpx;
                }
            }
            image{
                width: 35rpx;
                height: 35rpx
            }
        }
        .traceability-item{
            padding: 10rpx;
            background-color: #fdf6f0;
            color: #FF9627;
            font-size: 24rpx;
            image{
                width: 115rpx;
                height: 35rpx;
                margin-right: 20rpx;
            }
        }
    }
}
</style>