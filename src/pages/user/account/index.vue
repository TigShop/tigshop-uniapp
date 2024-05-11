<template>
    <navbar :parameter="parameter"></navbar>
    <infoHeader></infoHeader>
    <view class="custom-tabs">
        <view v-for="(tab, index) in tabs" :key="index" :class="{ 'active-tab': activeTab === tab.action }" class="tab"
            @click="actionClick(tab.action)">
            <view>{{ tab.title }}</view>
        </view>
    </view>
    <block v-if="activeTab === 'detail'">
        <detail></detail>
    </block>
    <block v-if="activeTab === 'log'">
        <log></log>
    </block>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import navbar from "@/components/navbar/index.vue";
import infoHeader from "@/pages/user/account/src/infoHeader.vue";
import detail from "@/pages/user/account/src/detail.vue";
import log from "@/pages/user/account/src/log.vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "资金管理"
});

const tabs = [
    { title: "账户明细", action: "detail" },
    { title: "申请记录", action: "log" }
];
const activeTab = ref('detail');
const actionClick = (value: string) => {
    if (value === activeTab.value) return;
    activeTab.value = value;
}

onReachBottom(() => {
    console.log('---');
})
</script>
<style lang="scss" scoped>
.custom-tabs {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 120rpx;
    margin: 20rpx;

    .tab {
        padding: 10px;
        width: 100%;
        font-size: 28rpx;
        border-bottom: none;
        color: black;
        text-align: center;
    }
}

.custom-tabs .active-tab {
    border-bottom: 2px solid #fa0;
    color: #fa0;
}
</style>