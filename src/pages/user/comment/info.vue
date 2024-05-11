<template>
    <navbar :parameter="parameter"></navbar>
    <view class="comment-info">
        <!-- <tigUpload :count="9" v-model="pic_url">
            <uni-icons type="camera" size="30" color="#cccccc"></uni-icons>
        </tigUpload> -->
        <view v-for="(item, index) in formState">
            <view class="white-card" v-if="!item.is_showed">
                <view class="product-left">
                    <view>
                        <tigImage v-model:src="item.pic_thumb"></tigImage>
                    </view>
                    <view>
                        <view style="line-height: 2">
                            {{ item.product_name }}
                        </view>
                        <view>
                            <FormatPrice :priceData="item.price"></FormatPrice>
                        </view>
                    </view>
                </view>
                <view class="product-right">
                    <view>
                        <view class="lab-text">商品评分：</view>
                        <view>
                            <uni-rate :disabled="item.isCommentInfo" :value="item.comment_rank" color="#bbb" active-color="red" size="18" />
                        </view>
                    </view>
                    <view v-if="!item.rank_verification">
                        <view class="lab-text"></view>
                        <view class="tips">请先评价商品</view>
                    </view>
                    <view>
                        <view class="lab-text">评价标签：</view>
                        <view class="label-list" v-if="!item.isCommentInfo">
                            <view
                                v-for="lb in item.all_comment_tag"
                                :style="{ border: item.comment_tag.includes(lb) ? ' 2px solid #c00' : ' 1px solid #ccc' }"
                                class="label-item"
                                @click="checkTag(index, lb)"
                            >
                                <text>{{ lb }}</text>
                            </view>
                            <view class="label-edit" v-if="!item.isAdd" @click="isShowadd(index)">
                                <view></view>
                                <view>自定义</view>
                            </view>
                            <view class="label-edit-input" v-else>
                                <view>
                                    <el-input v-model="tabInput" autofocus />
                                </view>
                                <view @click="tabAdd(index)">确定</view>
                            </view>
                        </view>
                        <view class="label-list" v-else>
                            <view v-for="lb in item.comment_tag" class="label-item-txt">
                                <text>{{ lb }}</text>
                            </view>
                        </view>
                    </view>
                    <view>
                        <view class="lab-text">购物心得：</view>
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
                    <view v-if="!item.content_verification">
                        <view class="lab-text"></view>
                        <view class="tips">请填写购买心得</view>
                    </view>
                    <view>
                        <view class="lab-text">晒&nbsp;&nbsp;&nbsp;&nbsp;单：</view>
                        <tigUpload v-if="!item.is_showed" :count="9" v-model="item.show_pics">
                            <uni-icons type="camera" size="30" color="#cccccc"></uni-icons>
                        </tigUpload>
                        <view v-else>
                            <view v-for="product in item.show_pics" style="height: 80px; width: 80px; transition: opacity 0.2s linear; margin-right: 10px">
                                <tigImage v-model:src="product.pic_thumb"></tigImage>
                            </view>
                        </view>
                    </view>
                    <view>
                        <view class="tig-button theme-button" @click="onSubmit(item, index)">提交评论</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { getCommentData, updateCommentData } from "@/api/user/comment";
import { reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const parameter = {
    navbar: "1",
    return: "1",
    title: "订单评价",
    showHome: true,
    color: false
};
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
                url: "/pages/user/comment/list?order_type=2"
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

</style>
