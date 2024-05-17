<template>
    <view
        :class="
            'module-ad-con module-ad-con-' +
            module_id +
            ' module-image_nav ad-nav_type__' +
            module.nav_type +
            ' ad-nav_style__' +
            module.nav_style +
            ' ad-row_num__' +
            module.row_num +
            ' ad-col_num__' +
            module.col_num +
            ' ad-pic_page_type__' +
            module.pic_page_type +
            ' ad-radio_style__' +
            module.radio_style
        "
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom"
    >
        <view class="module-ad-content" :style="frameFormat.inner_padding + frameFormat.background_color + frameFormat.box_radius">
            <block v-if="module.nav_type == 2">
                <div class="image-ad-warp">
                    <div class="image-ad-con">
                        <Swiper :swiperOption="swiperOption" v-model="swiperList">
                            <template v-slot:default="{ item }">
                                <div class="swiper-main">
                                    <div class="swiper-item" v-for="(subItem, index) in item" :key="index">
                                        <image v-if="module.nav_style === 2 || module.nav_style === 1" :src="imageFormat(subItem.pic_url)" />
                                        <div v-if="module.nav_style === 3 || module.nav_style === 1" class="imagenav-item-text">
                                            {{ subItem.pic_title }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Swiper>
                    </div>
                </div>
            </block>
            <block v-else>
                <div class="imagenav-main">
                    <div class="imagenav-main-item" v-for="(item, index) in module.pic_list" :key="index" @click="handleToPage(item.pic_link)">
                        <view class="item-img-a">
                            <image
                                :class="{ 'img-height': module.nav_style === 2 }"
                                v-if="module.nav_style === 2 || module.nav_style === 1"
                                class="imagenav-item-img"
                                :src="imageFormat(item.pic_url)"
                                mode="widthFix"
                            />
                        </view>
                        <view class="item-text-a">
                            <div v-if="module.nav_style === 3 || module.nav_style === 1" class="imagenav-item-text">{{ item.pic_title }}</div>
                        </view>
                    </div>
                </div>
            </block>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";
import { formatFrame } from "@/components/modules";
import { imageFormat, urlFormat } from "@/utils/format";
import Swiper from "@/components/Swiper/index.vue";
// 在modules加入要使用的模块
import "swiper/css";
import "swiper/css/pagination"; // 轮播图底面的小圆点
const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    }
});
const { frame } = props.module;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});
const swiperList = ref<any[]>([]);
const swiperOption = ref<any>({
    autoplay: {
        delay: 3000,
        disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay
        pauseOnMouseEnter: true //鼠标置于swiper是否时暂停自动切换
    },
    pagination: {
        clickable: true
    }
    // slidesPerView: 4, // 一屏显示的slide个数  'auto'
});
const swiperPageColor = computed(() => {
    return props.module.swiper_page_color || "#333";
});
const getSwiperList = () => {
    if (props.module.nav_type === 1) return;
    swiperList.value = [];
    let itemNum;

    if (props.module.row_num && props.module.col_num) {
        itemNum = props.module.row_num * props.module.col_num;
    } else {
        itemNum = 0;
    }

    let swiperListNum = Math.ceil(props.module.pic_list.length / itemNum);
    for (let index = 0; index < swiperListNum; index++) {
        swiperList.value.push(props.module.pic_list.slice(index * itemNum, (index + 1) * itemNum));
    }
};
watchEffect(() => {
    getSwiperList();
});

const current = ref(0);
const currentIndex = ref(0);
const module_id = ref("");
const handleToPage = (data: string | { path: string; [key: string]: any }) => {
    if (typeof data === "string") {
        uni.navigateTo({
            url: data
        });
    } else {
        if (data.path === "category") {
            uni.setStorageSync("category_id", data.id);
            uni.switchTab({
                url: urlFormat(data),
            });
        } else {
            uni.navigateTo({
                url: urlFormat(data)
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../../../static/css/modules.css";
/*图片标题类型*/
:deep(.swiper-pagination-bullet-active) {
    background: v-bind("swiperPageColor") !important;
}
.imagenav-main {
    display: grid;
    grid-template-columns: repeat(v-bind("module.row_num"), 1fr);
    grid-template-rows: repeat(v-bind("module.col_num"), 1fr);
    grid-gap: 0 v-bind("module.img_padding + 'px'");
    box-sizing: border-box;

    .imagenav-main-item {
        margin-top: 8px;
        margin-bottom: 2px;
        padding-bottom: 22px;
        position: relative;

        .imagenav-item-img {
            width: 100%;
            height: inherit;
        }
        .img-height {
            height: inherit;
        }

        .imagenav-item-text {
            text-align: center;
            font-size: 24rpx;
            height: 30rpx;
        }
    }
}

.swiper-main {
    display: grid;
    grid-template-columns: repeat(v-bind("module.row_num"), 1fr);
    grid-gap: 0 v-bind("module.img_padding + 'px'");
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 10px;

    .swiper-item {
        margin-top: 8px;
        margin-bottom: 2px;
        padding-bottom: 6px;
        img {
            width: 100%;
            height: inherit;
        }
        div {
            font-size: inherit;
            text-align: center;
            line-height: 30px;
        }
    }
}

.ad-nav_type__2.ad-pic_page_type__1 :deep(.swiper-pagination-bullet) {
    width: 24rpx;
    border-radius: 0;
    height: 4rpx;
    margin: 0 2rpx;
}
.item-text-a {
    position: absolute;
    width: 100%;
    bottom: 6rpx;
    display: flex;
    align-items: end;
    justify-content: center;
}
</style>
