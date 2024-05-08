<template>
    <view class="save-bottom-box safe-padding">
        <view style="height: 100%;width: 100%;">
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
const props = defineProps({
    height: {
        type: [Number, String],
        default: 0,
        required: true
    },
    backgroundColor: {
        type: String,
        default: "none"
    }
});
</script>

<style lang="scss" scoped>
.save-bottom-box {
    width: 100%;
    height: v-bind("props.height + 'rpx'");
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: v-bind("props.backgroundColor");
    border-top: 1px solid #eee;
}
</style>
