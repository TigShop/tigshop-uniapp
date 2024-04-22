<template>
    <view style="height: 100%">
        <navbar :parameter="parameter"></navbar>
        <productImg v-if="productInfo" :picList="picList" :productInfo="productInfo"></productImg>
        <view class="product-con detail-info" v-if="productInfo">
            <block v-if="productInfo.is_seckill === 1">
                <view class="seckill-floor" v-if="productInfo.end_time_formate">
                    <view class="seckil-price-wrap">
                        <view class="seckill-price amount">
                            <text class="num">{{ priceFormat(Number(productInfo.product_price)) }}</text>
                        </view>
                        <view class="seckill-btm-div">
                            <text class="skf-icon-pos">
                                <text class="label-icon-div white-border have-icon-div">
                                    <text class="label-icon seckill-floor-icon"></text>
                                    <text class="label-text white-text">{{ "限时秒杀" }}</text>
                                </text>
                            </text>
                            <text class="skf-jdPrice">{{ productInfo.shop_price }}</text>
                        </view>
                    </view>
                    <view class="seckil-time-wrap">
                        <text class="seckil-time-title">{{ productInfo.wait_start ? "距开始还有:" : "距结束还剩" }}</text>
                        <!-- <view class="seckill-time-div" id="seckill_time" :data-end="productInfo.end_time_formate">
                            <rich-text class="item-key" :nodes="timecutData"></rich-text>
                        </view> -->
                    </view>
                </view>
            </block>

            <view class="detail-wrapper" :style="productInfo.is_seckill === 1 ? 'padding-right:100rpx;' : ''">
                <view class="detail-row price-row" v-if="productInfo.is_seckill === 0">
                    <view class="amount">
                        <text class="num">{{ priceFormat(Number(productInfo.product_price)) }}</text>
                    </view>
                    <view class="market-price" v-if="true">
                        <text class="num">{{ productInfo?.market_price }}</text>
                    </view>
                </view>
                <view class="detail-btn-icos">
                    <view class="btn-share" @click="handleShare">
                        <text class="iconfont icon-Artboard"></text>
                        <text class="txt">分享</text>
                    </view>
                    <view class="btn-collect" @click="handleCollect">
                        <text :class="'iconfont ' + (!isCollect ? 'icon-shoucang1' : 'icon-shoucang2')"></text>
                        <text class="txt">收藏</text>
                    </view>
                </view>
                <view class="detail-name">{{ productInfo?.product_name }}</view>
                <view class="detail-desc">{{ productInfo.product_brief }}</view>
                <!-- <view class="detail-row" v-if="productInfo.will_start_time_formate && productInfo.is_seckill === 1">
                    <view class="de_buy_tip">
                        <view class="price_wrap">
                            <text class="tip_red">秒杀预告</text>
                            <text class="de_c_red">秒杀期间可享受超值价格优惠</text>
                        </view>
                        <view class="buy_tip_v2">
                            <text class="buy_tip_v2_title">秒杀时间</text>
                            {{ productInfo.will_start_time_formate }} - {{ productInfo.will_end_time_formate }}
                        </view>
                    </view>
                </view> -->
                <!-- <view class="coupon acea-row row-between-wrapper" v-if="storeInfo.give_integral > 0">
                    <view class="">
                        赠积分：
                        <view class="activity">赠送 {{ storeInfo.give_integral }} 积分</view>
                    </view>
                </view> -->
            </view>

            <view class="detail-li-main attribute">
                <view class="detail-li-con" @click="selecAttr">
                    <view class="relation_text">
                        <text class="title">已选</text>
                        <text class="goods_relation_attr">
                            <block v-for="(spec, goods_relation) in goodsRelation" :key="goods_relation">
                                <block v-for="(value, index) in spec.values" :key="index">
                                    <text class="label" v-if="value.selected">{{ value.label }}</text>
                                </block>
                            </block>
                        </text>
                        <text class="goods_spec_attr">
                            <block v-for="(spec, productAttr) in productAttr" :key="productAttr">
                                <block v-for="(value, index) in spec.values" :key="index">
                                    <text class="label" v-if="value.checked">{{ value.label }}</text>
                                </block>
                            </block>
                        </text>
                        <text class="atterTxt">{{ attrValue }}</text>
                        <text class="goods_number">{{ selectNumber }}</text>
                        件
                    </view>
                    <image lazy-load  class="more-ico" src="/static/images/common/more.png"></image>
                </view>
                <!-- <view class="detail-li-con" style="padding-top: 15rpx">
                    <view class="title">服务</view>
                    <view v-if="productInfo.store_id > 0 && productInfo.self_store_id == 0">由{{ productInfo.store_info.store_title }}配送并提供售后服务</view>
                    <view v-else>由{{ shopName }}配送并提供售后服务</view>
                </view> -->
                <!-- <block v-if="productInfo.service_list">
                    <view class="goods-detail-servie" @click="goodsService">
                        <view class="goods-detail-servie-box">
                            <block v-if="productInfo.service_list" v-for="(servie, index) in productInfo.service_list" :key="index">
                                <view class="service-tip-module">
                                    <block v-if="servie.ico_img">
                                        <image lazy-load  :src="servie.ico_img" class="service-item-icon" mode="widthFix"></image>
                                    </block>
                                    <block v-else>
                                        <view class="servie_right"></view>
                                    </block>
                                    <view class="service-icon-text">{{ servie.goods_service_name }}</view>
                                </view>
                            </block>
                        </view>
                    </view>
                </block> -->
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import productImg from "./src/productImg.vue";
import { reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getProductDetail } from "@/api/product/product";
import type { PicList, Item } from "@/types/product/product";
import { imageFormat, priceFormat } from "@/utils/format";

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
            // __getProductDetail("340");
        }
    }
});
const picList = ref<PicList[]>([]);
const productInfo = ref<Item>();

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
</script>
<style lang="scss" scoped>
.market-price {
    font-size: 20rpx;
    color: #999;
    display: inline-block;
    text-decoration: line-through;
}
button {
    padding: 0;
    margin: 0;
    line-height: normal;
    background-color: #fff;
}
button::after {
    border: 0;
}
.action-sheet-item {
    padding: 0;
    height: 240rpx;
    align-items: center;
    display: flex;
}
.contact {
    font-size: 16px;
    width: 50%;
    background-color: #fff;
    padding: 8rpx 0;
    border-radius: 0;
    margin: 0;
    line-height: 2;
}
.contact::after {
    border: none;
}
.action-sheet {
    font-size: 17px;
    line-height: 1.8;
    width: 50%;
    position: absolute;
    top: 0;
    right: 0;
    padding: 25rpx 0;
}

