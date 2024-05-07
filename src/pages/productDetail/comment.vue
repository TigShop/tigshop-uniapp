<template>
    <navbar :parameter="parameter"></navbar>
    <view class="product-comment-card">
        <view class="comment-item" v-for="(item, index) in commentList" :key="index">
            <view class="user-info flex justify-between align-center">
                <view class="user-name flex align-center">
                    <view class="head_logo">
                        <image :src="imageFormat(item?.avatar || '')"/>
                    </view>
                    <view>
                        <text>{{ item.username }}</text>
                        <uni-rate :value="item.comment_rank" size="14" color="#bfbfbf" active-color="#ffa800"></uni-rate>
                    </view>
                </view>
                <view class="time">{{ item.add_time }}</view>
            </view>
            <view class="tags flex-wrap">
                <view class="tag" v-for="(tag, tagIndex) in (item.comment_tag)" :key="tagIndex">{{ tag }}</view>
            </view>
            <view class="user-content">
                {{item.content}}
            </view>
            <view class="user-imgs flex-wrap align-center">
                <image v-for="pic in item.show_pics" mode="aspectFit" :src="imageFormat(pic.pic_thumb)" @click="imagePreview(imageFormat(pic?.pic_url || ''))"></image>
            </view>
        </view>
    </view>
    <view class="loading-box">
        <view class="bottomLoading" v-if="loading"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
        <view v-else>没有更多了~</view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { reactive, ref } from "vue";
import { imageFormat } from "@/utils/format";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { getCommentList } from "@/api/product/product";
import type { CommentItem } from "@/types/product/product";
const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "商品评价",
    class: "pageGoods"
});

const loading = ref(false);
const commentList = ref<CommentItem[]>([]);
const page = ref<number>(1);
const size = ref(10);
const total = ref(0);
const loaded = ref(false);
const imagePreview = (url: string) => {
    uni.previewImage({
        urls: [url]
    });
};
const _getCommentList = async () => {
    if (page.value > 1) {
        loaded.value = true;
    }
    uni.showLoading({
        title: "请求加载中..."
    });
    try {
        const result = await getCommentList(productId.value, {
            type: 1,
            size: size.value,
            page: page.value
        });
        commentList.value = [...commentList.value, ...result.filter_result];
        console.log('评论列表', commentList.value);
        total.value = result.total;
    } catch (error:any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    } finally {
        loaded.value = false;
        uni.hideLoading();
    }
};
const productId = ref<any>("")
onLoad((option) => {
    if (option) {
        const { id } = option;
        if (id) {
            productId.value = id;
            _getCommentList();
        }
    }
});
onReachBottom(() => {
    if (page.value < Math.ceil(total.value / size.value)) {
        page.value++;
        _getCommentList();
    }
});
</script>

<style lang="scss" scoped>
.product-comment-card{
    background-color: #fff;
    padding: 20rpx 20rpx 0 20rpx;
    border-top: 1rpx solid #eee;
    .comment-item{
        border-bottom: 1rpx solid #eee;
        padding-bottom: 20rpx;
        padding-top: 20rpx;
        .user-info{
            .user-name{
                font-size: 24rpx;
                .head_logo{
                    margin-right: 20rpx;
                    image{
                        width:60rpx;
                        height: 60rpx;
                        border-radius: 100rpx;
                    }
                }
            }
            .time{
                font-size: 24rpx;
                color: $tig-color-grey;
            }
        }
        .tags{
            margin-top: 20rpx;
            .tag{
                background: #eee none repeat scroll 0 0;
                margin-bottom: 12rpx;
                margin-right: 8rpx;
                padding: 6rpx 12rpx;
                border-radius: 2px;
                font-size: 11px;
                color: #666;
            }
        }
        .user-content{
            margin: 20rpx 0;
            font-size: 26rpx;
        }
        .user-imgs{
            image{
                width: 150rpx;
                height: 150rpx;
                margin-right: 15rpx;
                margin-bottom: 15rpx;
                border: 1px solid #eee;
            }
        }
    }
}
.loading-box{
    padding: 30rpx;
    font-size: 24rpx;
}
</style>