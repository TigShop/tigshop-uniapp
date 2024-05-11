<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="profile-edit-main">
            <view class="profile-edit-content">
                <view class="item">
                    <view class="title">
                        <view>请输入</view>
                        <view class="info">{{ formState.mobile.replace(/(\d{2})\d*(\d{4})$/, "$1*****$2") }}</view>
                        <view>收到的短信验证码</view>
                    </view>
                </view>
                <uni-forms ref="formRef" :modelValue="formState" :rules="formRules">
                    <uni-forms-item label="验证码" name="mobileCode" required>
                        <view class="item-one input">
                            <uni-easyinput :inputBorder="false" :value="formState.mobileCode" class="uni-input item-input" focus placeholder="手机短信验证码" primaryColor="rgb(192, 196, 204)" @input="inputMobileCode" />
                            <VerificationCode
                                v-model:isChecked="is_checked"
                                v-model:mobile="formState.mobile"
                                v-model:verify-token-data="verifyToken"
                                :requestApi="sendMobileCodeByMobilePassword"
                                @mobileErrorCallback="mobileErrorCallback"
                            ></VerificationCode>
                        </view>
                    </uni-forms-item>
                    <uni-forms-item label="新密码" name="password" required>
                        <view class=" input">
                            <uni-easyinput :inputBorder="false" :value="formState.password" class="uni-input item-input" placeholder="请输入新密码" primaryColor="rgb(192, 196, 204)" @input="inputPassword"></uni-easyinput>
                        </view>
                    </uni-forms-item>
                    <uni-forms-item label="新密码" name="confirm_password" required>
                        <view class="  input">
                            <uni-easyinput :inputBorder="false" :value="formState.confirmPassword" class="uni-input item-input" placeholder="请再次输入新密码" primaryColor="rgb(192, 196, 204)" @input="inputConfirmPassword"></uni-easyinput>
                        </view>
                    </uni-forms-item>

                </uni-forms>
                <view class="item">
                    <index class="next" @click="onNext()">提交</index>
                </view>
            </view>
            <view class="profile-edit-content">
                <view class="btn-item">
                    <view class="title">
                        <view class="big-title">为什么要进行身份验证？</view>
                    </view>
                    <view class="info">1. 为保障您的账户信息安全，在变更账户中的重要信息时需要进行身份验证，感谢您的理解和支持。</view>
                    <view class="info">2. 验证身份遇到问题？您可以通知我们的客服，我们将尽快联系您。</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import navbar from "@/components/navbar/index.vue";
import VerificationCode from "@/pages/login/src/verificationCode.vue";
import Index from "@/components/tigButton/index.vue";
import { checkModifyPasswordMobileCode, sendMobileCodeByMobilePassword } from "@/api/user/security";
import { onLoad } from "@dcloudio/uni-app";

const parameter = {
    navbar: "1",
    return: "1",
    title: "账户安全",
    color: false
};
const inputMobileCode = (e: any) => {
    formState.value.mobileCode = e;
};
const inputPassword = (e: any) => {
    formState.value.password = e;
};
const inputConfirmPassword = (e: any) => {
    formState.value.confirmPassword = e;
};
const formState = ref({
    mobile: "",
    mobileCode: "",
    password: "",
    confirmPassword: ""
});

const validatePassword = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error("密码不能为空"));
    } else if (value.length > 20 || value.length < 6) {
        return callback(new Error("密码应为6-20位字符"));
    } else if (/\s/.test(value)) {
        return callback(new Error("密码中不允许有空格"));
    } else if (/^\d+$/.test(value)) {
        return callback(new Error("密码不能全为数字"));
    } else if (!/^(?=.*[\d\W]).+$/.test(value)) {
        return callback(new Error("密码不能全为字母"));
    } else if (!/^(?=.*[a-zA-Z0-9]).+$/.test(value)) {
        return callback(new Error("密码不能全为符号"));
    } else if (!/^(?!([a-zA-Z0-9])\1*$).+$/.test(value)) {
        return callback(new Error("密码不能全为相同字符或数字"));
    } else {
        callback();
    }
};
const validatePassword2 = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error("请再次输入密码"));
    } else if (value != formState.value.password) {
        return callback(new Error("两次密码不一致"));
    } else {
        callback();
    }
};
const formRules = reactive<any>({
    password: [{ validator: validatePassword, trigger: "blur", required: true }],
    confirm_password: [{ validator: validatePassword2, trigger: "change", required: true }]
});

const verifyToken = ref("");
const is_checked = ref(true);
onLoad((options: any) => {
    formState.value.mobile = options.mobile;
});


const mobileErrorCallback = (msg: string) => {
    uni.showToast({
        title: msg,
        duration: 1500,
        icon: "none"
    });
};
const formRef = ref();
const onNext = async () => {

    formRef.value
        .validate()
        .then(async () => {
            try {
                let temp = {
                    password: formState.value.password,
                    code: formState.value.mobileCode
                };
                const result = await checkModifyPasswordMobileCode({ ...temp });
                uni.showToast({
                    title: result.message,
                    icon: "none"
                });
                setTimeout(() => {
                    // 一秒后执行这里的代码
                    uni.redirectTo({
                        url: "/pages/user/profile/index"
                    });
                }, 1000);
            } catch (error: any) {
                if (error.message) {
                    uni.showToast({
                        title: error.message,
                        icon: "none"
                    });
                }
            } finally {

            }
        })
        .catch((err: any) => {
            console.log("表单错误信息：", err);
        });

};
</script>
<style lang="scss" scoped>
.profile-edit-main {
    padding: 30rpx;


    .profile-edit-content {
        background-color: #fff;
        border-radius: 15rpx;
        padding: 20rpx;
        margin-bottom: 30rpx;
        display: flex;
        flex-direction: column;
        gap: 16rpx;


        .item {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            margin: 20rpx;

            .next {
                width: 100%;
            }

            .title {
                font-size: 24rpx;
                display: flex;
                gap: 16rpx;

                .info {
                    color: #999999;
                }
            }
        }

        .item-one {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
        }

        .btn-item {
            display: flex;
            flex-direction: column;
            margin: 20rpx;
            font-size: 24rpx;
            gap: 16rpx;

            .big-title {
                font-size: 28rpx;
            }

            .info {
                color: #999999;
            }
        }

        .input {
            padding-bottom: 10rpx;
            border-bottom: 1px solid #dfdfdf;

        }
    }
}
</style>
