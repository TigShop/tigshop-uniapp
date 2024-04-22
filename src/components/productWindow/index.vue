<template>
    <view style="height: 100%">
        <view :class="'product-window ' + (attribute.cartAttr == true ? 'on' : '')">
            <view class="textpic">
                <view class="pictrue"><image lazy-load  v-if="productSelect.goods_thumb" :src="productSelect.goods_thumb"></image></view>
                <view class="text">
                    <view class="amount">
                        ￥
                        <text class="num">{{ productPrice }}</text>
                    </view>
                    <view class="name">{{ productSelect.goods_name }}</view>
                </view>
                <view class="iconfont icon-guanbi" @tap="close"></view>
            </view>
            <scroll-view class="productWinList" scroll-y>
                <view class="item attr-relation" v-for="(item, index) in goodsRelation" :key="index">
                    <view class="title">{{ item.name }}</view>

                    <view class="listn acea-row row-middle">
                        <view
                            :class="'itemn ' + (attrs.selected ? 'on' : '')"
                            :data-indexw="index"
                            :data-id="attrs.id"
                            :data-indexn="indexn"
                            @tap="attrRelationChange"
                            v-for="(attrs, indexn) in item.values"
                            :key="indexn"
                        >
                            {{ attrs.label }}
                        </view>
                    </view>
                </view>
                <view class="item" v-for="(item, index) in productAttrClone" :key="index">
                    <view class="title">{{ item.name }}</view>

                    <view class="listn acea-row row-middle">
                        <view
                            :class="'itemn ' + (attrs.checked ? 'on' : '')"
                            :data-indexw="index"
                            :data-id="attrs.id"
                            :data-indexn="indexn"
                            @tap="attrChange"
                            v-for="(attrs, indexn) in item.values"
                            :key="indexn"
                        >
                            {{ attrs.label }}
                        </view>
                    </view>
                </view>
                <view class="goods-buy-num">
                    <view class="title">数量</view>
                    <view class="cart-num-box">
                        <view
                            :class="'num-btn minus ' + (selectNumberClone > 1 ? '' : 'disabled')"
                            @tap.stop.prevent="cartNumChange"
                            data-type="sub"
                            :data-num="selectNumberClone"
                            :data-index="productSelect.goods_id"
                        ></view>
                        <input
                            type="number"
                            class="num"
                            :value="selectNumberClone"
                            @blur="cartNumChange"
                            data-type="input"
                            :data-num="selectNumberClone"
                            :data-index="productSelect.goods_id"
                        />
                        <view class="num-btn add" @tap.stop.prevent="cartNumChange" data-type="add" :data-num="selectNumberClone" :data-index="productSelect.goods_id"></view>
                    </view>
                </view>
                <view style="height: 100rpx"></view>
            </scroll-view>
            <view class="submit-btns" v-if="!isExchange">
                <view class="submit-btn-ok" @tap.stop.prevent="goodsAddCart" v-if="attrSelectType == 'addCart'">确认</view>
                <view class="submit-btn-ok" @tap.stop.prevent="goodsBuyNow" v-if="attrSelectType == 'buyNow'">确认</view>
                <view class="submit-btn-ok" @tap.stop.prevent="goodsPinBuyNow" v-if="attrSelectType == 'pinBuyNow'">确认</view>
                <view class="submit-btn-addCart" @tap.stop.prevent="goodsAddCart" v-if="attrSelectType == ''">加入购物车</view>
                <view class="submit-btn-buyNow" @tap.stop.prevent="goodsBuyNow" v-if="attrSelectType == ''">立即购买</view>
            </view>
            <view v-else class="submit-btns">
                <view class="submit-btn-ok" @tap.stop.prevent="exchangeBuy" v-if="isExchange">确认兑换</view>
            </view>
        </view>
        <view class="mask" @touchmove.stop.prevent="trueFun" v-if="attribute.cartAttr != false" @tap="close"></view>
    </view>
</template>

