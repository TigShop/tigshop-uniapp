<template>
    <view>
        <uni-popup ref="popup" type="bottom" :safe-area="false" style="z-index: 2000" border-radius="10px 10px 0 0" @change="getPopupStatus">
            <view
                class="popup-container"
                :class="{
                    'popup-center': position === 'center',
                    'popup-bottom': position === 'bottom',
                    'popup-right': position === 'right',
                    'popup-left': position === 'lefCt'
                }"
            >
                <slot name="popupClose">
                    <view v-if="showClose" class="popup-close" @click="$emit('update:show', false)">
                        <uni-icons type="closeempty" size="24" style="color: #c8c9cc"></uni-icons>
                    </view>
                </slot>

                <view class="popup-title" v-if="showTitle">{{ title }} </view>
                <view class="popup-content">
                    <slot></slot>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
        required: true
    },
    showClose: {
        type: Boolean,
        default: true
    },
    backgroundColor: {
        type: String,
        default: "#fff"
    },
    showTitle: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: ""
    },
    height: {
        type: String,
        default: "50vh"
    },
    width: {
        type: String,
        default: "30vw"
    },
    position: {
        type: String,
        default: "bottom"
    }
});
const emit = defineEmits(["update:show"]);
const popup = ref();
watch(
    () => props.show,
    (newVal) => {
        if (newVal) {
            nextTick(() => {
                popup.value.open(props.position);
            });
        } else {
            popup.value.close();
        }
    }
);
const getPopupStatus = (e: any) => {
    if (!e.show) emit("update:show", false);
};
</script>

<style lang="scss" scoped>
.popup-container {
    box-sizing: border-box;
    position: relative;
    background-color: v-bind("props.backgroundColor");
    overflow: hidden;
    .popup-close {
        position: absolute;
        top: 26rpx;
        right: 26rpx;
    }

    &.popup-bottom {
        border-top-left-radius: 30rpx;
        border-top-right-radius: 30rpx;
        height: v-bind("props.height");
    }

    &.popup-center {
        border-radius: 30rpx;
        height: v-bind("props.height");
        width: v-bind("props.width");
    }
    &.popup-left {
        width: v-bind("props.width");
        height: 100vh;
    }
    &.popup-right {
        width: v-bind("props.width");
        height: 100vh;
    }
}

.popup-title {
    font-size: 32rpx;
    font-weight: bold;
    text-align: left;
    height: 123rpx;
    line-height: 123rpx;
    padding-left: 30rpx;
    background: #fff;
}

.popup-content {
    top: 123rpx;
    overflow: hidden;
    overflow-y: auto;
    height: calc(100% - 123px);
}
</style>
