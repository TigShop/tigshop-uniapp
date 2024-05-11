<template>
    <button class="btn-base" :loading="loading" :plain="plain" :disabled="disabled" :class="{ round: round, disabled: disabled, plain: plain, plainMainColor: plainMainColor }">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    round: {
        type: Boolean,
        default: true
    },
    size: {
        type: Number,
        default: 24
    },
    plain: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    plainMainColor: {
        type: Boolean,
        default: false
    },
    loading:{
        type: Boolean,
        default: false
    }
});
</script>

<style lang="scss" scoped>
.btn-base {
    overflow: hidden;
    padding: 12rpx 30rpx;
    font-size: v-bind("props.size + 'rpx'");
    background-color: $tig-color-primary;
    margin: 0;
    margin-right: 10rpx;
    color: #fff;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    &.round {
        border-radius: 40rpx;
    }
    &.disabled {
        background-color: #ccc;
        color: #999;
        cursor: not-allowed;
    }

    &.button-hover {
        opacity: 0.7;
    }

    .uni-button[loading]:before {
        height: v-bind("props.size + 'rpx'");
        width: v-bind("props.size + 'rpx'");
    }
}

.plain {
    background-color: transparent;
    color: #333;

    &.button-hover[plain] {
        color: rgba(53, 53, 53, 0.6);
        border-color: rgba(53, 53, 53, 0.6);
    }
    &.plainMainColor {
        border-color: $tig-color-primary;
        color: $tig-color-primary;
    }
}
</style>
