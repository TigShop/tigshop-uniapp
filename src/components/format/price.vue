<template>
    <view class="price-content align-bottom">
        <view
            v-if="props.currencyFormat"
            :class="{ 'align-top': currencyAlignment === 'top', 'align-bottom': currencyAlignment === 'bottom' }"
            :style="hasContent(currencyStyle) ? currencyStyle : fontStyle"
            class="util"
        >
            {{ currency }}
        </view>
        <view class="num" :style="fontStyle">{{ price.integer }}</view>
        <view class="num decimal" :style="hasContent(decimalsStyle) ? decimalsStyle : fontStyle">{{ price.decimals }}</view>
    </view>
</template>
<script lang="ts" setup>
import { computed } from "vue";
// import { useConfigStore } from "@/store/config";

const props = defineProps({
    modelValue: [String, Number],
    priceData: [String, Number],
    currencyAlignment: { type: String, default: "bottom" },
    currencyFormat: { type: Boolean, default: true },
    currencyStyle: {
        type: Object,
        default: {}
    },
    fontStyle: {
        type: Object,
        default: {}
    },
    decimalsStyle: {
        type: Object,
        default: {}
    }
});
const hasContent = (styleObj: any) => {
    return styleObj && Object.keys(styleObj).length > 0;
};

// const config = useConfigStore();
// const currency = config.get("dollar_sign") ?? "<span class='util'>¥</span>";
const currency = "¥";
const price = computed(() => {
    const num = typeof props.priceData === "number" ? String(props.priceData) : props.priceData;
    if (!num) {
        return {
            integer: "0",
            decimals: ".00"
        };
    }
    // 检测小数点和后续数字
    const match = num.match(/^(\d+)(\.\d+)?$/);
    if (match) {
        const integerPart = match[1] || "0";
        const decimalPart = match[2] || ".00";
        return {
            integer: integerPart,
            decimals: decimalPart
        };
    } else {
        return {
            integer: "0",
            decimals: ".00"
        };
    }
});
</script>
<style lang="scss" scoped>
.price-content {
    display: inline-flex;
    align-items: stretch; /* 子元素高度拉伸以匹配最高的子元素 */

    .util {
        margin-right: 2px;
    }

    .align-top {
        display: flex; /* 使用 Flexbox 布局 */
        align-items: flex-start; /* 使所有子元素沿底部对齐 */
    }

    .align-bottom {
        display: flex; /* 使用 Flexbox 布局 */
        align-items: flex-end; /* 使所有子元素沿底部对齐 */
    }
}
</style>
