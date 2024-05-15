<template>
    <view style="height: 100%">
        <navbar :parameter="parameter"></navbar>
        <view class="cart-box shoppingCart">
            <view class="top-text" v-if="cartList.length > 0">
                <view class="fl">
                    已选商品
                    <text class="num font-color">{{ total.checked_count }}</text>
                    件
                </view>
                <view class="fr administrate acea-row row-center-wrapper" @click="cartManageFun">
                    <text class="manage-btn">{{ !cartManage ? "管理" : "完成" }}</text>
                </view>
            </view>
            <view class="cart_list_wrap" v-if="cartList.length > 0">
                <block v-for="(item, index) in cartList" :key="index">
                    <view class="cart_table" id="">
                        <view class="cart_store_title noborder">
                            <tigCheckbox v-model:checked="item.is_checked" @change="onCheckAllItem(index)"></tigCheckbox>
                            <view class="store_label">{{ item.store_title ? item.store_title : "自营" }}</view>
                        </view>
                        <view class="goods-list-cart">
                            <uni-swipe-action>
                                <block v-for="(goods, index) in item.carts" :key="goods.product_id">
                                    <view class="cart_item">
                                        <uni-swipe-action-item :threshold="0" autoClose>
                                            <view class="cart_list_con" :class="{ cart_item_disabled: goods.is_disabled }">
                                                <tigCheckbox
                                                    class="check-item"
                                                    v-model:checked="goods.is_checked"
                                                    @change="onChangeCheck"
                                                    :disabled="goods.is_disabled"
                                                ></tigCheckbox>
                                                <navigator :url="'/pages/productDetail/index?id=' + goods.cart_id" class="photo">
                                                    <view class="photo-img">
                                                        <tigImage v-model:src="goods.pic_thumb"></tigImage>
                                                        <view class="cart-notice-row" v-if="goods.stock === 0">已售罄</view>
                                                        <view class="cart-notice-row" v-if="goods.product_status === 0">已下架</view>
                                                    </view>
                                                </navigator>
                                                <view class="cart-row">
                                                    <navigator target="_blank" :url="'/pages/productDetail/index?id=' + goods.product_id">
                                                        <view class="name">
                                                            {{ goods.product_name }}
                                                        </view>
                                                    </navigator>
                                                    <view class="extra_info" v-if="goods.goods_attr">
                                                        <text v-if="goods.goods_attr" class="desc">{{ goods.goods_attr }}</text>
                                                    </view>
                                                    <view class="cart-price">
                                                        <view class="price-one">
                                                            <FormatPrice :priceData="goods.price"></FormatPrice>
                                                        </view>
                                                        <view class="cart-num-box">
                                                            <uni-number-box
                                                                :disabled="goods.is_disabled"
                                                                v-model="goods.quantity"
                                                                @change="updateCartItem(goods.cart_id, goods.quantity)"
                                                            />
                                                        </view>
                                                    </view>
                                                </view>
                                            </view>
                                            <template #right>
                                                <view class="cart-move-box">
                                                    <view class="btn-collect" @click="handleCollect(goods.product_id, goods.cart_id)">
                                                        <text>移入收藏</text>
                                                    </view>
                                                    <view class="btn-del" @click="handleDel(goods.cart_id)"><text>删除</text></view>
                                                </view>
                                            </template>
                                        </uni-swipe-action-item>
                                    </view>
                                </block>
                            </uni-swipe-action>
                        </view>
                    </view>
                </block>
            </view>
            <view v-if="cartList.length > 0" class="checkOutBar" :style="{ bottom: tabbarStore.tabbarHeight }">
                <view class="bar-check">
                    <view class="checkbox-pad">
                        <tigCheckbox v-model:checked="allChecked" @change="onCheckAll"></tigCheckbox>
                    </view>
                </view>
                <view class="edit-cart-action" v-if="cartManage">
                    <view class="l_a_tool lt_delete" @click="checkClearCart" id="del-all">清空购物车</view>
                    <view id="del-checked" class="l_a_tool lt_disable" @click.stop.prevent="delCartItem">删除勾选商品</view>
                </view>
                <view class="cart-total-box" v-if="!cartManage">
                    <view class="cart-total">
                        <view @click="handleCheckout" :class="'btn-checkout ' + (total.checked_count == 0 ? 'unable_btn' : '')">去结算</view>
                        <view class="item-total">
                            <view class="item-total-amount">
                                <text class="txt">合计：</text>
                                <FormatPrice :priceData="total.product_amount"></FormatPrice>
                            </view>
                            <view class="item-total-desc">{{ total.discounts ? "组合优惠：" + total.discounts + " " : "" }}(不含运费)</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="noCart" v-if="cartList.length === 0">
                <view class="pictrue"><image lazy-load src="/static/images/cart_empty.png"></image></view>
                <view class="noCart_text">购物车内还没商品哦，去逛逛吧~</view>
            </view>

            <view class="recommend_wrapper">
                <view class="title" v-if="guessLike.length > 0">
                    <view class="text">
                        <view class="name">猜你喜欢</view>
                        <view class="desc">您还可以逛一逛</view>
                    </view>
                </view>
                <view class="recommend">
                    <masonry :commodityList="guessLike" @callback="getCartList"></masonry>
                </view>
                <view class="loading-box" v-if="page > 1">
                    <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
                    <view v-else>没有更多了~</view>
                </view>
            </view>
            <view :style="{ height: tabbarStore.tabbarHeightNum + 100 + 'rpx' }"></view>
        </view>
        <tabbar></tabbar>
    </view>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from "vue";
