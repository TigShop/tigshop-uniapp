<template>
    <view class="tabbar-container safe-padding">
        <view class="tabbar">
            <view class="tabbar-item" v-for="(item, index) in configStore.tabbarList" :key="index" @click="handleTabbar(item, index)">
                <view class="tabbar-icon">
                    <img class="tabbar-icon-img" :src="configStore.currentActiveValue === index ? item.activeImage : item.image" />
                </view>
                <view class="tabbar-text" :class="{ active: configStore.currentActiveValue === index }">{{ item.text }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useConfigStore } from "@/store/config";
const configStore = useConfigStore();
const tabbarHeight = computed(() => {
    return configStore.tabbarHeight ? configStore.tabbarHeight : "90rpx";
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
const currentActiveValue = ref(0);

const handleTabbar = (item: any, index: number) => {
    configStore.setCurrentActiveValue(index);
    uni.switchTab({ url: item.pagePath });
};
</script>

<style lang="scss" scoped>
.tabbar {
    background-color: v-bind("props.backgroundColor");
    height: v-bind("tabbarHeight");
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    z-index: 1999;
    padding: 15rpx 0 15rpx;

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
</style>
