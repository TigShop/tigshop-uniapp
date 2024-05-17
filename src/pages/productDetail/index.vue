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
                    @change="onProductSkuChange"
                    @addCart="_getCartCount"
                >
                    <view class="cart-item flex align-center justify-between">
                        <view class="flex align-center">
                            <view class="title"> 已选 </view>
                            <view class="label"> {{ skuStr }} {{ productNumber }} 件 </view>
                        </view>
                        <view>
                            <image class="icon-image" src="/static/images/common/more.png" />
                        </view>
                    </view>
                </productSku>
                <view class="cart-item flex justify-between">
                    <view class="flex">
                        <view class="title"> 送至 </view>
                        <view class="label">
                            <view class="text">{{ regionText }} <uni-icons type="location" size="16" color="#bfbfbf"></uni-icons></view>
                            <view class="tips">由 LYECS 配送并提供售后服务</view>
                        </view>
                    </view>
                    <view @click="handleAddress">
                        <image class="icon-image" src="/static/images/common/more.png" />
                    </view>
                </view>
                <view class="cart-item flex align-center justify-between" @click="showDrawer" v-if="attrList.normal?.length > 0">
                    <view class="flex align-center">
                        <view class="title"> 参数 </view>
                        <view class="label attr_text line1">
                            <view class="shuxin flex">
                                <view v-for="(item, index) in attrList.normal"> {{ item.attr_name }}/ </view>
                            </view>
                        </view>
                    </view>
                    <view>
                        <image class="icon-image" src="/static/images/common/more.png" />
                    </view>
                </view>
            </view>
            <view class="coupon-list flex justify-between" @click="handleCoupon">
                <view class="flex">
                    <view class="title"> 领券 </view>
                    <block v-for="item in portionCouponList" :key="item.coupon_id">
                        <view class="coupon-item">{{ item.coupon_name }}</view>
                    </block>
                </view>
                <view>
                    <image class="icon-image" src="/static/images/common/more.png" />
                </view>
            </view>
            <productComment :productId="product.product_id"></productComment>
            <view class="product-card-row">
                <view class="tab-box flex align-center justify-around">
                    <view class="tab" :class="{ active: tabIndex == 0 }" @click="tabIndex = 0">商品介绍</view>
                    <view class="tab" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1">售后服务</view>
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
        <view class="bottom-bar-box" v-if="attrList.spe">
            <view class="bottom-bar flex align-center">
                <view class="icon-box">
                    <view class="label">
                        <view>
                            <uni-icons type="chat" size="22" color="#9b9c9f"></uni-icons>
                        </view>
                        <view>
                            <text>客服</text>
                        </view>
                    </view>
                    <view class="label" @click="toPage('/pages/cart/index')">
                        <view>
                            <uni-badge class="uni-badge-left-margin badgecolor" :text="cartCount" absolute="rightTop" size="small">
                                <uni-icons type="cart" size="22" color="#9b9c9f"></uni-icons>
                            </uni-badge>
                        </view>
                        <view>
                            <text>购物车</text>
                        </view>
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
                    @change="onProductSkuChange"
                    @addCart="_getCartCount"
                >
                    <view class="btn-box">
                        <view class="btn cart">加入购物车</view>
                        <view class="btn buy">立即购买 </view>
                    </view>
                </productSku>
            </view>
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
        <tigpopup v-model:show="showCoupon" title="优惠券" paddingBottom="0" height="60vh" backgroundColor="#f5f5f5">
            <CouponList :productId="Number(product_id)"></CouponList>
        </tigpopup>
        <selectRegion v-model:show="showRegion" @sendRegionNames="getRegionText"></selectRegion>
        <tigBackTop :class="{ show: scrollTop > 100 }"></tigBackTop>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import productImg from "./src/productImg.vue";
import productTitleInfo from "./src/productTitleInfo.vue";
import productSeckillTitle from "./src/productSeckillTitle.vue";
import productComment from "./src/productComment.vue";
import productSku from "./src/productSku.vue";
import afterSaleService from "./src/afterSaleService.vue";
import selectRegion from "@/components/region/selectRegion.vue";
import { imageFormat } from "@/utils/format";
import { reactive, ref } from "vue";
import { onLoad, onShow, onPageScroll } from "@dcloudio/uni-app";
import { getProductDetail, getProductSkuDetail, getProductCouponList } from "@/api/product/product";
import { addCoupon } from "@/api/coupon/coupon";
import tigBackTop from "@/components/tigBackTop/index.vue";
import { asyncGetCartCount } from "@/api/cart/cart";
import type { PicList, ProductItem, AttrList, SkuList, ServiceList, RankDetail, DescArr, ProductCouponItem } from "@/types/product/product";

