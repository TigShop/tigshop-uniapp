<template>
    <view>
        <view @click="showDrawer">
            <slot></slot>
        </view>
        <tigpopup v-model:show="showDrawerRef" position="bottom" paddingBottom="0">
            <view class="product-sku-info" v-if="attrList.length > 0">
                <view class="sku-item flex align-center" v-for="(item, index) in attrList">
                    <view class="tit">
                        {{ item.attr_name }}
                    </view>
                    <view class="sku-tag flex">
                        <template v-for="(value, i) in item.attr_list">
                            <view :class="'tag ' + (value.checked ? 'checked ' : '' + (value.sku_stock == 0 ? 'disabled' : ''))" @click="onChecked(index, i)">
                                {{ value.attr_value }}
                            </view>
                        </template>
                    </view>
                </view>
            </view>
        </tigpopup>
    </view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { cloneDeep } from 'lodash';
import { onLoad } from "@dcloudio/uni-app";
const emit = defineEmits(["change"]);

const props = defineProps({
    modelValue: {
        type: Object,
        default: {}
    },
    skuList: {
        type: Array
    },
    checkedValue: {
        type: Array
    }
})
const showDrawerRef = ref(false)
// 打开窗口
const showDrawer = () => {
	showDrawerRef.value = true;
}
// 关闭窗口
const closeDrawer = () => {
	showDrawerRef.value = false;
}
// 属性列表
const attrList = ref(props.modelValue.spe);
const skuList = ref(props.skuList);
const checkedValue = ref(props.checkedValue);
const updateSelectedValue = () => {
    if (attrList.value.length > 0) {
        if (checkedValue.value.length == 0) {
            attrList.value.forEach(item => {
                checkedValue.value.push(item.attr_list[0].attr_name + ':' + item.attr_list[0].attr_value)
            });
        }
        attrList.value.forEach((item, index) => {
            item.attr_list.forEach(value => {
                if (checkedValue.value[index] && checkedValue.value[index] == value.attr_name + ':' + value.attr_value) {
                    value.checked = true
                } else {
                    value.checked = false
                }
                let skuValue = cloneDeep(checkedValue.value);
                skuValue[index] = value.attr_name + ':' + value.attr_value;
                let result = skuList.value.find(item => item.sku_value == skuValue.join('|'));
                value.sku_stock = result ? result.sku_stock : 0;
            });
        });
        const selectedItem = skuList.value.find(item => item.sku_value == checkedValue.value.join('|'));
        let skuStr = checkedValue.value.map(item => item.split(":")[1]).join(" ");
        emit('change', {
            sku_stock: selectedItem.sku_stock || 0,
            sku_id: selectedItem.sku_id || 0,
            sku_str: skuStr
        });
    } else {
        emit('change', null);
    }
}
updateSelectedValue()
const onChecked = (index, i) => {
    const item = attrList.value[index].attr_list[i];
    checkedValue.value[index] = item.attr_name + ':' + item.attr_value
    updateSelectedValue();
}

</script>
<style lang="scss" scoped>
.product-sku-info {
    padding: 0px 1px 0 0;

    .sku-item {
        margin-bottom: 15px;

        .tit {
            color: #999;
            width: 100rpx;
            height: 33rpx;
            line-height: 32rpx;
            font-size: 24rpx;
        }

        .sku-tag {
            .tag {
                margin-right: 30rpx;
                background-color: #FFFFFF;
                border: 1rpx solid #E7E7E7;
                color: #333;
                height: 55rpx;
                line-height: 55rpx;
                padding: 0 12rpx;
                cursor: pointer;
                min-width: 60rpx;
                text-align: center;
                position: relative;
                border-radius: 10rpx;
                font-size: 24rpx;
            }

            .checked {
                border-color: $tig-color-primary;
                color: $tig-color-primary;
            }

            .disabled {
                border: 1px dashed #eee;
                color: #999;
            }
        }

    }
}
</style>
