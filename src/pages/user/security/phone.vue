<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="profile-edit-main">
            <view class="profile-edit-content">
                <view v-if="hasMobile" class="item">
                    <view class="title">
                        <view>请输入</view>
                        <view class="info">{{ mobile.replace(/(\d{2})\d*(\d{4})$/, "$1*****$2") }}</view>
                        <view>收到的短信验证码</view>
                    </view>
                </view>
                <template v-else>
                    <view class="item">
                        <view class="title">
                            <view>您还未绑定手机号，请输入手机号绑定</view>
                        </view>
                    </view>
                    <view class=" item input">
                        <uni-easyinput :inputBorder="false" :value="mobile" class="uni-input item-input" placeholder="请输入手机号" primaryColor="rgb(192, 196, 204)" @input="inputMobile"></uni-easyinput>
                    </view>
                </template>
                <view class="item input">
                    <uni-easyinput :inputBorder="false" :value="mobileCode" class="uni-input item-input" focus placeholder="手机短信验证码" primaryColor="rgb(192, 196, 204)" @input="inputMobileCode" />
                    <VerificationCode
                        v-model:isChecked="is_checked"
                        v-model:mobile="mobile"
                        v-model:verify-token-data="verifyToken"
                        :requestApi="sendMobileCodeByMobileValidate"
                        @mobileErrorCallback="mobileErrorCallback"
                    ></VerificationCode>
                </view>
                <view class="item">
                    <index :disabled="isRegisterDisabled" class="next" @click="onNext">下一步</index>
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
import { computed, ref } from "vue";
import navbar from "@/components/navbar/index.vue";
import { sendMobileCode } from "@/api/login/login";
import VerificationCode from "@/pages/login/src/verificationCode.vue";
import Index from "@/components/tigButton/index.vue";
import { mobileValidate, sendMobileCodeByMobileValidate } from "@/api/user/security";
import { onLoad } from "@dcloudio/uni-app";
const parameter = {
    navbar: "1",
    return: "1",
    title: "账户安全",
    color: false
};
const inputMobileCode = (e: any) => {
    mobileCode.value = e;
};
const inputMobile = (e: any) => {
    mobile.value = e;
};
const mobileCode = ref("");
const mobile = ref("");
const verifyToken = ref("");
const is_checked = ref(true);
const hasMobile = ref(false);
onLoad((options: any) => {
    if(options.mobile){
        hasMobile.value = true;
    }else{
        hasMobile.value = false;
    }
    mobile.value = options.mobile
});
const isRegisterDisabled = computed(() => {
    return !mobile.value || !mobileCode.value || !verifyToken.value;
});

const mobileErrorCallback = (msg: string) => {
    uni.showToast({
        title: msg,
        duration: 1500,
        icon: "none"
    });
};

const onNext = async () => {
    try {
        let temp = {
            mobile: mobile.value,
            code: mobileCode.value
        };
        const result = await mobileValidate({ ...temp });
        let url = "/pages/user/security/newPhone";
        uni.navigateTo({
            url
        });
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: 'none'
        });
    } finally {

    }

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
