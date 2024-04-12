<template>
    <view :class="'item-li list-' + masonryListClass">
        <view class="photo">
            <navigator :url="'/pages/goods_details/index?id=' + item.goods_id + '&is_exchange=' + item.is_exchange">
                <image :src="item.goods_thumb" mode="widthFix"></image>

                <view v-if="item.goods_number == 0" class="outsale">售罄</view>
            </navigator>
        </view>
        <view class="info">
            <view class="detail">
                <navigator :url="'/pages/goods_details/index?id=' + item.goods_id + '&is_exchange=' + item.is_exchange" class="name">{{ item.goods_name }}</navigator>
                <navigator :url="'/pages/goods_details/index?id=' + item.goods_id + '&is_exchange=' + item.is_exchange" class="brief" v-if="item.brief">{{ item.brief }}</navigator>
            </view>
            <view class="action">
                <view class="price">
                    <text>{{ global.currency }}</text>
                    {{ item.promote_price ? item.promote_price : item.shop_price }}
                </view>
                <view @tap.stop.prevent="buy" :data-id="item.goods_id" class="buy_btn"><image src="/static/images/common/cart.png" role="img"></image></view>
            </view>
        </view>
    </view>
</template>

<script>
var app = getApp();
import * as common from '@/utils/common.js'
export default {
    data() {
        return {
            global: app.globalData
        };
    },
    props: {
        item: {
            type: Object
        },
        masonryListClass: {
            type: String,
            default: ''
        }
    },
    methods: {
        buy: function (e) {
            common.buy(this, {
                id: e.currentTarget.dataset.id
            });
        }
    },
    created: function () {}
};
</script>
<style>
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
.item-li .info .detail .brief {
    line-height: 40rpx;
    height: 40rpx;
    font-size: 22rpx;
    overflow: hidden;
    display: block;
    color: #aaa;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -moz-box;
    -webkit-line-clamp: 1;
    -moz-line-clamp: 1;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
}
.item-li .info .action {
    vertical-align: middle;
    height: 70rpx;
    padding: 0 16rpx 10rpx;
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
    float: right;
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
</style>
