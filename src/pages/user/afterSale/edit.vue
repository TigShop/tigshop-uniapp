<template>
    <view class="after-sale" v-if="Object.keys(infoData).length">
        <view class="after-sale-product">
            <block v-for="item in infoData.list" :key="item.item_id">
                <view class="product-card-item">
                    <view class="product-card-item-left">
                        <view class="left-img">
                            <tigImage v-model:src="item.pic_thumb"></tigImage>
                        </view>
                    </view>
                    <view class="product-card-item-right">
                        <view class="right-title">
                            <text>{{ item.product_name }}</text>
                        </view>
                        <view class="right-price">
                            <FormatPrice class="right-price-pricenum" :priceData="item.price"></FormatPrice>
                            <view class="right-price-quantity">x {{ item.quantity }}</view>
                        </view>
                    </view>
                    <view class="btn-box">
                        <view class="btn-box-content">
                            <text class="btn-box-content-text">可退换数量{{ item.quantity }}</text>
                            <uni-number-box :max="item.quantity" v-model="item.number" />
                        </view>
                    </view>
                </view>
            </block>
        </view>

        <view class="after-sale-form">
            <uni-forms ref="formRef" :modelValue="form" label-width="170rpx">
                <uni-forms-item label="退款方式" name="aftersale_type">
                    <picker style="height: 100%" @change="getAftersaleType" :value="aftersaleTypeIndex" range-key="label" :range="aftersale_type_list">
                        <view class="form-item-content">
                            <view>
                                <text class="form-item-value" v-if="aftersaleTypeIndex !== null">{{ aftersale_type_list[aftersaleTypeIndex!].label }}</text>
                                <text class="form-item-text" v-else>请选择</text>
                            </view>
                            <view class="form-item-icon">
                                <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
                            </view>
                        </view>
                    </picker>
                </uni-forms-item>
                <uni-forms-item label="退款原因" name="aftersale_reason">
                    <picker @change="getAftersaleReason" :value="aftersaleReasonIndex" :range="aftersaleReasonList">
                        <view class="form-item-content">
                            <view>
                                <text class="form-item-value" v-if="form.aftersale_reason">{{ form.aftersale_reason }}</text>
                                <text class="form-item-text" v-else>请选择</text>
                            </view>
                            <view class="form-item-icon">
                                <uni-icons type="arrowright" size="16" color="#999"></uni-icons>
                            </view>
                        </view>
                    </picker>
                </uni-forms-item>
                <uni-forms-item label="问题描述" name="description">
                    <uni-easyinput
                        type="textarea"
                        primaryColor="rgb(192, 196, 204)"
                        maxlength="100"
                        :inputBorder="false"
                        v-model="form.description"
                        autoHeight
                        placeholder="最多100字"
                        placeholderStyle="font-size: 26rpx;text-align: end;"
                    />
                </uni-forms-item>
                <uni-forms-item label="上传凭证" name="description">
                    <uni-file-picker
                        :auto-upload="false"
                        v-model="fileLists"
                        @select="handlePicSelect"
                        @delete="handlePicDelete"
                        limit="5"
                        title="最多选择5张图片"
                    >
                        <uni-icons type="camera" size="30" color="#cccccc"></uni-icons>
                    </uni-file-picker>
                </uni-forms-item>
            </uni-forms>
        </view>
        <saveBottomBox :height="90" backgroundColor="#fff">
            <view class="after-sale-btn-box">
                <tigButton style="width: 100%; height: 100%" @click="handleSave"> 提交 </tigButton>
            </view>
        </saveBottomBox>
    </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive } from "vue";
import { getAftersalesEdit, updateAfterSales, getAftersalesConfig } from "@/api/user/afterSale";
import type { afterSaleEditResponse } from "@/types/user/afterSale";
import { imageFormat } from "@/utils/format";
import indexConfig from "@/config/index.config";
import saveBottomBox from "@/components/saveBottomBox/index.vue";
const orderId = ref<number | null>();
const itemId = ref<number | null>();
onLoad((options) => {
    if (options && options.order_id) {
        orderId.value = options.order_id;
        itemId.value = options.item_id;
        __getAftersalesEdit();
        __getAftersalesConfig();
    }
});

