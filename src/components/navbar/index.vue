<template>
    <view style="height: 100%">
        <view :class="'navbar ' + parameter.class" :style="'height:' + navH + 'rpx'">
            <view class="navbarH" :style="'height:' + navH + 'rpx;'">
                <view class="navbarCon acea-row row-center-wrapper" v-if="parameter.navbar == 0">
                    <view class="search acea-row row-middle" @click="setGoodsSearch">
                        <text class="iconfont icon-xiazai5"></text>
                        搜索商品
                    </view>
                    <view class="logo"><image lazy-load  class="logo-image" :src="logoUrl"></image></view>
                </view>
                <view class="navbarCon acea-row row-center-wrapper" v-if="parameter.navbar == 1">
                    <view :class="'name ' + (parameter.color == true ? 'on' : '') + ' line1'" v-if="parameter.class != 'sea1rch'">{{ parameter.title }}</view>
                    <view class="title-search" @click="setGoodsSearch2" v-if="parameter.class == 'search'">
                        <view class="search-top-warp">
                            <view class="search-input">
                                <text class="search-input-text iconfont icon-neirongsousuo"></text>
                                <input
                                    class="search-input-input"
                                    type="text"
                                    :value="parameter.searchKeywords"
                                    :disabled="true"
                                    :focus="focus"
                                    placeholder="点击搜索商品"
                                    placeholder-class="placeholder"
                                    @input="setValue"
                                />
                            </view>
                        </view>
                    </view>
                    <view :class="'iconfont icon-houtui ' + (parameter.color == true ? 'on' : '')" v-if="parameter.return == 1" @click="returnFun"></view>
                    <view :class="'iconfont icon-shouye- ' + (parameter.color == true ? 'on' : '')" v-if="parameter.returnHome == 1" @click="returnHome"></view>
                </view>
            </view>
        </view>

        <view :style="'height:' + navH + 'rpx'"></view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useConfigStore } from "@/store/config";
const props = defineProps({
    parameter: {
        type: Object,
        default: () => ({
            class: "0",
            showHome: false,
            searchKeywords: "",
            return: '0',
            returnUrl: ''
        })
    },
    logoUrl: {
        type: String,
        default: ""
    }
});
const configStore = useConfigStore();
const navH = configStore.navHeight;
const focus = ref(false);

const setClass = () => {
    let color = "";
    if (props.parameter.class) {
        switch (props.parameter.class) {
            case "0":
            case "on":
                color = "on";
                break;
            case "1":
            case "black":
                color = "black";
                break;
            case "2":
            case "gray":
                color = "gray";
                break;
            case "3":
            case "red":
                color = "red";
            default:
                color = props.parameter.class;
                break;
        }
    }
    props.parameter.class = color;
};
const ready = () => {
    setClass();
    const pages = getCurrentPages();
    if (pages.length <= 1) {
        props.parameter.return = 0;
        if (props.parameter.class == "pageGoods" || props.parameter.showHome == true) {
            props.parameter.returnHome = 1;
        }
    }
};

const returnFun = () => {
    if(props.parameter.returnUrl){
        return uni.redirectTo({
            url: props.parameter.returnUrl
        });
    }
    uni.navigateBack();
};

const returnHome = () => {
    uni.switchTab({
        url: "/pages/index/index"
    });
};

const setGoodsSearch = () => {
    props.parameter.searchKeywords = props.parameter.searchKeywords ? props.parameter.searchKeywords : "";
    uni.navigateTo({
        url:
            "/pages/search/index?keywords=" +
            props.parameter.searchKeywords +
            (props.parameter.store_id > 0 ? "&store_id=" + props.parameter.store_id : "") +
            (props.parameter.store_cat_id > 0 ? "&store_cat_id=" + props.parameter.store_cat_id : "")
    });
};

const setGoodsSearch2 = () => {
    props.parameter.searchKeywords = props.parameter.searchKeywords ? props.parameter.searchKeywords : "";
    uni.redirectTo({
        url:
            "/pages/search/index?keywords=" +
            props.parameter.searchKeywords +
            (props.parameter.store_id > 0 ? "&store_id=" + props.parameter.store_id : "") +
            (props.parameter.store_cat_id > 0 ? "&store_cat_id=" + props.parameter.store_cat_id : "")
    });
};

const setValue = () => {};

