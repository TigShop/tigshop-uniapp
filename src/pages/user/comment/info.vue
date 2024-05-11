<template>
    <navbar :parameter="parameter"></navbar>
    <view class="comment-info">
        <tigUpload :limit="9">
            <uni-icons type="camera" size="30" color="#cccccc"></uni-icons>
        </tigUpload>
        <!-- <div v-for="(item, index) in formState">
            <div class="white-card" v-if="!item.is_showed">
                <div class="product-left">
                    <div>
                        <img alt="" :src="imageFormat(item.pic_thumb)" />
                    </div>
                    <div>
                        <div style="line-height: 2">
                            <a>{{ item.product_name }}</a>
                        </div>
                        <div>
                            <FormatPrice v-model="item.price"></FormatPrice>
                        </div>
                    </div>
                </div>
                <div class="product-right">
                    <div>
                        <span class="lab-text">商品评分：</span>
                        <span>
                            <el-rate :disabled="item.isCommentInfo" v-model="item.comment_rank" size="large" :texts="desc" show-text />
                        </span>
                    </div>
                    <div v-if="!item.rank_verification">
                        <span class="lab-text"></span>
                        <p class="tips">请先评价商品</p>
                    </div>
                    <div>
                        <div class="lab-text">评价标签：</div>
                        <div class="label-list" v-if="!item.isCommentInfo">
                            <div
                                v-for="lb in item.all_comment_tag"
                                :style="{ border: item.comment_tag.includes(lb) ? ' 2px solid #c00' : ' 1px solid #ccc' }"
                                class="label-item"
                                @click="checkTag(index, lb)"
                            >
                                <span>{{ lb }}</span>
                            </div>
                            <div class="label-edit" v-if="!item.isAdd" @click="isShowadd(index)">
                                <div></div>
                                <p>自定义</p>
                            </div>
                            <div class="label-edit-input" v-else>
                                <div>
                                    <el-input v-model="tabInput" autofocus />
                                </div>
                                <p @click="tabAdd(index)">确定</p>
                            </div>
                        </div>
                        <div class="label-list" v-else>
                            <div v-for="lb in item.comment_tag" class="label-item-txt">
                                <span>{{ lb }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="lab-text">购物心得：</div>
                        <textarea
                            cols="50"
                            name="content"
                            placeholder="商品是否给力？快分享你的购买心得吧~"
                            rows="5"
                            style="border: 1px solid #d9d9d9; padding: 4px"
                            v-model="item.content"
                            :disabled="item.isCommentInfo"
                        ></textarea>
                    </div>
                    <div v-if="!item.content_verification">
                        <span class="lab-text"></span>
                        <p class="tips">请填写购买心得</p>
                    </div>
                    <div>
                        <div class="lab-text">晒&nbsp;&nbsp;&nbsp;&nbsp;单：</div>
                        <UploadImage
                            v-if="!item.is_showed"
                            v-model:uploadList="item.show_pics"
                            :limit="9"
                            :fileTypes="['gif', 'jpeg', 'png', 'word', 'excel', 'txt', 'zip', 'ppt', 'pdf']"
                        ></UploadImage>
                        <div v-else>
                            <el-image
                                v-for="product in item.show_pics"
                                :src="imageFormat(product.pic_thumb)"
                                loading="lazy"
                                style="height: 80px; width: 80px; transition: opacity 0.2s linear; margin-right: 10px"
                            />
                        </div>
                    </div>
                    <div>
                        <a
                            class="tig-button theme-button"

                            @click="onSubmit(item, index)"
                            >提交评论</a
                        >
                    </div>
                </div>
            </div>
        </div> -->
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
