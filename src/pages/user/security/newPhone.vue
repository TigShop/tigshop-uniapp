<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="profile-edit-main">
            <view class="profile-edit-content">
                <view class=" item input">
                    <uni-easyinput :inputBorder="false" :value="mobile" class="uni-input item-input" placeholder="请输入新手机号" primaryColor="rgb(192, 196, 204)" @input="inputMobile"></uni-easyinput>
                </view>
                <view class="item input">
                    <uni-easyinput :inputBorder="false" :value="mobileCode" class="uni-input item-input" focus placeholder="新手机短信验证码" primaryColor="rgb(192, 196, 204)" @input="inputMobileCode" />
                    <VerificationCode
                        v-model:isChecked="is_checked"
                        v-model:mobile="mobile"
                        v-model:verify-token-data="verifyToken"
                        :requestApi="sendMobileCodeByMobileMobile"
                        @mobileErrorCallback="mobileErrorCallback"
                    ></VerificationCode>
                </view>
                <view class="item">
                    <index :disabled="isRegisterDisabled" class="next" @click="onsubmit">提交</index>
                    <!--                    <index class="next" @click="onsubmit">提交</index>-->
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
import { mobileMobile, sendMobileCodeByMobileMobile } from "@/api/user/security";

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

const onsubmit = async () => {
    try {
        let temp = {
            mobile: mobile.value,
            code: mobileCode.value
        };
        const result = await mobileMobile({ ...temp });
        uni.showToast({
            title: result.message,
            icon: 'none'
        });
        setTimeout(() => {
            // 一秒后执行这里的代码
            uni.redirectTo({
                url:'/pages/user/profile/index'
            });
        }, 1000);
    } catch (error: any) {
        if (error.message) {
            uni.showToast({
                title: error.message,
                icon: 'none'
            });
        }
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
            gap: 8rpx;

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