.goods_empty {
    background: #fff;
    padding-bottom: 300rpx;
}
.goods_empty image {
    width: 100%;
}
.canvas {
    width: 750px;
    height: 1298px;
}
.poster-pop {
    width: 450rpx;
    height: 714rpx;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    top: 50%;
    margin-top: -357rpx;
}
.poster-pop image {
    width: 100%;
    height: 100%;
    display: block;
}
.poster-pop .close {
    width: 46rpx;
    height: 75rpx;
    position: fixed;
    right: 0;
    top: -73rpx;
    display: block;
}
.poster-pop .save-poster {
    background-color: #df2d0a;
    font-size: ：22rpx;
    color: #fff;
    text-align: center;
    height: 76rpx;
    line-height: 76rpx;
    width: 100%;
}
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9;
}

.pro-wrapper .iconn {
    background-image: url("data:image/png;base64,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");
    width: 100rpx;
    height: 100rpx;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
}
.pro-wrapper .iconn.iconn1 {
    background-image: url("data:image/png;base64,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");
}
.relation_text text {
    display: inline-block;
}
.relation_text text .label {
    padding-right: 10rpx;
}

.product-con .goods-footer {
    padding: 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    z-index: 99;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.13);
    display: flex;
    justify-content: space-between;
}

.product-con .goods-footer .buy-btns {
    width: 444rpx;
    height: 100rpx;
}
.product-con .goods-footer .buy-btns .btn {
    width: 50%;
    text-align: center;
    line-height: 100rpx;
    color: #fff;
    font-size: 28rpx;
}
.product-con .goods-footer .buy-btns .btn.w-100 {
    width: 100%;
}
.product-con .goods-footer .buy-btns .btn-addCart {
    background: #fbaf37;
}
.product-con .goods-footer .buy-btns .btn-buyNow {
    background: #e93323;
}

.product-con .goods-footer .buy-btns .pin-btn {
    width: 50%;
    text-align: center;
    color: #fff;
    font-size: 24rpx;
}
.product-con .goods-footer .buy-btns .pin-btn .pin-row1 {
    height: 50rpx;
    line-height: 60rpx;
}
.product-con .goods-footer .buy-btns .pin-btn .pin-row2 {
    height: 50rpx;
    line-height: 40rpx;
}
.product-con .goods-footer .buy-btns .pin-btn text {
    font-size: 28rpx;
}
.product-con .goods-footer .goods-foot-btns {
    width: 300rpx;
    display: flex;
    justify-content: space-between;
}
.product-con .goods-footer .goods-foot-btns .item {
    font-size: 18rpx;
    color: #666;
    display: block;
    text-align: center;
    width: 100%;
    padding-top: 10rpx;
}
.product-con .goods-footer .goods-foot-btns .item .iconfont {
    text-align: center;
    font-size: 40rpx;
}
.product-con .goods-footer .goods-foot-btns .item .iconfont.icon-shoucang1 {
    color: #f00;
}
.product-con .goods-footer .goods-foot-btns .item .iconfont.icon-gouwuche1 {
    font-size: 40rpx;
    position: relative;
}
.product-con .goods-footer .goods-foot-btns .item .iconfont.icon-gouwuche1 .num {
    color: #fff;
    position: absolute;
    font-size: 18rpx;
    padding: 2rpx 10rpx 3rpx;
    border-radius: 200rpx;
    top: 0;
    right: 0;
}