import CouponList from "@/components/coupon/couponList.vue";
const tabIndex = ref(0);
const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "商品详情",
    class: "pageGoods"
});
const scrollTop = ref(0);
onPageScroll((e) => {
    scrollTop.value = e.scrollTop;
});
const product_id = ref<string>("");
const showAttrRef = ref(false);
// 打开窗口
const showDrawer = () => {
    showAttrRef.value = true;
};
onLoad((option) => {
    if (option) {
        const { id } = option;
        if (id) {
            product_id.value = id;
            __getProductDetail(id);
        }
        getCouponList();
    }
});
onShow(() => {
    _getCartCount();
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
        result = await getProductDetail(id);
        product.value = result.item;
        attrList.value = result.attr_list;
        picList.value = result.pic_list;
        rankDetail.value = result.rank_detail;
        skuList.value = result.sku_list;
        checkedValue.value = result.checked_value;
        descArr.value = result.desc_arr;
        serviceList.value = result.service_list;
        productStock.value = result.item.product_stock;
        loadPrice();
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        });
    }
};
const skuId = ref(0);
const skuStr = ref<string>("");
const productPrice = ref<string>("");
const productStock = ref<number>(0);
const is_seckill = ref<number>(0);
const seckill_end_time = ref<string>("");
const productNumber = ref<number>(1);
const onProductSkuChange = (item: any) => {
    if (item.type !== "null") {
        productStock.value = item.sku_stock;
        skuId.value = item.sku_id;
        skuStr.value = item.sku_str;
    }
    productNumber.value = item.productNumber;
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
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        });
    }
};
const cartCount = ref<number>(0);
const _getCartCount = async () => {
    try {
        const result = await asyncGetCartCount();
        cartCount.value = result.count;
    } catch (error) {}
};
const toPage = (url: string) => {
    uni.switchTab({ url });
};

const showRegion = ref(false);
const regionText = ref("北京 朝阳区");
const handleAddress = () => {
    showRegion.value = true;
};
const getRegionText = (data: string[]) => {
    regionText.value = data.join(" ");
};

