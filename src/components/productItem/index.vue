<template>
    <view :class="'item-li list-' + masonryListClass" @click="toPage(item)">
        <view class="photo">
                <tigImage v-if="!isExchange" v-model:src="item.pic_thumb" mode="widthFix"></tigImage>
                <tigImage v-if="isExchange" v-model:src="item.pic_url" mode="widthFix"></tigImage>

                <view v-if="item.product_stock == 0" class="outsale">售罄</view>
        </view>
        <view class="info">
            <view class="detail">
                {{item.product_name}}
                {{item.brief}}
            </view>
            <view class="action" v-if="!isExchange">
                <view class="pricenum">
                    <FormatPrice :priceData="item.product_price"></FormatPrice>
                </view>
                <productBuy :id="item.product_id" :disabled="item.product_stock == 0" @callback="getCallback">
                    <view class="buy_btn"><image lazy-load src="/static/images/common/cart.png"></image></view>
                </productBuy>
            </view>
            <view class="exchange" v-if="isExchange">
                <view class="market_price">
                    原价: <FormatPrice :priceData="item.market_price"></FormatPrice>
                </view>
                <view class="exchangenum">
                    积分价: <FormatPrice :priceData="item.discounts_price"></FormatPrice>+&nbsp;<text>{{ item.exchange_integral }}</text> 积分
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import productBuy from '@/components/productBuy/index.vue'
const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    masonryListClass: {
        type: String,
        default: ""
    },
    isExchange: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits(["callback"]);
const getCallback = () => {
    emit("callback");
}
const toPage = (item:any) => {
    let id = ''
    if(props.isExchange){
        id = item.id
    }else{
        id = item.product_id
    }
    uni.navigateTo({ url:'/pages/productDetail/index?id=' + id + '&is_exchange=' + props.isExchange })
}
</script>
<style lang="scss" scoped>
.item-li {
    width: 100%;
    margin-bottom: 15rpx;
    background: #fff;
    border-radius: 12rpx;
    overflow: hidden;
}
.item-li .photo {
    padding: 20rpx;
    text-align: center;
    position: relative;
}
.item-li .photo image {
    width: 100%;
}
.item-li .info {
    background: #ffffff;
}

.item-li .info .detail {
    margin: 0 20rpx 10rpx;
    display: block;
    line-height: 40rpx;
    height: 80rpx;
    overflow: hidden;
    font-size: 26rpx;
    display: block;
    font-weight: bold;
    color: #2a3145;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -moz-box;
    -webkit-line-clamp: 2;
    -moz-line-clamp: 2;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
}

.item-li .info .detail .name {
    line-height: 40rpx;
    overflow: hidden;
    font-size: 26rpx;
    display: block;
    font-weight: bold;
    color: #2a3145;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -moz-box;
    -webkit-line-clamp: 2;
    -moz-line-clamp: 2;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
}
.item-li .info .action {
    padding: 0 16rpx 10rpx;
    display: flex;
    justify-content: space-between;
}

.item-li .info .price {
    font-weight: bold;
    display: inline-block;
    font-size: 30rpx;
}
.item-li .info .price text {
    font-size: 20rpx;
}

.item-li .buy_btn {
    display: inline-block;
    font-size: 24rpx;
    margin-right: 20rpx;
    margin-top: 6rpx;
    width: 45rpx;
    height: 45rpx;
}
.item-li .buy_btn image {
    width: 100%;
    height: 100%;
}

.list-cart .buy_btn {
    display: none;
}
.list-overseas {
    background: #fff;
    -webkit-box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.05);
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.05);
}

.outsale {
    position: absolute;
    top: 80rpx;
    left: 50%;
    margin-left: -90rpx;
    width: 180rpx;
    height: 180rpx;
    line-height: 180rpx;
    background: rgba(0, 0, 0, 0.4);
    font-size: 38rpx;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    border-radius: 100%;
}

 .pricenum {
    font-size: 32rpx;
    line-height: 56rpx;
    color: $tig-color-primary;
    min-width: 200rpx;
    :deep(.util) {
        font-weight: normal;
        font-size: 22rpx;
        position: relative;
        top: 4rpx;
    }
}
.exchange{
    padding: 0 20rpx;
    .market_price{
        margin-bottom: 10rpx;
        font-size: 22rpx;
        color: #999;
        :deep(.price-content) {
            text-decoration: line-through;
        }
    }
    .exchangenum{
        margin-bottom: 20rpx;
        font-size: 22rpx;
        :deep(.price-content) {
            color: #caad7d;
            font-size: 30rpx;
            font-weight: bold;
        }
        text{
            color: #caad7d;
            font-weight: bold;
        }
    }
}
</style>
