<template>
    <view>
        <view class="tab_body">
            <text v-html="formState.template_content"></text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getAfterSaleService } from "@/api/product/product";
import { onLoad } from "@dcloudio/uni-app";
const loading = ref(false);
const formState = ref<any>({});
const fetchAfterSaleService = async (id:any) => {
    try {
        const result = await getAfterSaleService(id);
        Object.assign(formState.value, result.item);
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    } finally {
        loading.value = false;
    }
};
onLoad((option) => {
    if (option) {
        const { id } = option;
        if (id) {
            fetchAfterSaleService(id)
        }
    }
});

</script>

<style lang="scss" scoped>
.tab_body {
    text-align: start;
    color: #333;
    font-family: 微软雅黑, 微软雅黑;
}
</style>
