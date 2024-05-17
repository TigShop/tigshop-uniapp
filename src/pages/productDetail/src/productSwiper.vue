<template>
    <view class="product-card-row">
        <view class="product-title"> 浏览最终购买 </view>
        <view class="product-swiper">
            <uni-swiper-dot
                class="uni-swiper-dot-box"
                @clickItem="clickItem"
                :info="info"
                :current="current"
                mode="default"
                :dots-styles="dotsStyles"
                field="content"
            >
                <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
                    <swiper-item v-for="(item, index) in info" :key="index">
                        <view class="swiper-item" :class="'swiper-item' + index">
                            <text style="color: #fff; font-size: 32px">{{ index + 1 }}</text>
                        </view>
                    </swiper-item>
                </swiper>
            </uni-swiper-dot>
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
interface Props {
    productId: number;
}
const props = defineProps<Props>();
const swiperDotIndex = ref(0);
const current = ref(0);
const dotsStyles = ref({
    backgroundColor: "rgba(255, 90, 95,0.3)",
    border: "1px rgba(255, 90, 95,0.3) solid",
    color: "#fff",
    selectedBackgroundColor: "rgba(255, 90, 95,0.9)",
    selectedBorder: "1px rgba(255, 90, 95,0.9) solid"
});
const info = ref([
    {
        colorClass: "uni-bg-red",
        url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
        content: "内容 A"
    },
    {
        colorClass: "uni-bg-green",
        url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
        content: "内容 B"
    }
]);

const clickItem = (e: any) => {
    swiperDotIndex.value = e;
};
const change = (e: any) => {
    current.value = e.detail.current;
};
</script>

<style lang="scss" scoped>
.swiper-box {
    height: 200px;
}

.swiper-item {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    color: #fff;
}
</style>