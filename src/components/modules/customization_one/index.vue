<template>
    <view
        :class="
            'module-ad-con module-ad-con-' +
            module_id +
            ' module-goods_ad ad-style__' +
            module.style +
            ' ad-buy_btn_style__' +
            module.buy_btn_style +
            ' ad-goods_style__' +
            module.goods_style +
            ' ad-goods_radio_style__' +
            module.goods_radio_style +
            ' ad-text_align__' +
            module.text_align +
            ' ad-text_weight__' +
            module.text_weight +
            ' ad-goods_name_row__' +
            module.goods_name_row +
            ' ad-goods_name_padding__' +
            module.goods_name_padding +
            ' ad-goods-title_style__' +
            module.title_style +
            ' '
        "
        :style="module.box_padding_format + ' ' + module.box_padding_top_format + module.box_padding_bottom_format"
        :data-module_id="module_id"
        :data-index="module_index"
        :data-template="template_id"
    >
        <view :class="'module-ad-content ad-goods-waterfall-' + module.waterfall" :style="module.background_color_format + module.box_radius_format">
            <block v-if="module.show_title">
                <view :class="'image-ad-title ad-title_style__' + module.title_style" :style="module.title_background_format + module.title_radius_format">
                    <view class="image-ad-title-l">
                        <view class="image-ad-title-h" :style="'color: ' + module.title_color">{{ module.title_text }}</view>
                        <view class="image-ad-title-d" :style="'color: ' + module.desc_color">{{ module.desc_text }}</view>
                    </view>
                    <block v-if="module.show_more">
                        <view class="image-ad-title-r">
                            <navigator class="more-link" :url="module.more_link ? module.more_link.wechat_link : ''" :style="'color: ' + module.more_color">
                                <text>查看更多</text>
                                <text class="module_ico module-ico-youjiantou"></text>
                            </navigator>
                        </view>
                    </block>
                </view>
            </block>

            <view class="dOne">
                <view class="wrap">
                    <view class="bg">
                        <image lazy-load  :src="module.background.pic_thumb_format" mode="" />
                    </view>
                    <view style="z-index: 1">
                        <view class="dOne-title">
                            <view style="height: 100rpx">
                                <!-- <view class="dOne-name">兔年好运吉祥物</view>
		                    <view class="dOne-desc">兔年开运 ｜ 限量发售</view> -->
                            </view>
                        </view>
                        <view class="dOne-goods">
                            <view class="list">
                                <block v-if="module.goods_list" v-for="(goods, index) in module.goods_list" :key="index">
                                    <view class="goods-li">
                                        <view class="pic">
                                            <navigator :url="goods.url" class="item-image-a"
                                                ><image lazy-load  class="img" :src="goods.goods_thumb" mode="widthFix"
                                            /></navigator>
                                        </view>
                                        <view class="info">
                                            <block v-if="module.show_name">
                                                <navigator :url="goods.url" class="name">
                                                    {{ goods.highlight_goods_name ? goods.highlight_goods_name : goods.goods_name }}
                                                </navigator>
                                            </block>
                                            <block v-if="module.show_price">
                                                <view class="price-box">
                                                    <view class="red rel-price">
                                                        {{ global.currency }}
                                                        <text>{{ goods.promote_price ? goods.promote_price : goods.shop_price }}</text>
                                                    </view>
                                                    <view class="market-price">
                                                        {{ global.currency }}
                                                        <text>{{ goods.market_price }}</text>
                                                    </view>
                                                </view>
                                            </block>
                                        </view>
                                    </view>
                                </block>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const global: any = getApp().globalData;
const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    }
});

const current = ref(0);
const module_id = ref("");
const module_index = ref(0);
const template_id = ref("");
const goods = ref({
    url: "",
    goods_thumb: "",
    highlight_goods_name: false,
    goods_name: "",
    promote_price: false,
    shop_price: "",
    market_price: ""
});

const monitorCurrent = (e: any) => {

}

const buy = () => {
    
}
</script>
<style>
@import '../../../static/css/modules.css';

/*定制模块一*/
.dOne {
    padding: 20rpx;
}
.dOne .wrap {
    text-align: center;
    padding: 10rpx;
    position: relative;
    z-index: 1;
    margin-bottom: 20rpx;
}
.dOne .wrap .bg image {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: -1;
}
.dOne .dOne-title {
    color: #333;
    padding: 40rpx;
    padding-top: 200rpx;
}
.dOne .dOne-name {
    font-size: 48rpx;
    font-weight: 700;
    padding-bottom: 10rpx;
}
.dOne .dOne-desc {
    font-size: 32rpx;
}
.dOne .dOne-goods {
    padding-left: 40rpx;
}
.dOne .dOne-goods .list {
    overflow-y: scroll;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}
.dOne .goods-li {
    width: 200rpx;
    background: #fff;
    margin-right: 10rpx;
    display: inline-block;
}
.dOne .goods-li .img {
    width: 100%;
    height: 100%;
}
.dOne .goods-li .info {
    padding: 10rpx;
    border-top: 1rpx solid #eee;
    text-align: center;
}
.dOne .goods-li .info .name {
    height: 40rpx;
    line-height: 40rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 28rpx;
    display: block;
    color: #333;
}
.dOne .goods-li .price-box {
    padding: 10rpx 0;
}
.dOne .goods-li .price-box .rel-price {
    font-size: 20rpx;
    display: inline-block;
    padding-right: 10rpx;
    color: #f23030;
}
.dOne .goods-li .price-box .market-price {
    font-size: 20rpx;
    color: #999;
    display: inline-block;
    text-decoration: line-through;
}
.dOne .goods-li .price-box .rel-price text {
    font-size: 24rpx;
}
.dOne .goods-li .price-box .market-price text {
    font-size: 20rpx;
}
</style>