.detail-desc-main {
    margin-top: 30rpx;
    border-radius: 18rpx;
    overflow: hidden;
    background: #fff;
}
.detail-choose {
    height: 100rpx;
    line-height: 100rpx;
    width: 100%;
    border-bottom: 1rpx solid #eee;
    display: flex;
    justify-content: space-between;
}
.detail-choose .tab-item {
    width: 100%;
    text-indent: 30rpx;
    font-size: 28rpx;
    color: #787777;
    font-weight: normal;
    text-align: center;
}
.detail-choose .tab-item.current {
    color: #f23030;
}

.detail-desc-warp {
    overflow: hidden;
    padding: 20rpx;
    background: #fff;
}
.detail-desc-warp rich-text .desc_img {
    width: 100%;
    vertical-align: top;
}
.detail-desc-warp rich-text {
    line-height: 46rpx;
    font-size: 24rpx;
    color: 666;
}
.detail-desc-warp .shuxing {
    display: flex;
}
.detail-desc-warp .shuxing .p-text {
    flex: 1;
    font-size: 24rpx;
    color: #777;
    padding: 10rpx;
}

.detail-info .detail-wrapper {
    background-color: #fff;
    border-radius: 0 0 18rpx 18rpx;
    padding-bottom: 30rpx;
    position: relative;
}
.detail-info .detail-name {
    font-size: 32rpx;
    font-weight: bold;
    margin: 0 30rpx 0 30rpx;
    padding-top: 23rpx;
}
.detail-info .detail-desc {
    font-size: 24rpx;
    margin: 18rpx 30rpx 0 30rpx;
    color: #666;
}
.detail-info .detail-row {
    margin: 0 30rpx;
    padding-top: 25rpx;
}
.detail-info .price-row {
    position: relative;
}
.detail-info .price-row .amount {
    font-size: 28rpx;
    font-weight: bold;
    color: #f23030;
    display: inline-block;
}
.detail-info .price-row .amount .num {
    font-size: 48rpx;
    padding-left: 6rpx;
    padding-right: 8rpx;
}
.detail-info .detail-btn-icos {
    position: absolute;
    right: 20rpx;
    top: 20rpx;
    display: flex;
}
.detail-info .btn-collect {
    text-align: center;
}
.detail-info .btn-collect text {
    display: block;
}
.detail-info .btn-collect text.iconfont {
    font-size: 60rpx;
    line-height: 40rpx;
    height: 40rpx;
    display: block;
    vertical-align: middle;
}
.detail-info .btn-collect text.icon-shoucang2 {
    color: #ffb03f;
}
.detail-info .btn-collect text.txt {
    font-size: 20rpx;
}
.detail-info .btn-share {
    text-align: center;
    margin-right: 10rpx;
}
.detail-info .btn-share text {
    display: block;
}
.detail-info .btn-share text.iconfont {
    font-size: 50rpx;
    line-height: 40rpx;
    height: 40rpx;
    display: block;
    vertical-align: middle;
}
.detail-info .btn-share text.txt {
    font-size: 20rpx;
}

.detail-bonus-list {
    border-radius: 18rpx;
    margin-top: 20rpx;
    overflow: hidden;
}
.detail-bonus-list .bonus-row {
    display: flex;
    justify-content: space-between;
}
.product-con .wrapper .coupon {
    padding: 0 30rpx;
    border-top: 1rpx solid #f5f5f5;
    margin-top: 25rpx;
    height: 80rpx;
    font-size: 26rpx;
    color: #82848f;
}
.lyecsquan-item {
    width: 520rpx;
}
.lyecsquan-item .coupon-item {
    position: relative;
    display: inline-block;
    margin-right: 20rpx;
    margin-bottom: 15rpx;
    padding: 0 9px 0 12px;
    border-top: 1px solid #e4393c;
    border-bottom: 1px solid #e4393c;
    height: 18px;
    line-height: 17px;
    color: #e4393c;
    font-size: 20rpx;
}
.lyecsquan-item .coupon-item::after,
.lyecsquan-item .coupon-item::before {
    content: "";
    position: absolute;
    top: -1px;
    height: 18px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAkCAMAAACpD3pbAAAAPFBMVEUAAAD////kOTzqaGr+9vb4zc32vL3sdXfnTE/mRUfxmpz87O3yn6HqZ2npXWDlQEP97e33xsf3xsbxl5nHV2NIAAAAAXRSTlMAQObYZgAAAJpJREFUOMvllEsSwiAQRMnjF8g/3v+uKhIrjhHK0l16B4+C7hlALS07qSyS2kVlKnHmCpqdNvwYwTdY6yKGX7AeKtb+jmN3jLuYMMEd5XYBUMZ6cO/BHHhr7ut6wizxHOhvM+kUT5S5I77ZsGWU1kbsExsmiSdMBVc3l9a0tJaDdR+CVcryWtRBFLXYkku1oae955Xnv5Y+j/UKs1MGwyraxf4AAAAASUVORK5CYII=");
    background-size: 15px 18px;
    background-repeat: no-repeat;
}
.lyecsquan-item .coupon-item::before {
    left: 0;
    width: 16rpx;
}
.lyecsquan-item .coupon-item::after {
    right: 0;
    width: 9rpx;
    background-position: -11px 0;
}

