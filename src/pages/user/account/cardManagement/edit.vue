<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="card-edit-main">
            <uni-forms ref="formRef" :modelValue="formState" label-width="170rpx">
                <view class="card-edit-content">
                   <uni-forms-item label="卡片类型" name="account_type">
                       <picker :range="accountTypeList" :value="selectedAccountType" mode="selector" @change="acTypeChange">
                           <view class="card-idx">{{ accountTypeList[selectedAccountType] }}</view>
                       </picker>
                   </uni-forms-item>
                    <uni-forms-item label="真实姓名" name="account_name">
                        <uni-easyinput v-model="formState.account_name" :inputBorder="false" placeholder="请输入真实姓名" primaryColor="rgb(192, 196, 204)" />
                    </uni-forms-item>
                    <uni-forms-item label="身份证号" name="identity">
                        <uni-easyinput v-model="formState.identity" :inputBorder="false" placeholder="请输入身份证号码" primaryColor="rgb(192, 196, 204)" />
                    </uni-forms-item>
                    <uni-forms-item :label="`${accountPlaceholder}号`" name="account_no">
                        <uni-easyinput v-model="formState.account_no" :inputBorder="false" :placeholder="`请输入${accountPlaceholder}账号`" primaryColor="rgb(192, 196, 204)" />
                    </uni-forms-item>
                    <uni-forms-item label="银行详情" name="bank_name" v-if="formState.account_type === 1">
                        <uni-easyinput v-model="formState.bank_name" :inputBorder="false" placeholder="请选择银行卡账号" primaryColor="rgb(192, 196, 204)" />
                    </uni-forms-item>
                </view>
            </uni-forms>
        </view>
        <view class="button-position">
            <button class="base-button card-edit-btn" hover-class="base-button-hover" @click="onSubmit">保存修改</button>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
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
// const accountTypeList = ref(["请选择账号", "银行卡", "支付宝", "微信"]);
const accountTypeList = ref(["银行卡", "支付宝", "微信"]);
const acTypeChange = (e: any) => {
    selectedAccountType.value = e.detail.value;
    formState.value.account_type = e.detail.value + 1;
};
const formRef = shallowRef();
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
        console.log(result);
        selectedAccountType.value = result.account_detail.account_type;
        Object.assign(formState.value, result.account_detail);
    } catch (error: any) {
        console.error(error.message);
    } finally {
        uni.hideLoading();
    }
};

const rules = {
    // account_type: {
    //     rules: [{ required: true, errorMessage: "请输入真实姓名" }]
    // },
    account_name: {
        rules: [{ required: true, errorMessage: "请输入真实姓名" }]
    },
    identity: {
        rules: [{ required: true, errorMessage: "请输入身份证号" }]
    },
    account_no: {
        rules: [{ required: true, errorMessage: `${accountPlaceholder.value}账号` }]
    }
};

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
    console.log({...formState});
    // return
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
        console.error(error);
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
};

const edit = async () => {
    try {
        const result = await updateAccount({ ...formState.value }, 'edit_account');
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
        console.error(error);
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
};

// const edit = async () => {
//     try {
//         await formRef.value.validate();
//         // const result = await updateAccount({ ...formState.value }, props.act == "add" ? "update_account" : "edit_account");
//         // await formRef.value.resetFields();
//         // message.success(result.message);
//         // dialogTableVisible.value = false;
//         // formState.value.account_type = 1;
//         // emit("loadFilter");
//     } catch (error: any) {
//         uni.showToast({
//             title: error.message,
//             icon: "none",
//             duration: 1000
//         });
//     }
// };

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
.head-tabs-box{
    position: fixed;
    width: 100%;
    z-index: 99;
    .tabs{
        background-color: #fff;
        padding: 30rpx;
        .tab{
            font-size: 26rpx;
            margin-right: 40rpx;
            color: #666;
        }
        .active{
            color: $tig-color-primary;
            font-weight: bold;
            font-size: 32rpx;
        }
        .clear-unread{
            font-size: 26rpx;
            color: #999;
        }
    }
}

:deep(.uni-forms-item) {
    margin-bottom: 30rpx;
    // border-bottom: 1rpx solid #f2f3f5;
}

:deep(.uni-forms-item:last-child) {
    margin-bottom: 0;
    border-bottom: 0;
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
    // margin-top: 120rpx;
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
</style>
