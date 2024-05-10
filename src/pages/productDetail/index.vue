<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <productImg v-if="product" :picList="picList" :productInfo="product"></productImg>
        <productSeckillTitle v-if="is_seckill" :productInfo="product" :productPrice="productPrice" :seckill_end_time="seckill_end_time"></productSeckillTitle>
        <view class="productDetail-content">
            <productTitleInfo v-if="!is_seckill" :productInfo="product" :productPrice="productPrice"></productTitleInfo>
            <view class="product-card-row">
                <productSku 
                    v-if="attrList.spe" 
                    v-model="attrList" 
                    :picList="picList" 
                    :skuList="skuList" 
                    :checkedValue="checkedValue" 
                    :productInfo="product" 
                    :productPrice="productPrice" 
                    :productStock="productStock" 
                    :productNumber="productNumber" 
                    :isExchange="isExchange" 
                    @change="onProductSkuChange"
                    @addCart="_getCartCount">
                    <view class="cart-item flex align-center justify-between">
                        <view class="flex align-center">
                            <view class="title">
                                已选
                            </view>
                            <view class="label">
                            {{ skuStr }} {{ productNumber }} 件
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
                <view class="cart-item flex align-center justify-between" @click="showDrawer" v-if="attrList.normal?.length > 0">
                    <view class="flex align-center">
                        <view class="title">
                            参数
                        </view>
                        <view class="label attr_text line1">
                            <view class="shuxin flex">
                                <view v-for="(item, index) in attrList.normal">
                                    {{ item.attr_name }}/
                                </view>
                            </view>
                        </view>
                    </view>
                    <view>
                        <image src="/static/images/common/more.png"/>
                    </view>
                </view>
                <!-- <view class="cart-item traceability-item flex align-center">
                    <image src="/static/images/product/traceability.png"/>
                    <text>从田野地头到您手中的全链路溯源</text>
                </view> -->
            </view>
            <tigpopup v-model:show="showAttrRef" position="bottom" paddingBottom="0" height="60vh" title="规格参数">
                <view>
                    <view class="attr_table">
                        <view v-for="(item, index) in attrList.normal" class="item flex">
                            <view class="lable">{{ item.attr_name }}</view>
                            <view class="value" v-for="attr in item.attr_list"> {{ attr.attr_value }} </view>
                        </view>
                    </view>
                </view>
            </tigpopup>
            <productComment :productId="product.product_id"></productComment>
            <view class="product-card-row">
                <view class="tab-box flex align-center justify-around">
                    <view class="tab" :class="{'active': tabIndex == 0}" @click="tabIndex = 0">商品介绍</view>
                    <view class="tab" :class="{'active': tabIndex == 1}" @click="tabIndex = 1">售后服务</view>
                </view>
                <view class="default" v-if="tabIndex == 0">
                    <template v-for="item in descArr">
                        <view class="desc-pic-item" v-if="item.type == 'pic'">
                            <image lazy-load :src="imageFormat(item?.pic || '')" class="slide-image" mode="widthFix" />
                        </view>
                        <view class="desc-text-item" v-if="item.type == 'text'" v-html="item.html"></view>
                    </template>
                </view>
                <view class="default" v-if="tabIndex == 1">
                    <afterSaleService></afterSaleService>
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
                <view class="label" @click="toPage('/pages/cart/index')">
                    <view>
                        <uni-badge class="uni-badge-left-margin" :text="cartCount" absolute="rightTop" size="small">
                            <uni-icons type="cart" size="22" color="#9b9c9f"></uni-icons>
                        </uni-badge>
                    </view>
                    <view>
                        <text>购物车</text>
                    </view>
                </view>
                <productSku 
                    v-if="attrList.spe" 
                    v-model="attrList" 
                    :picList="picList" 
                    :skuList="skuList" 
                    :checkedValue="checkedValue" 
                    :productInfo="product" 
                    :productPrice="productPrice" 
                    :productStock="productStock" 
                    :productNumber="productNumber" 
                    :isExchange="isExchange"
                    @change="onProductSkuChange"
                    @addCart="_getCartCount">
                    <view class="flex align-center justify-between" v-if="!isExchange">
                        <view class="btn cart">加入购物车</view>
                        <view class="btn buy">立即购买 </view>
                    </view>
                    <view class="flex align-center justify-between" v-if="isExchange">
                        <view class="btn cart" style="width: 60vw;">立即兑换 </view>
                    </view>
                </productSku>
            </view>
        </view>
        <tigBackTop :class="{ show: scrollTop > 100 }"></tigBackTop>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import productImg from "./src/productImg.vue";
