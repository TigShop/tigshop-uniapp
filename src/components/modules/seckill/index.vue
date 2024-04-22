<template>
    <view
        :class="
            'module-ad-con module-goods_ad module-seckill-goods_ad ad-style__' +
            module?.style +
            ' ad-buy_btn_style__' +
            module?.buy_btn_style +
            ' ad-goods_style__' +
            module?.goods_style +
            ' ad-goods_radio_style__' +
            module?.goods_radio_style +
            ' ad-text_align__' +
            module?.text_align +
            ' ad-text_weight__' +
            module?.text_weight +
            ' ad-goods_name_row__' +
            module?.goods_name_row +
            ' ad-goods_name_padding__' +
            module?.goods_name_padding
        "
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom"
    >
        <view
            class="module-ad-content"
            :style="
                frameFormat.background_color +
                ' ' +
                frameFormat.box_radius +
                allFormat.background_color +
                allFormat.box_padding +
                allFormat.box_padding_bottom +
                allFormat.box_padding_top +
                allFormat.box_radius +
                allFormat.inner_padding
            "
        >
            <commonTitle v-if="module.title.show_title" :module="module.title"></commonTitle>

            <view class="goods-ad-warp" style="">
                <view class="goods-ad-con">
                    <block v-for="item in seckillList" :key="item.product_id">
                        <view class="goods-ad-item">
                            <view class="item-content" :style="allFormat.goods_padding">
                                <view class="item-con">
                                    <view class="item-photo">
                                        <navigator :url="''" class="item-image-a">
                                            <van-image :src="imageFormat(item.pic_thumb)">
                                                <template v-slot:error>加载失败</template>
                                            </van-image>
                                            <!-- <image lazy-load  :src="imageFormat(item.pic_thumb)" mode="widthFix" /> -->
                                        </navigator>
                                        <view :class="'cap-seckill-goods__tag ' + className">
                                            <text class="cap-seckill-goods__tag-title" v-if="module?.style === 1"> 秒杀 </text>
                                            <van-count-down title="" format="HH:mm:ss" :time="time" />
                                        </view>
                                    </view>
                                    <view class="item-info">
                                        <block v-if="module.show_name">
                                            <view class="item-name">
                                                <block v-if="module.show_name">
                                                    <navigator url="" class="item-name-a">
                                                        {{ item.product_name ?? "" }}
                                                    </navigator>
                                                </block>

                                                <block v-if="module.show_brief">
                                                    <navigator url="" class="item-brief">
                                                        {{ item.product_desc ?? "" }}
                                                    </navigator>
                                                </block>
                                            </view>
                                        </block>
                                        <block v-if="module.show_price">
                                            <view class="item-action">
                                                <view class="item-price">
                                                    <text class="price_format">{{ priceFormat(Number(item.product_price)) }}</text>
                                                </view>
                                                <view class="item-buy">
                                                    <view @click="buy" :data-id="item.product_id" class="buy-btn">
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
import { ref, computed, onMounted } from "vue";
import { imageFormat, priceFormat } from "@/utils/format";
import { formatFrame } from "@/components/modules";
import commonTitle from "@/components/modules/commonTitle/index.vue";
import { getHomeSeckill } from "@/api/home/home";
import type { SeckillList } from "@/types/home/home";
const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    }
});
const time = ref(60 * 60 * 1000);
const { frame } = props.module;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
const allFormat = computed(() => {
    return {
        background_color: `background-color: ${props.module.background_color};`,
        box_padding: `margin-left: ${props.module.box_padding}px;margin-right: ${props.module.box_padding}px;`,
        box_padding_bottom: `margin-bottom: ${props.module.box_padding_bottom}px;`,
        box_padding_top: `margin-top: ${props.module.box_padding_top}px;`,
        box_radius: `border-radius: ${props.module.box_radius}px;`,
        inner_padding: `padding: ${props.module.inner_padding}px;`,
        goods_padding: `padding: ${props.module.goods_padding}px;`
    };
});
const className = computed(() => {
    switch (props.module.style) {
        case 1:
            return "big";
        case 2:
            return "small flex-end";
        case 5:
            return "list flex-end";
        case 6:
            return "small flex-end";
    }
});

