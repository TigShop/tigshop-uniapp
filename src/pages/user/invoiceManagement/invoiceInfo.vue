<template>
    <view class="invoiceInfo">
        <navbar :parameter="parameter"></navbar>
        <view class="invoiceInfo-status">
            <view class="">审核状态：</view>
            <view class="special-text">{{ formatText }}</view>
        </view>
        <view class="invoiceInfo-content">
            <view class="invoiceInfo-content-item">
                <view class="item-label">金额:</view>
                <view class="item-value"> <formatPrice :priceData="invoice_data.amount"></formatPrice></view>
            </view>
            <view class="invoiceInfo-content-item">
                <view class="item-label">订单编号:</view>
                <view class="item-value"> {{ invoice_data.order_sn }}</view>
            </view>
            <block v-if="invoice_data.invoice_type == 1">
                <view class="invoiceInfo-content-item">
                    <view class="item-label">发票抬头:</view>
                    <view class="item-value">{{ invoice_data.title_type == 1 ? "个人" : "企业" }}</view>
                </view>
                <view class="invoiceInfo-content-item">
                    <view class="item-label">{{ invoice_data.title_type == 1 ? "个人姓名" : "企业名称" }}</view>
                    <view class="item-value">{{ invoice_data.company_name }}</view>
                </view>
                <block v-if="invoice_data.title_type == 2">
                    <view class="invoiceInfo-content-item">
                        <view class="item-label">纳税人识号:</view>
                        <view class="item-value">{{ invoice_data.company_code }}</view>
                    </view>
                    <view class="invoiceInfo-content-item">
                        <view class="item-label">单位地址:</view>
                        <view class="item-value">{{ invoice_data.company_address }}</view>
                    </view>
                    <view class="invoiceInfo-content-item">
                        <view class="item-label">单位电话:</view>
                        <view class="item-value">{{ invoice_data.company_phone }}</view>
                    </view>
                    <view class="invoiceInfo-content-item">
                        <view class="item-label">开户银行:</view>
                        <view class="item-value">{{ invoice_data.company_bank }}</view>
                    </view>
                    <view class="invoiceInfo-content-item">
                        <view class="item-label">银行账户:</view>
                        <view class="item-value">{{ invoice_data.company_account }}</view>
                    </view>
                </block>
            </block>
            <block v-if="invoice_data.invoice_type == 2">
                <view class="invoiceInfo-content-item">
                    <view class="item-label">单位名称:</view>
                    <view class="item-value">
                        {{ invoice_data.company_name }}
                    </view>
                </view>
                <view class="invoiceInfo-content-item">
                    <view class="item-label">纳税识别码:</view>
                    <view class="item-value">
                        {{ invoice_data.company_code }}
                    </view>
                </view>
                <view class="invoiceInfo-content-item">
                    <view class="item-label">注册地址:</view>
                    <view class="item-value">
                        {{ invoice_data.company_address }}
                    </view>
                </view>
                <view class="invoiceInfo-content-item">
                    <view class="item-label">注册电话:</view>
                    <view class="item-value">
                        {{ invoice_data.company_phone }}
                    </view>
                </view>
                <view class="invoiceInfo-content-item">
                    <view class="item-label">开户银行:</view>
                    <view class="item-value">
                        {{ invoice_data.company_bank }}
                    </view>
                </view>
                <view class="invoiceInfo-content-item">
                    <view class="item-label">银行账户:</view>
                    <view class="item-value">
                        {{ invoice_data.company_account }}
                    </view>
                </view>
            </block>
            <view class="invoiceInfo-content-item">
                <view class="item-label">收票人邮箱:</view>
                <view class="item-value">{{ invoice_data.email }}</view>
            </view>
            <view class="invoiceInfo-content-item">
                <view class="item-label">收票人手机:</view>
                <view class="item-value">{{ invoice_data.mobile }}</view>
            </view>
        </view>

        <saveBottomBox height="110" backgroundColor="#fff">
            <view class="btn-box">
                <tigButton style="width: 100%; height: 70rpx" @click="onSubmit"> 重新申请 </tigButton>
            </view>
        </saveBottomBox>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import { computed, ref } from "vue";
import type { OrderListInvoiceData } from "@/types/user/order";
import saveBottomBox from "@/components/saveBottomBox/index.vue";

const parameter = {
    navbar: "1",
    return: "1",
    title: "发票详情"
};

const invoice_data = ref<OrderListInvoiceData>({} as OrderListInvoiceData);

onLoad((options) => {
    if (options && options.invoice_data) {
        invoice_data.value = JSON.parse(decodeURIComponent(options.invoice_data));
    }
});
const formatText = computed(() => {
    switch (invoice_data.value.status) {
        case 0:
            return "待审核";
        case 1:
            return "通过";
        default:
            return "失败/作废";
    }
});
const onSubmit = () => {
    uni.redirectTo({
        url: "/pages/user/invoiceManagement/applyInvoice?type=update&order_id=" + invoice_data.value.order_id
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
.invoiceInfo {
    padding: 20rpx;

    .invoiceInfo-status {
        display: flex;
        border: 1px solid #efd7a0;
        background: #fefee3;
        padding: 20px 10px 20px 20px;
        margin-bottom: 20rpx;
    }

    .invoiceInfo-content {
        padding: 20rpx;
        background-color: #fff;
        border-radius: 20rpx;

        .invoiceInfo-content-item {
            display: flex;
            border-bottom: 1px solid #f5f5f5;
            padding: 30rpx 0;

            &:last-child {
                border-bottom: none;
                padding-bottom: 0;
            }

            &:first-child {
                padding-top: 0;
            }
            .item-label {
                width: 160rpx;
                text-align: end;
                font-weight: bold;
            }
            .item-value {
                padding-left: 20rpx;
            }
        }
    }
}

.special-text {
    color: $tig-color-primary;
}
</style>
