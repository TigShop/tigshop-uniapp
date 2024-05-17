<template>
    <view class="register-container">
        <navbar :parameter="parameter"></navbar>
        <view class="register-warp">
            <view class="h1_tit">会员注册</view>
        </view>
        <view class="profile-edit-content">
            <uni-forms ref="formRef" :modelValue="formState" :rules="formRules" label-align="right">
                <uni-forms-item label="" name="username">
                    <view class="input">
                        <uni-easyinput
                            :inputBorder="false"
                            v-model="formState.username"
                            class="uni-input item-input"
                            placeholder="请输入用户名"
                            primaryColor="rgb(192, 196, 204)"
                        ></uni-easyinput>
                    </view>
                </uni-forms-item>
                <uni-forms-item label="" name="mobile">
                    <view class="input">
                        <uni-easyinput
                            :inputBorder="false"
                            v-model="formState.mobile"
                            class="uni-input item-input"
                            placeholder="请输入手机号"
                            primaryColor="rgb(192, 196, 204)"
                        ></uni-easyinput>
                    </view>
                </uni-forms-item>
                <uni-forms-item label="" name="mobile_code">
                    <view class="item-one">
                        <uni-easyinput
                            :inputBorder="false"
                            v-model="formState.mobile_code"
                            class="uni-input item-input input"
                            focus
                            placeholder="手机短信验证码"
                            primaryColor="rgb(192, 196, 204)"
                        />
                        <VerificationCode
                            v-model:isChecked="is_checked"
                            v-model:mobile="formState.mobile"
                            v-model:verify-token-data="verifyToken"
                            :requestApi="sendMobileCode"
                            @mobileErrorCallback="mobileErrorCallback"
                        ></VerificationCode>
                    </view>
                </uni-forms-item>
                <uni-forms-item label="" name="password">
                    <view class="input">
                        <uni-easyinput
                            :inputBorder="false"
                            v-model="formState.password"
                            class="uni-input item-input"
                            placeholder="请输入密码"
                            primaryColor="rgb(192, 196, 204)"
                        ></uni-easyinput>
                    </view>
                </uni-forms-item>
                <uni-forms-item label="" name="confirmPassword">
                    <view class="input">
                        <uni-easyinput
                            :inputBorder="false"
                            v-model="formState.confirmPassword"
                            class="uni-input item-input"
                            placeholder="请再次输入密码"
                            primaryColor="rgb(192, 196, 204)"
                        ></uni-easyinput>
                    </view>
                </uni-forms-item>
                <uni-forms-item label="" name="">
                    <view class="btn">
                        <view>
                            <tigCheckbox v-model:checked="is_checked" :checkedSize="0.6" checkedText="《注册协议》"></tigCheckbox>
                        </view>
                        <view class="lf-input">
                            <view>已有账号？</view>
                            <navigator class="red" open-type="redirect" url="/pages/login/index">立即登录</navigator>
                        </view>
                    </view>
                </uni-forms-item>
            </uni-forms>
            <view class="form-con">
                <tigButton :disabled="isRegisterDisabled" :loading="loginLoading" class="btn2-css3" @click="onRegister"> 注 册</tigButton>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, shallowRef, nextTick } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import navbar from "@/components/navbar/index.vue";
import { useUserStore } from "@/store/user";
import { sendMobileCode } from "@/api/login/login";
import VerificationCode from "@/pages/login/src/verificationCode.vue";
import tigCheckbox from "@/components/tigCheckbox/index.vue";
import { userRegist } from "@/api/user/regist";

const userStore = useUserStore();

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "注册"
});

const is_checked = ref(false);
const verifyToken = ref("");
const loginLoading = ref(false);
const isRegisterDisabled = computed(() => {
    return !formState.value.mobile || !formState.value.mobile_code || !formState.value.password || !formState.value.confirmPassword || !verifyToken.value;
});

const formState = ref({
    username: "",
    mobile_code: "",
    mobile: "",
    password: "",
    confirmPassword: ""
});
const validateUsername = (rule: any, value: any, data: any, callback: any) => {
    if (!value) {
        callback("用户名不能为空");
    } else if (value.length > 20 || value.length < 4) {
        callback("用户名应为4-20位字符");
    } else if (/^\d+$/.test(value)) {
        callback("用户名不能全为数字");
    } else if (!/^[\u4E00-\u9FA5a-zA-Z0-9_]+$/.test(value)) {
        callback("用户名格式错误,请输入正确的用户名");
    } else {
        callback();
    }
};
const validateMobile = (rule: any, value: any, data: any, callback: any) => {
    if (!value) {
        return callback("手机号不能为空");
    } else if (/^(?=.*\D).+$/.test(value)) {
        return callback("格式错误，请输入正确的手机号码");
    } else {
        callback();
    }
};
const validateCode = (rule: any, value: any, data: any, callback: any) => {
    if (!value) {
        return callback("验证码不能为空");
    } else if (value.length != 6) {
        return callback("请输入6位验证码");
    } else {
        callback();
    }
};

