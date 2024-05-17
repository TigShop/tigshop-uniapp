<template>
    <tigpopup v-model:show="visible" title="请完成安全验证" paddingBottom="0" height="37vh" :width="parseInt(imgSize.width) + 30 + 'px'" position="center">
        <VerifySlide
            :is="componentType"
            :captchaType="captchaType"
            type="2"
            :figure="figure"
            :arith="arith"
            :mode="mode"
            :vSpace="vSpace"
            :explain="explain"
            :imgSize="imgSize"
            :blockSize="blockSize"
            :barSize="barSize"
            ref="instance"
            @close="closeBox"
            @success="success"
        ></VerifySlide>
    </tigpopup>
</template>
<script lang="ts" setup>
/**
 * Verify 验证码组件
 * @description 分发验证码使用
 * */
import VerifySlide from "./Verify/VerifySlide.vue";
import { ref, toRefs } from "vue";

const props = defineProps({
    captchaType: {
        type: String,
        required: true
    },
    figure: {
        type: Number
    },
    arith: {
        type: Number
    },
    mode: {
        type: String,
        default: "pop"
    },
    vSpace: {
        type: Number
    },
    explain: {
        type: String
    },
    imgSize: {
        type: Object,
        default() {
            return {
                width: "310px",
                height: "155px"
            };
        }
    },
    blockSize: {
        type: Object
    },
    barSize: {
        type: Object
    },
    close: {
        type: Function
    }
});
const { captchaType, figure, arith, mode, vSpace, explain, imgSize, blockSize, barSize } = toRefs(props);
const clickShow = ref(false);
const verifyType = ref(undefined);
const componentType = ref(undefined);

const instance = <any>ref({});
const emit = defineEmits([
    "okCallback" //确认后回调
]);
const visible = ref(false);
/**
 * refresh
 * @description 刷新
 * */
const refresh = () => {
    console.log(instance.value);
    if (instance.value.refresh) {
        instance.value.refresh();
    }
};
const closeBox = () => {
    visible.value = false;
    refresh();
};
const show = () => {
    visible.value = true;
};
const success = (res: any) => {
    emit("okCallback", res);
};
defineExpose({
    show
});
</script>
