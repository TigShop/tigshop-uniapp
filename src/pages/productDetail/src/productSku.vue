<template>
    <view>
        <view @click="showDrawer">
            <slot></slot>
        </view>
        <tigpopup v-model:show="showDrawerRef" position="bottom" paddingBottom="0" height="60vh" @change="popupChange" :showClose="false" :showTitle="false">
            <view class="product-sku-box flex justify-between">
                <view class="product-info flex">
                    <view class="img">
                        <image lazy-load :src="imageFormat(skuProductImage)" class="slide-image" />
                    </view>
                    <view class="info">
                        <view class="price" >
                            <view class="now"><FormatPrice :priceData="productPrice"></FormatPrice></view>
                        </view>
                        <view class="name">
                            {{ productInfo.product_name }}
                        </view>

                    </view>
                </view>
                <view class="popup-close" @click="closeDrawer">
                    <uni-icons type="closeempty" size="24" style="color: #c8c9cc"></uni-icons>
                </view>
            </view>
            <view class="product-sku-info" v-if="attrList.length > 0">
                <view class="sku-item" v-for="(item, index) in attrList">
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
            <view class="product-sku-info pb100">
                <view class="num-item ">
                    <view class="tit">购买数量</view>
                    <view class="sku-num flex align-center">
                        <uni-number-box :min="1" :max="productStock" v-model="productNumber" :width="60" />
                        <view class="stock" >库存：<text class="green-txt" v-if="productStock > 50">充足</text> <text class="red-txt" v-else>仅剩{{productStock}}件</text> </view>
                    </view>
                </view>
            </view>
            <view class="footer">
                <view class="add_cart">
                    <productBuy :id="product_id" :skuId="skuId" :disabled="productStock == 0" :number="productNumber" @callback="addCart">
                        <view class="btn cart" :class="productStock===0?'disabled-div':''" >加入购物车</view>
                    </productBuy>
                    <productBuy
                        :id="product_id"
                        :skuId="skuId"
                        :disabled="productStock == 0"
                        :number="productNumber"
                        :isQuick="true"
                    >
                        <view class="btn redbtn buy-right "  :class="productStock===0?'disabled-div':''" @click="closeDrawer">立即购买</view>
                    </productBuy>
                </view>
            </view>
        </tigpopup>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { onLoad } from "@dcloudio/uni-app";
import { getProductSkuDetail } from "@/api/product/product";
import { imageFormat } from "@/utils/format";
import productBuy from './productBuy.vue'
import type { ProductItem, SkuList, PicList } from "@/types/product/product";
const emit = defineEmits(["change","addCart"]);
interface Props {
    modelValue: any,
    skuList: SkuList[],
    checkedValue: String[],
    picList: PicList[];
    productInfo: ProductItem;
    productPrice: string;
    productStock: number;
    productNumber: number;
}
const props = defineProps<Props>();
const product_id = ref<string>("");
const productNumber = ref<number>(1)
onLoad((option) => {
    if (option) {
        const { id } = option;

        if (id) {
            product_id.value = id;
        }
    }
});
const showDrawerRef = ref(false)
// 打开窗口
const showDrawer = () => {
	showDrawerRef.value = true;
    productNumber.value = props.productNumber;
}
// 关闭窗口
const closeDrawer = () => {
	showDrawerRef.value = false;
    updateSelectedValue()
}
// 加购成功
const addCart = () => {
	emit('addCart',true);
    closeDrawer()
}
// 属性列表
const attrList = ref(props.modelValue.spe || []);
const skuList = ref(props.skuList || []);
const checkedValue = ref(props.checkedValue || []);
const skuId = ref<number>(0);
const skuProductImage = ref<string>(props.productInfo.pic_url || "");
const updateSelectedValue = async () => {
    if (attrList.value.length > 0) {
        if (checkedValue.value.length == 0) {
            attrList.value.forEach((item:any) => {
                checkedValue.value.push(item.attr_list[0].attr_name + ':' + item.attr_list[0].attr_value)
            });
        }
        attrList.value.forEach((item:any, index:number) => {
            item.attr_list.forEach((value:any) => {
                if (checkedValue.value[index] && checkedValue.value[index] == value.attr_name + ':' + value.attr_value) {
                    value.checked = true
                    if(value.attr_pic){
                        skuProductImage.value = value.attr_pic
                    }
                } else {
                    value.checked = false
                }
                let skuValue = JSON.parse(JSON.stringify(checkedValue.value));
                skuValue[index] = value.attr_name + ':' + value.attr_value;
                let result = skuList.value.find((item:any) => item.sku_value == skuValue.join('|'));
                value.sku_stock = result ? result.sku_stock : 0;

            });
        });

        const selectedItem:any = skuList.value.find((item:any) => item.sku_value == checkedValue.value.join('|'));
        let skuStr = checkedValue.value.map((item:any) => item.split(":")[1]).join(" ");
        skuId.value = selectedItem.sku_id || 0;
        if(!showDrawerRef.value){
            emit('change', {
                sku_stock: selectedItem.sku_stock || 0,
                sku_id: selectedItem.sku_id || 0,
                sku_str: skuStr,
                productNumber:productNumber.value
            });
        }else{
            loadPrice(selectedItem.sku_id || 0)
        }
    } else {
        emit('change', {
            type:'null',
            productNumber:productNumber.value
        });
    }
}
updateSelectedValue()
const onChecked = (index:any, i:any) => {
    const item = attrList.value[index].attr_list[i];
    checkedValue.value[index] = item.attr_name + ':' + item.attr_value
    updateSelectedValue();
}

