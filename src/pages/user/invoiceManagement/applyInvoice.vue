<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="invoice-popup-content">
            <view class="invoice-typemenu">
                <view class="invoice-explain">
                    我公司依法开具发票，请您按照税法规定使用发票。根据现行税收政策，部分公司提供数电票,
                    数电（专用发票）法律效力与现有增值税专用发票相同;如商品由第三方卖家销售，发票类型和内容将由该卖家决定，发票由卖家开具并提供。如您为企业采购，需要多单合并开具或批量提交发票可注册企业用户；<text
                        class="main-color"
                        >使用礼品卡支付部分的金额，不支持开发票</text
                    >
                </view>
                <view class="invoice-typemenu-item" :class="{ active: formState.invoice_type === 1 }" @click="handleInvoiceType(1)">普通发票</view>
                <view class="invoice-typemenu-item" :class="{ active: formState.invoice_type === 2 }" @click="handleInvoiceType(2)">增值税专用发票</view>
            </view>

            <view class="invoice-formState">
                <uni-forms ref="formRef" :modelValue="formState" :rules="rules" label-width="170rpx">
                    <block v-if="formState.invoice_type === 1">
                        <uni-forms-item label="发票抬头" name="name">
                            <view class="item-layout">
                                <radio-group @change="radioChange">
                                    <radio
                                        value="1"
                                        activeBackgroundColor="#ee0a24"
                                        :checked="formState.title_type == 1"
                                        style="margin-right: 20rpx; transform: scale(0.9)"
                                        >个人</radio
                                    >
                                    <radio value="2" :checked="formState.title_type == 2" activeBackgroundColor="#ee0a24" style="transform: scale(0.9)"
                                        >企业</radio
                                    >
                                </radio-group>
                            </view>
                        </uni-forms-item>
                        <block v-if="formState.title_type == 1">
                            <uni-forms-item label="个人名称" name="company_name" :rules="[{ required: true, errorMessage: '个人名称不能为空' }]">
                                <uni-easyinput
                                    primaryColor="rgb(192, 196, 204)"
                                    :inputBorder="false"
                                    v-model="formState.company_name"
                                    placeholder="请输入个人名称"
                                />
                            </uni-forms-item>
                        </block>
                        <block v-else>
                            <uni-forms-item label="企业名称" name="company_name" :rules="[{ required: true, errorMessage: '企业名称不能为空' }]">
                                <uni-easyinput
                                    primaryColor="rgb(192, 196, 204)"
                                    :inputBorder="false"
                                    v-model="formState.company_name"
                                    placeholder="请输入企业名称"
                                />
                            </uni-forms-item>
                            <uni-forms-item label="纳税人识号" name="company_code">
                                <uni-easyinput
                                    primaryColor="rgb(192, 196, 204)"
                                    :inputBorder="false"
                                    v-model="formState.company_code"
                                    placeholder="请输入纳税人识号"
                                />
                            </uni-forms-item>
                            <uni-forms-item label="单位地址" name="company_address">
                                <uni-easyinput
                                    primaryColor="rgb(192, 196, 204)"
                                    :inputBorder="false"
                                    v-model="formState.company_address"
                                    placeholder="请输入单位地址"
                                />
                            </uni-forms-item>
                            <uni-forms-item label="单位电话" name="company_phone">
                                <uni-easyinput
                                    primaryColor="rgb(192, 196, 204)"
                                    :inputBorder="false"
                                    v-model="formState.company_phone"
                                    placeholder="请输入单位电话"
                                />
                            </uni-forms-item>
                            <uni-forms-item label="开户银行" name="company_bank">
                                <uni-easyinput
                                    primaryColor="rgb(192, 196, 204)"
                                    :inputBorder="false"
                                    v-model="formState.company_bank"
                                    placeholder="请输入开户银行"
                                />
                            </uni-forms-item>
                            <uni-forms-item label="银行账户" name="company_account">
                                <uni-easyinput
                                    primaryColor="rgb(192, 196, 204)"
                                    :inputBorder="false"
                                    v-model="formState.company_account"
                                    placeholder="请输入银行账户"
                                />
                            </uni-forms-item>
                        </block>
                        <uni-forms-item label="收票人手机" name="mobile">
                            <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="formState.mobile" placeholder="请输入收票人手机" />
                        </uni-forms-item>
                        <uni-forms-item label="收票人邮箱" name="email">
                            <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="formState.email" placeholder="请输入收票人邮箱" />
                        </uni-forms-item>
                    </block>
                    <block v-else-if="formState.invoice_type === 2 && invoiceStatus">
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
                        <uni-forms-item label="收票人手机" name="mobile">
                            <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="formState.mobile" placeholder="请输入收票人手机" />
                        </uni-forms-item>
                        <uni-forms-item label="收票人邮箱" name="email">
                            <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="formState.email" placeholder="请输入收票人邮箱" />
                        </uni-forms-item>
                    </block>
                    <block v-else>
                        <view class="notPass">
                            <view>您还未通过增票资质申请，暂时无法开具增值税专用发票 <text class="notPassBtn" @click="handleApply">去申请</text></view>
                        </view>
                    </block>
                </uni-forms>
            </view>
            <saveBottomBox height="110" backgroundColor="#fff">
                <view class="btn-box">
                    <tigButton style="width: 100%; height: 70rpx" :disabled="formState.invoice_type === 2 && !invoiceStatus" @click="onSubmit"> 提交</tigButton>
                </view>
            </saveBottomBox>
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getInvoiceStatus, getCheckInvoice } from "@/api/order/invoice";
import { orderInvoiceInsert, orderInvoiceUpdate } from "@/api/user/invoiceManagemen";
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import navbar from "@/components/navbar/index.vue";
import { onLoad, onShow } from "@dcloudio/uni-app";

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "发票申请"
});

