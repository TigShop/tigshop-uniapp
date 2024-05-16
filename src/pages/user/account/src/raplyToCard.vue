<template>
    <view class="custom-tabs">
        <view
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ 'active-tab': activeTab === tab.account_type }"
            class="tab"
            @click="actionClick(tab.account_type)"
        >
            <view>{{ tab.title }}</view>
        </view>
    </view>
    <view class="reply-main">
        <view class="reply-content">
            <up-form ref="formRef" :model="formState" label-width="170rpx" errorType="toast">
                <up-form-item label="提现至">
                    <up-picker :show="show" :columns="dataList" keyName="text" @confirm="confirm" @cancel="cancel"></up-picker>
                    <up-button @click="show = true" style="justify-content: flex-start">{{ selectedData.text }}</up-button>
                </up-form-item>
                <view class="tips"
                    >当前{{ accountPlaceholder }}账号已不用？<navigator url="/pages/user/account/cardManagement/list" class="font-color">点击这里</navigator
                    >去添加新的{{ accountPlaceholder }}账号。</view
                >
                <up-form-item label="提现姓名" prop="account_data.account_name">
                    <up-input v-model="formState.account_data.account_name" :placeholder="'请选择' + accountPlaceholder + '账号'" disabled fontSize="12" />
                </up-form-item>
                <up-form-item label="银行详情" prop="account_data.bank_name" v-if="formState.account_data.account_type === 1">
                    <up-textarea v-model="formState.account_data.bank_name" placeholder="请选择银行卡账号" disabled fontSize="12" />
                </up-form-item>
                <up-form-item label="提现金额" prop="amount">
                    <up-input type="number" v-model="formState.amount" placeholder="请输入提现金额" clearable fontSize="12" />
                </up-form-item>
            </up-form>
        </view>
    </view>
    <saveBottomBox :height="110" backgroundColor="#fff">
        <view class="btn-box">
            <tigButton plain style="width: 50%; height: 70rpx" @click="backDetail"> 返回列表 </tigButton>
            <tigButton style="width: 50%; height: 70rpx" @click="onSubmit"> 提交申请 </tigButton>
        </view>
    </saveBottomBox>
</template>

<script lang="ts" setup>
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import { ref, shallowRef, computed, nextTick } from "vue";
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
    yhkList.value = [];
    zfbList.value = [];
    wxList.value = [];
    resetForm();
    __getAccountNoList(value);
};
const resetForm = () => {
    selectedData.value = {
        id: "",
        text: "请选择"
    };
    formState.value = {
        account_data: {
            account_no: "",
            account_name: "",
            account_type: activeTab.value,
            bank_name: ""
        },
        amount: ""
    };
};

const show = ref(false);
const selectedData = ref({
    id: "",
    text: "请选择"
});
const cancel = () => {
    show.value = false;
};
const confirm = (e: any) => {
    show.value = false;
    selectedData.value.id = e.value[0].id;
    selectedData.value.text = e.value[0].text;
    console.log(e);
    upAcData(e.value[0].id);
};

const upAcData = (value: any) => {
    const list: any = formState.value.account_data.account_type === 1 ? yhkList : formState.value.account_data.account_type === 2 ? zfbList : wxList;
    let selectedItem: any = list.value[0].find((item: any) => item.account_id === value);
    formState.value.account_data.account_no = selectedItem?.account_no;
    formState.value.account_data.account_name = selectedItem?.account_name;
    formState.value.account_data.bank_name = selectedItem?.bank_name;
};

const yhkList = ref<AccountInfo[]>([]);
const zfbList = ref<AccountInfo[]>([]);
const wxList = ref<AccountInfo[]>([]);
const __getAccountNoList = async (type: number) => {
    uni.showLoading({
        title: "加载中"
    });
    try {
        let temp: any = {
            account_type: type
        };
        const result = await getAccountNoList({ ...temp });
        let arr: any = [];
        if (type == 1) {
            arr = result.filter_result.map((item: any) => ({
                id: item.account_id,
                text: item.account_no,
                ...item
            }));
            yhkList.value.push(arr);
        } else if (type === 2) {
            arr = result.filter_result.map((item: any) => ({
                id: item.account_id,
                text: item.account_no,
                ...item
            }));

            zfbList.value.push(arr);
        } else {
            arr = result.filter_result.map((item: any) => ({
                id: item.account_id,
                text: item.account_no,
                ...item
            }));

            wxList.value.push(arr);
        }
    } catch (error: any) {
        console.log(error.message);
    } finally {
        uni.hideLoading();
    }
};

const formState = ref<AccountFormState>({
    account_data: {
        account_no: "",
        account_name: "",
        account_type: 1,
        bank_name: ""
    },
    amount: ""
});

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
            return yhkList.value;
        case 2:
            return zfbList.value;
        case 3:
            return wxList.value;
        default:
            return "";
    }
});

const rules = {
    amount: {
        required: true,
        message: "请输入提现金额",
        trigger: ["blur", "change"]
    }
};

onShow(() => {
    nextTick(() => {
        formRef.value.setRules(rules);
    });
});

const onSubmit = async () => {
    if (selectedData.value.id.length === 0) {
        uni.showToast({
            title: "请选择需要提现的账号",
            icon: "none",
            duration: 1000
        });
        return;
    }
    formRef.value
        .validate()
        .then(async (valid: boolean) => {
            if (valid) {
                try {
                    const result = await updateWithdrawApply({ ...formState.value });
                    uni.showToast({
                        title: result.message,
                        icon: "success",
                        duration: 1000
                    });
                    setTimeout(() => {
                        backDetail();
                    }, 1500);
                } catch (error) {
                    console.log(error);
                }
            }
        })
        .catch(() => {});
};

const emit = defineEmits(["backDetail"]);
const backDetail = () => {
    emit("backDetail");
};

onLoad(() => {
    __getAccountNoList(activeTab.value);
});
</script>
<style lang="scss" scoped>
.custom-tabs {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 100rpx;
    margin: 20rpx;
    .tab {
        padding: 10px;
        width: 100%;
        font-size: 28rpx;
        border-bottom: none;
        color: black;
        text-align: center;
    }
    & .active-tab {
        position: relative;
        color: $tig-color-primary;
        &::before {
            content: '';
            position: absolute;
            width: 30%;
            height: 2px;
            background-color: $tig-color-primary;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
        }
    }
}

.reply-main {
    padding: 20rpx;
    .reply-content {
        background-color: #fff;
        border-radius: 10rpx;
        padding: 20rpx;
        margin-bottom: 30rpx;
        .tips {
            font-size: 12px;
            color: #a5a5a5;
            padding-left: 170rpx;
            navigator {
                display: inline;
            }
        }
    }
}

:deep(.u-textarea__field) {
    font-size: 24rpx;
}

.btn-box {
    padding: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 28rpx;
}
</style>
