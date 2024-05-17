<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="card-edit-main">
            <uni-forms ref="formRef" :modelValue="formState" label-width="170rpx">
                <view class="card-edit-content">
                   <uni-forms-item v-if="!id" label="卡片类型" name="account_type" required>
                       <picker :range="accountTypeList" :value="selectedAccountType" mode="selector" @change="acTypeChange">
                           <view class="card-idx">{{ accountTypeList[selectedAccountType] }}</view>
                       </picker>
                   </uni-forms-item>
                    <uni-forms-item v-else label="卡片类型" name="account_type" required>
                        <uni-easyinput :inputBorder="false" :placeholder="accountPlaceholder" disabled />
                    </uni-forms-item>
                    <uni-forms-item label="真实姓名" name="account_name" required>
                        <uni-easyinput v-model="formState.account_name" :inputBorder="false" placeholder="请输入真实姓名" primaryColor="rgb(192, 196, 204)" />
                    </uni-forms-item>
                    <uni-forms-item label="身份证号" name="identity" required>
                        <uni-easyinput v-model="formState.identity" :inputBorder="false" placeholder="请输入身份证号码" primaryColor="rgb(192, 196, 204)" />
                    </uni-forms-item>
                    <uni-forms-item :label="`${accountPlaceholder}号`" name="account_no" required>
                        <uni-easyinput v-model="formState.account_no" :inputBorder="false" :placeholder="`请输入${accountPlaceholder}账号`" primaryColor="rgb(192, 196, 204)" />
                    </uni-forms-item>
                    <uni-forms-item label="银行卡详情" name="bank_name" v-if="formState.account_type === 1">
                        <uni-easyinput v-model="formState.bank_name" :inputBorder="false" placeholder="请选择银行卡账号" primaryColor="rgb(192, 196, 204)" />
                    </uni-forms-item>
                </view>
            </uni-forms>
        </view>
        <saveBottomBox :height="110" backgroundColor="#fff">
            <view class="btn-box">
                <tigButton style="width: 100%; height: 70rpx" @click="onSubmit"> 保存修改 </tigButton>
            </view>
        </saveBottomBox>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import { ref, shallowRef, computed, nextTick } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { getAccount, updateAccount } from "@/api/user/account";
import type { AccountData } from "@/types/user/account";
const parameter = {
    navbar: "1",
    return: "1",
    title: "添加账号",
    color: false
};

const id = ref(null);
const selectedAccountType = ref(0);
const accountTypeList = ref(["银行卡", "支付宝", "微信"]);
const acTypeChange = (e: any) => {
    selectedAccountType.value = e.detail.value;
    formState.value.account_type = e.detail.value + 1;
    resetForm();
};
const resetForm = () => {  
    formState.value = {
        account_name: '',
        identity: '',
        account_no: '',
        account_type: selectedAccountType.value + 1,
        bank_name: '',
    };
}

const formState = ref<AccountData>({
    account_type: 1
});
const accountPlaceholder = computed(() => {
    switch (formState.value.account_type) {
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

const __getAccount = async () => {
    uni.showLoading({
        title: "加载中"
    });
    try {
        const result = await getAccount({ account_id: id.value });
        selectedAccountType.value = result.account_detail.account_type - 1;
        Object.assign(formState.value, result.account_detail);
    } catch (error: any) {
        console.error(error.message);
    } finally {
        uni.hideLoading();
    }
};

const rules = {
    account_name: {
        rules: [{ required: true, errorMessage: "请输入真实姓名" }]
    },
    identity: {
        rules: [
            { required: true, errorMessage: "请输入身份证号码" },
            {
                validateFunction: function (rule: any, value: any, data: any, callback: any) {
                    const regex = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                    const status = regex.test(value);
                    if (!status) {
                        callback("请输入正确的身份证号码");
                    }
                    return true;
                }
            }
        ]
    },
    account_no: {
        rules: [
            { required: true, errorMessage: `请输入正确的${accountPlaceholder.value}账号` },
            {
                validateFunction: function (rule: any, value: any, data: any, callback: any) {
                    const regex = /^\d{6,}$/;
                    const status = regex.test(value);
                    if (!status && formState.value.account_type===1) {
                        callback(`请输入正确的${accountPlaceholder.value}账号`);
                    }
                    return true;
                }
            }
        ]
    }
};

const formRef = shallowRef();
const onSubmit = (values: any) => {
    formRef.value
        .validate()
        .then(() => {
            if (id.value) {
                edit();
            } else {
                add();
            }
        })
        .catch((err: any) => {
            console.error("表单错误信息：", err);
        });
};

const add = async () => {
    try {
        const result = await updateAccount({ ...formState.value }, 'create_account');
        if (result.message) {
            uni.showToast({
                title: result.message,
                icon: "success",
                duration: 1000
            });
        }
        setTimeout(() => {
            uni.navigateBack({
                success: function (res) {
                    uni.$emit("refreshData"); // 发送刷新信号
                }
            });
        }, 1000);
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
};

const edit = async () => {
    try {
        const result = await updateAccount({ ...formState.value }, 'update_account');
        if (result.message) {
            uni.showToast({
                title: result.message,
                icon: "success",
                duration: 1000
            });
        }
        setTimeout(() => {
            uni.navigateBack({
                success: function (res) {
                    uni.$emit("refreshData"); // 发送刷新信号
                }
            });
        }, 1000);
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
};

onShow(() => {
    nextTick(() => {
        formRef.value.setRules(rules);
    });
});

onLoad((option: any) => {
    if (option.id) {
        id.value = option.id;
        parameter.title = "编辑账号";
        __getAccount();
    }
});
</script>

<style lang="scss" scoped>
:deep(.uni-forms-item) {
    margin-bottom: 30rpx;
}

:deep(.uni-forms-item:last-child) {
    margin-bottom: 0;
}

:deep(.uni-forms-item__label) {
    font-size: 26rpx;
}

:deep(.uni-forms-item__error) {
    top: 90%;
    right: 18rpx;
    text-align: right;
}

:deep(.uni-input-input) {
    text-align: right;
}

:deep(.uni-easyinput__placeholder-class) {
    font-size: 26rpx;
    text-align: right;
}

:deep(.is-disabled) {
    background-color: #fff !important;
}

:deep(.icon-calendar) {
    display: none;
}

:deep(.uni-date__x-input) {
    text-align: right;
    color: #333;
}

.card-edit-main {
    padding: 20rpx;
    .card-edit-content {
        background-color: #fff;
        border-radius: 10rpx;
        padding: 20rpx;
        margin-bottom: 30rpx;
        .card-idx {
            line-height: 78rpx;
            text-align: right;
        }
    }
}

.card-edit-btn {
    background: $tig-color-primary;
    color: #fff;
    &::after {
        border: 0;
    }
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
