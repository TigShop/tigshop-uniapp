<template>
    <view class="invoice-info">
        <view class="invoice">
            <view class="invoice-title">发票</view>
            <view class="invoice-content" @click="handleInvoice">
                <view class="invoice-text">{{ typeCodeText || "" }}</view>
                <image lazy-load class="more-ico" src="/static/images/common/more.png"></image>
            </view>
        </view>
        <tigpopup v-model:show="show" title="发票" height="70vh">
            <view class="invoice-popup-content">
                <view class="invoice-typemenu">
                    <view class="invoice-typemenu-item" :class="{ active: formState.invoice_type === 1 }" @click="handleInvoiceType(1)">普通发票</view>
                    <view class="invoice-typemenu-item" :class="{ active: formState.invoice_type === 2 }" @click="handleInvoiceType(2)">增值税专用发票</view>
                    <view class="invoice-explain">
                        我公司依法开具发票，请您按照税法规定使用发票。根据现行税收政策，部分公司提供数电票,
                        数电（专用发票）法律效力与现有增值税专用发票相同;如商品由第三方卖家销售，发票类型和内容将由该卖家决定，发票由卖家开具并提供。如您为企业采购，需要多单合并开具或批量提交发票可注册企业用户；<text
                            class="special-text"
                            >使用礼品卡支付部分的金额，不支持开发票</text
                        >
                    </view>
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
                                        <radio value="2" activeBackgroundColor="#ee0a24" style="transform: scale(0.9)">企业</radio>
                                    </radio-group>
                                </view>
                            </uni-forms-item>
                            <block v-if="formState.title_type == 1">
                                <uni-forms-item label="个人名称" name="company_name" :rules="[{'required': true,errorMessage: '个人名称不能为空'}]">
                                    <uni-easyinput
                                        primaryColor="rgb(192, 196, 204)"
                                        :inputBorder="false"
                                        v-model="formState.company_name"
                                        placeholder="请输入个人名称"
                                    />
                                </uni-forms-item>
                            </block>
                            <block v-else>
                                <uni-forms-item label="企业名称" name="company_name" :rules="[{'required': true,errorMessage: '企业名称不能为空'}]" >
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
                                <uni-easyinput
                                    primaryColor="rgb(192, 196, 204)"
                                    :inputBorder="false"
                                    v-model="formState.mobile"
                                    placeholder="请输入收票人手机"
                                />
                            </uni-forms-item>
                            <uni-forms-item label="收票人邮箱" name="email">
                                <uni-easyinput
                                    primaryColor="rgb(192, 196, 204)"
                                    :inputBorder="false"
                                    v-model="formState.email"
                                    placeholder="请输入收票人邮箱"
                                />
                            </uni-forms-item>
                        </block>
                        <block v-else-if="formState.invoice_type === 2 && invoiceStatus">
                            <uni-forms-item label="单位名称" name="company_name">
                                <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" :disabled="true" v-model="formState.company_name" />
                            </uni-forms-item>
                            <uni-forms-item label="纳税人识别码" name="company_code">
                                <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" :disabled="true" v-model="formState.company_code" />
                            </uni-forms-item>
                            <uni-forms-item label="注册地址" name="company_address">
                                <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" :disabled="true" v-model="formState.company_address" />
                            </uni-forms-item>
                            <uni-forms-item label="注册电话" name="company_phone">
                                <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" :disabled="true" v-model="formState.company_phone" />
                            </uni-forms-item>
                            <uni-forms-item label="开户银行" name="company_bank">
                                <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" :disabled="true" v-model="formState.company_bank" />
                            </uni-forms-item>
                            <uni-forms-item label="开户银行" name="company_account">
                                <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" :disabled="true" v-model="formState.company_account" />
                            </uni-forms-item>
                            <uni-forms-item label="收票人手机" name="mobile">
                                <uni-easyinput
                                    primaryColor="rgb(192, 196, 204)"
                                    :inputBorder="false"
                                    v-model="formState.mobile"
                                    placeholder="请输入收票人手机"
                                />
                            </uni-forms-item>
                            <uni-forms-item label="收票人邮箱" name="email">
                                <uni-easyinput
                                    primaryColor="rgb(192, 196, 204)"
                                    :inputBorder="false"
                                    v-model="formState.email"
                                    placeholder="请输入收票人邮箱"
                                />
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
                        <tigButton style="width: 100%;height: 70rpx;" :disabled="formState.invoice_type === 2 && !invoiceStatus" @click="onSubmit"> 提交</tigButton>
                    </view>
                    
                </saveBottomBox>
            </view>
        </tigpopup>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { getInvoiceStatus, getCheckInvoice } from "@/api/order/invoice";
import saveBottomBox from '@/components/saveBottomBox/index.vue'

const props = defineProps({
    getAddressInfo: {
        type: Object,
        default: () => {}
    },
    invoiceInfoData: {
        type: Object,
        default: () => {}
    },
    typeCode: {
        type: Number
    }
});
const emit = defineEmits(["update:invoiceInfo", "change"]);
const typeCodeText = computed(() => {
    return props.typeCode === 1 ? "普通发票" : "增值税专用发票";
});

const rules: any = {
    // company_name: {
    //     rules: [{ required: true, errorMessage: "名称不能为空" }]
    // },
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
    },
};

const radioChange = (evt: any) => {
    formState.title_type = evt.detail.value;
    clearFormState();
    __getCheckInvoice();
};

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

const invoiceStatus = ref(false);
const show = ref(false);
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
        } else if (formState.title_type === 1) {
            formState.company_name = props.getAddressInfo.consignee;
            formState.mobile = props.getAddressInfo.mobile;
            formState.email = props.getAddressInfo.email;
        }
    } catch (error) {
        console.error(error);
    }
};

watch(show, (newVal) => {
    if (newVal) {
        __getInvoiceStatus();
        __getCheckInvoice();
    }
});

const handleInvoice = () => {
    show.value = true;
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

const onSubmit = () => {
    formRef.value
        .validate()
        .then((res: any) => {
            emit("update:invoiceInfo", formState);
            show.value = false;
        })
        .catch((err: any) => {
            console.log("表单错误信息：", err);
        });
};

const handleApply = () => {
    // uni.navigateTo()
};
</script>

<style lang="scss" scoped>
.invoice {
    border-radius: 18rpx;
    background: #fff;
    padding: 30rpx 32rpx;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .invoice-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .more-ico {
        width: 36rpx;
        height: 36rpx;
        padding-left: 10rpx;
    }
}

.invoice-popup-content {
    padding: 30rpx 30rpx 0;

    .invoice-typemenu {
        padding-bottom: 20rpx;
        border-bottom: 1rpx solid #eee;
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
            padding: 10rpx 0;
            font-size: 20rpx;
            color: #999;

            .special-text {
                color: $tig-color-primary;
            }
        }
    }
}

.item-layout {
    height: 100%;
    display: flex;
    align-items: center;
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
:deep(.uni-forms-item__error) {
    top: 90%;
    left: 18rpx
}
:deep(.uni-easyinput__placeholder-class) {
    font-size: 26rpx;
}
:deep(.uni-forms-item__label) {
    font-size: 26rpx;
}
.button-position {
    position: fixed;
    bottom: 30rpx;
    left: 0;
    right: 0;
    padding: 0 30rpx;
    padding-bottom: env(safe-area-inset-bottom) !important;
}

.notPass {
    padding: 20rpx;
    .notPassBtn {
        color: $tig-color-primary;
    }
}
</style>
