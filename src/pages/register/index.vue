<template>
    <view class="register-container">
        <navbar :parameter="parameter"></navbar>
        <view class="register-warp">
            <view class="h1_tit">会员注册</view>
        </view>
        <view class="form-con">
            <uni-easyinput :inputBorder="false" :value="mobile" class="uni-input item-input" placeholder="请输入手机号" primaryColor="rgb(192, 196, 204)" @input="inputMobile"></uni-easyinput>
        </view>
        <view class="form-con fl-item">
            <uni-easyinput :inputBorder="false" :value="mobileCode" class="uni-input item-input lf-input" focus placeholder="手机短信验证码" primaryColor="rgb(192, 196, 204)" @input="inputMobileCode" />
            <VerificationCode
                v-model:isChecked="is_checked"
                v-model:mobile="mobile"
                v-model:verify-token-data="verifyToken"
                :requestApi="sendMobileCode"
                @mobileErrorCallback="mobileErrorCallback"
            ></VerificationCode>
        </view>
        <view class="form-con fl-item">
            <uni-easyinput :inputBorder="false" :value="password" class="uni-input item-input" focus placeholder="密码" primaryColor="rgb(192, 196, 204)" type="password" @input="inputPassword" />
        </view>
        <view class="form-con fl-item">
            <view class="lf-input  registration-agreement">
                <tigCheckbox v-model:checked="is_checked" :checkedSize="0.6" checkedText="《注册协议》"></tigCheckbox>
            </view>
            <view class="lf-input fl-item">
                <view>已有账号？</view>
                <navigator class="red" url="/pages/login/index">立即登录</navigator>
            </view>
        </view>
        <view class="form-con">
            <button :disabled="isRegisterDisabled" :loading="loginLoading" type="warn" @click="onRegister">注 册</button>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import navbar from "@/components/navbar/index.vue";
import { useUserStore } from "@/store/user";
import { sendMobileCode } from "@/api/login/login";
import VerificationCode from "@/pages/login/src/verificationCode.vue";
import tigCheckbox from "@/components/tigCheckbox/index.vue";

const userStore = useUserStore();

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "注册"
});
const inputMobile = (e: any) => {
    mobile.value = e;
};
const inputMobileCode = (e: any) => {
    mobileCode.value = e;
};
const inputPassword = (e: any) => {
    password.value = e;
};

const mobile = ref("");
const mobileCode = ref("");
const password = ref("");
const is_checked = ref(false);
const verifyToken = ref("");
const loginLoading = ref(false);
const isRegisterDisabled = computed(() => {
    return !mobile.value || !mobileCode.value || !password.value || !verifyToken.value;
});

const onRegister = () => {

};

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

        .h1_tit {
            font-size: 36rpx;
            padding: 40rpx;
            font-weight: bold;
            color: #333333;
        }


    }

    .form-con {
        padding: 20rpx 40rpx;

        .item-input {
            border-bottom: 0.03125rem solid #eee;

            font-size: 28rpx;
            color: #252525;

        }
    }

    .fl-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;

        .lf-input {
            flex: 1;
        }

        .registration-agreement {
            display: flex;
            align-items: center;
            color: #999999;

        }

    }
}

.submit_btn {

}

:deep(.is-input-border) {
    border: none; /* 首先清除所有边框 */
    border-radius: 0;
    border-bottom: 0.05rem solid;
}
</style>
