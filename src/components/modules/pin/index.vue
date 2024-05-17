<template>
    <view
        :class="
            'module-ad-con  module-goods_ad module-pin-goods_ad ad-style__' +
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
            module.goods_name_padding
        "
        :style="module.box_padding_format + ' ' + module.box_padding_top_format + module.box_padding_bottom_format"
    >
        <view class="module-ad-content" :style="module.background_color_format + module.box_radius_format">
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

            <view class="goods-ad-warp" :style="module.inner_padding_format">
                <view class="goods-ad-con">
                    <block v-if="module.goods_list" v-for="(goods, index) in module.goods_list" :key="index">
                        <view class="goods-ad-item">
                            <view class="item-content" :style="module.goods_padding_format">
                                <view class="item-con">
                                    <view class="item-photo">
                                        <navigator :url="goods.url" class="item-image-a"><image lazy-load  :src="goods.pin_img" mode="widthFix" /></navigator>
                                        <block v-if="module.style == 1 || module.style == 2 || module.style == 5 || module.style == 6">
                                            <block v-if="module.style == 1">
                                                <view class="cap-pin-goods__tag big">
                                                    <block v-if="module.style == 1">
                                                        <view class="cap-pin-goods__tag-title">拼团</view>
                                                    </block>
                                                    <view class="cap-pin-goods__tag-countdown">
                                                        <view class="cap-pin-goods__tag-countdown-text">距结束还剩</view>
                                                        <view class="cap-pin-goods__countdown count_time" :data-end="module.end_time">
                                                            <rich-text :nodes="timecutData"></rich-text>
                                                        </view>
                                                    </view>
                                                    <view class="cap-pin-goods__tag-extra">{{ goods.join_show_num }}人已团</view>
                                                </view>
                                            </block>
                                            <block v-else-if="module.style == 2 || module.style == 6">
                                                <view class="cap-pin-goods__tag small">
                                                    <view class="cap-pin-goods__tag-countdown">
                                                        <view class="cap-pin-goods__tag-countdown-text">距结束</view>
                                                        <view class="cap-pin-goods__countdown count_time" :data-end="module.end_time">
                                                            <rich-text :nodes="timecutData"></rich-text>
                                                        </view>
                                                    </view>
                                                    <view class="cap-pin-goods__tag-extra">{{ goods.join_show_num }}人已团</view>
                                                </view>
                                            </block>
                                            <block v-else-if="module.style == 5">
                                                <view class="cap-pin-goods__tag list">
                                                    <view class="cap-pin-goods__tag-countdown">
                                                        <view class="cap-pin-goods__tag-countdown-text">距结束</view>
                                                        <view class="cap-pin-goods__countdown count_time" :data-end="module.end_time">
                                                            <rich-text :nodes="timecutData"></rich-text>
                                                        </view>
                                                    </view>
                                                    <view class="cap-pin-goods__tag-extra">{{ goods.join_show_num }}人已团</view>
                                                </view>
                                            </block>
                                        </block>
                                    </view>
                                    <view class="item-info">
                                        <block v-if="module.show_name">
                                            <view class="item-name">
                                                <navigator :url="goods.url" class="item-name-a">
                                                    <view class="title--tag">{{ goods.every_people_num }}人团</view>
                                                    {{ goods.highlight_goods_name ? goods.highlight_goods_name : goods.goods_name }}
                                                </navigator>
                                                <block v-if="module.show_brief">
                                                    <navigator :url="goods.url" class="item-brief">
                                                        {{ goods.brief ? goods.brief : "" }}
                                                    </navigator>
                                                </block>
                                            </view>
                                        </block>
                                        <block v-if="module.show_price">
                                            <view class="item-action">
                                                <view class="item-price">
                                                    {{ global.currency }}
                                                    <text>{{ goods.pin_price ? goods.pin_price : goods.shop_price }}</text>
                                                </view>
                                                <view class="item-buy">
                                                    <view @tap.stop.prevent="buy" :data-id="goods.goods_id" class="buy-btn">
                                                        <block v-if="module.buy_btn_style == 5 || module.buy_btn_style == 6">
                                                            <view>购买</view>
                                                        </block>
                                                        <block v-else-if="module.buy_btn_style == 7 || module.buy_btn_style == 8">
                                                            <view>马上抢</view>
                                                        </block>
                                                        <block v-else>
                                                            <view class="module_ico"></view>
                                                        </block>
                                                    </view>
                                                </view>
                                            </view>
                                        </block>
                                        <block v-else>
                                            <view class="blank" style="height: 20rpx"></view>
                                        </block>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </block>
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
const timecutData =
    '<em class="cout_time">00</em><span class="cout_format">:</span><em class="cout_time">00</em><span class="cout_format">:</span><em class="cout_time">00</em>';