const productPrice = ref<string>("");
const productStock = ref<number>(0);
const popupChange = (e:any) => {
    showDrawerRef.value = e.show;
    if(!e.show){
        updateSelectedValue()
    }else{
        productPrice.value = props.productPrice;
        productStock.value = props.productStock;
    }
}
const loadPrice = async (skuId:any) => {
    try {
        const result = await getProductSkuDetail(product_id.value, {
            sku_id: skuId
        });
        productPrice.value = result.price;
        productStock.value = result.stock;
    } catch (error:any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    }
};

</script>
<style lang="scss" scoped>
.product-sku-box{
    padding: 30rpx 20rpx;
    .product-info{
        image{
            width: 180rpx;
            height: 180rpx;
            border-radius: 20rpx;
        }
        .info{
            margin-left: 20rpx;
            .price{
                color: $tig-color-primary;
                font-weight: bold;
                font-size: 36rpx;
                display: flex;
                align-items: center;
                line-height: 36rpx;
                margin-bottom: 10rpx;
                :deep(.util) {
                    font-size: 24rpx;
                    line-height: 36rpx;
                }
            }
            .name{
                color:$tig-color-grey;
                font-size: 24rpx;
            }
        }
    }
}
.product-sku-info {
    padding: 20rpx 20rpx 0 20rpx;
    box-sizing: border-box;
    .sku-item {
        margin-bottom: 30rpx;
        display: flex;
        flex-direction: column;
        gap: 20rpx;
        .tit {
            color: #999;
            width: 100rpx;
            height: 33rpx;
            line-height: 32rpx;
            font-size: 24rpx;
        }
        .sku-tag {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .tag {
                margin: 10rpx;
                background-color: #f7f8fa;
                border: 1px solid #f7f8fa;
                color: #333;
                height: 55rpx;
                line-height: 55rpx;
                padding: 0 20rpx;
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

    .num-item{
        display: flex;

        align-items: center;
        justify-content: space-between;
        .tit{
            color: #999;
            width: 100rpx;
            height: 33rpx;
            line-height: 32rpx;
            font-size: 24rpx;
        }

        .sku-num{
            :deep(.uni-numbox){
                border: 1rpx solid $tig-color-grey;
                border-radius: 10rpx;
            }
            :deep(.uni-numbox-btns){
                background-color: #fff !important;
                color: #333;
                border-radius: 10rpx;
            }
            :deep(.uni-numbox--text){
                font-weight: 500 !important;
            }
            :deep(.uni-numbox__value){
                background-color: #fff !important;
                color: #333;
                border-left: 1rpx solid $tig-color-grey;
                border-right: 1rpx solid $tig-color-grey;
            }
            .stock{
                font-size: 22rpx;
                margin-left: 30rpx;
                color:$tig-color-grey;
            }
            .green-txt{
                color:$tig-color-primary;
            }
            .red-txt{
                color:$tig-color-error;
            }
        }
    }
}
.footer{
    position: fixed;
    bottom: 0;
    left: 0;
    padding-bottom: 20rpx;
    z-index: 999;
    background-color: #FFFFFF;
    .add_cart{
        width:100%;
        display: flex;
        height: 80rpx;
        margin-left: 1vw;
        padding-bottom: 20rpx;

        .btn{
            width:49vw;

            height:80rpx;
            line-height: 80rpx;
            text-align: center;
            color:#fff;
            font-size:30rpx;
            font-weight:500;

        }
        .cart {
            background: #e1f4e3;
            border-radius: 100rpx 0 0 100rpx;
            color: $tig-color-primary;
        }
        .buy-right {
            background: $tig-color-primary;
            border-radius: 0 100rpx 100rpx 0;
        }
    }
}
.pb100{
    padding-bottom: 70rpx;
}
.disabled-div{
    background-color: #ddd; // 灰色背景
    color: #aaa; // 灰色字体
    opacity: 0.6; // 降低透明度
    pointer-events: none;
}
</style>
