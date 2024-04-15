<template>
    <view class="invoice-info">
        <view class="invoice">
            <view class="invoice-title">发票</view>
            <view class="invoice-content" @click="handleInvoice">
                <view class="invoice-text">本次不开具发票</view>
                <image class="more-ico" src="/static/images/common/more.png"></image>
            </view>
        </view>

        <popup v-model:show="show" title="发票" height="60%" paddingBottom="50">
            <view class="invoice-popup-content">
                <view class="invoice-typemenu">
                    <view class="invoice-typemenu-item" :class="{ active: formState.invoice_type === 1 }" @click="handleInvoiceType(1)">普通发票</view>
                    <view class="invoice-typemenu-item" :class="{ active: formState.invoice_type === 2 }" @click="handleInvoiceType(2)">增值税专用发票</view>
                </view>

                <view class="invoice-formState">
                    <van-form @submit="onSubmit">
                        <van-cell-group inset>
                            <van-field name="radio" label="单选框">
                                <template #input>
                                    <van-radio-group v-model="formState.title_type" direction="horizontal">
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
                            <van-field
                                v-model="formState.email"
                                name="收票人邮箱"
                                label="收票人邮箱"
                                placeholder="请输入收票人邮箱"
                                :rules="[{ required: true, message: '邮箱不能为空!' }]"
                            />
                        </van-cell-group>
                        <view class="button-position">
                            <van-button round block type="danger" native-type="submit"> 提交 </van-button>
                        </view>
                    </van-form>
                </view>
            </view>
        </popup>
    </view>
</template>

<script setup lang="ts">
import popup from "@/components/popup/index.vue";
import { reactive, ref } from "vue";

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
const show = ref(false);
const handleInvoice = () => {
    show.value = true;
};

const handleInvoiceType = (type: number) => {
    formState.invoice_type = type;
};

const onSubmit = () => {};
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
                background-color: #ff3700;
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
</style>
