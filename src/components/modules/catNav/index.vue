<template>
    <view class="module-ad-con module-cat_nav">
        <view class="catNav-warp-blank" v-if="scrollTop > 120" :style="'padding-top:' + (navH - 110) + 'rpx;'"></view>
        <view :class="'catNav-warp ' + (scrollTop > 120 ? 'fixed' : '')">
            <view
                class="catNav-con"
                :style="
                    'background-color: ' +
                    module.background_color +
                    ';padding-top:' +
                    module.box_padding_top +
                    'rpx' +
                    ';padding-bottom:' +
                    module.box_padding_bottom +
                    'rpx' +
                    ';background-image: url(' +
                    imageFormat(module.nav_background_pic.pic_url) +
                    ');background-position: center center;background-size: 100% auto;' +
                    (catColor != '' ? 'background:' + catColor : '')
                "
            >
                <view class="catNav-item" :style="'padding-top:' + (navH - 110) + 'rpx;'">
                    <view class="item-content">
                        <div class="flex">
                            <img class="catnav-logo" :style="logoFormat.logo_height" :src="imageFormat(logoFormat.logo_pic?.pic_url || '')" />

                            <view class="default-search" @click="handleSkip" :style="searchFormat['padding-right'] + searchFormat['padding-left']">
                                <view class="default-search-config catnav-search" :style="searchFormat['item_background_color'] + searchFormat['item_radius']">
                                    <view class="module_ico module-ico-sousuo"></view>
                                    <view class="catnav-search-text" :style="searchFormat['search_text_color']">{{ searchFormat.search_text }}</view>
                                </view>
                            </view>
                        </div>

                        <scroll-view class="item-cat_nav-con" :scroll-left="navLeft" :scroll-with-animation="true" :scroll-x="true">
                            <view class="cat-nav-list">
                                <block v-if="navList.length === 0">
                                <!-- <block v-if="true"> -->
                                    <view class="catnav-skeleton">
                                        <skeleton v-for="i in 5" :key="i" animated bg="#e4e4e4" width="50px" height="20px"></skeleton>
                                    </view>
                                </block>
                                <block v-else>
                                    <view
                                        :class="'nav-item ' + (current_cat_nav_id == nav.mobile_cat_nav_id ? 'current' : '')"
                                        @click="changeCatNav"
                                        :data-id="nav.mobile_cat_nav_id"
                                        :data-category_id="nav.category_id"
                                        :data-index="index"
                                        :data-cat_color="nav.cat_color"
                                        :data-allData="nav"
                                        v-for="(nav, index) in navList"
                                        :key="index"
                                    >
                                        <view class="tit" :style="'color: ' + module.text_color + ';'">{{ nav.category_name }}</view>
                                    </view>
                                </block>
                            </view>
                        </scroll-view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useConfigStore } from "@/store/config";
import { getMobileCatNavList } from "@/api/home/home";
import { imageFormat } from "@/utils/format";
import skeleton from "@/components/skeleton/index.vue";

const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    },
    scrollTop: {
        type: Number,
        default: 0
    }
});
const logoFormat = computed(() => {
    return {
        logo_height: "height:" + props.module.logo_height + "px;",
        logo_pic: props.module.logo_pic
    };
});
const searchFormat = computed(() => {
    return {
        search_text: props.module.search_text ? props.module.search_text : "搜索商品",
        item_background_color: "background-color:" + props.module.item_background_color + ";",
        search_text_color: "color:" + props.module.search_text_color + ";",
        item_radius: "border-radius:" + props.module.item_radius + "rpx;",
        "padding-right": "padding-right:" + props.module.box_padding + "rpx;",
        "padding-left": "padding-left:" + props.module.box_padding + "rpx;"
    };
});

const emit = defineEmits(["change-cat-nav"]);

const configStore = useConfigStore();

const current_cat_nav_id = ref(0);
const catColor = ref("");
const navH = configStore.navHeight;
const navLeft = ref(0);
const showCatNav = ref(0);