const showCoupon = ref(false);
const couponList = ref<ProductCouponItem[]>([]);
const portionCouponList = ref<ProductCouponItem[]>([]);
const handleCoupon = () => {
    showCoupon.value = true;
};
const getCouponList = async () => {
    try {
        const result = await getProductCouponList(Number(product_id.value));
        console.log("查询");
        couponList.value = result.list;
        portionCouponList.value = result.list.slice(0, 3);
    } catch (error: any) {
        console.error(error.message);
    }
};
</script>
<style lang="scss" scoped>
.badgecolor {
    :deep(.uni-badge--error) {
        background-color: $tig-color-primary;
    }
}
.icon-image {
    width: 35rpx;
    height: 35rpx;
}
.productDetail-content {
    padding: 0 20rpx;
    padding-bottom: 100rpx;
    .product-card-row {
        background-color: #fff;
        padding: 20rpx;
        border-radius: 20rpx;
        margin: 20rpx 0;
        .cart-item {
            font-size: 26rpx;
            margin: 25rpx 0;
            .title {
                width: 90rpx;
                color: #81838e;
            }
            .attr_text {
                display: block;
                width: 66vw;
            }
            .label {
                .tips {
                    color: $tig-color-primary;
                    font-size: 24rpx;
                    margin-top: 5rpx;
                }
            }
        }
        .traceability-item {
            padding: 10rpx;
            background-color: #fdf6f0;
            color: #ff9627;
            font-size: 24rpx;
            image {
                width: 115rpx;
                height: 35rpx;
                margin-right: 20rpx;
            }
        }
        .tab-box {
            padding: 10rpx 0 20rpx 0;
            margin-bottom: 20rpx;
            font-size: 24rpx;
            .active {
                color: $tig-color-primary;
            }
        }
        .default {
            color: #9b9c9f;
            font-size: 24rpx;
            padding: 10rpx;
            .desc-pic-item {
                image {
                    width: 100%;
                }
            }
        }
    }

    .coupon-list {
        background-color: #fff;
        padding: 20rpx;
        border-radius: 20rpx;
        align-items: center;
        .title {
            width: 90rpx;
            color: #81838e;
        }
        .coupon-item {
            position: relative;
            display: inline-block;
            margin-right: 20rpx;
            padding: 0 18rpx 0 24rpx;
            height: 36rpx;
            line-height: 35rpx;
            color: #fff;
            font-size: 20rpx;
            background: $tig-color-primary;

            &::before {
                content: "";
                position: absolute;
                left: -3px;
                top: 0;
                bottom: 0;
                width: 6px;
                height: 100%;
                color: $tig-color-primary;
                background: $tig-color-primary;
                -webkit-mask: radial-gradient(circle at 2px, #0000 2px, $tig-color-primary 0);
                -webkit-mask-position: -3px;
                -webkit-mask-size: 100% 6px;
            }

            &::after {
                content: "";
                content: "";
                position: absolute;
                right: -3px;
                top: 0;
                bottom: 0;
                width: 6px;
                height: 100%;
                color: #fff;
                background: $tig-color-primary;
                -webkit-mask: radial-gradient(circle at 2px, #0000 2px, $tig-color-primary 0);
                -webkit-mask-position: 5px;
                -webkit-mask-size: 100% 6px;
            }
        }
    }
}
.bottom-bar-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    border-top: 1rpx solid #f5f5f5;
    .bottom-bar {
        height: 100rpx;
        padding: 0 20rpx;

        .icon-box {
            width: 200rpx;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }

        .btn-box {
            display: flex;
            padding-left: 8rpx;
        }
        .label {
            color: #666;
            font-size: 20rpx;
            text-align: center;
        }
        .btn {
            width: 250rpx;
            text-align: center;
            line-height: 60rpx;
            height: 60rpx;
            color: #fff;
            font-size: 24rpx;
        }
        .cart {
            background: #e1f4e3;
            border-radius: 100rpx 0 0 100rpx;
            color: $tig-color-primary;
        }
        .buy {
            background: $tig-color-primary;
            border-radius: 0 100rpx 100rpx 0;
        }
    }
}
.attr_table {
    padding: 0 20rpx;
    .item {
        margin-bottom: 5rpx;
        font-size: 22rpx;
        .lable {
            display: inline-block;
            width: 200rpx;
            border: 1px solid #f5f4ef;
            background: #f5f4ef;
            padding: 10rpx 20rpx;
        }
        .value {
            flex: 1;
            border: 1px solid #f5f4ef;
            padding: 10rpx 20rpx;
        }
    }
}

.balance {
    border-radius: 0 0 18rpx 18rpx;
    background: #fff;
    margin-bottom: 20rpx;
    padding: 30rpx 32rpx 25rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.coupon-container-content {
    height: 100%;
    padding-bottom: 30rpx;
}
.button-position {
    position: fixed;
    bottom: 30rpx;
    left: 0;
    right: 0;
    padding: 0 30rpx;
    padding-bottom: env(safe-area-inset-bottom) !important;
}

.bonus-box {
    padding: 20rpx;
    overflow: hidden;
    overflow-y: auto;
    // position: absolute;
    height: 100%;
    padding-bottom: 150rpx;
}
.bonus-box .bonus-bd {
    display: flex;
    background: #fff;
    height: 195rpx;
    position: relative;
    overflow: hidden;
    font-size: 28rpx;
    margin-bottom: 20rpx;
    align-items: center;
}
.bonus-box .bonus-bd .bonus-left {
    width: 45%;
    color: #333;
    flex-shrink: 0;
    background-color: #609dde;
    background-image: -webkit-linear-gradient(left, #609dde 20%, #6781da);
    color: #fff;
    text-align: center;
    padding: 24rpx 20rpx;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.bonus-box .bonus-bd .bonus-left::before {
    content: "";
    z-index: 99;
    width: 50rpx;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTQ2MEVGOUEwQUM4MTFFQTgwNkNDRDQzRDE5RjkyMzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTQ2MEVGOUIwQUM4MTFFQTgwNkNDRDQzRDE5RjkyMzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NDYwRUY5ODBBQzgxMUVBODA2Q0NENDNEMTlGOTIzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NDYwRUY5OTBBQzgxMUVBODA2Q0NENDNEMTlGOTIzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrE8tH0AAAGJSURBVHja7Jq/K4VRGMfPq0t5F3U3dRdhMtxBmfwNDBZZDCz+A6SEEqtRCIOSDCw2k0lRkpIfWW7Joqh7FeX1OXnVzeDt3lLn+Xaf+gx3uMOne875Puc5N0qSxClUkxMpGZFcpVKp+8txHAf1ixSgWWFpHcAi9FgWisrl8s+xdQ17sA131pZWtYivT7iEWTiCd0t75PfnImzAFLRbP37zMA3z0GU9R1pgDBagI/gcydpDMJzunQl4tZ7sI+kB0KrQovhlNqQg0gaT0KnQNPr0H1fpfkfTrDEv4kNyUOU+MpDmjHmRXuhXuSH2qYgUVUS6VUQKKiJ5FRGnIvKsIlJSEblVEblQETlVEDmDEwWRQ5cxvLMg8ui+58Xmc2QrtI1ej8gVrFlP9hdYgnvrIuuwb73X2oE5eAtVJGv2699OdmHGBTz3zRLxOeFfr5bhIfQ2PvdHi74Cq2luOGsiNT29hSpS82NoaCLncAybcAMfFq+6XsTPcZ+sClSLlJxARY2/OTVE/qe+BBgAWkdOeDEfg30AAAAASUVORK5CYII=");
    background-size: 17rpx 17rpx;
    background-repeat: repeat-y;
}
.bonus-box .bonus-bd .bonus-left.had_use {
    background-color: #fd7173;
    background-image: -webkit-linear-gradient(left, #fd7173 20%, #fc5d5b);
}
.bonus-box .bonus-bd .bonus-left.overdue {
    background-color: #5dd5cf;
    background-image: -webkit-linear-gradient(left, #5dd5cf 20%, #54d1b8);
}
.bonus-box .bonus-bd .bonus-right {
    box-sizing: border-box;
    width: 100%;
    padding: 0 0 20rpx 20rpx;
    flex-shrink: 1;
    display: flex;
    gap: 10px;
    flex-direction: column;
}
.bonus-box .bonus-bd .bonus-amount {
    font-size: 48rpx;
    font-weight: 700;
    color: #fff;
}
.bonus-box .bonus-bd .bonus-desc {
    height: 40rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 24rpx;
    width: 100%;
}
.bonus-box .bonus-bd .bonus-name {
    height: 50rpx;
    line-height: 50rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
    width: 55%;
}
.bonus-box .bonus-bd .bonus-brief {
    height: 65rpx;
    line-height: 50rpx;
    overflow: hidden;
    color: #999;
    font-size: 20rpx;
}
.bonus-box .bonus-bd .bonus-time {
    position: relative;
    font-size: 24rpx;
    color: #999;
}
.bonus-box .bonus-bd .bonus-btn {
    border: 1rpx solid;
    padding: 6rpx 20rpx;
    border-radius: 30rpx;
    color: #e93b3d;
    position: absolute;
    top: 0;
    right: 0;
}

.bonus-bd {
    opacity: 0.7;
}
.bonus-bd.enable_select {
    opacity: 1;
}
.bonus-bd.checked {
    opacity: 1;
}

.bonus-box .bonus-bd.disabled .bonus-left {
    background: #aaa;
}
.bonus-box .bonus-bd.disabled .bonus-name {
    color: #aaa;
}
.bonus-box .bonus-bd.disabled .bonus-brief {
    color: #aaa;
}
.bonus-box .bonus-bd .bonus-right .disabled_text {
    position: absolute;
    right: 20rpx;
    top: 116rpx;
    font-size: 20rpx;
    color: #aaa;
}

.coupon-btn-con {
    font-size: 22rpx;
    padding: 10rpx 25rpx;
    border-radius: 40rpx;

    color: #fff;
    background-image: -webkit-linear-gradient(left, #609dde 20%, #6781da);
    &:active {
        opacity: 0.7;
    }
    &.disabled {
        background-image: -webkit-linear-gradient(left, #aaa 20%, #aaa);
    }
}

.balance-title {
    display: flex;

    .balance-text {
        font-size: 22rpx;
        padding-left: 15rpx;
        display: flex;
        align-items: flex-end;
    }
}
</style>
