<template>
    <checkbox-group>
        <label @click="onCheckAll">
            <checkbox
                @click="onCheckAll"
                :style="{ transform: 'scale(' + checkedSize + ')' }"
                :checked="checked"
                :disabled="disabled"
                color="#fff"
                activeBackgroundColor="#ee0a24"
            />{{ checkedText }}
        </label>
    </checkbox-group>
</template>

<script setup lang="ts">
import { watch } from "vue";

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
    }
});
const emit = defineEmits(["update:checked", "change"]);
const onCheckAll = () => {
    console.log(props.checked);
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