const formState = reactive({
    title_type: 1, // 抬头类型
    invoice_type: 1, // 发票类型
    company_name: "",
    mobile: "",
    email: "",
    company_code: "",
    company_address: "",
    company_phone: "",
    company_bank: "",
    company_account: ""
});

const rules = {
    company_code: {
        rules: [{ required: true, errorMessage: "纳税人识号不能为空!" }]
    },
    company_address: {
        rules: [{ required: true, errorMessage: "单位地址不能为空!" }]
    },
    company_phone: {
        rules: [{ required: true, errorMessage: "单位电话不能为空!" }]
    },
    company_bank: {
        rules: [{ required: true, errorMessage: "开户银行不能为空!" }]
    },
    company_account: {
        rules: [{ required: true, errorMessage: "银行账户不能为空!" }]
    },
    mobile: {
        rules: [{ required: true, errorMessage: "手机不能为空!" }]
    }
};
const order_id = ref(0);

const clearFormState = () => {
    formState.company_name = "";
    formState.mobile = "";
    formState.email = "";
    formState.company_code = "";
    formState.company_address = "";
    formState.company_phone = "";
    formState.company_bank = "";
    formState.company_account = "";
};
const radioChange = (evt: any) => {
    formState.title_type = evt.detail.value;
    console.log(formState.title_type);
    return;
    clearFormState();
    __getCheckInvoice();
};

const invoiceStatus = ref(false);
const __getInvoiceStatus = async () => {
    try {
        const result = await getInvoiceStatus();
        if (result.item) {
            invoiceStatus.value = true;
        } else {
            invoiceStatus.value = false;
        }
    } catch (error) {
        console.error(error);
    } finally {
    }
};

const __getCheckInvoice = async () => {
    try {
        const result = await getCheckInvoice({
            invoice_type: formState.invoice_type,
            title_type: formState.title_type
        });

        if (result.item) {
            if (formState.invoice_type === 1 && formState.title_type === 1) {
                formState.company_name = result.item.company_name;
                formState.mobile = result.item.mobile;
                formState.email = result.item.email;
            } else {
                formState.company_code = result.item.company_code;
                formState.company_name = result.item.company_name;
                formState.company_address = result.item.company_address;
                formState.company_phone = result.item.company_phone;
                formState.company_bank = result.item.company_bank;
                formState.company_account = result.item.company_account;
            }
            formState.mobile = result.item.mobile;
            formState.email = result.item.email;
        }
    } catch (error) {
        console.error(error);
    }
};

const handleInvoiceType = (type: number) => {
    formState.invoice_type = type;
    if (type === 2) {
        formState.title_type = 2;
    } else {
        formState.title_type = 1;
    }
    clearFormState();
    __getCheckInvoice();
};

const formRef = ref();

const __orderInvoiceInsert = async () => {
    try {
        const data = {
            ...formState,
            id: order_id.value
        };
        const result = await orderInvoiceInsert(formState);
        uni.redirectTo({
            url: "/pages/user/invoiceManagement/index?type=list"
        });
    } catch (error) {
        console.error(error);
    } finally {
    }
};
const __orderInvoiceUpdate = async () => {
    try {
        const data = {
            ...formState,
            id: order_id.value
        };
        const result = await orderInvoiceUpdate(data);
        uni.redirectTo({
            url: "/pages/user/invoiceManagement/index?type=list"
        });
    } catch (error) {
        console.error(error);
    } finally {
    }
};
const submitStatus = ref("insert");
const onSubmit = () => {
    formRef.value
        .validate()
        .then((res: any) => {
            if (submitStatus.value === "insert") {
                __orderInvoiceInsert();
            } else {
                __orderInvoiceUpdate();
            }
        })
        .catch((err: any) => {
            console.log("表单错误信息：", err);
        });
};

onLoad((options) => {
    if (options && options.type) {
        // parameter.title = options.type === 'insert'? '发票申请' :'发票修改'
        submitStatus.value = options.type;
        order_id.value = options.order_id;
    }
});

onShow(() => {
    __getInvoiceStatus();
    __getCheckInvoice();
});

const handleApply = () => {
    uni.redirectTo({
        url: "/pages/user/invoiceManagement/index?type=invoice"
    });
};
</script>

<style lang="scss" scoped>
.btn-box {
    padding: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.item-layout {
    display: flex;
    align-items: center;
    height: 100%;
}

.notPass {
    padding: 10rpx 0;
    line-height: 40rpx;

    .notPassBtn {
        color: $tig-color-primary;
    }
}

.main-color {
    color: $tig-color-primary;
}
.invoice-popup-content {
    padding: 30rpx;
    background-color: #fff;
    margin: 10rpx 30rpx;
    margin-top: 25rpx;
    border-radius: 20rpx;
    padding-bottom: 2rpx;

    .invoice-typemenu {
        padding-bottom: 10rpx;
        border-bottom: 1rpx solid #eee;
        margin-bottom: 20rpx;
        .invoice-typemenu-item {
            background: #f2f2f2;
            color: #282828;
            padding: 13rpx 36rpx;
            border-radius: 50rpx;
            font-size: 25rpx;
            display: inline-block;
            margin-right: 28rpx;
            margin-bottom: 10rpx;

            &.active {
                color: #fff;
                background-color: $tig-color-primary;
            }
        }

        .invoice-explain {
            padding: 20rpx 0;
            font-size: 24rpx;
            line-height: 35rpx;
            color: #999;

            .red {
                color: #ff3700;
            }
        }
    }
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

:deep(.uni-forms-item) {
    margin-bottom: 30rpx;
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