const buy = () => {};

const seckillList = ref<SeckillList[]>();
const getData = async () => {
    try {
        const result = await getHomeSeckill();
        seckillList.value = result.seckill_list;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    getData();
});
</script>
<style lang="scss" scoped>
@import "../../../static/css/modules.css";
.cap-seckill-goods__tag {
    display: flex;
    align-items: center;
    justify-content: space-between;
    :deep(.van-count-down) {
        color: #fff;
        font-weight: 700;
        font-size: 20rpx;
    }

    &.flex-end {
        justify-content: flex-end;
    }
}
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
    color: #f23030;
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
    color: #f23030;
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
    color: #f23030;
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
    color: #f23030;
    height: 44rpx;
    line-height: 44rpx;
    padding: 0 16rpx;
    display: inline-block;
    position: relative;
    border-radius: 4rpx;
    border: 0 solid #f23030;
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
    background: #f23030;
    color: #fff;
    height: 44rpx;
    line-height: 44rpx;
    padding: 0 20rpx;
    display: inline-block;
    position: relative;
    border-radius: 44rpx;
}
.ad-buy_btn_style__7 .goods-ad-warp .goods-ad-item .item-info .item-buy .buy-btn view {
    color: #f23030;
    height: 44rpx;
    line-height: 44rpx;
    padding: 0 16rpx;
    display: inline-block;
    position: relative;
    border-radius: 4rpx;
    border: 0 solid #f23030;
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
    background: #f23030;
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

/*秒杀*/
.module-seckill-goods_ad .cap-seckill-goods__tag {
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
.module-seckill-goods_ad .cap-seckill-goods__tag .cap-seckill-goods__tag-title {
    font-weight: 700;
    font-size: 40rpx;
    float: left;
}
.module-seckill-goods_ad .cap-seckill-goods__tag .cap-seckill-goods__countdown rich-text {
    font-weight: bold;
}
.module-seckill-goods_ad .cap-seckill-goods__tag .cap-seckill-goods__countdown rich-text {
    font-size: 24rpx;
    text-align: center;
}
.module-seckill-goods_ad .cap-seckill-goods__tag.big {
    height: 80rpx;
    line-height: 80rpx;
}
.module-seckill-goods_ad .cap-seckill-goods__tag.big .cap-seckill-goods__tag-countdown {
    float: right;
    height: 80rpx;
    font-size: 24rpx;
    line-height: 32rpx;
}
.module-seckill-goods_ad .cap-seckill-goods__tag.big .cap-seckill-goods__tag-countdown-text {
    display: block;
    height: 32rpx;
    margin: 10rpx 0 0;
    line-height: 32rpx;
    text-align: left;
    opacity: 0.6;
}
.module-seckill-goods_ad .cap-seckill-goods__tag.big .cap-seckill-goods__countdown {
    margin-top: 0;
}
.module-seckill-goods_ad .cap-seckill-goods__tag.big .cap-seckill-goods__countdown text {
    padding: 0 4rpx;
}
.module-seckill-goods_ad .cap-seckill-goods__tag.list .cap-seckill-goods__tag-countdown,
.module-seckill-goods_ad .cap-seckill-goods__tag.small .cap-seckill-goods__tag-countdown {
    font-size: 24rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    white-space: nowrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    height: auto;
}
.module-seckill-goods_ad .cap-seckill-goods__tag.list,
.module-seckill-goods_ad .cap-seckill-goods__tag.small {
    height: auto;
    padding: 0 20rpx;
}
.module-seckill-goods_ad .cap-seckill-goods__tag.list .cap-seckill-goods__tag-countdown-text,
.module-seckill-goods_ad .cap-seckill-goods__tag.small .cap-seckill-goods__tag-countdown-text {
    display: block;
    height: 48rpx;
    line-height: 48rpx;
}
</style>