import navbar from "@/components/navbar/index.vue";
import masonry from "@/components/masonry/masonry.vue";
import tigCheckbox from "@/components/tigCheckbox/index.vue";
import { onLoad, onShow, onReachBottom } from "@dcloudio/uni-app";
import { usetabbarStore } from "@/store/tabbar";
import { getCart, updateCartItemData, updateCartCheck, clearCart, removeCartItemData } from "@/api/cart/cart";
import { updateCollectProduct } from "@/api/product/product";
import { getGuessLike } from "@/api/common";
import type { GuessLikeProductList } from "@/types/common";
import type { updateCartCheckitem } from "@/types/cart/cart";
const tabbarStore = usetabbarStore();
const parameter = ref({
    navbar: "1",
    return: "0",
    title: "购物车",
    color: false
});
const cartList = ref<any>([]);
const total = ref<any>({});
const loaded = ref(false);
const cartManage = ref(false);

const allChecked = ref(false);
const onCheckAll = () => {
    cartList.value.forEach((item: any) => {
        item.carts.forEach((product: any) => {
            if (!product.is_disabled) {
                product.is_checked = allChecked.value;
            }
        });
    });
    updateCheckbox();
    updateCheckData();
};
const onCheckAllItem = (index: number) => {
    const item = cartList.value[index];
    item.carts.forEach((product: any) => {
        if (!product.is_disabled) {
            product.is_checked = item.is_checked;
        }
    });
    updateCheckbox();
    updateCheckData();
};

const onChangeCheck = () => {
    updateCheckbox();
    updateCheckData();
};

const updateCheckbox = () => {
    cartList.value.forEach((item: any) => {
        const validItem = item.carts.filter((product: any) => !product.is_disabled);
        item.is_checked = validItem.every((product: any) => product.is_checked === true);
    });
    allChecked.value = cartList.value.every((item: any) => item.is_checked === true);
};
const updateCheckData = async () => {
    const checkData: updateCartCheckitem[] = [];
    cartList.value.forEach((item: any) => {
        item.carts.forEach((product: any) => {
            checkData.push({
                cart_id: product.cart_id,
                is_checked: product.is_checked ? 1 : 0
            });
        });
    });

    try {
        const result = await updateCartCheck({ data: checkData });
        getCartList();
    } catch (error) {
        console.error(error);
    }
};

