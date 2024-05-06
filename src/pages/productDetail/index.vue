<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <productImg v-if="product" :picList="picList" :productInfo="product"></productImg>
        <view class="productDetail-content">
            <productTitleInfo :productInfo="product" :productPrice="productPrice"></productTitleInfo>
            <view class="product-card-row">
                <productSku v-if="attrList.spe" v-model="attrList" :skuList="skuList" :checkedValue="checkedValue" @change="onProductSkuChange">
                    <view class="cart-item flex align-center justify-between">
                        <view class="flex align-center">
                            <view class="title">
                                已选
                            </view>
                            <view class="label">
                            {{ skuStr }} 1 件
                            </view>
                        </view>
                        <view>
                            <image src="/static/images/common/more.png"/>
                        </view>
                    </view>
                </productSku>
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
            <productComment :productId="product.product_id"></productComment>
            <view class="product-card-row">
                <view class="tab-box flex align-center justify-around">
                    <view class="tab" :class="{'active': tabIndex == 0}" @click="tabIndex = 0">商品介绍</view>
                    <view class="tab" :class="{'active': tabIndex == 1}" @click="tabIndex = 1">售后服务</view>
                </view>
                <view class="default flex align-center justify-center" v-if="tabIndex == 0">
                    <uni-icons type="arrow-up" size="18" color="#9b9c9f"></uni-icons>
                    <text>上拉查看图文详情</text>
                </view>
                <view class="default" v-if="tabIndex == 1">
                    <text>售后售后售后</text>
                </view>
            </view>
        </view>
        <view class="bottom-bar-box">
            <view class="bottom-bar flex align-center justify-between">
                <view class="label">
                    <view>
                        <uni-icons type="chatboxes" size="22" color="#9b9c9f"></uni-icons>
                    </view>
                    <view>
                        <text>客服</text>
                    </view>
                </view>
                <view class="label">
                    <view>
                        <uni-badge class="uni-badge-left-margin" :text="100" absolute="rightTop" size="small">
                            <uni-icons type="cart" size="22" color="#9b9c9f"></uni-icons>
                        </uni-badge>
                    </view>
                    <view>
                        <text>购物车</text>
                    </view>
                </view>
                <view class="flex align-center justify-between">
                    <view class="btn cart">加入购物车</view>
                    <view class="btn buy">立即购买 </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import productImg from "./src/productImg.vue";
import productTitleInfo from './src/productTitleInfo.vue'
import productComment from './src/productComment.vue'
import productSku from './src/productSku.vue'
import productSwiper from './src/productSwiper.vue'
import { reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getProductDetail, getProductSkuDetail } from "@/api/product/product";
import type { PicList, ProductItem, AttrList, SkuList, ServiceList, RankDetail, DescArr} from "@/types/product/product";
const tabIndex = ref(0);
const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "商品详情",
    class: "pageGoods"
});
const props = defineProps({
    pageType: {
        type: String,
        default: "product"
    }
});
const product_id = ref<number>(0);
onLoad((option) => {
    if (option) {
        const { id } = option;
        if (id) {
            product_id.value = id;
            __getProductDetail(id);
        }
    }
});
const product = ref<ProductItem>({
    product_id: 0,
    product_stock: 0
});
const attrList = ref<AttrList>({
    normal: []
});
const skuList = ref<SkuList[]>([]);
const picList = ref<PicList[]>([]);
const serviceList = ref<ServiceList[]>([]);
const rankDetail = ref<RankDetail>({});
const descArr = ref<DescArr[]>([]);
const checkedValue = ref<string[]>([]);
const __getProductDetail = async (id: string) => {
    try {
        let result: any = {};
        if (props.pageType == "exchange") {
            // result = await getExchangeDetail(id);
        } else {
            result = await getProductDetail(id);
        }
        product.value = result.item;
        attrList.value = result.attr_list;
        picList.value = result.pic_list;
        rankDetail.value = result.rank_detail;
        skuList.value = result.sku_list;
        checkedValue.value = result.checked_value;
        descArr.value = result.desc_arr;
        serviceList.value = result.service_list;
        productStock.value = result.item.product_stock;
        loadPrice()
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    }
};
const skuId = ref(0);
const skuStr = ref<string>("")
const productPrice = ref<string>("");
const productStock = ref<number>(0);
const is_seckill = ref<number>(0)
const seckill_end_time = ref<string>("")
const onProductSkuChange = (item: any) => {
    if (item !== null) {
        console.log(item)
        productStock.value = item.sku_stock;
        skuId.value = item.sku_id;
        skuStr.value = item.sku_str;
    }
    loadPrice();
};
const loadPrice = async () => {
    try {
        const result = await getProductSkuDetail(product_id.value, {
            sku_id: skuId.value
        });
        productPrice.value = result.price;
        is_seckill.value = result.is_seckill;
        seckill_end_time.value = result.seckill_end_time;
        productStock.value = result.stock;
    } catch (error:any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    }
};
</script>
<style lang="scss" scoped>
.productDetail-content {
    padding: 20rpx;
    padding-bottom: 100rpx;
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
        .tab-box{
            padding: 10rpx 0 20rpx 0;
            margin-bottom: 20rpx;
            font-size: 24rpx;
            .active{
                color: $tig-color-primary;
            }
        }
        .default{
            color: #9b9c9f;
            font-size: 24rpx;
            padding: 10rpx;
        }
    }
}
.bottom-bar-box{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    border-top: 1rpx solid #f5f5f5;
    .bottom-bar{
        height: 100rpx;
        padding: 0 30rpx;
        .label{
            color: #666;
            font-size: 20rpx;
            text-align: center;
        }
        .btn{
            width: 200rpx;
            text-align: center;
            border-radius: 100rpx;
            line-height: 55rpx;
            height: 55rpx;
            color: #fff;
            font-size: 24rpx;
            &:first-child{
                margin-right: 20rpx;
            }
        }
        .cart{
            background: $tig-color-yellow;
        }
        .buy{
            background: $tig-color-error;
        }
    }
}
</style>
