<template>
    <navbar :parameter="parameter"></navbar>
    <view class="exchange-list">
        <masonry :commodityList="filterState" :isExchange="true"></masonry>
    </view>
    <view class="loading-box">
        <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
        <view v-else>到底了~</view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { ref, reactive } from "vue";
import { onLoad, onShow, onPageScroll, onReachBottom } from "@dcloudio/uni-app";
import { getExchangeList } from "@/api/exchange/exchange";
import type { ExchangeFilterState, ExchangeFilterParams } from "@/types/exchange/exchange.d";

const parameter = ref({
    navbar: "1",
    return: "1",
    title: "积分换购",
    class: "no"
});
const filterParams = reactive({   //初始化用于查询的参数
    page: 1,
    size: 20,
});
const total = ref<number>(0)
const loaded = ref(false);
const filterState = ref<ExchangeFilterState[]>([])
const loadFilter = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    }
    try {
        const result = await getExchangeList({...filterParams});
        total.value = result.total;
        filterState.value = [...filterState.value, ...result.filter_result];
        console.log(filterState.value)
    } catch (error:any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    } finally {
        loaded.value = false;
    }
}
onLoad(() => {
    loadFilter()
});
onShow(() => {
    uni.hideTabBar();
});
onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        loadFilter();
    }
});
</script>
<style scoped lang="scss">

</style>
