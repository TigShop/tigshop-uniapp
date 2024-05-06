<template>
    <checkbox-group>
        <label>
            <checkbox :style="{transform:'scale('+checkedSize+')'}" :checked="checked" :disabled="disabled" color="#fff" activeBackgroundColor="#ee0a24"  @click="onCheckAll" />{{checkedText}}
        </label>
    </checkbox-group>
</template>

<script setup lang="ts">
const props = defineProps({
    checkedText: {
        type: String,
        default: ''
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
    }
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
</style>