import productTitleInfo from './src/productTitleInfo.vue'
import productSeckillTitle from './src/productSeckillTitle.vue'
import productComment from './src/productComment.vue'
import productSku from './src/productSku.vue'
import afterSaleService from './src/afterSaleService.vue'
import { imageFormat } from "@/utils/format";
import { reactive, ref } from "vue";
import { onLoad, onShow, onPageScroll } from "@dcloudio/uni-app";
import { getProductDetail, getProductSkuDetail } from "@/api/product/product";
import { getExchangeDetail } from "@/api/exchange/exchange";
import tigBackTop from "@/components/tigBackTop/index.vue";
import { asyncGetCartCount } from "@/api/cart/cart";
import type { PicList, ProductItem, AttrList, SkuList, ServiceList, RankDetail, DescArr} from "@/types/product/product";
const tabIndex = ref(0);
const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "商品详情",
    class: "pageGoods"
});
const isExchange = ref(false)
const scrollTop = ref(0);
onPageScroll((e) => {
    scrollTop.value = e.scrollTop;
});
const product_id = ref<string>("");
    const showAttrRef = ref(false)
// 打开窗口
const showDrawer = () => {
	showAttrRef.value = true;
}
onLoad((option) => {
    if (option) {
        if(option.is_exchange) {
            let is_exchange_bool = JSON.parse(option.is_exchange);
            isExchange.value = is_exchange_bool;
        }
        const { id } = option;
        if (id) {
            product_id.value = id;
            __getProductDetail(id);
        }
        
    }
});
onShow(() => {
    _getCartCount()
})
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
        if (isExchange.value == true) {
            result = await getExchangeDetail(id);
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
        if(isExchange.value == false){
            loadPrice()
        }
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
const productNumber = ref<number>(1)
const onProductSkuChange = (item: any) => {
    if (item.type !== 'null') {
        productStock.value = item.sku_stock;
        skuId.value = item.sku_id;
        skuStr.value = item.sku_str;
    }
    productNumber.value = item.productNumber;
    if(isExchange.value == false){
        loadPrice()
    }
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
const cartCount = ref<number>(0);
const _getCartCount = async () => {
    try {
        const result = await asyncGetCartCount();
        cartCount.value = result.count;
    } catch (error) {}
};
const toPage = (url:string) => {
    uni.switchTab({url})
};
</script>
<style lang="scss" scoped>
.productDetail-content {
    padding:0 20rpx;
    padding-bottom: 100rpx;
    .product-card-row{
        background-color: #fff;
        padding: 20rpx;
        border-radius: 20rpx;
        margin: 20rpx 0;
        .cart-item{
            font-size: 26rpx;
            margin: 25rpx 0;
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
            .desc-pic-item{
                image{
                    width: 100%;
                }
            }
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
        padding: 0 20rpx;
        .label{
            color: #666;
            font-size: 20rpx;
            text-align: center;
        }
        .btn{
            width: 250rpx;
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
.attr_table{
    padding:0 20rpx;
    .item{
        margin-bottom: 5rpx;
        font-size: 22rpx;
        .lable{
            display: inline-block;
            width: 200rpx;
            border: 1px solid #f5f4ef;
            background: #f5f4ef;
            padding: 10rpx 20rpx;
        }
        .value{
            flex: 1;
            border: 1px solid #f5f4ef;
            padding: 10rpx 20rpx;
        }
    }
    
}
</style>