onLoad(() => {
    __getGuessLike();
});
onShow(() => {
    getCartList();
});
const Instance = getCurrentInstance();
const getCartList = async () => {
    uni.showLoading({
        title: "请求加载中..."
    });
    try {
        const result = await getCart();

        const { cart_list } = result;
        total.value = result.total;
        cartList.value = cart_list;
        updateCheckbox();
    } catch (error) {
        console.error(error);
    }
    uni.hideLoading();
};

const guessLike = ref<GuessLikeProductList[]>([]);
const page = ref(0);
const __getGuessLike = async () => {
    if (page.value > 1) {
        loaded.value = true;
    }
    try {
        const result = await getGuessLike({ page: page.value });
        guessLike.value = [...guessLike.value, ...result.product_list];
    } catch (error) {
        console.error(error);
    } finally {
        loaded.value = false;
    }
};

onReachBottom(() => {
    // 接口限制了30条
    if (page.value < 5) {
        page.value++;
        __getGuessLike();
    }
});

let delayTimer: number | null = null; // 延时定时器
const startDelayTimer = (cart_id: number, quantity: number) => {
    if (delayTimer) {
        clearTimeout(delayTimer);
    }
    delayTimer = setTimeout(() => {
        __updateCartItemData(cart_id, quantity);
    }, 300);
};
const updateCartItem = async (cart_id: number, quantity: number) => {
    startDelayTimer(cart_id, quantity);
};

const __updateCartItemData = async (cart_id: number, quantity: number) => {
    try {
        const result = await updateCartItemData({ cart_id, data: { quantity } });

        getCartList();
    } catch (error: any) {
        console.error(error);
    }
};

const cartManageFun = () => {
    cartManage.value = !cartManage.value;
};
const checkClearCart = () => {
    uni.showModal({
        title: "提示",
        content: "确认要清空购物车吗？",
        success: async (res) => {
            if (res.confirm) {
                const result = await clearCart();

                getCartList();
            }
        }
    });
};
const delCartItem = () => {
    uni.showModal({
        title: "提示",
        content: "确认要删除指定的商品吗？",
        success: async (res) => {
            if (res.confirm) {
                const cartIds: number[] = [];
                cartList.value.forEach((item: any) => {
                    item.carts.forEach((product: any) => {
                        if (product.is_checked) cartIds.push(product.cart_id);
                    });
                });
                try {
                    const result = await removeCartItemData({ cart_ids: cartIds });

                    getCartList();
                } catch (error) {
                    console.error(error);
                }
            }
        }
    });
};
const handleCheckout = () => {
    if (total.value.checked_count == 0) return;
    uni.navigateTo({
        url: "/pages/order/check"
    });
};
const handleCollect = async (product_id: number, cart_id: number) => {
    try {
        const result = await updateCollectProduct({
            product_id
        });
    } catch (error) {
        console.error(error);
    } finally {
        const result = await removeCartItemData({ cart_ids: [cart_id] });
        getCartList();
    }
};

const handleDel = (cartId: number) => {
    uni.showModal({
        title: "提示",
        content: "确认要删除该的商品吗？",
        success: async (res) => {
            if (res.confirm) {
                try {
                    const result = await removeCartItemData({ cart_ids: [cartId] });

                    getCartList();
                } catch (error) {
                    console.error(error);
                }
            }
        }
    });
};

