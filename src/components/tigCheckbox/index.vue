<template>
    <checkbox-group>
        <checkbox :checked="checked" color="#fff" activeBackgroundColor="#ee0a24"  style="padding: 0 10rpx;" @click="onCheckAll" />
    </checkbox-group>
</template>

<script setup lang="ts">
const props = defineProps({
    checked: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits(["update:checked", 'change']);

const onCheckAll = () => {
    emit('update:checked', !props.checked)
    emit('change')
};
</script>

<style lang="scss" scoped>
:deep(.uni-checkbox-input) {
    padding: 6rpx;
}
</style>
