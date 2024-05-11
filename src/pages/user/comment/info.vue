<template>
    <navbar :parameter="parameter"></navbar>
    <view class="comment-info">
        <!-- <tigUpload :count="9" v-model="pic_url">
            <uni-icons type="camera" size="30" color="#cccccc"></uni-icons>
        </tigUpload> -->
        <view class="comment-item" v-for="(item, index) in formState">
            <view class="white-card" v-if="!item.is_showed">
                <view class="product flex">
                    <view class="product-img">
                        <tigImage v-model:src="item.pic_thumb" mode="aspectFit"></tigImage>
                    </view>
                    <view class="product-info">
                        <view class="product-name">
                            {{ item.product_name }}
                        </view>
                        <view class="product-price">
                            <FormatPrice :priceData="item.price"></FormatPrice>
                        </view>
                    </view>
                </view>
                <view class="comment">
                    <view class="flex comment-cell">
                        <view class="lable-text">商品评分：</view>
                        <view class="flex">
                            <uni-rate :readonly="item.isCommentInfo" :value="item.comment_rank" color="#bfbfbf" active-color="#ffa800" size="18" @change="onChange(index, $event)" />
                            <text style="margin-left: 10rpx;">{{ item.comment_rank }}分</text>
                        </view>
                    </view>
                    <view v-if="!item.rank_verification" class="flex comment-cell">
                        <view class="lable-text"></view>
                        <view class="tips">请先评分商品</view>
                    </view>
                    <view class="comment-cell">
                        <view class="label-list flex-wrap" v-if="!item.isCommentInfo">
                            <view
                                v-for="lb in item.all_comment_tag"
                                :class="{'active' : item.comment_tag.includes(lb)}"
                                class="label-item"
                                @click="checkTag(index, lb)"
                            >
                                <text>{{ lb }}</text>
                            </view>
                            <view class="label-edit" v-if="!item.isAdd" @click="isShowadd(index)">
                                <view></view>
                                <view>自定义</view>
                            </view>
                            <view class="label-edit-input flex align-center justify-between" v-else>
                                <view>
                                    <input type="text" v-model="tabInput" auto-focus placeholder="请输入自定义标签" />
                                </view>
                                <view class="btn" @click="tabAdd(index)">确定</view>
                            </view>
                        </view>
                        <view class="label-list" v-else>
                            <view v-for="lb in item.comment_tag" class="label-item-txt">
                                <text>{{ lb }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="comment-cell">
                        <view class="textarea-box">
                            <textarea
                                cols="50"
                                name="content"
                                placeholder="商品是否给力？快分享你的购买心得吧~"
                                rows="5"
                                style="border: 1px solid #d9d9d9; padding: 4px"
                                v-model="item.content"
                                :disabled="item.isCommentInfo"
                            ></textarea>
                        </view>
                    </view>
                    <view class="comment-cell flex align-center justify-between">
                        <view class="tips">
                            <text v-if="!item.content_verification">请填写购买心得</text>
                        </view>
                        <view class="strlangth">10-200字</view>
                    </view>
                    <view class="comment-cell">
                        <view class="lable-text">添加图片</view>
                        <view class="pic-box flex-wrap">
                            <view class="pic-img" v-for="(product,picIndex) in item.show_pics" style="transition: opacity 0.2s linear; margin-right: 10px">
                                <tigImage v-model:src="product.pic_thumb" @click="imagePreview(imageFormat(product.pic_thumb))"></tigImage>
                                <view class="close-icon" @click="close(item, picIndex)">
                                    <uni-icons type="clear" size="25" color="#cccccc"></uni-icons>
                                </view>
                            </view>
                            <tigUpload v-if="item.show_pics.length < 9" :count="9" v-model="item.show_pics">
                                <view class="add-img">
                                    <uni-icons type="plusempty" size="30" color="#cccccc"></uni-icons>
                                </view>
                            </tigUpload>
                        </view>
                        
                    </view>
                    <view class="comment-cell">
                        <view class="tig-button" @click="onSubmit(item, index)">提交评论</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { getCommentData, updateCommentData } from "@/api/user/comment";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { imageFormat } from "@/utils/format";
const parameter = {
    navbar: "1",
    return: "1",
    title: "订单评价",
    showHome: true,
    color: false
};
const close = (item:any, index:number) => {
    item.show_pics.splice(index, 1);
}
const onChange = (index: any, e:any) => {
    formState.value[index].comment_rank = e.value;
}
const comment_id = ref<string>("")
const labelList = ref(["送货快", "质量很好", "服务周到", "正品", "很划算", "包装仔细", "价格实惠", "还可以", "相当好"]);
const formState = ref<any[]>([]);
const fetchCommentData = async (id: string) => {
    uni.showLoading({
        title: "加载中"
    });
    try {
        const result = await getCommentData({ id: id });
        result.item.items.map((data: any) => {
            data.all_comment_tag = JSON.parse(JSON.stringify(labelList.value)); // 使用深拷贝来创建独立的数组
            Object.assign(
                data,
                {
                    comment_rank: 0,
                    content: "",
                    show_pics: [],
                    comment_tag: [],
                    isAdd: false,
                    rank_verification: true,
                    content_verification: true,
                    isCommentInfo: data.comment_info ? true : false
                },
                data.comment_info
            );
        });
        Object.assign(formState.value, result.item.items);
        console.log(formState.value)
        const allAreTrue = formState.value.every((obj:any) => obj.is_showed === 1);
        if(allAreTrue){
            //如果商品列表全都评价完了就跳转到评价列表
            uni.navigateTo({
                url: "/pages/user/comment/list?currentType=2"
            });
        }
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    } finally {
        uni.hideLoading()
    }
};
const tabInput = ref("");
const isShowadd = (index: number) => {
    formState.value[index].isAdd = !formState.value[index].isAdd;
};
const tabAdd = (index: number) => {
    if (tabInput.value !== "") {
        const newCommentTag = JSON.parse(JSON.stringify(formState.value[index].all_comment_tag));
        if (newCommentTag.includes(tabInput.value)) {
            uni.showToast({
            title: "您已添加相同标签",
            icon: "none",
            duration: 1000
        });
            return
        }
        newCommentTag.push(tabInput.value);
        formState.value[index].all_comment_tag = newCommentTag;
        checkTag(index, tabInput.value);
    }
    tabInput.value = "";
    formState.value[index].isAdd = false;
};
const checkTag = (index: number, label: string) => {
    let arr = formState.value[index].comment_tag;
    if (arr.includes(label)) {
        formState.value[index].comment_tag = arr.filter((item: any) => item !== label);
    } else {
        arr.push(label);
    }
    console.log(formState.value[index]);
};
const imagePreview = (url: string) => {
    uni.previewImage({
        urls: [url]
    });
};
const onSubmit = async (item: any, index: number) => {
    if (item.comment_rank < 1) {
        item.rank_verification = false;
        return;
    }
    if (item.content == "") {
        item.content_verification = false;
        return;
    }
    try {
        const data = {
            product_id: item.product_id,
            order_id: item.order_id,
            order_item_id: item.item_id,
            store_id: item.store_id,
            comment_rank: item.comment_rank,
            comment_tag: item.comment_tag,
            content: item.content,
            show_pics: item.show_pics
        };
        const result = await updateCommentData(data);
        item.rank_verification = true;
        item.content_verification = true;
        uni.showToast({
            title: result.message,
            icon: "none",
            duration: 1000
        });
        fetchCommentData(comment_id.value);
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    } finally {
    }
};
onLoad((option) => {
    if (option) {
        const { id } = option;
        if (id) {
            comment_id.value = id;
             // 获取详情数据
            fetchCommentData(id);
        }
    }
   
});
</script>

<style lang="scss" scoped>
.comment-info{
    padding: 20rpx;
    .comment-item{
        .white-card{
            background-color: #fff;
            padding: 20rpx;
            border-radius: 20rpx;
            margin-bottom: 20rpx;
            .product{
                margin-bottom: 25rpx;
                .product-img{
                    width: 130rpx;
                    height: 130rpx;
                    background-color: rd;
                    margin-right: 20rpx;
                    overflow: hidden;
                }
                .product-info{
                    flex: 1;
                    font-size: 24rpx;
                    line-height: 32rpx;
                    .product-price{
                        color: $tig-color-error;
                        margin-top: 10rpx;
                    }
                }
            }
            .comment{
                .comment-cell{
                    font-size: 24rpx;
                    padding-bottom: 20rpx;
                    .lable-text{
                        width: 130rpx;
                    }
                    .tips{
                        color: $tig-color-error;
                    }
                    .label-list{
                        .label-item, .label-edit, .label-item-txt{
                            display: inline-block;
                            background-color: #f5f5f5;
                            padding: 8rpx 15rpx;
                            margin-right: 15rpx;
                            margin-bottom: 15rpx;
                            border-radius: 5rpx;
                        }
                        .active{
                            background-color: $tig-color-primary;
                            color: #fff;
                        }
                        .label-edit-input{
                            width: 100vw;
                            padding: 10rpx 0;
                            input{
                                width: 70vw;
                                font-size: 24rpx;
                                padding: 15rpx;
                                background-color: #f5f5f5;
                            }
                            .btn{
                                background-color: $tig-color-primary;
                                color: #fff;
                                padding: 16rpx 30rpx;
                                border-radius: 5rpx;
                            }
                        }
                    }
                    .label-list-edit{
                        .label-item{
                            .iconfont{
                                margin-left: 10rpx;
                            }
                        }
                        .label-edit-input{
                            input{
                                width: 200rpx;
                            }
                        }
                    }
                    .textarea-box{
                        width: 100%;
                        padding: 20rpx;
                        border-radius: 10rpx;
                        background-color: #f5f5f5;
                        textarea{
                            width: 98%;
                            font-size: 24rpx;
                            border: none !important;
                        }
                    }
                    
                    .strlangth{
                        text-align: end;
                        color: #999;
                        font-size: 24rpx;
                        padding: 10rpx 0;
                    }
                    .pic-box{
                        margin-top: 20rpx;
                        .pic-img{
                            width: 130rpx;
                            height: 130rpx;
                            margin-bottom: 20rpx;
                            position: relative;
                            uni-image{
                                border-radius: 10rpx;
                            }
                            .close-icon{
                                position: absolute;
                                top: -20rpx;
                                right: -20rpx;
                            }
                        }
                        .add-img{
                            width: 130rpx;
                            height: 130rpx;
                            border: 1rpx solid #c6c4c4;
                            border-radius: 10rpx;
                            text-align: center;
                            line-height: 130rpx;
                        }
                    }
                    .tig-button{
                        width: 100%;
                        padding: 20rpx 0;
                        text-align: center;
                        background-color: $tig-color-primary;
                        color: #fff;
                        border-radius: 10rpx;
                    }
                }
            }
        }
        
    }
}
</style>
