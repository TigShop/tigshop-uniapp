<template>
    <view :class="'module-ad-con module-image_hotarea'">
        <view class="module-ad-content">
            <view :style="styleFormat.backgroundColor + styleFormat.height"></view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    }
});
const styleFormat = computed(() => {
    return {
        backgroundColor: `background-color: ${props.module.background_color};`,
        height: `height: ${props.module.blank_height}px;`
    };
});

</script>
<style>
@import '../../../static/css/modules.css';
/*空白*/
.white-blank-warp .white-blank-con {
    width: 100%;
    height: 60rpx;
    min-height: 20rpx;
}
</style>