const goods = ref({
    url: "",
    pin_img: "",
    join_show_num: "",
    every_people_num: "",
    brief: false,
    pin_price: false,
    shop_price: "",
    goods_id: ""
});

const buy = () => {};
</script>
<style>
@import '../../../static/css/modules.css';
/*商品类型*/
.module-goods_ad .module-ad-content {
    overflow: hidden;
    z-index: 1;
    position: relative;
}
.goods-ad-warp .goods-ad-item {
    width: 100%;
    position: relative;
    overflow: hidden;
    display: inline-block;
    transition: opacity 0.4s ease-in-out;
}
.goods-ad-warp .goods-ad-con {
    display: flex;
    flex-wrap: wrap;
}
.goods-ad-warp .goods-ad-con .goods-ad-item {
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

.goods-ad-warp .goods-ad-item .item-info .count-down {
    font-size: 24rpx;
    font-weight: normal;
    clear: both;
}
.goods-ad-warp .goods-ad-item .item-info .count-down i {
    font-size: 36rpx;
    padding-right: 10rpx;
}
.goods-ad-warp .goods-ad-item .item-info .count-down em {
    font-size: 32rpx;
    font-weight: normal;
    color: $tig-color-primary;
    padding: 0 4rpx;
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
    color: $tig-color-primary;
    line-height: 60rpx;
    height: 60rpx;
}
.goods-ad-warp .goods-ad-item .item-info .item-price text {
    font-weight: normal;
    font-size: 36rpx;
}
.goods-ad-warp .goods-ad-item .item-info .item-buy {
    justify-content: center;
    height: 60rpx;
    display: flex;
    align-items: center;
}
.goods-ad-warp .goods-ad-item .item-info .item-buy .buy-btn view {
    font-size: 24rpx;
}
.goods-ad-warp .goods-ad-item .item-info .item-buy .module_ico {
    width: 48rpx;
    height: 48rpx;
    color: $tig-color-primary;
    font-size: 36rpx;
}
.goods-ad-warp .goods-ad-item .item-info .item-buy .module_ico::before {
    content: "\e611";
}
/*.goods-ad-warp .goods-ad-item .item-info .tag{border-bottom-right-radius:16rpx;border:1rpx solid;padding:2rpx 6rpx;font-size:20rpx;border-top-left-radius:16rpx;font-weight:300;}*/
/*.goods-ad-warp .goods-ad-item .item-info .market_price b{font-size:130%;}*/
/*.goods-ad-warp .goods-ad-item .item-info .buy{background:url("../../../static/flow/cart_ico.png") no-repeat scroll 50% center / 30rpx auto;bottom:10rpx;height:60rpx;position:absolute;right:14rpx;width:60rpx;}*/
.ad-style__1 .goods-ad-warp .goods-ad-item .item-info .item-name .item-name-a {
    font-size: 28rpx;
}
.ad-style__2 .goods-ad-warp .goods-ad-item .item-info .item-name .item-name-a,
.ad-style__5 .goods-ad-warp .goods-ad-item .item-info .item-name .item-name-a,
.ad-style__6 .goods-ad-warp .goods-ad-item .item-info .item-name .item-name-a {
    font-size: 24rpx;
}
.ad-style__2 .goods-ad-warp .goods-ad-con {
    display: flex;
    flex-wrap: wrap;
}
.ad-style__2 .goods-ad-warp .goods-ad-con .goods-ad-item {
    width: 50%;
}
.ad-style__3 .goods-ad-warp .goods-ad-con {
    display: flex;
    flex-wrap: wrap;
}
.ad-style__3 .goods-ad-warp .goods-ad-con .goods-ad-item {
    width: 33.3333%;
}
.ad-style__3 .goods-ad-warp .goods-ad-item .item-info .item-price text {
    font-size: 32rpx;
}
.ad-style__3 .goods-ad-warp .goods-ad-item .item-info .item-buy {
    display: none;
}
.ad-style__4 .goods-ad-warp .goods-ad-con {
    display: flex;
    flex-wrap: wrap;
}
.ad-style__4 .goods-ad-warp .goods-ad-con .goods-ad-item {
    width: 100%;
}
.ad-style__4 .goods-ad-warp .goods-ad-con .goods-ad-item:nth-child(3n + 2) {
    width: 50%;
}
.ad-style__4 .goods-ad-warp .goods-ad-con .goods-ad-item:nth-child(3n + 3) {
    width: 50%;
}
.ad-style__5 .goods-ad-warp .goods-ad-con {
    display: flex;
    flex-wrap: wrap;
}
.ad-style__5 .goods-ad-warp .goods-ad-con .goods-ad-item {
    width: 100%;
}
.ad-style__5 .goods-ad-warp .goods-ad-item .item-content {
    display: flex;
    flex-wrap: nowrap;
}
.ad-style__5 .goods-ad-warp .goods-ad-item .item-content .item-con {
    display: flex;
    flex-wrap: nowrap;
    flex: 1;
}
.ad-style__5 .goods-ad-warp .goods-ad-item .item-photo {
    width: 40%;
}
.ad-style__5 .goods-ad-warp .goods-ad-item .item-info {
    width: 60%;
    text-align: left;
}
.ad-style__5 .goods-ad-warp .goods-ad-item .item-action {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 0;
}
.ad-style__6 .goods-ad-warp {
    overflow: hidden;
}
.ad-style__6 .goods-ad-warp .goods-ad-con {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    margin-bottom: -40rpx;
    padding-bottom: 40rpx !important;
    -webkit-overflow-scrolling: touch;
}
.ad-style__6 .goods-ad-warp .goods-ad-con .goods-ad-item {
    width: 40%;
    flex: none;
}
.ad-style__6 .goods-ad-warp .goods-ad-item .item-info .item-price text {
    font-size: 28rpx;
}
.ad-style__7 .goods-ad-warp {
    overflow: hidden;
    padding-bottom: 50rpx;
}
.ad-style__7 .goods-ad-warp .goods-ad-con {
    display: flex;
    flex-wrap: nowrap;
}
.ad-style__7 .goods-ad-warp .goods-ad-con {
    display: block;
    flex-wrap: nowrap;
    padding: 0 !important;
    height: 100%;
}
.ad-style__7 .goods-ad-warp swiper {
    height: 400rpx;
    position: relative;
    overflow: hidden;
}
.ad-style__7 .goods-ad-warp .goods-ad-con .goods-ad-item {
    width: 33.333%;
}
.ad-style__7 .goods-ad-warp .goods-ad-item .item-info {
}
.ad-style__7 .goods-ad-warp .goods-ad-item .item-info .item-price text {
    font-size: 28rpx;
}
.ad-style__7 .goods-ad-warp .goods-ad-item .item-info .item-buy {
    display: none;
}
.ad-style__7 .goods-ad-warp .swiper-pagination-con {
    position: absolute;
    bottom: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.ad-style__7 .goods-ad-warp .swiper-pagination {
    display: inline-block;
    width: 24rpx;
    border-radius: 0;
    height: 4rpx;
    margin: 0 2rpx;
    background: #000;
    opacity: 0.2;
}
.ad-style__7 .goods-ad-warp .swiper-pagination.active {
    opacity: 1;
    background-color: #fff;
}
/*.ad-style__7.ad-pic_page_type__2 .goods-ad-warp .swiper-pagination-con{position:absolute;bottom:30rpx;display:flex;justify-content:center;align-items:center;width:100%}
.ad-style__7.ad-pic_page_type__2 .goods-ad-warp .swiper-pagination{margin:0 6rpx;background:#333;width:12rpx;height:12rpx;display:inline-block;border-radius:100%;background:#000;opacity:.2}
.ad-style__7.ad-pic_page_type__2 .goods-ad-warp .swiper-pagination.active{opacity:1}
.ad-style__7.ad-pic_page_type__3 .goods-ad-warp .swiper-pagination-con{text-align:center;right:0;position:absolute;width:110rpx;bottom:20rpx}
.ad-style__7.ad-pic_page_type__3 .goods-ad-warp .swiper-pagination{position:absolute;text-align:center;z-index:10;bottom:0;left:0;width:100%}
.ad-style__7.ad-pic_page_type__3 .goods-ad-warp .swiper-pagination{text-align:right;background:#000;opacity:.3;border-radius:200rpx;padding:2rpx 10rpx;display:inline-block;width:auto;color:#fff;font-size:24rpx}*/
.ad-buy_btn_style__0 .goods-ad-warp .goods-ad-item .item-info .item-buy {
    display: none;
}
.ad-buy_btn_style__1 .goods-ad-warp .goods-ad-item .item-info .item-buy .module_ico::before {
    content: "\e611";
    font-size: 40rpx;
}
.ad-buy_btn_style__2 .goods-ad-warp .goods-ad-item .item-info .item-buy .module_ico::before {
    content: "\e664";
    font-size: 44rpx;
}
.ad-buy_btn_style__3 .goods-ad-warp .goods-ad-item .item-info .item-buy .module_ico::before {
    content: "\e74a";
    font-size: 40rpx;
}
.ad-buy_btn_style__4 .goods-ad-warp .goods-ad-item .item-info .item-buy .module_ico::before {
    content: "\e620";
    font-size: 40rpx;
}
.ad-buy_btn_style__5 .goods-ad-warp .goods-ad-item .item-info .item-buy .buy-btn view {
    color: $tig-color-primary;
    height: 44rpx;
    line-height: 44rpx;
    padding: 0 16rpx;
    display: inline-block;
    position: relative;
    border-radius: 4rpx;
    border: 0 solid $tig-color-primary;
}
.ad-buy_btn_style__5 .goods-ad-warp .goods-ad-item .item-info .item-buy .buy-btn view:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    content: "";
    pointer-events: none;
    border: 2rpx solid #f44;
    border-radius: 4rpx;
}
.ad-buy_btn_style__6 .goods-ad-warp .goods-ad-item .item-info .item-buy .buy-btn view {
    background: $tig-color-primary;
    color: #fff;
    height: 44rpx;
    line-height: 44rpx;
    padding: 0 20rpx;
    display: inline-block;
    position: relative;
    border-radius: 44rpx;
}
.ad-buy_btn_style__7 .goods-ad-warp .goods-ad-item .item-info .item-buy .buy-btn view {
    color: $tig-color-primary;
    height: 44rpx;
    line-height: 44rpx;
    padding: 0 16rpx;
    display: inline-block;
    position: relative;
    border-radius: 4rpx;
    border: 0 solid $tig-color-primary;
}
.ad-buy_btn_style__7 .goods-ad-warp .goods-ad-item .item-info .item-buy .buy-btn view:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    content: "";
    pointer-events: none;
    border: 2rpx solid #f44;
    border-radius: 4rpx;
}
.ad-buy_btn_style__8 .goods-ad-warp .goods-ad-item .item-info .item-buy .buy-btn view {
    background: $tig-color-primary;
    color: #fff;
    height: 44rpx;
    line-height: 44rpx;
    padding: 0 20rpx;
    display: inline-block;
    position: relative;
    border-radius: 44rpx;
}
.ad-goods_style__2 .goods-ad-warp .goods-ad-con .goods-ad-item .item-con {
    box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.06);
}
.ad-goods_style__3 .goods-ad-warp .goods-ad-con .goods-ad-item .item-con {
    border: 2rpx solid rgba(50, 50, 51, 0.1);
}
.ad-goods_style__4 .goods-ad-warp .goods-ad-item .item-info {
    background: transparent;
}
.ad-goods_radio_style__2 .goods-ad-warp .goods-ad-con .goods-ad-item .item-con {
    border-radius: 12rpx;
}
.ad-goods_radio_style__2 .goods-ad-warp .goods-ad-con .goods-ad-item .item-con .item-photo {
    border-radius: 12rpx 12rpx 0 0;
    overflow: hidden;
}
.ad-goods_radio_style__2 .goods-ad-warp .goods-ad-con .goods-ad-item .item-con .item-info {
    border-radius: 0 0 12rpx 12rpx;
}
.ad-text_align__2 .goods-ad-warp .goods-ad-con .goods-ad-item {
    text-align: center;
}
.ad-text_align__2 .goods-ad-warp .goods-ad-item .item-info .item-buy {
    height: auto;
    padding-bottom: 30rpx;
}
.ad-text_align__2 .goods-ad-warp .goods-ad-item .item-info .item-action {
    flex-wrap: wrap;
    justify-content: normal;
}
/*.ad-text_align__2 .goods-ad-warp .goods-ad-item .item-info .item-action >*{width: 100%;}*/
.ad-text_align__2 .goods-ad-warp .goods-ad-item .item-info .item-action .item-price {
    width: 100%;
}
.ad-text_align__2 .goods-ad-warp .goods-ad-item .item-info .item-action .item-buy {
    width: 100%;
}