onShow(() => {
    uni.hideTabBar();
});
</script>
<style lang="scss" scoped>
.shoppingCart .labelNav {
    height: 76rpx;
    padding: 0 30rpx;
    font-size: 22rpx;
    color: #8c8c8c;
    position: fixed;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background-color: #f5f5f5;
    z-index: 5;
}
.shoppingCart .labelNav .item .iconfont {
    font-size: 25rpx;
    margin-right: 10rpx;
}
.shoppingCart .nav {
    width: 100%;
    height: 80rpx;
    background-color: #fff;
    padding: 0 30rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    color: #282828;
    position: fixed;
    left: 0;
    z-index: 5;
}
.shoppingCart .nav .administrate {
    font-size: 26rpx;
    color: #282828;
    width: 110rpx;
    height: 46rpx;
    border-radius: 6rpx;
    border: 1px solid #868686;
}
.shoppingCart .noCart {
    background-color: #fff;
    padding-top: 0.1rpx;
}
.shoppingCart .noCart .pictrue {
    width: 207rpx;
    height: 168rpx;
    margin: 78rpx auto 56rpx auto;
}
.shoppingCart .noCart .pictrue image {
    width: 100%;
    height: 100%;
}
.shoppingCart .list {
    margin-top: 171rpx;
}
.shoppingCart .list .item {
    padding: 25rpx 30rpx;
    background-color: #fff;
    margin-bottom: 15rpx;
}
.shoppingCart .list .item .picTxt {
    width: 627rpx;
    position: relative;
}
.shoppingCart .list .item .picTxt .pictrue {
    width: 160rpx;
    height: 160rpx;
}
.shoppingCart .list .item .picTxt .pictrue image {
    width: 100%;
    height: 100%;
    border-radius: 6rpx;
}
.shoppingCart .list .item .picTxt .text {
    width: 444rpx;
    font-size: 28rpx;
    color: #282828;
}
.shoppingCart .list .item .picTxt .text .infor {
    font-size: 24rpx;
    color: #868686;
    margin-top: 16rpx;
}
.shoppingCart .list .item .picTxt .text .money {
    font-size: 32rpx;
    color: #282828;
    margin-top: 28rpx;
}
.shoppingCart .list .item .picTxt .carnum {
    height: 47rpx;
    position: absolute;
    bottom: 7rpx;
    right: 0;
}
.shoppingCart .list .item .picTxt .carnum view {
    border: 1rpx solid #a4a4a4;
    width: 66rpx;
    text-align: center;
    height: 100%;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #a4a4a4;
}
.shoppingCart .list .item .picTxt .carnum .reduce {
    border-right: 0;
    border-radius: 3rpx 0 0 3rpx;
}
.shoppingCart .list .item .picTxt .carnum .reduce.on {
    border-color: #e3e3e3;
    color: #dedede;
}
.shoppingCart .list .item .picTxt .carnum .plus {
    border-left: 0;
    border-radius: 0 3rpx 3rpx 0;
}
.shoppingCart .list .item .picTxt .carnum .num {
    color: #282828;
}
.shoppingCart .invalidGoods {
    background-color: #fff;
}
.shoppingCart .invalidGoods .goodsNav {
    width: 100%;
    height: 66rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    color: #282828;
}
.shoppingCart .invalidGoods .goodsNav .iconfont {
    color: #424242;
    font-size: 28rpx;
    margin-right: 17rpx;
}
.shoppingCart .invalidGoods .goodsNav .del {
    font-size: 26rpx;
    color: #999;
}
.shoppingCart .invalidGoods .goodsNav .del .icon-shanchu1 {
    color: #999;
    font-size: 33rpx;
    vertical-align: -2rpx;
    margin-right: 8rpx;
}
.shoppingCart .invalidGoods .goodsList .item {
    padding: 20rpx 30rpx;
    border-top: 1rpx solid #f5f5f5;
}
.shoppingCart .invalidGoods .goodsList .item .invalid {
    font-size: 22rpx;
    color: #fff;
    width: 70rpx;
    height: 36rpx;
    background-color: #aaa;
    border-radius: 3rpx;
    text-align: center;
    line-height: 36rpx;
}
.shoppingCart .invalidGoods .goodsList .item .pictrue {
    width: 140rpx;
    height: 140rpx;
}
.shoppingCart .invalidGoods .goodsList .item .pictrue image {
    width: 100%;
    height: 100%;
    border-radius: 6rpx;
}
.shoppingCart .invalidGoods .goodsList .item .text {
    width: 433rpx;
    font-size: 28rpx;
    color: #999;
    height: 140rpx;
}
.shoppingCart .invalidGoods .goodsList .item .text .infor {
    font-size: 24rpx;
}
.shoppingCart .invalidGoods .goodsList .item .text .end {
    font-size: 26rpx;
    color: #bbb;
}
.footer {
    width: 100%;
    height: 96rpx;
    background-color: #fafafa;
    position: fixed;
    bottom: 0;
    padding: 0 30rpx;
    box-sizing: border-box;
    border-top: 1rpx solid #eee;
}
.footer .checkAll {
    font-size: 28rpx;
    color: #282828;
    margin-left: 16rpx;
}
.footer checkbox .wx-checkbox-input {
    background-color: #fafafa;
}
.footer .money {
    font-size: 30rpx;
}
.footer .placeOrder {
    color: #fff;
    font-size: 30rpx;
    width: 226rpx;
    height: 70rpx;
    border-radius: 50rpx;
    text-align: center;
    line-height: 70rpx;
    margin-left: 22rpx;
}
.footer .button .bnt {
    font-size: 28rpx;
    color: #999;
    border-radius: 50rpx;
    border: 1px solid #999;
    width: 160rpx;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
}
.footer .button form ~ form {
    margin-left: 17rpx;
}