const infoData = ref<afterSaleEditResponse>({} as afterSaleEditResponse);
const aftersale_type_list = ref([
    {
        value: 1,
        label: "仅退款"
    },
    {
        value: 2,
        label: "退货退款"
    }
]);
const refundAmountMax = ref<number>(0);
const __getAftersalesEdit = async () => {
    uni.showLoading({
        title: "加载中"
    });
    try {
        if (orderId.value) {
            const result = await getAftersalesEdit({
                item_id: itemId.value,
                order_id: orderId.value
            });
            infoData.value = result;
            infoData.value.list.forEach((item) => {
                item.number = item.quantity;
            });
            refundAmountMax.value = Number(infoData.value.order.paid_amount);
        }
    } catch (error) {
        console.error(error);
    } finally {
        uni.hideLoading();
    }
};

const aftersaleReasonList = ref<any[]>([]);
const __getAftersalesConfig = async () => {
    try {
        const result = await getAftersalesConfig();
        aftersaleReasonList.value = result.aftersale_reason;
        aftersale_type_list.value = Object.keys(result.aftersale_type).map((key) => {
            return {
                value: Number(key),
                label: result.aftersale_type[key]
            };
        });
    } catch (error) {
        console.error(error);
    }
};

interface Iform {
    items: Item[];
    pics: any[];
    order_id: number;
    aftersale_type: number;
    aftersale_reason: string;
    description: string;
}

interface Item {
    order_item_id: number;
    number: number;
}
const form = reactive<Iform>({
    items: [],
    pics: [],
    order_id: 0,
    aftersale_type: 0,
    aftersale_reason: "",
    description: ""
});

interface FileLists {
    name: string;
    extname: string;
    url: string;
}
const fileLists = ref<FileLists[]>([]);
const aftersaleTypeIndex = ref<null | number>(null);

const getAftersaleType = (e: any) => {
    aftersaleTypeIndex.value = e.detail.value;
    form.aftersale_type = aftersale_type_list.value[aftersaleTypeIndex.value!].value;
};

const aftersaleReasonIndex = ref<null | number>(null);
const getAftersaleReason = (e: any) => {
    aftersaleReasonIndex.value = e.detail.value;
    form.aftersale_reason = aftersaleReasonList.value[aftersaleReasonIndex.value!];
};

const handlePicSelect = (e: any) => {
    // 兼容多端
    if (e.tempFilePaths.length === 1) {
        uploadFile(e.tempFilePaths[0]);
    } else {
        e.tempFilePaths.forEach((item: string) => {
            uploadFile(item);
        });
    }
};

const uploadFile = (filePath: any) => {
    let name, extname, url;
    uni.uploadFile({
        url: indexConfig.baseUrl + indexConfig.requestUrlPrefix + "user/user/upload_img", //仅为示例，非真实的接口地址
        filePath,
        header: {
            Authorization: uni.getStorageSync("token")
        },
        success: (uploadFileRes: any) => {
            uni.hideLoading();
            const { data } = JSON.parse(uploadFileRes.data);
            name = data.pic_name;
            extname = data.pic_url.split(".")[1];
            url = imageFormat(data.pic_thumb);
            fileLists.value.push({
                name,
                extname,
                url
            });
            console.log("fileLists", fileLists.value);
            uni.showToast({
                title: "图片上传成功"
            });
        },
        fail: (error) => {
            uni.hideLoading();

            uni.showToast({
                title: "图片上传失败",
                icon: "none"
            });
        }
    });
};

const handlePicDelete = (e: any) => {
    fileLists.value.splice(e.index, 1);
};

