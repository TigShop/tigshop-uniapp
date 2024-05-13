<template>
    <view class="custom-tabs">
        <view v-for="(tab, index) in tabs" :key="index" :class="{ 'active-tab': activeTab === tab.account_type }"
            class="tab" @click="actionClick(tab.account_type)">
            <view>{{ tab.title }}</view>
        </view>
    </view>
    <view class="reply-main">
        <uni-forms ref="formRef" :modelValue="formState" label-width="170rpx">
            <view class="reply-content">
                <uni-forms-item label="提现至">
                    <uni-data-select :localdata="dataList" :clear="false" @change="selectNo" ></uni-data-select>
                    <view class="tips">当前{{ accountPlaceholder }}账号已不用？<span class="font-color" style="cursor: pointer">点击这里</span>去添加新的{{ accountPlaceholder }}账号。</view>
                </uni-forms-item>
                <uni-forms-item label="提现姓名" name="account_name">
                    <uni-easyinput v-model="formState.account_data.account_name" disabled :placeholder="'请选择'+accountPlaceholder+'账号'" />
                </uni-forms-item>
                <uni-forms-item label="银行详情" name="bank_name" v-if="formState.account_data.account_type === 1">
                    <uni-easyinput type="textarea" v-model="formState.account_data.bank_name" disabled placeholder="请选择银行卡账号" />
                </uni-forms-item>
                <uni-forms-item label="提现金额" name="amount">
                    <uni-easyinput v-model="formState.amount" placeholder="请输入提现金额" primaryColor="#fcc282" />
                </uni-forms-item>
            </view>
        </uni-forms>
    </view>
    <view class="button-position">
        <button class="base-button recharge-btn" hover-class="base-button-hover" @click="onSubmit">确认提现</button>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive, shallowRef, computed, nextTick } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { getAccountNoList, updateWithdrawApply } from "@/api/user/account";
import type { AccountFormState, AccountInfo } from "@/types/user/account";

const tabs = [
    { title: "银行卡", account_type: 1 },
    { title: "支付宝", account_type: 2 },
    { title: "微信", account_type: 3 }
];
const formRef = shallowRef();
const activeTab = ref(1);
const actionClick = async (value: number) => {
    if (value === activeTab.value) return;
    activeTab.value = value;
    formState.value.account_data.account_type = value;
    resetForm();
    __getAccountNoList(value);
}
const resetForm = () => {  
    formState.value = {
        account_data: {
            account_no: '',
            account_name: '',
            account_type: activeTab.value,
            bank_name: '',
        },
        amount: '',
    };
} 

const yhkList = ref<AccountInfo[]>([]);
const zfbList = ref<AccountInfo[]>([]);
const wxList = ref<AccountInfo[]>([]);
const newYhlList = ref([]);
const newZfbList = ref([]);
const newWxList = ref([]);
const __getAccountNoList = async (type: number) => {
    uni.showLoading({
        title: "加载中"
    });
    try {
        let temp: any = {
            account_type: type
        };
        const result = await getAccountNoList({ ...temp });
        if (type == 1) {
            yhkList.value.length = 0;
            yhkList.value.push(...result.filter_result);
            let arr:any = yhkList.value.map((item:any) => ({
                value: item.account_id,
                text: item.account_no
            }));
            newYhlList.value = arr;
        } else if (type === 2) {
            zfbList.value.length = 0;
            zfbList.value.push(...result.filter_result);
            let arr:any = zfbList.value.map((item:any) => ({
                value: item.account_id,
                text: item.account_no
            }));
            newZfbList.value = arr;
        } else {
            wxList.value.length = 0;
            wxList.value.push(...result.filter_result);
            let arr:any = wxList.value.map((item:any) => ({
                value: item.account_id,
                text: item.account_no
            }));
            newWxList.value = arr;
        }
    } catch (error: any) {
        console.log(error.message);
    } finally {
        uni.hideLoading();
    }
};

const formState = ref<AccountFormState>({
    account_data: {
        account_type: 1
    }
});

const selectNo = (value: any) => {
    const list  = formState.value.account_data.account_type === 1 ? yhkList
                : formState.value.account_data.account_type === 2 ? zfbList
                : wxList;
    let selectedItem:any = list.value.find((item:any) => item.account_id === value);
    formState.value.account_data.account_no = selectedItem?.account_no;
    formState.value.account_data.account_name = selectedItem?.account_name;
    formState.value.account_data.bank_name = selectedItem?.bank_name;
    console.log(formState.value.account_data);
};

const accountPlaceholder = computed(() => {
    switch (formState.value.account_data.account_type) {
        case 1:
            return "银行卡";
        case 2:
            return "支付宝";
        case 3:
            return "微信";
        default:
            return "";
    }
});

const dataList = computed(() => {
    switch (formState.value.account_data.account_type) {
        case 1:
            return newYhlList.value;
        case 2:
            return newZfbList.value;
        case 3:
            return newWxList.value;
        default:
            return "";
    }
});

const rules = {
    amount: {
        rules: [{ required: true, errorMessage: "请输入提现金额" }]
    }
};

const onSubmit = async () => {
    try {
        await formRef.value.validate();
        const result = await updateWithdrawApply({ ...formState.value });
        uni.showToast({
            title: result.message,
            icon: "success",
            duration: 1000
        });
    } catch (error: any) {
        console.log("表单错误信息：", error);
    }
};

onShow(() => {
    nextTick(() => {
        formRef.value.setRules(rules);
    });
});

onLoad(() => {
    __getAccountNoList(activeTab.value);
})
</script>
<style lang="scss" scoped>
.custom-tabs {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 120rpx;
    margin: 20rpx;

    .tab {
        padding: 10px;
        width: 100%;
        font-size: 28rpx;
        border-bottom: none;
        color: black;
        text-align: center;
    }
    &.active-tab {
        border-bottom: 2px solid #fa0;
        color: #fa0;
    }
}

.custom-tabs .active-tab {
    border-bottom: 2px solid #fa0;
    color: #fa0;
}
:deep(.uni-forms-item) {
    margin-bottom: 30rpx;
}

:deep(.uni-forms-item__label) {
    font-size: 26rpx;
}

:deep(.uni-forms-item__error) {
    top: 100%;
    left: 18rpx;
}

:deep(.uni-easyinput__placeholder-class) {
    font-size: 26rpx;
}

:deep(.icon-calendar) {
    display: none;
}

:deep(.uni-date__x-input) {
    text-align: right;
    color: #333;
}

.reply-main {
    padding: 20rpx;

    .reply-content {
        background-color: #fff;
        border-radius: 15rpx;
        padding: 20rpx;
        margin-bottom: 30rpx;
        .tips {
            font-size: 12px;
            color: #a5a5a5;
            margin-top: 10rpx;
        }
    }
}

.recharge-btn {
    background: linear-gradient(90deg,#fee2b7,#fdc383);
    color: #5d3324;
    &::after {
        border: 0;
    }
}
</style>