.cart-box .top-text {
    height: 80rpx;
    background: #fff;
    overflow: hidden;
    padding: 0 20rpx;
}
.cart-box .top-text .fl {
    float: left;
    line-height: 80rpx;
}
.cart-box .top-text .fr {
    float: right;
}
.cart-box .top-text .manage-btn {
    line-height: 80rpx;
}

.cart_list_wrap {
    padding: 30rpx;
}
.cart_list_wrap .cart_table {
    border-radius: 10rpx;
    background: #fff;
    margin-bottom: 20rpx;
}
.cart_list_wrap .cart_store_title {
    min-height: 90rpx;
    -moz-box-align: center;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    min-height: 90rpx;
    padding: 20rpx 20rpx 0 20rpx;
    position: relative;
    z-index: 1;
}
.cart_list_wrap .cart_store_title::before {
    background-color: #e5e5e5;
    bottom: 0;
    content: "";
    height: 1rpx;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    z-index: 1;
}
.cart_list_wrap .cart_store_title.noborder::before {
    display: none;
}
.cart_list_wrap .cart_store_title.free-weight-tit {
    padding: 0 20rpx 15rpx;
    min-height: 80rpx;
    font-size: 24rpx;
}
.cart_list_wrap .cart_store_title.free-weight-tit .tip {
    background-color: #e93b3d;
    border-radius: 2px;
    color: #fff;
    display: inline-block;
    font-size: 22rpx;
    height: 32rpx;
    line-height: 32rpx;
    margin-right: 20rpx;
    padding: 0 8rpx;
    vertical-align: middle;
}

.cart_list_wrap .cart_store_title .store_label {
    display: inline-block;
    font-weight: bold;
    color: #333;
    font-size: 28rpx;
    padding-left: 15rpx;
}

.goods-list-cart .cart_item {
    overflow: hidden;

    // &.cart_item_disabled {
    //     opacity: 0.5;
    // }
}
.goods-list-cart .cart_item .cart_list_con {
    display: flex;
    min-height: 180rpx;
    padding: 24rpx 20rpx 10rpx 80rpx;
    position: relative;
    z-index: 1;
    &.cart_item_disabled {
        opacity: 0.5;
    }
}
.goods-list-cart .cart_item .check-item {
    display: block;
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    left: 0;
    width: 80rpx;
    padding-left: 20rpx;
    padding-top: 86rpx;
    box-sizing: border-box;
    text-align: center;
}
.goods-list-cart .cart_item .photo {
    display: block;
    height: 150rpx;
    width: 150rpx;
    margin-bottom: 20rpx;
    margin-left: 10rpx;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);

    .photo-img {
        width: 150rpx;
        height: 150rpx;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
        position: relative;
    }
    .cart-notice-row {
        position: absolute;
        width: 150rpx;
        bottom: 0;
    }
}

