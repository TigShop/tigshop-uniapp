<template>
    <image class="base-image" :src="srcData" :mode="mode" @error="handleError"></image>
</template>

<script setup lang="ts">
import { imageFormat } from "@/utils/format";
import { ref, watch } from "vue";
const props = defineProps({
    src: {
        type: String,
        default: "",
        required: true
    },
    mode: {
        type: String,
        default: ""
    }
});
const emit = defineEmits(["update:src"]);
const srcData = ref("");
watch(
    () => props.src,
    (newVal) => {
        if (!newVal) {
            // #ifndef MP-WEIXIN
            return emit("update:src", "/src/static/images/common/empty-img-bg3.png");
            // #endif

            // #ifdef MP-WEIXIN
            return emit("update:src", "/static/images/common/empty-img-bg3.png");
            // #endif
        }
        if (newVal.includes("/src")) {
            srcData.value = newVal;
        } else {
            srcData.value = imageFormat(newVal || '');
        }
    },
    {
        immediate: true
    }
);

const handleError = (e: Event) => {
    console.log("handleError", e);
    // #ifndef MP-WEIXIN
    emit("update:src", "/src/static/images/common/empty-img-bg3.png");
    // #endif

    // #ifdef MP-WEIXIN
    emit("update:src", "/static/images/common/empty-img-bg3.png");
    // #endif
};
</script>

<style lang="scss" scoped>
.base-image {
    width: 100%;
    height: 100%;
}
</style>
