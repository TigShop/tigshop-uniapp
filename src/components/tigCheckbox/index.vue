<template>
    <label class="check" @click="onCheckAll">
        <up-checkbox @change="onCheckAll" :shape="shape" :usedAlone="true" :disabled="disabled" :activeColor="checkedColor" :checked="checked"> </up-checkbox>
        {{ checkedText }}
    </label>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store/theme";
import { computed } from "vue";

const props = defineProps({
    checkedText: {
        type: String,
        default: ""
    },
    checkedSize: {
        type: Number,
        default: 0.8
    },
    checked: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    shape: {
        type: String,
        default: "circle"
    }
});
const themeStore = useThemeStore();
const checkedColor = computed(() => {
    return themeStore.themeStyle["--general"] || "#ee0a24";
});

const emit = defineEmits(["update:checked", "change"]);
const onCheckAll = () => {
    if (props.disabled) return;
    emit("update:checked", !props.checked);
    emit("change");
};
</script>

<style lang="scss" scoped>
:deep(.uni-checkbox-input) {
    padding: 6rpx;
}
.check{
    display: flex;
    align-items: center;

}
</style>