.goods-list-cart .cart_item .cart-row {
    margin-bottom: 20rpx;
    padding-left: 18rpx;
    width: 100%;
}
.goods-list-cart .cart_item .cart-row .name {
    font-size: 26rpx;
    margin-bottom: 10rpx;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -moz-box;
    -webkit-line-clamp: 2;
    -moz-line-clamp: 2;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    font-weight: bold;
}
.goods-list-cart .cart_item .cart-row .extra_info {
    font-size: 22rpx;
    color: #888;
    margin-bottom: 10rpx;
}
.goods-list-cart .cart_item .cart-num-box {
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 8rpx;
    overflow: hidden;
    width: 214rpx;
}
.goods-list-cart .cart_item .cart-num-box input,
.goods-list-cart .cart_item .cart-num-box .num-btn {
    float: left;
    height: 60rpx;
    line-height: 60rpx;
    position: relative;
    text-align: center;
    width: 60rpx;
}
.goods-list-cart .cart_item .cart-num-box .minus::after,
.goods-list-cart .cart_item .cart-num-box .add::after,
.goods-list-cart .cart_item .cart-num-box .add::before {
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
.goods-list-cart .cart_item .cart-num-box .disabled::after,
.goods-list-cart .cart_item .cart-num-box .disabled::before {
    background: hsla(0, 0%, 80%, 0.3) none repeat scroll 0 0;
}
.goods-list-cart .cart_item .cart-num-box input {
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
.goods-list-cart .cart_item .cart-num-box .add::before {
    border-radius: 2rpx;
    height: 32rpx;
    margin: -16rpx 0 0 -2rpx;
    width: 4rpx;
}
.goods-list-cart .cart_item .cart-price {
    margin-bottom: 20rpx;
    position: relative;
}
.goods-list-cart .cart_item .price-one {
    font-size: 32rpx;
    line-height: 56rpx;
    color: #f23030;

    :deep(.util) {
        font-weight: normal;
        font-size: 22rpx;
        position: relative;
        top: 4rpx;
    }
}

.goods-list-cart .cart_item .cart_promotion {
    margin: 10rpx 0 0 0;
    padding-right: 0;
    position: relative;
}
.goods-list-cart .cart_item .cart_promotion .goods_promotion {
    background-color: #fef5f5;
    padding: 20rpx;
    position: relative;
    color: #999;
    font-size: 24rpx;
}
.goods-list-cart .cart_item .cart_promotion .goods_promotion image {
    width: 50rpx;
    height: 50rpx;
    display: inline-block;
}
.goods-list-cart .cart_item .cart_promotion .goods_promotion .dd {
    padding-bottom: 6rpx;
}
.goods-list-cart .cart_item .cart_promotion .goods_promotion .dd:last-child {
    padding-bottom: 0;
}
.goods-list-cart .cart_item .cart_promotion .goods_promotion .g_gift_list navigator,
.goods-list-cart .cart_item .goods_promotion .g_gift_list view {
    display: inline-block;
}
.goods-list-cart .cart_item .cart_promotion .goods_promotion .g_gift_list .g_num {
    padding: 0 4rpx;
}
.goods-list-cart .cart_item .cart_promotion .goods_promotion::before {
    border-color: transparent transparent #fef5f5;
    border-style: solid;
    border-width: 10rpx;
    content: "";
    height: 0;
    left: 66rpx;
    position: absolute;
    top: -20rpx;
    width: 0;
    z-index: 1;
}
.goods-list-cart .cart_item .cart_promotion .goods_promotion .icon_r {
    background: transparent;
    border: 2rpx solid #c9c9c9;
    color: #999;
    font-size: 20rpx;
    line-height: 30rpx;
    border-radius: 6rpx;
    font-weight: normal;
    display: inline-block;
    padding: 0 10rpx;
    margin-right: 10rpx;
    vertical-align: top;
}

.goods-list-cart .cart_item .cart_list_con {
    width: 690rpx;
}
.goods-list-cart .cart_item movable-area {
    width: 690rpx;
    height: auto;
}
.goods-list-cart .cart_item movable-view {
    width: 995rpx;
    height: auto;
    position: relative;
}
.goods-list-cart .cart_item .cart-move-box {
    width: 300rpx;
    height: 100%;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    display: flex;
}
.goods-list-cart .cart_item .cart-move-box text {
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -20rpx;
    font-size: 24rpx;
    text-align: center;
    width: 100%;
}
.goods-list-cart .cart_item .cart-move-box .btn-del {
    width: 150rpx;
    background: #ff4f18;
    background: linear-gradient(-41deg, #ff4f18, #ff2000 24%, #f10000);
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    display: table-cell;
    position: relative;
}
.goods-list-cart .cart_item .cart-move-box .btn-collect {
    width: 150rpx;
    background: #ffa600;
    background: linear-gradient(138deg, #ffa600, #ffb000 77%, #ffbc00);
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    display: table-cell;
    position: relative;
}

.checkOutBar {
    margin-bottom: var(--window-bottom);
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    padding: 0;
    box-sizing: border-box;
    border-top: 1rpx solid #eee;
    display: flex;
    border-bottom: 1rpx solid #eee;
    z-index: 99;
}
.bar-check {
    width: 180rpx;
    padding-top: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .checkbox-pad {
        text-align: center;
        padding-left: 25rpx;
    }
}
.bar-check checkbox {
    display: block;
    text-align: center;
    padding-left: 8rpx;
}
.bar-check text {
    text-align: center;
    display: block;
    font-size: 20rpx;
}
.cart-total-box {
    width: 100%;
}
.cart-total-box .btn-checkout {
    background: $tig-color-primary;
    color: #fff;
    display: block;
    float: right;
    font-size: 32rpx;
    font-weight: 700;
    height: 100rpx;
    line-height: 100rpx;
    margin-left: 20rpx;
    text-align: center;
    width: 220rpx;
}
.cart-total-box .btn-checkout.unable_btn {
    background: #d7d7d7;
    color: #999;
}
.cart-total-box .item-total {
    float: right;
}
.cart-total-box .item-total text {
    display: inline-block;
    line-height: 40rpx;
}
.cart-total-box .item-total .item-total-amount {
    padding-top: 10rpx;
    height: 40rpx;
    text-align: right;
    color: #f23030;
    font-size: 32rpx;
    .txt {
        font-weight: normal;
        color: #666;
    }

    :deep(.util) {
        font-weight: normal;
        font-size: 22rpx;
    }
}
.cart-total-box .item-total .item-total-desc {
    padding-top: 12rpx;
    color: #888;
    font-size: 22rpx;
    display: block;
    height: 40rpx;
    text-align: right;
}

.edit-cart-action {
    width: 100%;
    text-align: right;
}
.edit-cart-action .l_a_tool {
    display: inline-block;
    text-align: center;
    color: #fff;
    background: #e4393c;
    font-size: 24rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 60rpx;
    margin-top: 20rpx;
    margin-right: 20rpx;
    padding: 0 30rpx;
}
.edit-cart-action .l_a_tool.lt_delete {
    background: #eee;
    color: #666;
}
.noCart {
    padding-top: 100rpx;
    background-color: #fff;
    padding-bottom: 100rpx;
    border-radius: 0 0 18rpx 18rpx;
}
.noCart .pictrue {
    width: 220rpx;
    height: 220rpx;
    margin: 0 auto;
}
.noCart .pictrue image {
    width: 100%;
    height: 100%;
}
.noCart .noCart_text {
    text-align: center;
    padding-top: 30rpx;
}

.recommend_wrapper {
    padding: 0 30rpx;
    margin-top: 20rpx;
}
.recommend_wrapper .title {
    padding: 20rpx 0;
}
.recommend_wrapper .title .text {
    font-size: 24rpx;
    color: #999;
}
.recommend_wrapper .title .text .name {
    color: #282828;
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 5rpx;
    display: inline-block;
}
.recommend_wrapper .title .text .desc {
    display: inline-block;
    padding-left: 20rpx;
}

.cart-notice-row {
    color: white;
    font-weight: 500;
    padding: 0 16rpx;
    height: 36rpx;
    line-height: 36rpx;
    background-color: #333;
    font-size: 20rpx;
    border-radius: 4rpx;
    text-align: center;
    opacity: 0.9;
}
.image_mask_sold_out {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    z-index: 2;
}
.image_mask_sold_out image {
    width: 100% !important;
    height: 100% !important;
}
</style>
@/types/cart@/types/cart/cart