.ad-text_weight__2 .goods-ad-warp .goods-ad-item .item-info .item-name .item-name-a {
    font-weight: bold;
}
.ad-text_weight__2 .goods-ad-warp .goods-ad-item .item-info .item-price text {
    font-weight: bold;
}
.ad-goods_name_row__1 .goods-ad-warp .goods-ad-item .item-info .item-name .item-name-a {
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
.ad-goods_name_padding__0 .goods-ad-warp .goods-ad-item .item-info .item-name {
    margin-left: 0;
    margin-right: 0;
}
.ad-goods_name_padding__0 .goods-ad-warp .goods-ad-item .item-info .item-action {
    padding-left: 0;
    padding-right: 0;
}
.ad-goods-title_style__3 .image-ad-title {
    padding-bottom: 56rpx !important;
}
.ad-goods-title_style__3 .goods-ad-warp {
    border-top-left-radius: 30rpx;
    margin-top: -50rpx !important;
    overflow: hidden;
    background: #fff;
    padding-top: 20rpx;
}

/*拼团*/
.module-pin-goods_ad .cap-pin-goods__tag {
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 48rpx;
    padding: 0 24rpx;
    color: #fff;
    line-height: 48rpx;
    background: -webkit-linear-gradient(left, #fd3e20, #fc6340);
    background: linear-gradient(90deg, #fd3e20, #fc6340);
    background: linear-gradient(to right, var(--ump-start-bg, #f86f30), var(--ump-end-bg, #e91717));
    color: var(--ump-main-text, #ffffff);
}
.module-pin-goods_ad .cap-pin-goods__tag .cap-pin-goods__tag-title {
    font-weight: 700;
    font-size: 40rpx;
    float: left;
}
.module-pin-goods_ad .cap-pin-goods__tag .cap-pin-goods__countdown rich-text {
    font-weight: bold;
}
.module-pin-goods_ad .cap-pin-goods__tag .cap-pin-goods__countdown rich-text {
    font-size: 24rpx;
    text-align: center;
}
.module-pin-goods_ad .cap-pin-goods__tag.big {
    height: 80rpx;
    line-height: 80rpx;
}
.module-pin-goods_ad .cap-pin-goods__tag.big .cap-pin-goods__tag-countdown {
    float: right;
    height: 80rpx;
    font-size: 24rpx;
    line-height: 32rpx;
}
.module-pin-goods_ad .cap-pin-goods__tag.big .cap-pin-goods__tag-countdown-text {
    display: block;
    height: 32rpx;
    margin: 10rpx 0 0;
    line-height: 32rpx;
    text-align: left;
    opacity: 0.6;
}
.module-pin-goods_ad .cap-pin-goods__tag.big .cap-pin-goods__countdown {
    margin-top: 0;
}
.module-pin-goods_ad .cap-pin-goods__tag.big .cap-pin-goods__countdown text {
    padding: 0 4rpx;
}
.module-pin-goods_ad .cap-pin-goods__tag.list .cap-pin-goods__tag-countdown,
.module-pin-goods_ad .cap-pin-goods__tag.small .cap-pin-goods__tag-countdown {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    white-space: nowrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    height: auto;
}
.module-pin-goods_ad .cap-pin-goods__tag.list,
.module-pin-goods_ad .cap-pin-goods__tag.small {
    height: auto;
    padding: 0 20rpx;
}
.module-pin-goods_ad .cap-pin-goods__tag.list .cap-pin-goods__tag-countdown-text,
.module-pin-goods_ad .cap-pin-goods__tag.small .cap-pin-goods__tag-countdown-text {
    display: block;
    height: 48rpx;
    line-height: 48rpx;
}
.module-pin-goods_ad .cap-pin-goods__tag-extra {
    position: absolute;
    bottom: 100%;
    left: 0;
    margin: 0 0 12rpx 24rpx;
    padding: 0 8rpx;
    color: #fff;
    font-size: 24rpx;
    line-height: 32rpx;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 4rpx;
}
.module-pin-goods_ad .title--tag {
    display: inline-block;
    box-sizing: border-box;
    height: 32rpx;
    margin: -4rpx 8rpx 0 0;
    padding: 5rpx 8rpx 0;
    color: #f44;
    font-weight: 400;
    font-size: 24rpx;
    line-height: 24rpx;
    vertical-align: middle;
    background-color: #ffdfdf;
    border-radius: 32rpx;
    background-color: var(--ump-tag-bg, #f2f2ff);
}
</style>
