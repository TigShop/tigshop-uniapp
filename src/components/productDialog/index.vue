<template>
    <view style="height: 100%">
        <view :class="'goods-dialog ' + (attribute.cartAttr == true ? 'on' : '')">
            <view class="textpic">
                <view class="pictrue"
                    ><image lazy-load 
                        v-if="productSelect.goods_thumb"
                        :src="productSelect.goods_thumb"
                    ></image
                ></view>
                <view class="text">
                    <view class="amount">
                        ￥
                        <text class="num">{{ productPrice }}</text>
                    </view>
                    <view class="name">{{ productSelect.goods_name }}</view>
                </view>
                <view class="iconfont icon-guanbi" @click="close"></view>
            </view>
            <scroll-view class="productWinList" scroll-y>
                <view
                    class="item attr-relation"
                    v-for="(item, index) in goodsRelation"
                    :key="index"
                >
                    <view class="title">{{ item.name }}</view>

                    <view class="listn acea-row row-middle">
                        <view
                            :class="'itemn ' + (attrs.selected ? 'on' : '')"
                            :data-indexw="index"
                            :data-id="attrs.id"
                            :data-indexn="indexn"
                            @click="attrRelationChange"
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
                            @click="attrChange"
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
                            @click.stop.prevent="cartNumChange"
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
                        <view
                            class="num-btn add"
                            @click.stop.prevent="cartNumChange"
                            data-type="add"
                            :data-num="selectNumberClone"
                            :data-index="productSelect.goods_id"
                        ></view>
                    </view>
                </view>
                <view style="height: 100rpx"></view>
            </scroll-view>
            <view class="submit-btns" v-if="!isExchange">
                <view
                    class="submit-btn-ok"
                    @click.stop.prevent="goodsAddCart"
                    v-if="attrSelectType == 'addCart'"
                    >确认</view
                >
                <view
                    class="submit-btn-ok"
                    @click.stop.prevent="goodsBuyNow"
                    v-if="attrSelectType == 'buyNow'"
                    >确认</view
                >
                <view
                    class="submit-btn-ok"
                    @click.stop.prevent="goodsPinBuyNow"
                    v-if="attrSelectType == 'pinBuyNow'"
                    >确认</view
                >
                <view
                    class="submit-btn-addCart"
                    @click.stop.prevent="goodsAddCart"
                    v-if="attrSelectType == ''"
                    >加入购物车</view
                >
                <view
                    class="submit-btn-buyNow"
                    @click.stop.prevent="goodsBuyNow"
                    v-if="attrSelectType == ''"
                    >立即购买</view
                >
            </view>
            <view v-else class="submit-btns">
                <view class="submit-btn-ok" @click.stop.prevent="exchangeBuy" v-if="isExchange"
                    >确认兑换</view
                >
            </view>
        </view>
        <view
            class="mask"
            v-if="attribute.cartAttr != false"
            @click="close"
        ></view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps({
    attribute: {
        type: Object,
        default: () => ({})
    },
    productPrice: {
        type: String,
        default: ""
    },
    productAttr: {
        type: Object,
        default: () => []
    },
    goodsRelation: {
        type: Object,
        default: () => []
    },
    selectNumber: {
        type: Number,
        default: 1
    },
    attrSelectType: {
        type: String,
        default: ""
    },
    productSelect: {
        type: Object,
        default: () => ({
            image: "",
            store_name: "",
            price: 0,
            unique: "",
            stock: 0
        })
    },
    isExchange: {
        type: Number,
        default: 0
    },
    pinId: {
        type: Number,
        default: 0
    }
});
const emit = defineEmits(["myevent"]);
const relationChangeGoodsId = ref(0);
const attrs = ref({
    selected: false,
    id: "",
    label: "",
    checked: false
});
const selectNumberClone = "";
const productAttrClone = "";

const close = () => {
    emit("myevent", {
        detail: {
            window: false,
            relationChangeGoodsId: relationChangeGoodsId.value
        }
    });
};
</script>
<style>
.goods-dialog {
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
.goods-dialog.on {
    transform: translate3d(0, 0, 0);
}
.goods-dialog .textpic {
    position: relative;
}
.goods-dialog .textpic .pictrue {
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
.goods-dialog .textpic .pictrue image {
    width: 100%;
    height: 100%;
}
.goods-dialog .textpic .text {
    font-size: 32rpx;
    color: #202020;
}
.goods-dialog .textpic .text .amount {
    font-size: 24rpx;
    padding-left: 250rpx;
    padding-top: 40rpx;
    color: #f23030;
}
.goods-dialog .textpic .text .amount .num {
    font-size: 36rpx;
}
.goods-dialog .textpic .text .amount .stock {
    color: #999;
    margin-left: 18rpx;
}
.goods-dialog .textpic .name {
    font-size: 22rpx;
    padding-left: 250rpx;
    padding-top: 10rpx;
    color: #81838e;
}

.goods-dialog .textpic .iconfont {
    position: absolute;
    right: 30rpx;
    top: 25rpx;
    font-size: 35rpx;
    color: #8a8a8a;
}
.goods-dialog .productWinList {
    height: 480rpx;
    margin-top: 66rpx;
}
.goods-dialog .productWinList .item ~ .item {
    margin-top: 36rpx;
}
.goods-dialog .productWinList .item .title {
    font-size: 23rpx;
    color: #999;
    padding: 0 30rpx 10rpx;
}
.goods-dialog .productWinList .item .listn {
    padding: 0 30rpx 0 16rpx;
}
.goods-dialog .productWinList .item .listn .itemn {
    font-size: 25rpx;
    color: #282828;
    padding: 10rpx 28rpx;
    border-radius: 6rpx;
    margin: 14rpx 0 0 14rpx;
    background: #f2f2f2;
}
.goods-dialog .productWinList .item .listn .itemn.on {
    color: #fff;
    background-color: #ff3700;
    border-color: #ff3700;
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
    content: "";
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
