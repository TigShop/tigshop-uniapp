<template>
    <Swiper :modules="[Autoplay, Pagination, Navigation]" v-bind="swiperOption">
        <swiper-slide v-if="modelValue" v-for="(item, key) in modelValue" :key="key">
            <slot :item="item"></slot>
        </swiper-slide>
    </Swiper>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination"; // 轮播图底面的小圆点
import "swiper/css/effect-fade";
const props = defineProps({
    swiperOption: { type: Object },
    modelValue: { type: Array, default: [] }
});

const modelValue = ref<any>([]);

const swiperOption = ref(<any>{
    autoplay: {
        delay: 3000,
        disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay
        pauseOnMouseEnter: true //鼠标置于swiper是否时暂停自动切换
    },
    pagination: {
        clickable: true
    },
    // spaceBetween: 0,
    // slidesPerView: 4, // 一屏显示的slide个数  'auto'
    // slidesPerGroup: 1, //每组多少个swiper滑块
    // centeredSlides: true, // 居中的slide是否标记为active，默认是最左active,这样样式即可生效
    // slideToClickedSlide: true, // 点击的slide会居中
    loop: true, // 循环播放, 可有无限滚动效果，初始加载即是滚动后的效果
    // scrollbar: { draggable: true },
    // grabCursor: true, //抓手光标
    // 使用前进后退按钮来控制Swiper切换。
    // navigation: true,   // 1默认，在内
    navigation: false
});
watchEffect(() => {
    modelValue.value = props.modelValue;
    Object.assign(swiperOption.value, props.swiperOption);
});
onMounted(async () => {
    Object.assign(swiperOption.value, props.swiperOption);
});
</script>