<script>
import * as common from '@/utils/common.js'
var app = getApp();
export default {
    data() {
        return {
            global: app.globalData,
            attrValue: [],
            attrIndex: 0,
            relationChangeGoodsId: 0,

            attrs: {
                selected: false,
                id: '',
                label: '',
                checked: false
            },

            selectNumberClone: '',
            productAttrClone: ''
        };
    },
    props: {
        attribute: {
            default: () => ({})
        },
        attrList: {
            default: () => []
        },
        productPrice: {
            default: ''
        },
        productAttr: {
            default: () => []
        },
        goodsRelation: {
            default: () => []
        },
        selectNumber: {
            default: 1
        },
        attrSelectType: {
            default: ''
        },
        productSelect: {
            default: () => ({
                image: '',
                store_name: '',
                price: 0,
                unique: '',
                stock: 0
            })
        },
        isExchange: {
            default: 0
        },
        pinId: {
            default: 0
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    methods: {
        attached: function () {},

        close: function () {
            this.$emit('myevent', {
                detail: {
                    window: false,
                    relationChangeGoodsId: this.relationChangeGoodsId
                }
            });
        },

        cartNumChange: function (e) {
            var that = this;
            var type = e.currentTarget.dataset.type;
            var num = e.currentTarget.dataset.num;
            num = parseInt(num);
            if (type == 'add') {
                num++;
            } else if (type == 'sub') {
                num--;
            } else if (type == 'input') {
                num = e.detail.value;
            }
            if (num <= 1) {
                num = 1;
            }
            that.setData({
                selectNumberClone: num
            });
            this.$emit('ChangeCartNum', {
                detail: num
            });
        },

        attrChange: function (e) {
            var that = this;
            //父级index
            var indexw = e.currentTarget.dataset.indexw;
            //子集index
            var indexn = e.currentTarget.dataset.indexn;
            //设置当前点击属性
            for (var i = that.productAttr[indexw]['values'].length - 1; i >= 0; i--) {
                that.productAttr[indexw]['values'][i]['checked'] = false;
            }
            that.productAttr[indexw]['values'][indexn]['checked'] = true;
            that.setData({
                productAttrClone: that.productAttr
            });
            var params = new Object();
            params.attr = common.getAttrChecked(that.productAttr);
            params.goods_id = that.productSelect.goods_id;
            common.loadPrice(that, params);
            this.$emit('ChangeAttr', {
                detail: that.productAttr
            });
        },

        goodsAddCart: function (e) {
            var that = this;
            common.buy(that, {
                id: that.productSelect.goods_id,
                attr: common.getAttrChecked(that.productAttr),
                num: that.selectNumber
            });
        },

        goodsBuyNow: function (e) {
            var that = this;
            common.buy(that, {
                id: that.productSelect.goods_id,
                attr: common.getAttrChecked(that.productAttr),
                num: that.selectNumber,
                type: 'buyNow'
            });
        },

        exchangeBuy: function (e) {
            var that = this;
            var goods_id = that.productSelect.goods_id;
            common.exchangeBuy(that, {
                id: that.productSelect.goods_id,
                attr: common.getAttrChecked(that.productAttr),
                num: that.selectNumber
            });
        },

        goodsPinBuyNow: function (e) {
            var that = this;
            common.pinBuy(that, {
                id: that.productSelect.goods_id,
                pin_id: that.pinId,
                attr: common.getAttrChecked(that.productAttr),
                num: that.selectNumber,
                type: 'pin'
            });
        },

        attrRelationChange: function (e) {
            var that = this;
            //父级index
            var indexw = e.currentTarget.dataset.indexw;
            //子集index
            var indexn = e.currentTarget.dataset.indexn;
            //设置当前点击属性
            for (var i = that.goodsRelation[indexw]['values'].length - 1; i >= 0; i--) {
                that.goodsRelation[indexw]['values'][i]['selected'] = false;
            }
            that.goodsRelation[indexw]['values'][indexn]['selected'] = true;
            that.setData({
                // goodsRelation: that.data.goodsRelation,
            });
            var params = new Object();
            common.changeRelationAttr(that, params);
            console.log(that.productSelect.goods_id);
            that.setData({
                relationChangeGoodsId: that.productSelect.goods_id
            });
            // this.triggerEvent('relationChangeGoodsId',that.data.productAttr);
        },

        trueFun() {
            console.log('占位：函数 true 未声明');
        }
    },
    created: function () {},
    watch: {
        selectNumber: {
            handler: function (newVal, oldVal) {
                this.selectNumberClone = newVal;
            },

            immediate: true
        },

        productAttr: {
            handler: function (newVal, oldVal) {
                this.productAttrClone = newVal;
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
.product-window {
    position: fixed;
    height: 820rpx;
    bottom: -50rpx;
    width: 100%;
    left: 0;
    background-color: #fff;
    z-index: 100;
    border-radius: 0 0 0 0;
    padding-bottom: 50rpx;
    transform: translate3d(0, 100%, 0);
    transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
}
.product-window.on {
    transform: translate3d(0, 0, 0);
}
.product-window .textpic {
    position: relative;
}
.product-window .textpic .pictrue {
    width: 200rpx;
    height: 200rpx;
    position: absolute;
    background: #fff;
    background: 1rpx solid #f0f1f3;
    top: -45rpx;
    left: 18rpx;
    border-radius: 6rpx;
    overflow: hidden;
}
.product-window .textpic .pictrue image {
    width: 100%;
    height: 100%;
}
.product-window .textpic .text {
    font-size: 32rpx;
    color: #202020;
}
.product-window .textpic .text .amount {
    font-size: 24rpx;
    padding-left: 250rpx;
    padding-top: 40rpx;
    color: #f23030;
}
.product-window .textpic .text .amount .num {
    font-size: 36rpx;
}
.product-window .textpic .text .amount .stock {
    color: #999;
    margin-left: 18rpx;
}
.product-window .textpic .name {
    font-size: 22rpx;
    padding-left: 250rpx;
    padding-top: 10rpx;
    color: #81838e;
}

.product-window .textpic .iconfont {
    position: absolute;
    right: 30rpx;
    top: 25rpx;
    font-size: 35rpx;
    color: #8a8a8a;
}
.product-window .productWinList {
    height: 480rpx;
    margin-top: 66rpx;
}
.product-window .productWinList .item ~ .item {
    margin-top: 36rpx;
}
.product-window .productWinList .item .title {
    font-size: 23rpx;
    color: #999;
    padding: 0 30rpx 10rpx;
}
.product-window .productWinList .item .listn {
    padding: 0 30rpx 0 16rpx;
}
.product-window .productWinList .item .listn .itemn {
    font-size: 25rpx;
    color: #282828;
    padding: 10rpx 28rpx;
    border-radius: 6rpx;
    margin: 14rpx 0 0 14rpx;
    background: #f2f2f2;
}
.product-window .productWinList .item .listn .itemn.on {
    color: #fff;
    background-color: #ff3700;
    border-color: #ff3700;
}

.product-window .cart {
    margin-top: 66rpx;
    padding: 0 30rpx;
}
.product-window .cart .title {
    font-size: 23rpx;
    color: #999;
    float: left;
    padding-top: 15rpx;
}
.product-window .cart .carnum {
    height: 54rpx;
    float: right;
}
.product-window .cart .carnum view {
    border: 1px solid #a4a4a4;
    width: 84rpx;
    text-align: center;
    height: 100%;
    line-height: 54rpx;
    color: #a4a4a4;
    font-size: 45rpx;
}
.product-window .cart .carnum .reduce {
    border-right: 0;
    border-radius: 6rpx 0 0 6rpx;
    line-height: 48rpx;
}
.product-window .cart .carnum .reduce.on {
    border-color: #e3e3e3;
    color: #dedede;
}
.product-window .cart .carnum .plus {
    border-left: 0;
    border-radius: 0 6rpx 6rpx 0;
    line-height: 46rpx;
}
.product-window .cart .carnum .plus.on {
    border-color: #e3e3e3;
    color: #dedede;
}
.product-window .cart .carnum .num {
    color: #282828;
    font-size: 28rpx;
}

.goods-buy-num {
    padding: 0 30rpx 10rpx;
    overflow: hidden;
    margin-top: 36rpx;
}
.goods-buy-num .title {
    font-size: 23rpx;
    color: #999;
    float: left;
    padding-top: 15rpx;
}
.goods-buy-num .cart-num-box {
    border-radius: 8rpx;
    background-color: #f7f7f7;
    overflow: hidden;
    width: 214rpx;
    float: right;
}
.goods-buy-num .cart-num-box input,
.goods-buy-num .cart-num-box .num-btn {
    float: left;
    height: 60rpx;
    line-height: 60rpx;
    position: relative;
    text-align: center;
    width: 60rpx;
}
.goods-buy-num .cart-num-box .minus::after,
.goods-buy-num .cart-num-box .add::after,
.goods-buy-num .cart-num-box .add::before {
    background: #999 none repeat scroll 0 0;
    border-radius: 2rpx;
    content: '';
    display: block;
    height: 4rpx;
    left: 50%;
    margin: -2rpx 0 0 -16rpx;
    position: absolute;
    top: 50%;
    width: 32rpx;
}
.goods-buy-num .cart-num-box .disabled::after,
.goods-buy-num .cart-num-box .disabled::before {
    background: hsla(0, 0%, 80%, 0.3) none repeat scroll 0 0;
}
.goods-buy-num .cart-num-box input {
    border: 0;
    border-left: 1rpx solid #fff;
    padding: 0;
    border-right: 1rpx solid #fff;
    text-align: center;
    background: #f7f7f7;
    border-radius: 0;
    color: #999;
    width: 90rpx;
    float: left;
    position: relative;
}
.goods-buy-num .cart-num-box .add::before {
    border-radius: 2rpx;
    height: 32rpx;
    margin: -16rpx 0 0 -2rpx;
    width: 4rpx;
}

.submit-btns {
    position: fixed;
    bottom: 50rpx;
    left: 0;
    height: 100rpx;
    width: 100%;
    border-top: 1rpx solid #fff;
    z-index: 9;
}
.submit-btns .submit-btn-ok {
    width: 100%;
    background: #e93323;
    color: #fff;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 30rpx;
}
.submit-btns .submit-btn-addCart {
    width: 50%;
    background: #fbaf37;
    color: #fff;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 30rpx;
    float: left;
}
.submit-btns .submit-btn-buyNow {
    width: 50%;
    background: #e93323;
    color: #fff;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 30rpx;
    float: right;
}
</style>
