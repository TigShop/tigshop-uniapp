<template>
    <view :class="'module-ad-con  module-search_bar ad-style__' + module.style" :data-type="module_type">
        <view class="searchBar-warp">
            <view
                class="searchBar-con"
                :style="
                    module.box_padding_format +
                    ';background-color: ' +
                    module.background_color +
                    ';' +
                    module.box_padding_top_format +
                    module.box_padding_bottom_format
                "
            >
                <view class="searchBar-item">
                    <view class="item-content" style="">
                        <view class="item-search-con">
                            <view
                                class="item-search-form"
                                @tap.stop.prevent="search"
                                :style="
                                    'color: ' +
                                    module.text_color +
                                    ';background-color: ' +
                                    module.item_background_color +
                                    ';' +
                                    module.item_radius_format +
                                    module.item_height_format
                                "
                            >
                                <view class="module_ico module-ico-sousuo"></view>
                                <view class="item-search-input">{{ module.text }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    }
});

const module_type = ref("");

const search = () => {
    uni.navigateTo({
        url: "/pages/search/index"
    });
};
</script>
<style>
@import '../../../static/css/modules.css';
.searchBar-warp .item-search-con .item-search-form {
    background: #fff;
    height: 60rpx;
    display: flex;
    align-items: center;
    padding: 0;
    color: #555555;
}
.searchBar-warp .item-search-con .item-search-form .module_ico {
    margin-left: 20rpx;
}
.searchBar-warp .item-search-con .item-search-form .item-search-input {
    margin-left: 10rpx;
}
</style>
