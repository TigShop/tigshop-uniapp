<template>
    <view class="certification safe-padding" v-if="Object.keys(formState).length > 0">
        <view class="tip-box">
            <view class="tig-title"> 温馨提示 </view>
            <view>首次开具增值税专用发票，请添加资质后并提交。</view>
            <view>我们会在一个工作日内完成审核工作。</view>
            <view> 1.补发流程： <text class="specaial-text">资质未审核通过-登录会员中心->增票资质->填写资质信息->提交。</text> </view>
            <view> 2. 资质审核结果查询时间：<text class="specaial-text">资质上传一到两个工作日后即可查询。</text></view>
            <view> 3. 注意有效增值税专用发票开票资质仅为一个。</view>
        </view>
        <view class="status-box">
            <view class="status-text">
                <view> 您的增票资质状态：</view>
                <view class="specaial-text">{{ formatText }}</view>
            </view>
        </view>
        <view class="certification-content">
            <view v-if="showEdit" class="content-title"> 填写增票资质信息<text class="specaial-text">（所有信息均为必填）</text> </view>
            <view v-else-if="!showEdit && Object.keys(formState).length > 0" class="content-title"> 增票资质信息</view>

            <view>
                <block v-if="showEdit">
                    <uni-forms ref="formRef" :modelValue="formState" :rules="rules" label-width="180rpx">
                        <uni-forms-item label="单位名称" name="company_name">
                            <uni-easyinput
                                primaryColor="rgb(192, 196, 204)"
                                :inputBorder="false"
                                placeholder="请输入单位名称"
                                v-model="formState.company_name"
                            />
                        </uni-forms-item>
                        <uni-forms-item label="纳税人识别码" name="company_code">
                            <uni-easyinput
                                primaryColor="rgb(192, 196, 204)"
                                :inputBorder="false"
                                placeholder="请输入纳税人识别码"
                                v-model="formState.company_code"
                            />
                        </uni-forms-item>
                        <uni-forms-item label="注册地址" name="company_address">
                            <uni-easyinput
                                primaryColor="rgb(192, 196, 204)"
                                :inputBorder="false"
                                placeholder="请输入注册地址"
                                v-model="formState.company_address"
                            />
                        </uni-forms-item>
                        <uni-forms-item label="注册电话" name="company_phone">
                            <uni-easyinput
                                primaryColor="rgb(192, 196, 204)"
                                :inputBorder="false"
                                placeholder="请输入注册电话"
                                v-model="formState.company_phone"
                            />
                        </uni-forms-item>
                        <uni-forms-item label="开户银行" name="company_bank">
                            <uni-easyinput
                                primaryColor="rgb(192, 196, 204)"
                                :inputBorder="false"
                                placeholder="请输入开户银行"
                                v-model="formState.company_bank"
                            />
                        </uni-forms-item>
                        <uni-forms-item label="开户银行" name="company_account">
                            <uni-easyinput
                                primaryColor="rgb(192, 196, 204)"
                                :inputBorder="false"
                                placeholder="请输入银行账户"
                                v-model="formState.company_account"
                            />
                        </uni-forms-item>
                    </uni-forms>
                    <view class="agreement-box">
                        <tigCheckbox v-model:checked="is_confirm" :checkedSize="0.7" checked-color="#ee0a24"></tigCheckbox>
                        我已阅读并同意<text class="specaial-text">《增票资质确认书》</text>
                    </view>
                </block>
                <biock v-if="formState.status === 0 && !showEdit">
                    <view class="empty-text">暂无增票资质信息!</view>
                </biock>
                <block v-else-if="!showEdit && Object.keys(formState).length > 0">
                    <uni-forms ref="formRef" :class="{ readonly: !showEdit }" :modelValue="formState" :rules="rules" label-width="180rpx">
                        <uni-forms-item label="单位名称">
                            <view class="disabled-text">
                                {{ formState.company_name }}
                            </view>
                        </uni-forms-item>
                        <uni-forms-item label="纳税人识别码">
                            <view class="disabled-text">
                                {{ formState.company_code }}
                            </view>
                        </uni-forms-item>
                        <uni-forms-item label="注册地址">
                            <view class="disabled-text">
                                {{ formState.company_address }}
                            </view>
                        </uni-forms-item>
                        <uni-forms-item label="注册电话">
                            <view class="disabled-text">
                                {{ formState.company_phone }}
                            </view>
                        </uni-forms-item>
                        <uni-forms-item label="开户银行">
                            <view class="disabled-text">
                                {{ formState.company_bank }}
                            </view>
                        </uni-forms-item>
                        <uni-forms-item label="银行账户">
                            <view class="disabled-text">
                                {{ formState.company_account }}
                            </view>
                        </uni-forms-item>
                    </uni-forms>
                </block>
            </view>
        </view>

        <saveBottomBox height="110" backgroundColor="#fff" v-if="showEdit">
            <view class="btn-box">
                <tigButton plain style="width: 100%; height: 70rpx" @click="showEdit = false"> 取消</tigButton>
                <tigButton style="width: 100%; height: 70rpx" @click="onSubmit"> 提交</tigButton>
            </view>
        </saveBottomBox>
        <saveBottomBox height="110" backgroundColor="#fff" v-if="!showEdit">
            <view class="btn-box">
                <tigButton style="width: 100%; height: 70rpx" @click="handleShowEdit"> {{ formState.status === 0 ? "添加增票资质" : "修改并重新审核" }}</tigButton>
            </view>
        </saveBottomBox>
    </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getUserInvoice, updateUserInvoice } from "@/api/user/invoiceManagemen";
