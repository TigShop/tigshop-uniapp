<template>
    <view>
        <tigButton @click="handBtn" :plain="true" :disabled="countdown < 61"  class="btn-verify"> {{ btnText }} </tigButton>
        <!-- <button @click="handBtn" class="btn-verify">{{ btnText }}</button> -->
        <Verify ref="verify" mode="pop" captchaType="blockPuzzle" :imgSize="{ width: '310px', height: '155px' }" @okCallback="okCallback"></Verify>
    </view>
</template>

<script setup lang="ts">
import { ref, toRefs, onUnmounted, computed } from "vue";
import Verify from "@/components/verifition/Verify.vue";
const props = defineProps({
    class: String,
    mobile: { type: String, default: "" },
    requestApi: { type: Function, required: true },
    isChecked: { type: Boolean, default: false },
    verifyTokenData: { type: String, default: null }
});
const emit = defineEmits(["mobileErrorCallback", "update:isChecked", "update:verifyTokenData"]);
const { mobile } = toRefs(props);
const btnText = computed(() => {
    if (countdown.value === 61) {
        return "获取验证码";
    } else if (countdown.value > 0) {
        return countdown.value + "秒后可重发";
    }
});
const countdown = ref(61);
const verifyToken = ref(null);
const verify = ref();
const handBtn = async () => {
    if (props.isChecked === false) return emit("mobileErrorCallback", "请阅读并同意协议！");
    if (countdown.value > 0 && countdown.value < 61) return;
    if (mobile.value == "") {
        emit("mobileErrorCallback", "手机号不能为空！");
        return;
    }
    if (!validatePhoneNumber(mobile.value)) {
        emit("mobileErrorCallback", "手机号格式错误");
        return;
    }
    if (!verifyToken.value) {
        verify.value.show();
        return;
    }
    try {
        const result = await props.requestApi({
            mobile: mobile.value,
            verify_token: verifyToken.value
        });
        emit("update:verifyTokenData", verifyToken.value);
        uni.showToast({
            title: "验证码已发送",
            duration: 1500
        });
        startCountdown();
    } catch (error: any) {
        emit("mobileErrorCallback", error.message);
        emit("update:verifyTokenData", "");
    } finally {
        verifyToken.value = null;
    }
};

const validatePhoneNumber = (phoneNumber: string) => {
    const internationalRegex = /^(\+?[1-9]\d{1,14})$/; // 定义支持的国际手机号格式正则表达式
    const regex = /^(?:\+?86)?1[3-9]\d{9}$/; // 国内手机号正则表达式
    // 判断是否符合国际手机号格式
    if (regex.test(phoneNumber)) {
        return true;
    } else {
        return false;
        // 判断是否符合国内手机号格式  需增加设置项
        // return internationalRegex.test(phoneNumber);
    }
};
const okCallback = (e: any) => {
    verifyToken.value = e.verifyToken;
    handBtn();
};
const timer = ref();
const startCountdown = () => {
    timer.value = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            clearInterval(timer.value);
            countdown.value = 61;
        }
    }, 1000);
};
onUnmounted(() => {
    clearInterval(timer.value);
});
</script>

<style lang="scss" scoped>
:deep(.btn-verify) {
    border-radius: 30rpx;
    background-color: #fff;
    color: #333;
    border: 1rpx solid #333;
    min-width: 200rpx;
    padding: 0 5rpx;
    line-height: 70rpx;
}
</style>
