<template>
    <van-popup v-model:show="show" closeable :style="{ height: height }" round position="bottom">
        <view class="select-region-main">
            <view class="title">选择地区</view>
            <view class="content">
                <view class="region-menu">
                    <view class="region-menu-item" :class="{ active: showIndex === index }" @click="showIndex = index" v-for="(item, index) in regionNames">
                        {{ item ? item : "请选择" }}</view
                    >
                </view>
                <block v-for="(item, index) in regionList">
                    <view class="region-list" v-if="showIndex === index">
                        <view
                            class="region-list-item"
                            v-for="region in item"
                            :class="{ active: regionSelected(region.region_id) }"
                            @click="onSelect(index, region.region_id)"
                            >{{ region.region_name }}</view
                        >
                    </view>
                </block>
            </view>
        </view>
    </van-popup>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { getRegionByIds } from "@/api/region";
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
        required: true
    },
    height: {
        type: String,
        default: "60%"
    },
    modelValue: {
        type: Array,
        default: () => []
    }
});
const emit = defineEmits(["update:show", "update:modelValue","sendRegionNames"]);
const show = computed({
    get: () => props.show,
    set: () => {
        emit("update:show", false);
    }
});
const regionList = ref<any[]>([]);
const showIndex = ref(0);
const getRegions = async () => {
    try {
        const result = await getRegionByIds(props.modelValue as number[]);
        Object.assign(regionList.value, result.region_list);
        showIndex.value = regionList.value.length > 1 ? regionList.value.length - 1 : 0;
    } catch (error) {
    } finally {
    }
};
watchEffect(() => {
    getRegions();
});

const regionSelected = (regionId: any) => {
    return props.modelValue.includes(regionId);
};

const onSelect = async (index: number, regionId: any) => {
    if (index >= 0 && index <= props.modelValue.length) {
        props.modelValue[index] = regionId; // 更新对应索引的值
        props.modelValue.splice(index + 1); // 截取至指定索引，包含修改过的值
    }
    await getRegions();
    if (regionList.value.length == index + 1) {
        emit("update:modelValue", props.modelValue);
        emit("update:show", false);
        emit("sendRegionNames", regionNames.value)
    } else {
        showIndex.value = index + 1;
    }
};

const regionNames = computed(() => {
    let res: any = [];
    regionList.value.forEach((item: any, index) => {
        if (item.length > 0) {
            let selected = false;
            item.forEach((region: any) => {
                if (regionSelected(region.region_id)) {
                    res[index] = region.region_name;
                    selected = true;
                }
            });
            if (selected == false) {
                res[index] = "请选择地区";
            }
        }
    });
    return res;
});


</script>

<style lang="scss" scoped>
.select-region-main {
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    .title {
        font-size: 32rpx;
        font-weight: bold;
        text-align: left;
        height: 123rpx;
        line-height: 123rpx;
        position: relative;
        padding-left: 30rpx;
        background: #fff;
    }
}
.content {
    margin-top: 20rpx;
    position: relative;
    height: 100%;
    .region-menu {
        display: flex;

        .region-menu-item {
            padding: 0 40rpx;
            height: 80rpx;
            line-height: 80rpx;
            background-color: #f7f7f7;
            border: 1rpx solid #e5e5e5;

            z-index: 10;
            font-size: 28rpx;
            &.active {
                background-color: #fff;
                border-bottom: none;
            }
        }
    }

    .region-list {
        top: 67rpx;
        border-top: 1rpx solid #e5e5e5;
        position: absolute;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        .region-list-item {
            padding: 20rpx 20rpx;
            white-space: nowrap;
            display: block;
            font-size: 28rpx;

            &:nth-child(2n) {
                background-color: #f8f8f8;
            }

            &.active {
                color: #e93b3d;
            }
        }
    }
}
</style>