.detail-li-main {
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 18rpx;
    padding: 20rpx 30rpx;
    font-size: 26rpx;
    color: #82848f;
    margin-top: 30rpx;
    position: relative;
}
.detail-li-main .detail-li-con {
    display: flex;
    line-height: 50rpx;
}
.detail-li-main .title {
    font-weight: bold;
    color: #333;
    width: 80rpx;
}
.detail-li-main .more-ico {
    width: 36rpx;
    height: 36rpx;
    display: block;
    position: absolute;
    right: 31rpx;
    top: 28rpx;
}

.storage_ico {
    width: 35rpx;
    height: 35rpx;
    padding-right: 6rpx;
    vertical-align: middle;
}

.bonus-bottom-slide-warp .bottom-slide-content {
    background: #f5f5f5;
}
.bonus-tit-txt {
    color: #888;
    padding: 0 20rpx 10rpx;
    font-size: 24rpx;
}
.bonus-box {
    padding: 20rpx;
}
.bonus-box .bonus-bd {
    display: flex;
    background: #fff;
    height: 195rpx;
    position: relative;
    overflow: hidden;
    font-size: 28rpx;
    margin-bottom: 20rpx;
}
.bonus-box .bonus-bd .bonus-left {
    width: 240rpx;
    color: #333;
    flex-shrink: 0;
    background-color: #609dde;
    background-image: -webkit-linear-gradient(left, #609dde 20%, #6781da);
    color: #fff;
    text-align: center;
    padding: 24rpx 20rpx;
    position: relative;
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
    flex-grow: 1;
    padding: 20rpx 20rpx 20rpx 20rpx;
    flex-shrink: 1;
    position: relative;
}
.bonus-box .bonus-bd .bonus-right checkbox {
    position: absolute;
    right: 20rpx;
    top: 60rpx;
}
.bonus-box .bonus-bd .bonus-amount b {
    font-size: 32rpx;
    font-weight: 700;
    padding-right: 6rpx;
    vertical-align: middle;
}
.bonus-box .bonus-bd .bonus-amount {
    font-size: 60rpx;
    font-weight: 700;
    color: #fff;
}
.bonus-box .bonus-bd .bonus-desc {
    height: 40rpx;
    overflow: hidden;
    font-size: 24rpx;
}
.bonus-box .bonus-bd .bonus-name {
    height: 50rpx;
    line-height: 50rpx;
    overflow: hidden;
    color: #333;
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
    font-size: 22rpx;
    color: #999;
}
.bonus-box .bonus-bd .bonus-btn2 {
    border: 1rpx solid #609dde;
    padding: 6rpx 20rpx;
    border-radius: 30rpx;
    color: #609dde;
    position: absolute;
    top: -6rpx;
    right: 0;
}
.bonus-box .bonus-bd .bonus-btn {
    padding: 6rpx 20rpx;
    border-radius: 30rpx;
    position: absolute;
    top: -6rpx;
    right: 0;
    background-color: #609dde;
    background-image: -webkit-linear-gradient(left, #609dde 20%, #6781da);
    color: #fff;
}
.bonus-box .bonus-bd.unchecked .bonus-left {
    background: #aaa;
}
.bonus-box .bonus-bd.unchecked .bonus-name {
    color: #aaa;
}
.bonus-box .bonus-bd.unchecked .bonus-brief {
    color: #aaa;
}

page .share-bottom-slide-warp {
    height: 300rpx;
}
page .share-bottom-slide-warp .bottom-slide-content {
    background: #fff;
}
.goods-share-ico {
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 99;
    background: #666;
    border-radius: 100%;
    overflow: hidden;
    display: block;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 31px;
}
.goods-share-ico svg {
}
.share-bottom-slide-warp .share-item {
    display: inline-block;
    width: 50%;
    float: left;
    position: relative;
}
.share-bottom-slide-warp .share-item text {
    display: block;
    text-align: center;
    font-size: 28rpx;
}
.share-bottom-slide-warp .share-item text.iconfont {
    height: 30px;
    line-height: 30px;
    margin-bottom: 5px;
    font-size: 60rpx;
    color: #777;
}
.share-bottom-slide-warp .share-item .line {
    width: 1px;
    border-left: 1px solid #ddd;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
}
.share-bottom-slide-warp image.share {
    display: block;
    height: auto;
    left: 0;
    margin: -20rpx 0 0;
    position: absolute;
    top: auto;
    bottom: 40rpx;
    width: 100%;
}
.share-bottom-slide-warp .creat_goods_pic {
    height: 280px;
    margin-top: 40rpx;
}
.share-bottom-slide-warp .creat_goods_pic img {
    display: block;
    margin: 0 auto;
    height: 100%;
    box-shadow: 0 1px 20rpx 4px rgba(0, 0, 0, 0.1);
}
.share-bottom-slide-warp .creat_goods_pic p {
    text-align: center;
    font-size: 12px;
    margin-top: 40rpx;
}
.share-bottom-slide-warp .mobile-zone {
    width: 90px;
    position: absolute;
}
.share-bottom-slide-warp .sel-zone {
    width: 100%;
    height: 100%;
    background-color: #fff;
    color: white;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    color: #333;
    border: 0;
    display: block;
    position: relative;
}
.share-bottom-slide-warp {
}
.share-bottom-slide-warp .kefu-item {
    display: inline-block;
    width: 33.333%;
    float: left;
    position: relative;
    text-align: center;
    margin-top: 28px;
}
.share-bottom-slide-warp .kefu-item span {
    display: block;
    text-align: center;
}
.share-bottom-slide-warp .kefu-item span.ico {
    height: 30px;
    line-height: 30px;
    margin-bottom: 0px;
}
.share-bottom-slide-warp .kefu-item .line {
    width: 1px;
    border-left: 1px solid #ddd;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
}

page .sharePic-bottom-slide-warp {
    height: 840rpx;
}
.sharePic-bottom-slide-warp .show_pic {
    height: 480rxp;
    width: 100%;
    text-align: center;
    width: 300rpx;
    padding-top: 25rpx;
    padding-bottom: 30rpx;
    position: relative;
    margin: 0 auto;
}
.sharePic-bottom-slide-warp .show_pic image.showPic {
    height: 480rxp;
    width: 300rpx;
    box-shadow: 0 1px 20rpx 4px rgba(0, 0, 0, 0.1);
    border-radius: 5rpx;
    display: block;
    position: relative;
    z-index: 100;
    margin: 0 auto;
}
.sharePic-bottom-slide-warp .show_pic .loading {
    position: absolute;
    width: 50rpx;
    height: 50rpx;
    z-index: 1;
    left: 125rpx;
    top: 230rpx;
}
.sharePic-bottom-slide-warp .save_pic_btn {
    background-color: #df2d0a;
    height: 80rpx;
    line-height: 80rpx;
    display: block;
    margin: 0 40rpx;
    border-radius: 80rpx;
    color: #fff;
    font-size: 28rpx;
    text-align: center;
}
.sharePic-bottom-slide-warp .desc {
    text-align: center;
    padding: 25rpx 0;
    color: #888;
    font-size: 24rpx;
}

/*page .goodsMerchant-bottom-slide-warp{height: 600rpx}
.merchant_price_list{font-size:26rpx;padding: 20rpx;}
.merchant_price_list .list{padding: 10rpx 0;display: flex;}
.merchant_price_list .tit{font-weight: bold;}
.merchant_price_list .item-col{display: inline-block;width: 300rpx;text-align: right;height: 60rpx;line-height: 60rpx;}
.merchant_price_list .item-col1{width: 200rpx;text-align: left;}
.merchant_price_list .icon-doubt{}
.merchant_price_list .icon-bianji{color: #22bbee}
.merchant_price_list .show_price{color: #f23030}*/

.cat-price-warp {
    padding: 0;
    height: 100%;
    overflow: hidden;
}
.cat-price-warp .item {
    clear: both;
    padding: 20rpx 40rpx 0;
}
.cat-price-warp .price-set .price-input {
    position: relative;
}
.cat-price-warp .price-set input {
    width: 300rpx;
    background: #f6f6f6;
    border-radius: 8rpx;
    padding: 10rpx 30rpx;
}
.cat-price-warp .price-set text.dw {
    position: absolute;
    left: 300rpx;
    top: 14rpx;
    color: #666;
}
.cat-price-warp .item .txt {
    line-height: 60rpx;
    color: #666;
    font-size: 24rpx;
    font-weight: bold;
}
.cat-price-warp .item .desc {
    padding: 20rpx 0;
    color: #888;
    font-size: 24rpx;
}
.cat-price-warp .price-label {
    border-radius: 10rpx;
    height: 60rpx;
    line-height: 60rpx;
    display: inline-block;
}
.cat-price-warp .price-label text {
    display: inline-block;
    width: 220rpx;
    text-align: center;
    padding: 0rpx 16rpx;
    background: #f2f2f2;
    box-shadow: 0rpx 0rpx 4rpx #a4a4a4 inset;
    color: #666;
    font-size: 24rpx;
}
.cat-price-warp .price-label text.lab-l {
    border-radius: 10rpx 0 0 10rpx;
}
.cat-price-warp .price-label text.lab-r {
    border-radius: 0 10rpx 10rpx 0;
}
.cat-price-warp .price-label text.current {
    background: #f23030;
    color: #fff;
}
.store_checkall {
    margin-left: 9rpx;
    display: block;
}
.cat-price-warp .submit-btn {
    width: 100%;
    background: #f23030;
    color: #fff;
    padding: 20rpx 0;
    text-align: center;
    display: block;
    font-size: 30rpx;
    margin-top: 40rpx;
}

.showKefu-bottom-slide-warp {
}
.kefu-warp {
    padding: 0 30rpx;
}
.kefu-warp .item {
    padding-bottom: 30rpx;
    display: flex;
    justify-content: space-between;
}
.kefu-warp .item .tit {
    width: 250rpx;
}
.kefu-warp .item .ico {
    color: #ff6735;
}
.kefu-warp .item .con {
    width: 100%;
}
.kefu-warp .item .con.phone {
    font-size: 30rpx;
    font-weight: bold;
}
.kefu-warp .item .con.ewm image {
    width: 300rpx;
    height: 300rpx;
}
.kefu-warp .item .copy {
    font-size: 20rpx;
}

.outsale {
    position: absolute;
    top: 280rpx;
    left: 50%;
    margin-left: -140rpx;
    width: 280rpx;
    height: 280rpx;
    line-height: 280rpx;
    background: rgba(0, 0, 0, 0.4);
    font-size: 50rpx;
    color: #ffffff;
    letter-spacing: 0;
    z-index: 99;
    text-align: center;
    border-radius: 100%;
}

.goods-live-btn {
    height: 45rpx;
    padding: 0 20rpx;
    position: absolute;
    right: 20rpx;
    top: 20rpx;
    color: #fff;
    z-index: 99;
    border-radius: 45rpx;
    font-size: 24rpx;
    line-height: 45rpx;
    background: -webkit-linear-gradient(left, #ef3390, #ef3647);
    background: -o-linear-gradient(right, #ef3390, #ef3647);
    background: -moz-linear-gradient(right, #ef3390, #ef3647);
    background: linear-gradient(to right, #ef3390, #ef3647);
}
.goods-live-btn image {
    width: 18rpx;
    height: 18rpx;
    padding-left: 10rpx;
    vertical-align: middle;
    display: inline-block;
}

/*其他拼团列表*/
.wap-join {
    margin-top: 30rpx;
}
.wap-join .join {
    background: #fff;
    padding: 20rpx 20rpx 40rpx;
    border-radius: 18rpx;
}
.wap-join .join .title {
    padding: 20rpx 10rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #000;
    margin: 0 0;
}
.wap-join .join .w-join {
    margin: 30rpx 8rpx 0 40rpx;
    height: 94rpx;
    position: relative;
    border: 2rpx solid #ff3b00;
}
.wap-join .join .w-join .w-join-face {
    width: 100rpx;
    height: 100rpx;
    background: #000;
    border-radius: 100%;
    position: absolute;
    top: -6rpx;
    left: -40rpx;
    border: 2rpx solid #ff3b00;
    overflow: hidden;
}
.wap-join .join .w-join .w-join-face image {
    display: block;
    width: 100%;
    height: 100%;
}
.wap-join .join .w-join .w-join-text {
    position: absolute;
    left: 60rpx;
    padding: 12rpx 8rpx;
    font-size: 20rpx;
    width: 57%;
    height: 80%;
}
.wap-join .join .w-join .w-join-info {
    position: absolute;
    right: 0;
    min-width: 400rpx;
    font-size: 20rpx;
}
.wap-join .join .w-join .w-join-info .w-btn {
    float: right;
    height: 94rpx;
    width: 150rpx;
    display: block;
    text-align: center;
    background: #ff3b00;
    border-color: #ff3b00;
    color: #fff;
    font-size: 28rpx;
    border-radius: 0 10rpx 10rpx 0;
    border: 0 solid;
    margin-right: -10rpx;
    margin-top: -2rpx;
    line-height: 94rpx;
}
.wap-join .join .w-join .w-join-info .t-sec {
    color: #ff3b00;
    font-size: 24rpx;
    margin-right: 66rpx;
    line-height: 2;
}
.wap-join .join .w-join .w-join-text .t-sec {
    color: #000;
    font-size: 24rpx;
}
.wap-join .join .w-join .w-join-text .t-aside {
    color: #999;
}
.wap-join .pin-group-more {
    clear: both;
    font-size: 24rpx;
    padding-top: 30rpx;
    text-align: center;
}
.wap-join .pin-group-more i {
    background: #ddd;
    height: 32rpx;
    width: 30rpx;
    line-height: 30rpx;
    overflow: hidden;
    position: absolute;
    right: 100rpx;
    top: 22rpx;
    transition: all 0.5s ease 0s;
    font-size: 36rpx;
    text-align: center;
}

/*评论列表*/
.detail-comment-list .title {
    width: auto;
}
.detail-comment-list .comment-num {
    color: #999;
    font-size: 24rpx;
    padding-left: 6rpx;
}
.detail-comment-list .comment-row {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 80rpx;
    font-size: 24rpx;
}
.detail-comment-list .comment-row .gray {
    color: #666;
    font-weight: bold;
}
.comment_list {
    clear: both;
    background: #fff;
    padding: 20rpx;
}
.comment_list .li {
    position: relative;
    overflow: hidden;
    min-height: 112rpx;
    margin-bottom: 20rpx;
    background: #fff;
    line-height: 1.4;
    box-shadow: 0 8rpx 26rpx 0 rgba(0, 0, 0, 0.05);
    border-radius: 15rpx;
}
.comment_list .li .detail {
    padding: 20rpx;
}
.comment_list .li .g-comm-tag {
    margin-bottom: 10rpx;
}
.comment_list .li .g-comm-tag text {
    background: #eee none repeat scroll 0 0;
    display: inline-block;
    margin-bottom: 12rpx;
    margin-right: 6rpx;
    padding: 6rpx 12rpx;
    border-radius: 5rpx;
    font-size: 22rpx;
    color: #666;
}
.comment_list .li .name {
    text-align: left;
    padding: 20rpx 20rpx 0;
    line-height: 70rpx;
}
.comment_list .li .name image {
    border-radius: 200rpx;
    display: inline-block;
    vertical-align: top;
    width: 60rpx;
    height: 60rpx;
}
.comment_list .li .name text {
    width: 200rpx;
    overflow: hidden;
    height: 70rpx;
    overflow: hidden;
    display: inline-block;
    padding-left: 20rpx;
}
.comment_list .li .rank {
    display: flex;
    justify-content: space-between;
    padding: 10rpx 20rpx 0;
}
.comment_list .li .rank .product-item-star {
    display: inline-block;
    margin-top: 5rpx;
}
.comment_list .small_png {
    display: inline-block;
    height: 14px;
    width: 72px;
}
.comment_list .li .rank time {
    float: right;
}
.comment_list .li .detail {
    padding: 20rpx;
}
.comment_list .li .g-comm-tag {
    margin-bottom: 10rpx;
}
.comment_list .li .detail .com_content {
    margin-bottom: 10rpx;
}
.comment_list .li .detail .com_content text {
    display: block;
    margin-bottom: 20rpx;
    line-height: 50rpx;
}
.comment_list .li .g-comm-wrap {
    overflow: hidden;
    margin-bottom: 10rpx;
}
.comment_list .li .show-photos .golook {
    display: inline-block;
    float: left;
    margin-bottom: 16rpx;
    margin-right: 16rpx;
}
.comment_list .li .show-photos image {
    width: 160rpx;
    height: 160rpx;
    display: inline-block;
}
.comment_list .li .com_kefu {
    display: flex;
    color: #f23030;
    font-size: 24rpx;
}
.comment_list .li .reply-sub {
    border-top: 1rpx solid #f0f0f0;
}
.comment_list .li .reply-sub .s-useful text.iner {
    border-right: 1rpx solid #f0f0f0;
    display: block;
    font-weight: 400;
}
.comment_list .li .reply-sub .u-vote {
    display: inline-block;
    float: left;
    width: 50%;
    text-align: center;
    line-height: 70rpx;
    height: 70rpx;
}
.comment_list .share-quest {
    padding-bottom: 30rpx;
    padding-top: 30rpx;
    position: relative;
}
.comment_list .eval-box-i {
    display: table;
    text-align: center;
    width: 100%;
}
.comment_list .eval-box-i .btn-good {
    color: #333;
    font-size: 24rpx;
    vertical-align: middle;
    display: inline-block;
    height: 50rpx;
    line-height: 50rpx;
    padding: 0 30rpx;
    border: 1rpx solid #999;
    border-radius: 72rpx;
}

.detail-goods-list-box .title {
    width: auto;
}
.goods-ad-warp {
    overflow: hidden;
    padding-bottom: 50rpx;
}
.goods-ad-warp {
    border-top-left-radius: 30rpx;
    overflow: hidden;
    background: #fff;
    padding-top: 20rpx;
    position: relative;
}
.goods-ad-warp .goods-ad-con {
    display: block;
    flex-wrap: nowrap;
    padding: 0 !important;
    height: 100%;
}
.goods-ad-warp swiper {
    height: 400rpx;
    position: relative;
    overflow: hidden;
}
.goods-ad-warp .goods-ad-item {
    width: 100%;
    position: relative;
    overflow: hidden;
    display: inline-block;
    transition: opacity 0.4s ease-in-out;
}
.goods-ad-warp .goods-ad-con .goods-ad-item {
    width: 33.333%;
}
.goods-ad-warp .goods-ad-item .item-photo {
    background: #ffffff;
    text-align: center;
    position: relative;
}
.goods-ad-warp .goods-ad-item .item-photo image {
    height: auto;
    width: 100%;
}
.goods-ad-warp .goods-ad-item .item-info {
    background: #ffffff;
    position: relative;
    padding-top: 20rpx;
}
.goods-ad-warp .goods-ad-item .item-info .item-name {
    margin: 0 20rpx 0;
    display: block;
}
.goods-ad-warp .goods-ad-item .item-info .item-name .item-name-a {
    line-height: 40rpx;
    height: 80rpx;
    overflow: hidden;
    display: block;
    color: #2a3145;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -moz-box;
    -webkit-line-clamp: 2;
    -moz-line-clamp: 2;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
}
.goods-ad-warp .goods-ad-item .item-info .item-name .item-name-a {
    font-weight: bold;
}
.goods-ad-warp .goods-ad-item .item-info .item-name .item-name-a {
    line-height: 40rpx;
    height: 40rpx;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -moz-box;
    -webkit-line-clamp: 1;
    -moz-line-clamp: 1;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
}
.goods-ad-warp .goods-ad-item .item-info .item-name .item-brief {
    line-height: 40rpx;
    height: 40rpx;
    overflow: hidden;
    display: block;
    color: #aaa;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -moz-box;
    -webkit-line-clamp: 1;
    -moz-line-clamp: 1;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    font-size: 24rpx;
}
.goods-ad-warp .goods-ad-item .item-info .item-action {
    vertical-align: middle;
    padding: 0 16rpx 4rpx;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.goods-ad-warp .goods-ad-item .item-info .item-price {
    font-size: 20rpx;
    color: #f23030;
    line-height: 60rpx;
    height: 60rpx;
}
.goods-ad-warp .goods-ad-item .item-info .item-price text {
    font-size: 28rpx;
}
.goods-ad-warp .goods-ad-item .item-info .item-price text {
    font-weight: bold;
}
.goods-ad-warp .swiper-pagination-con {
    position: absolute;
    bottom: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.goods-ad-warp .swiper-pagination {
    display: inline-block;
    width: 24rpx;
    border-radius: 0;
    height: 4rpx;
    margin: 0 2rpx;
    background: #000;
    opacity: 0.2;
}
.goods-ad-warp .swiper-pagination.active {
    opacity: 1;
    background-color: #f23030;
}

page .servie-bottom-slide-warp {
    height: 800rpx;
}
.goods-detail-servie {
    padding: 16rpx 0;
    overflow: hidden;
    position: relative;
    height: 80rpx;
    border-top: 1rpx solid #eee;
    margin-top: 30rpx;
}
.goods-detail-servie .servie_right {
    display: inline-block; /*background:url("../../static/product/product-detail-sprites-mjs.png") no-repeat;*/
    background-size: 100px 100px;
    width: 12px;
    height: 12px;
    background-position: -60px -82px;
    position: relative;
    top: 2px;
    margin-right: 3px;
}
.goods-detail-servie .service-icon-text {
    font-size: 24rpx;
    color: #81838e;
    line-height: 32rpx;
    display: inline-block;
}
.goods-detail-servie .service-tip-module {
    display: inline-block;
    margin-top: 16rpx;
    margin-right: 28rpx;
    font-size: 0;
}
.goods-detail-servie .goods-detail-servie-box {
    display: inline-block;
    overflow-x: auto;
    white-space: nowrap;
    overflow-y: hidden;
    height: 100rpx;
    width: 100%;
    -webkit-overflow-scrolling: touch;
}
.service-menu .service-item-icon,
.goods-detail-servie .service-item-icon {
    display: inline-block;
    width: 30rpx;
    height: 30rpx;
    margin-right: 12rpx;
    vertical-align: top;
}
.service-menu .service-item-row {
    font-size: 0;
    padding-top: 30rpx;
    border-bottom: 1rpx solid #ebebeb;
}
.service-menu .service-item-title {
    font-size: 26rpx;
    line-height: 30rpx;
    color: #252525;
    word-wrap: break-word;
    word-break: break-all;
}
.service-menu .service-item-text {
    display: block;
    font-size: 26rpx;
    line-height: 36rpx;
    color: #848689;
    margin: 6rpx 20rpx 24rpx 42rpx;
}
</style>
