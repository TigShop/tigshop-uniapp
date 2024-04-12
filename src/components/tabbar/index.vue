<template>
    <van-config-provider :theme-vars="themeVars" :style="{ 'padding-top': configStore.tabbarHeight }">
        <van-tabbar z-index="1999" :fixed="true" v-model="currentActiveValue" :active-color="'#ea3c2d'">
            <van-tabbar-item v-for="(item, index) in options" :key="index" @click="handleSwitchTab(item.pagePath)">
                <span>{{ item.text }}</span>
                <template #icon="props">
                    <img :src="currentActiveValue === index ? item.activeImage : item.image" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </van-config-provider>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useConfigStore } from "@/store/config";
import type { ConfigProviderThemeVars } from "vant";
const configStore = useConfigStore();
const themeVars: ConfigProviderThemeVars = {
    tabbarHeight: configStore.tabbarHeight
};
const props = defineProps({
    currentActive: {
        type: Number,
        default: 0
    }
});

const currentActiveValue = computed({
    get: () => props.currentActive,
    set: (val) => {}
});

const options = configStore.tabbarListData;
const handleSwitchTab = (path: string) => {
    uni.switchTab({ url: path });
};
</script>

<style lang="scss" scoped></style>