const validatePassword = (rule: any, value: any, data: any, callback: any) => {
    if (!value) {
        return callback("密码不能为空");
    } else if (value.length > 20 || value.length < 6) {
        return callback("密码应为6-20位字符");
    } else if (/\s/.test(value)) {
        return callback("密码中不允许有空格");
    } else if (/^\d+$/.test(value)) {
        return callback("密码不能全为数字");
    } else if (!/^(?=.*[\d\W]).+$/.test(value)) {
        return callback("密码不能全为字母");
    } else if (!/^(?=.*[a-zA-Z0-9]).+$/.test(value)) {
        return callback("密码不能全为符号");
    } else if (!/^(?!([a-zA-Z0-9])\1*$).+$/.test(value)) {
        return callback("密码不能全为相同字符或数字");
    } else {
        callback();
    }
};
const validatePassword2 = (rule: any, value: any, data: any, callback: any) => {
    if (!value) {
        return callback("请再次输入密码");
    } else if (value != formState.value.password) {
        return callback("两次密码不一致");
    } else {
        callback();
    }
};
const formRules = {
    username: {
        rules: [
            { required: true, errorMessage: "请输入用户名" },
            {
                validateFunction: validateUsername
            }
        ]
    },
    mobile: {
        rules: [
            { required: true, errorMessage: "请输入手机号" },
            {
                validateFunction: validateMobile
            }
        ]
    },
    mobile_code: {
        rules: [
            { required: true, errorMessage: "请输入验证码" },
            {
                validateFunction: validateCode
            }
        ]
    },
    password: {
        rules: [
            { required: true, errorMessage: "请输入密码" },
            {
                validateFunction: validatePassword
            }
        ]
    },
    confirmPassword: {
        rules: [
            { required: true, errorMessage: "请再次输入密码" },
            {
                validateFunction: validatePassword2
            }
        ]
    }
};
const formRef = shallowRef();
const onRegister = async () => {
    formRef.value
        .validate()
        .then(async () => {
            try {
                loginLoading.value = true;
                const result = await userRegist(formState.value);
                uni.showToast({
                    title: "注册成功",
                    duration: 1500,
                    icon: "none"
                });
                setTimeout(() => {
                    // 一秒后执行这里的代码
                    uni.redirectTo({
                        url: "/pages/login/index"
                    });
                }, 1000);
            } catch (error: any) {
                uni.showToast({
                    title: error.message,
                    duration: 1500,
                    icon: "none"
                });
            } finally {
                loginLoading.value = false;
            }
        })
        .catch((err: any) => {
            console.error("表单错误信息：", err);
        });
};
onShow(() => {
    if (uni.getStorageSync("token" || userStore.token)) {
        uni.reLaunch({
            url: "/pages/index/index"
        });
    }
    nextTick(() => {
        formRef.value.setRules(formRules);
    });
});

const mobileErrorCallback = (msg: string) => {
    uni.showToast({
        title: msg,
        duration: 1500,
        icon: "none"
    });
};
</script>
<style lang="scss" scoped>
page {
    background: #fff !important;
}

.register-container {
    height: 100%;

    .register-warp {
        display: flex;
        flex-direction: column;
        padding-left: 20rpx;

        .h1_tit {
            font-size: 36rpx;
            padding: 40rpx;
            font-weight: bold;
            color: #333333;
        }
    }

    .profile-edit-content {
        margin: 0 40rpx;
        border-radius: 15rpx;
        padding: 20rpx;
        display: flex;
        flex-direction: column;
        gap: 16rpx;

        .item-one {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
        }

        .input {
            padding-bottom: 10rpx;
            border-bottom: 1px solid #dfdfdf;
        }

        .btn {
            display: flex;
            justify-content: space-between;
            flex-direction: row;

            align-items: center;

            .lf-input {
                display: flex;
                gap: 20rpx;
            }
        }
    }
}

:deep(.is-input-border) {
    border: none; /* 首先清除所有边框 */
    border-radius: 0;
    border-bottom: 0.05rem solid;
}

.btn2-css3 {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    padding: 0;
    font-size: 36rpx;
    font-weight: normal;
}
</style>