onMounted(() => {
    ready();
});
</script>
<style>
.navbar {
    position: fixed;
    background-color: #fff;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
}
.navbar.on {
    background-color: #fc4141;
}
.navbar.home {
    background-color: #fc4141;
}
.navbar.black {
    background-color: #232323;
}
.navbar.gray {
    background-color: #666;
}
.navbar.user {
    background: linear-gradient(90deg, #fcf6fc, #f3f3fe);
}
.navbar.pin {
    background: linear-gradient(90deg, #ea4f63, #eb4d6f);
}
.navbar.qiandao {
    background: linear-gradient(90deg, #e65560, #e25063);
}
.navbar.seckill {
    /* background: linear-gradient(to right,#ef3390,#ef3647); */
    background: linear-gradient(to right, #FF8853 0%, #F52828 100%);
}
.navbar.seckill .navbarH .navbarCon .name{
    color: #fff !important;
}

.navbar.red {
    background-color: #eb5447;
}
.navbar .navbarH {
    position: relative;
}
.navbar .navbarH .navbarCon {
    position: absolute;
    bottom: 0;
    height: 100rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.navbar .navbarH .navbarCon .name {
    color: #000;
    font-size: 36rpx;
    width: 300rpx;
    text-align: center;
}
.navbar .navbarH .navbarCon .name.on {
    color: #fff;
}
.navbar .navbarH .navbarCon .icon-houtui {
    color: #000;
    position: absolute;
    font-size: 40rpx;
    left: 16rpx;
    width: 100rpx;
    height: 56rpx;
    line-height: 54rpx;
    top: 50%;
    transform: translateY(-50%);
}
.navbar .navbarH .navbarCon .icon-houtui.on {
    color: #fff;
}
.navbar .navbarH .navbarCon .icon-shouye- {
    color: #000;
    position: absolute;
    font-size: 40rpx;
    left: 37rpx;
    width: 100rpx;
    height: 56rpx;
    line-height: 54rpx;
    top: 50%;
    transform: translateY(-50%);
}
.navbar .navbarH .navbarCon .icon-shouye-.on {
    color: #fff;
}
.navbar .navbarH .navbarCon .logo {
    width: 127rpx;
    height: 45rpx;
    position: absolute;
    left: 30rpx;
    top: 50%;
    transform: translateY(-50%);
}
.navbar .navbarH .navbarCon .logo .logo-image {
    width: 100%;
    height: 100%;
    display: block;
}
.navbar .navbarH .navbarCon .search {
    width: 300rpx;
    height: 64rpx;
    background-color: #f7f7f7;
    border-radius: 50rpx;
    padding: 0 28rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    color: #bbb;
    margin-right: 26rpx;
}
.navbar .navbarH .navbarCon .search .icon-xiazai5 {
    font-size: 34rpx;
    margin-right: 16rpx;
}
/*.navbar.merchant {background: linear-gradient(90deg,#dd9b4c,#ffd787);}*/

.top-search {
    width: 100rpx;
    height: 80rpx;
    width: 100%;
    position: relative;
    position: fixed;
    left: 0;
    background-color: #fc4141;
    z-index: 999;
}
.top-search .search-box {
    height: 60rpx;
    padding: 0 30rpx;
}
.top-search .search-box .search-input {
    border-radius: 50rpx;
    padding: 0 28rpx;
    width: 100%;
    background: #fff;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 28rpx;
    color: #bbb;
}
.top-search .search-box .search-input .search-input-text {
    margin-right: 10rpx;
}

.title-search {
    position: absolute;
    left: 100rpx;
    top: 50%;
    transform: translateY(-50%);
    right: 200rpx;
    height: 66rpx;
}

.search-top-warp {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
.search-top-warp .search-input {
    width: 400rpx;
    background-color: #f7f7f7;
    border-radius: 33rpx;
    padding: 0 35rpx;
    box-sizing: border-box;
    height: 66rpx;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
.search-top-warp .search-input .search-input-input {
    width: 280rpx;
    font-size: 28rpx;
}
.search-top-warp .search-input .placeholder {
    color: #bbb;
}
.search-top-warp .search-input .iconfont {
    color: #999;
    font-size: 35rpx;
}
.search-top-warp .bnt {
    width: 120rpx;
    text-align: center;
    height: 66rpx;
    line-height: 66rpx;
    font-size: 30rpx;
    color: #282828;
}

.order_detail {
    background-color: #e93323;
    background-image: -webkit-linear-gradient(left, #e93323 20%, #ee9f69);
}

.navbar.home .navbarH .navbarCon .name.on {
    font-size: 30rpx;
}

/*.navbar.merchant_reg{background: transparent;}*/
</style>
