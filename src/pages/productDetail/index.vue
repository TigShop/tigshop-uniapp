<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <productImg v-if="productInfo" :picList="picList" :productInfo="productInfo"></productImg>
        <view class="productDetail-content">
            <productTitleInfo :productInfo="productInfo"></productTitleInfo>
            <view class="">
                
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import productImg from "./src/productImg.vue";
import productTitleInfo from './src/productTitleInfo.vue'
import { reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getProductDetail } from "@/api/product/product";
import type { ProductDetailPicList, ProductDetailItem } from "@/types/product/product";

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "商品详情",
    class: "pageGoods"
});

onLoad((option) => {
    console.log(option);
    if (option) {
        const { id } = option;
        if (id) {
            __getProductDetail(id);
            // __getProductDetail("389");
        }
    }
});
const picList = ref<ProductDetailPicList[]>([]);
const productInfo = ref<ProductDetailItem>({} as ProductDetailItem);

const __getProductDetail = async (id: string) => {
    try {
        const result = await getProductDetail(id);
        const { pic_list, item } = result;
        picList.value = pic_list;
        productInfo.value = item;
    } catch (error) {
        console.error(error);
    }
};

const handleShare = () => {};
const isCollect = ref(false);
const handleCollect = () => {};
const goodsService = () => {};
const selecAttr = () => {};
</script>
<style lang="scss" scoped>
.productDetail-content {
    padding: 20rpx;
}
</style>