const handleSkip = () => {
    uni.navigateTo({
        url: "/pages/search/index"
    });
};

const changeCatNav = (e: any) => {
    const { id, category_id, cat_color, index, allData } = e.currentTarget.dataset;
    let nav_left = e.currentTarget.offsetLeft - 10;
    nav_left = nav_left - nav_left / (index + 1) + 10;
    catColor.value = cat_color ?? "";
    navLeft.value = nav_left;
    showCatNav.value = 0;
    if (id > 0) {
        showCatNav.value = 1;
    }
    current_cat_nav_id.value = id;
    emit("change-cat-nav", {
        id,
        category_id,
        show_cat_nav: showCatNav.value,
        cat_color: catColor.value,
        brand_info: allData.brand_info,
        img_url: allData.img_url,
        child_cat_info: allData.child_cat_info
    });
};

const navList = ref<any>([]);
const getCatnNavList = async () => {
    try {
        const result = await getMobileCatNavList({ is_show: 1 });
        navList.value = result.filter_result;
        navList.value.splice(0, 0, { mobile_cat_nav_id: 0, category_name: "推荐" });
        // console.log("getCatnNavList", result);
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    getCatnNavList();
});
</script>
<style lang="scss" scoped>
@import "../../../static/css/modules.css";
/*分类导航*/
.catNav-warp .item-cat_nav-con {
    width: 100%;
}
.catNav-warp .item-cat_nav-con::-webkit-scrollbar {
    display: none;
}
.catNav-warp .cat-nav-list {
    display: flex;
    flex-wrap: nowrap;
}
.catNav-warp .cat-nav-list .nav-item {
    flex: none;
    margin: 0;
    height: 80rpx;
    line-height: 80rpx;
    position: relative;
    width: 15%;
    text-align: center;
}
.catNav-warp .cat-nav-list .nav-item:first-child {
    margin-left: 20rpx;
}
.catNav-warp .cat-nav-list .nav-item .tit {
    font-size: 32rpx;
    font-weight: bold;
}
.catNav-warp .cat-nav-list .nav-item.current .tit {
    font-size: 44rpx;
    font-weight: 800;
}
.catNav-warp .cat-nav-list .nav-item.current:after {
    content: "";
    position: absolute;
    bottom: 1px;
    left: 20%;
    right: 20%;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 6rpx;
    height: 6rpx;
}
.catNav-warp .item-search-con {
    margin-bottom: 10rpx;
}
.catNav-warp .item-search-con .item-search-form {
    background: #fff;
    height: 70rpx;
    display: flex;
    align-items: center;
    padding: 0;
    color: #555555;
}
.catNav-warp .module_ico {
    margin-left: 20rpx;
}
.catNav-warp .item-search-con .item-search-form .item-search-input {
    margin-left: 10rpx;
    font-size: 24rpx;
}
.catNav-warp .item-logo-con {
    margin-left: 20rpx;
    margin-top: 10rpx;
}
.catNav-warp .item-logo-con .item-logo-img image {
    height: 80rpx;
    margin-bottom: 20rpx;
    margin-left: 10rpx;
}

.catNav-warp.fixed {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 888;
    & .flex {
        display: flex;
        align-items: center;
    }
}
.catNav-warp-blank {
    height: 360rpx;
}
.catNav-warp.fixed .item-logo-con {
    display: none;
}
.catNav-warp.fixed .item-search-con {
    margin-right: 200rpx;
}

.catnav-logo {
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
}
.default-search {
    padding: 0 10px;
    margin-bottom: 5px;
    width: 100%;
}
.default-search-config {
    background-color: #fff;
    border-radius: 3px;
}
.catnav-search {
    display: flex;
    align-items: center;
    height: 35px;
}
.catnav-search-text {
    font-size: 14px;
    margin-left: 5px;
}

.catnav-skeleton {
    height: 80rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>
