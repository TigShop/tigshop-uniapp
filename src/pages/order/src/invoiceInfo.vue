<template>
    <view class="invoice-info">
        <view class="invoice">
            <view class="invoice-title">发票</view>
            <view class="invoice-content" @click="handleInvoice">
                <view class="invoice-text">{{ typeCodeText || "" }}</view>
                <image lazy-load  class="more-ico" src="/static/images/common/more.png"></image>
            </view>
        </view>

        <popup v-model:show="show" title="发票" height="70%" paddingBottom="50">
            <view class="invoice-popup-content">
                <view class="invoice-typemenu">
                    <view class="invoice-typemenu-item" :class="{ active: formState.invoice_type === 1 }" @click="handleInvoiceType(1)">普通发票</view>
                    <view class="invoice-typemenu-item" :class="{ active: formState.invoice_type === 2 }" @click="handleInvoiceType(2)">增值税专用发票</view>
                    <view class="invoice-explain">
                        我公司依法开具发票，请您按照税法规定使用发票。根据现行税收政策，部分公司提供数电票,
                        数电（专用发票）法律效力与现有增值税专用发票相同;如商品由第三方卖家销售，发票类型和内容将由该卖家决定，发票由卖家开具并提供。如您为企业采购，需要多单合并开具或批量提交发票可注册企业用户；<text
                            class="red"
                            >使用礼品卡支付部分的金额，不支持开发票</text
                        >
                    </view>
                </view>

                <view class="invoice-formState">
                    <van-form @submit="onSubmit">
                        <block v-if="formState.invoice_type === 1">
                            <van-cell-group inset>
                                <van-field name="radio" label="发票抬头">
                                    <template #input>
                                        <van-radio-group @change="getTitleType" v-model="formState.title_type" direction="horizontal">
                                            <van-radio checked-color="#ee0a24" :name="1">个人</van-radio>
                                            <van-radio checked-color="#ee0a24" :name="2">企业</van-radio>
                                        </van-radio-group>
                                    </template>
                                </van-field>
                                <block v-if="formState.title_type === 1">
                                    <van-field
                                        v-model="formState.company_name"
                                        name="个人名称"
                                        label="个人名称"
                                        placeholder="请输入个人名称"
                                        :rules="[{ required: true, message: '个人名称不能为空!' }]"
                                    />
                                </block>
                                <block v-else="formState.title_type === 2">
                                    <van-field
                                        v-model="formState.company_name"
                                        name="企业名称"
                                        label="企业名称"
                                        placeholder="请输入企业名称"
                                        :rules="[{ required: true, message: '企业名称不能为空!' }]"
                                    />
                                    <van-field
                                        v-model="formState.company_code"
                                        name="纳税人识号"
                                        label="纳税人识号"
                                        placeholder="请输入纳税人识号"
                                        :rules="[{ required: true, message: '纳税人识号不能为空!' }]"
                                    />
                                    <van-field
                                        v-model="formState.company_address"
                                        name="单位地址"
                                        label="单位地址"
                                        placeholder="请输入单位地址"
                                        :rules="[{ required: true, message: '单位地址不能为空!' }]"
                                    />
                                    <van-field
                                        v-model="formState.company_phone"
                                        name="单位电话"
                                        label="单位电话"
                                        placeholder="请输入单位电话"
                                        :rules="[{ required: true, message: '单位电话不能为空!' }]"
                                    />
                                    <van-field
                                        v-model="formState.company_bank"
                                        name="开户银行"
                                        label="开户银行"
                                        placeholder="请输入开户银行"
                                        :rules="[{ required: true, message: '开户银行不能为空!' }]"
                                    />
                                    <van-field
                                        v-model="formState.company_account"
                                        name="银行账户"
                                        label="银行账户"
                                        placeholder="请输入银行账户"
                                        :rules="[{ required: true, message: '银行账户不能为空!' }]"
                                    />
                                </block>

                                <van-field
                                    v-model="formState.mobile"
                                    name="收票人手机"
                                    label="收票人手机"
                                    placeholder="请输入收票人手机"
                                    :rules="[{ required: true, message: '手机不能为空!' }]"
                                />
                                <van-field v-model="formState.email" name="收票人邮箱" label="收票人邮箱" placeholder="请输入收票人邮箱" />
                            </van-cell-group>
                        </block>
                        <block v-else-if="formState.invoice_type === 2 && invoiceStatus">
                            <van-cell-group inset>
                                <van-field label="单位名称" :model-value="formState.company_name" readonly></van-field>
                                <van-field label="纳税人识别码" :model-value="formState.company_code" readonly></van-field>
                                <van-field label="注册地址" :model-value="formState.company_address" readonly></van-field>
                                <van-field label="注册电话" :model-value="formState.company_phone" readonly></van-field>
                                <van-field label="开户银行" :model-value="formState.company_bank" readonly></van-field>
                                <van-field label="银行账户" :model-value="formState.company_account" readonly></van-field>
                                <van-field
                                    v-model="formState.mobile"
                                    name="收票人手机"
                                    label="收票人手机"
                                    placeholder="请输入收票人手机"
                                    :rules="[{ required: true, message: '手机不能为空!' }]"
                                />
                                <van-field v-model="formState.email" name="收票人邮箱" label="收票人邮箱" placeholder="请输入收票人邮箱" />
                            </van-cell-group>
                        </block>
                        <block v-else>
                            <view class="notPass">
                                <view>您还未通过增票资质申请，暂时无法开具增值税专用发票 <text class="notPassBtn" @click="handleApply">去申请</text></view>
                            </view>
                        </block>
                        <view class="button-position">
                            <van-button :disabled="formState.invoice_type === 2 && !invoiceStatus" round block type="danger" native-type="submit">
                                提交
                            </van-button>
                        </view>
                    </van-form>
                </view>
            </view>
        </popup>
    </view>
</template>

<script setup lang="ts">
import popup from "@/components/popup/index.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { getInvoiceStatus, getCheckInvoice } from "@/api/order/invoice";

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

const getTitleType = (val: number) => {
    clearFormState();
    __getCheckInvoice();
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

const onSubmit = () => {
    emit("update:invoiceInfo", formState);
};

const handleApply = () => {
  // uni.navigateTo()
}
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
                background-color: #ff3700;
            }
        }

        .invoice-explain {
            padding: 10rpx 0;
            font-size: 20rpx;
            color: #999;

            .red {
                color: #ff3700;
            }
        }
    }
}
:deep(.van-cell) {
    padding-left: 0;
}
:deep(.van-cell-group--inset) {
    margin-left: 10rpx;
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
      color: #ff3700;
    }
}
</style>
