<template>
    <view class="order">
        <navbar :parameter="parameter"></navbar>
        <view class="order-menu">
            <block v-for="item in menuList" :key="item.type">
                <view class="order-menu-item" :class="{ active: currentType === item.type }" @click="handleMenuType(item.type)">
                    <uni-badge v-if="item.num > 0" class="badgecolor" :text="item.num" absolute="rightTop" size="small">
                        <text class="order-menu-item-text">{{ item.value }}</text>
                    </uni-badge>
                    <text v-else class="order-menu-item-text">{{ item.value }}</text>
                </view>
            </block>
        </view>
        <view class="placeholder"></view>
        <view class="order-list" v-if="currentType < 2">
            <block v-for="item in filterState" :key="item.order_id">
                <view class="order-list-item">
                    <view class="order-list-item-header">
                        <text class="special-text"
                            >订单编号：<text class="special-color">{{ item.order_sn }}</text>
                        </text>
                    </view>
                    <view class="order-list-item-content">
                        <view class="item-content-product">
                            <block v-for="subItem in item.items" :key="subItem.product_id">
                                <navigator :url="'/pages/productDetail/index?id=' + subItem.product_id" hover-class="navigator-hover">
                                    <view class="item-content-product-item">
                                        <view class="item-content-product-img">
                                            <tigImage v-model:src="subItem.pic_thumb"></tigImage>
                                        </view>
                                        <view class="item-content-product-info">
                                            <view class="product-item-title">
                                                {{ subItem.product_name }}
                                            </view>
                                            <view class="product-item-price">
                                                <FormatPrice class="product-item-pricenum" :priceData="subItem.price"></FormatPrice>
                                                <view class="product-item-quantity">x {{ subItem.quantity }}</view>
                                            </view>
                                        </view>
                                    </view>
                                </navigator>
                            </block>
                        </view>
                    </view>
                    <view class="order-list-item-btn">
                        <view class="item-btn-box">
                            <tigButton :plain="true" :plainMainColor="true" @click="handleEvaluate(item.order_id)"> {{currentType == 0 ? '去评价' : '待晒单'}} </tigButton>
                        </view>
                    </view>
                </view>
            </block>
        </view>
        <view class="comment-list" v-else>
            <view class="comment-item flex" v-for="item in filterState" :key="item.order_id">
                <view class="comment-header">
                    <tigImage class="head" v-if="item.pic_thumb" v-model:src="item.pic_thumb" mode="aspectFill"></tigImage>
                </view>
                <view class="comment-info">
                    <view class="comment-label flex align-center">
                        <view class="name">评&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价:</view>
                        <view class="content flex align-center justify-between">
                            <uni-rate :value="item.comment_rank" color="#bfbfbf" active-color="#ffa800" size="18" />
                            <view class="time">{{ item.add_time }}</view>
                        </view>
                    </view>
                    <view class="comment-label flex">
                        <view class="name">商品名称:</view>
                        <view class="content">
                            <view class="product-name line1">{{ item.product_name || '--' }}</view>
                        </view>
                    </view>
                    <view class="comment-label flex">
                        <view class="name">评价标签:</view>
                        <view class="content flex-wrap">
                            <view class="product-tag" v-for="tag in item.comment_tag">{{ tag }}</view>
                        </view>
                    </view>
                    <view class="comment-label flex">
                        <view class="name">评价内容:</view>
                        <view class="content">
                            <view class="cont">{{ item.content }}{{ item.content }}{{ item.content }}{{ item.content }}{{ item.content }}</view>
                        </view>
                    </view>
                    <view class="comment-label flex" v-if="item.reply">
                        <view class="name">客服答复:</view>
                        <view class="content">
                            <text class="cont">{{ item.reply?.content }}</text>
                        </view>
                    </view>
                    <view class="comment-label flex">
                        <view class="name">晒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单:</view>
                        <view class="content flex-wrap" v-if="item.show_pics.length > 0">
                            <view v-for="product in item.show_pics" class="product-pic">
                                <tigImage v-model:src="product.pic_thumb" mode="aspectFill" @click="imagePreview(imageFormat(product.pic_url))"></tigImage>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="empty-box" v-if="filterState.length == 0">
            <view class="pictrue"><image src="/static/images/common/data_empty.png"></image></view>
            <view class="txt">暂无评价</view>
        </view>
        <view class="loading-box" v-if="filterParams.page > 1">
            <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
            <view v-else>没有更多了~</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { reactive, ref } from "vue";
import { getOrderList } from "@/api/user/order";
import { getShowedList, getCommentList, getCommentSubNum } from "@/api/user/comment";
import type { CommentFilterState, CommentFilterParams } from "@/types/user/comment.d";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { imageFormat } from "@/utils/format";
const parameter = {
    navbar: "1",
    return: "1",
    title: "订单评价",
    showHome: true,
    color: false
};
interface MenuType {
    type: string;
    value: string;
    num: number;
}
const menuList = reactive<any>([
    { type: 0, value: "待评价", num: 0 },
    { type: 1, value: "待晒单", num: 0 },
    { type: 2, value: "已评价", num: 0 }
]);
const imagePreview = (url: string) => {
    uni.previewImage({
        urls: [url]
    });
};
const getSubNum = async () => {
    try {
        const result = await getCommentSubNum();
        menuList[0].size = result.item.await_comment;
        menuList[1].size = result.item.show_pics;
        menuList[2].size = result.item.commented;
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
};
const currentType = ref<number>(0);
const filterParams = reactive<CommentFilterParams>({
    page: 1,
    size: 10,
});

const loaded = ref(false);
const filterState = ref<CommentFilterState[]>([]);
const total = ref(0);
const handleMenuType = (type: number) => {
    currentType.value = type;
    filterState.value = [];
    filterParams.page = 1;
    loadFilter();
};
const loadFilter = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    } else {
        uni.showLoading({
            title: "加载中"
        });
    }
    try {
        let result: any = [];
        if (currentType.value == 0) {
            result = await getOrderList({ ...filterParams, comment_status: 0 });
        }
        if (currentType.value == 1) {
            result = await getShowedList({ ...filterParams });
        }
        if(currentType.value == 2) {
            result = await getCommentList({...filterParams});
        }
        filterState.value = [...filterState.value, ...result.filter_result];
        total.value = result.total;
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    } finally {
        uni.hideLoading();
        loaded.value = false;
    }
};