const handleSave = async () => {
    if (form.aftersale_type === 0)
        return uni.showToast({
            title: "请选择退款方式",
            icon: "none"
        });
    if (form.aftersale_reason === "")
        return uni.showToast({
            title: "请选择退款原因",
            icon: "none"
        });
    if (form.description === "")
        return uni.showToast({
            title: "请填写问题描述",
            icon: "none"
        });

    try {
        form.pics = fileLists.value.map((item) => item.url);
        form.order_id = infoData.value.order.order_id;
        infoData.value.list.forEach((item: any) => {
            form.items.push({ order_item_id: item.item_id, number: item.number });
        });
        console.log("form", form);

        const result = await updateAfterSales(form);
        uni.showToast({
            title: "提交成功"
        });
        setTimeout(() => {
            uni.redirectTo({
                url: "/pages/user/afterSale/list"
            });
        }, 1500);
    } catch (error: any) {
        console.error(error);
        uni.showToast({
            title: error.message,
            icon: "none"
        });
    }
};
</script>

<style lang="scss" scoped>
.after-sale {
    .after-sale-product {
        background-color: #fff;
        border-radius: 0 0 20rpx 20rpx;
        padding: 20rpx;
        margin-bottom: 20rpx;

        .product-card-item {
            display: flex;
            position: relative;
            margin-bottom: 25rpx;
            &:last-child {
                margin-bottom: 0;
            }

            .product-card-item-left {
                .left-img {
                    width: 160rpx;
                    height: 160rpx;
                    border-radius: 10rpx;
                    overflow: hidden;
                    margin-right: 20rpx;
                    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
                }
            }

            .product-card-item-right {
                font-size: 24rpx;

                .right-title {
                    font-weight: bold;
                }

                .right-price {
                    display: flex;
                    font-size: 28rpx;
                    padding-top: 20rpx;
                    .right-price-pricenum {
                        font-weight: bold;
                        color: $tig-color-primary;
                        padding-right: 10rpx;
                        :deep(.util) {
                            font-size: 22rpx;
                            font-weight: normal;
                        }
                    }

                    .right-price-quantity {
                        color: #999;
                    }
                }
            }

            .btn-box {
                position: absolute;
                right: 0;
                bottom: 0;

                .btn-box-content {
                    display: flex;
                    // align-items: center;
                    .btn-box-content-text {
                        font-size: 24rpx;
                        color: #999;
                        display: flex;
                        align-items: end;
                        padding-right: 10rpx;
                    }
                }
            }
        }
    }

    .after-sale-form {
        background-color: #fff;
        .form-item-content {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 72rpx;

            .form-item-icon {
                padding-left: 15rpx;
            }

            .form-item-text {
                color: #969799;
            }
        }

        :deep(.uni-easyinput__content-textarea) {
            min-height: 50rpx;
            height: 50rpx;
        }

        :deep(.uni-input-input) {
            text-align: end;
        }

        .hint {
            background-color: #f5f5f5;
            padding: 10rpx 25rpx;
            color: #9c9c9c;
            font-size: 25rpx;
        }

        :deep(.uni-file-picker__header) {
            padding-top: 17rpx;

            .file-title {
                color: #9c9c9c;
            }
        }
    }
    :deep(.special-item) {
        &.uni-forms-item {
            border-bottom: none;
            margin-bottom: 0;
        }
    }
    .uni-forms-item {
        margin: 10rpx 25rpx 10rpx 25rpx;
        border-bottom: 1px solid #eee;
        &:last-child {
            border-bottom: none;
            padding-bottom: 20rpx;
        }
    }

    :deep(.file-picker__box) {
        padding-top: 30%;
    }
    :deep(.file-picker__progress) {
        display: none;
    }

    :deep(.icon-del-box) {
        width: 40rpx;
        height: 40rpx;
    }

    .after-sale-btn-box {
        box-sizing: border-box;
        height: 100%;
        padding: 15rpx 20rpx;
    }
    :deep(.uni-file-picker__header) {
        padding-right: 15rpx;
    }
}
</style>