import type { UserInvoiceFormState } from "@/types/user/invoiceManagement";
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import tigCheckbox from "@/components/tigCheckbox/index.vue";
const formState = ref<UserInvoiceFormState>({});
const rules = {
    company_name: {
        rules: [{ required: true, errorMessage: "单位名称不能为空!" }]
    },
    company_code: {
        rules: [{ required: true, errorMessage: "纳税人识别码不能为空!" }]
    },
    company_address: {
        rules: [{ required: true, errorMessage: "注册地址不能为空!" }]
    },
    company_phone: {
        rules: [{ required: true, errorMessage: "注册电话不能为空!" }]
    },
    company_bank: {
        rules: [{ required: true, errorMessage: "开户银行不能为空!" }]
    },
    company_account: {
        rules: [{ required: true, errorMessage: "银行账户不能为空!" }]
    }
};
const is_confirm = ref(false);
const showEdit = ref(false);
const __getUserInvoice = async () => {
    try {
        const result = await getUserInvoice();
        Object.assign(formState.value, result.item);
    } catch (error: any) {
    } finally {
    }
};

onMounted(() => {
    __getUserInvoice();
});

const handleShowEdit = () => {
    showEdit.value = true;
};

const formatText = computed(() => {
    switch (formState.value.status) {
        case 0:
            return "未申请专用发票";
        case 1:
            return "审核通过";
        case 2:
            return "已申请，待审核";
        case 3:
            return "审核未通过";
        default:
            return "";
    }
});

const formRef = ref();
const onSubmit = () => {
    formRef.value
        .validate()
        .then((res: any) => {
            if (!is_confirm.value)
                return uni.showToast({
                    title: "需要确认勾选才能继续",
                    icon: "none"
                });
            __updateUserInvoice();
        })
        .catch((err: any) => {
            console.log("表单错误信息：", err);
        });
};

const __updateUserInvoice = async () => {
    try {
        formState.value.is_confirm = is_confirm.value ? 1 : 0;
        formState.value.title_type = 2;
        formState.value.invoice_type = 1;
        formState.value.is_add = formState.value.status == 0 ? 1 : 0;
        const result = await updateUserInvoice({ id: formState.value.invoice_id, ...formState.value });
        uni.showToast({
            title: "提交成功",
            icon: "none"
        });
        __getUserInvoice();
        showEdit.value = false;
    } catch (error: any) {
    } finally {
    }
};
</script>

<style lang="scss" scoped>
.certification {
    margin-bottom: 110rpx;

    .tip-box {
        padding: 20rpx;
        font-size: 26rpx;
        line-height: 45rpx;
        background-color: #fff;
        border-radius: 20rpx;
        .tig-title {
            padding: 10rpx 0;
        }
    }

    .status-box {
        background: none repeat scroll 0 0 #fffdee;
        border: 1px solid #edd28b;
        padding: 10px;
        margin-top: 20rpx;
        font-size: 28rpx;

        .status-text {
            display: flex;
            padding-bottom: 15rpx;
            &:last-child {
                padding-bottom: 0;
            }
        }
    }

    .empty-text {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 40rpx 0;
    }
}

.specaial-text {
    color: $tig-color-primary;
}

.disabled-text {
    height: 100%;
    line-height: 68rpx;
    font-size: 24rpx;
    width: 450rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.certification-content {
    padding: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;
    margin-top: 20rpx;
    padding-bottom: 5rpx;

    .content-title {
        font-weight: bold;
        color: #666;
        padding: 15rpx 0;
    }
    .agreement-box {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15rpx 0;
        font-size: 28rpx;
    }
}

.btn-box {
    padding: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

:deep(.uni-forms-item) {
    margin-bottom: 30rpx;
}

.readonly {
    :deep(.uni-forms-item) {
        margin-bottom: 5rpx;
    }
}
:deep(.uni-forms-item__error) {
    top: 90%;
    left: 18rpx;
}
:deep(.uni-easyinput__placeholder-class) {
    font-size: 26rpx;
}
:deep(.uni-forms-item__label) {
    font-size: 26rpx;
}
</style>