const handleEvaluate = (id: number) => {
    uni.navigateTo({
        url: `/pages/user/comment/info?id=${id}`
    });
}

onLoad((options) => {
    if(options && options.currentType){
        currentType.value = Number(options.currentType);
    }
    getSubNum();
    loadFilter();
});

onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        loadFilter();
    }
});
</script>

<style lang="scss" scoped>
.placeholder {
    height: 100rpx;
}

.badgecolor {
    :deep(.uni-badge--error) {
        background-color: $tig-color-primary;
    }
}

.order-menu {
    background-color: #fff;
    display: flex;
    box-sizing: border-box;
    margin-bottom: 30rpx;
    position: fixed;
    width: 100%;
    z-index: 999;

    .order-menu-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 88rpx;
        position: relative;

        .order-menu-item-text {
            padding: 0 10rpx 0 0;
        }
        &.active {
            color: #333;
            font-weight: bold;

            &:after {
                content: "";
                position: absolute;
                bottom: 0;
                height: 5rpx;
                width: 60rpx;
                background-color: $tig-color-primary;
                border-radius: 10rpx;
            }
        }
    }
}

.order-list {
    padding: 10rpx 20rpx;

    .order-list-item {
        background-color: #fff;
        border-radius: 10rpx;
        margin-bottom: 20rpx;
        padding: 20rpx;
        font-size: 24rpx;

        &:last-child {
            margin-bottom: 0;
        }

        .order-list-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 20rpx;
            .special-text {
                font-size: 26rpx;
                font-weight: bold;
            }
            .special-color {
                color: #999;
                font-weight: normal;
            }
        }

        .order-list-item-content {
            .item-content-text {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10rpx;

                .special-color {
                    color: #999;
                }
            }

            .item-content-product-item {
                padding-bottom: 15rpx;

                &:first-child {
                    padding-top: 15rpx;
                }

                display: flex;
                .item-content-product-img {
                    width: 140rpx;
                    height: 140rpx;
                }
                .item-content-product-info {
                    width: 495rpx;
                    padding-left: 25rpx;

                    .product-item-title {
                        font-weight: bold;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .product-item-price {
                        display: flex;
                        padding-top: 25rpx;
                        .product-item-pricenum {
                            // color: $tig-color-primary;
                            font-size: 30rpx;
                            :deep(.util) {
                                font-size: 22rpx;
                            }
                        }

                        .product-item-quantity {
                            font-size: 28rpx;
                            color: #999;
                            padding-left: 15rpx;
                        }
                    }
                }
            }

            .item-content-pay {
                display: flex;
                justify-content: flex-end;

                .item-content-pay-box {
                    display: flex;
                    .pay-item {
                        padding: 0 10rpx;

                        &.pay-type {
                            color: #999;
                        }

                        &.total-money {
                            .price-content {
                                color: $tig-color-primary;
                            }
                        }
                    }
                }
            }
        }

        .order-list-item-btn {
            display: flex;
            justify-content: flex-end;
            padding-top: 25rpx;

            .item-btn-box {
                display: flex;
                .base-item-btn {
                    padding: 10rpx 25rpx;
                    border: 1px solid #ddd;
                    border-radius: 30rpx;
                    margin-left: 10rpx;
                    &.detail {
                        border: 1px solid $tig-color-primary;
                        color: $tig-color-primary;
                    }

                    &:active {
                        opacity: 0.6;
                    }
                }
            }
        }
    }
}
.comment-list{
    padding: 0 20rpx;
    .comment-item{
        padding: 20rpx;
        background-color: #fff;
        border-radius: 20rpx;
        margin-bottom: 20rpx;
    }
    .comment-header{
        width: 120rpx;
        height: 120rpx;
        margin-right: 20rpx;
        .head{
            width: 120rpx;
            height: 120rpx;
            border-radius: 20rpx;
        }
    }
    .comment-info{
        font-size: 24rpx;
        color: #333;
        .comment-label{
            margin-bottom: 15rpx;
            .name{
                margin-right: 20rpx
            }
            .content{
                width: 52vw;
                .time{
                    color: #999;
                    font-size: 22rpx;
                    margin-top: 5rpx;
                }
                .product-name{
                    width: 50vw;
                    color: $tig-color-error;
                }
                .product-tag{
                    background-color: #f5f5f5;
                    border-radius: 5rpx;
                    padding: 5rpx 10rpx;
                    margin: 0 0 5rpx 5rpx;
                    text-align: center;
                }
                .cont{
                    word-wrap: break-word;
                }
                .product-pic{
                    width: 80rpx;
                    height: 80rpx;
                    border-radius: 10rpx;
                    overflow: hidden;
                    margin-right: 10rpx;
                    margin-bottom: 10rpx;
                }
            }
            
        }
    }
}
</style>
