<template>
    <view class="tabbar-container safe-padding">
        <view class="tabbar">
            <view class="tabbar-item" v-for="(item, index) in tabbarStore.tabbarList" :key="index" @click="handleTabbar(item, index)">
                <view class="tabbar-icon">
                    <image class="tabbar-icon-img" :src="configStore.currentActiveValue === index ? item.activeImage : item.image" />
                </view>
                <view class="tabbar-text" :class="{ active: configStore.currentActiveValue === index }">{{ item.text }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useConfigStore } from "@/store/config";
import { usetabbarStore } from "@/store/tabbar";
import { onShow } from "@dcloudio/uni-app";
const configStore = useConfigStore();
const tabbarStore = usetabbarStore();
const tabbarHeight = computed(() => {
    return tabbarStore.tabbarHeight ? tabbarStore.tabbarHeight : "90rpx";
});

const props = defineProps({
    backgroundColor: {
        type: String,
        default: "#fff"
    },
    color: {
        type: String,
        default: "#000"
    },
    activeColor: {
        type: String,
        default: "#ea3c2d"
    }
});

onShow(() => {
    const page = getCurrentPages()[0].route;
    const index = tabbarStore.tabbarList.findIndex((item) => {
        return item.pagePath.includes(page);
    });
    if (index !== -1 && index !== configStore.currentActiveValue) {
        configStore.setCurrentActiveValue(index);
    }
});
const handleTabbar = (item: any, index: number) => {
    console.log(index)
    console.log(uni.getStorageSync("currentActiveValue"))
    configStore.setCurrentActiveValue(index);
    item.pagePath && uni.switchTab({ url: item.pagePath });
};
</script>

<style lang="scss" scoped>
.tabbar-container {
    background-color: v-bind("props.backgroundColor");
    z-index: 9999;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    box-sizing: border-box;

    .tabbar {
        display: flex;
        align-items: center;
        box-sizing: border-box;

        height: v-bind("tabbarHeight");
        padding: 5rpx 0;
        .tabbar-item {
            color: v-bind("props.color");
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            padding: 10rpx 0;
            .tabbar-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                .tabbar-icon-img {
                    height: 42rpx;
                    width: 42rpx;
                }
            }

            .tabbar-text {
                padding-top: 5rpx;
                font-size: 24rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                &.active {
                    color: v-bind("props.activeColor");
                }
            }
        }
    }
}
</style>
