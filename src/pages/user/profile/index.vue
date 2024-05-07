<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="profile-edit-main">
            <uni-forms ref="formRef" :modelValue="form" label-width="170rpx">
                <view class="profile-edit-content">
                    <uni-forms-item label="用户ID" name="username">
                        <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" disabled v-model="form.dim_username" />
                    </uni-forms-item>
                    <uni-forms-item label="昵称" name="nickname">
                        <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="form.nickname" placeholder="请输入昵称" />
                    </uni-forms-item>
                    <uni-forms-item label="出生日期" name="birthday">
                        <uni-datetime-picker type="date" v-model="form.birthday" :border="false" @change="handleDateChange" :clear-icon="false" />
                    </uni-forms-item>
                    <!-- <uni-forms-item label="性别" name="sex">
                        <picker mode="selector" :range="genderList" :value="selectedGender" @change="onPickerChange">
                            <view style="line-height: 78rpx;text-align: right;">{{genderList[selectedGender]}}</view>
                        </picker>
                    </uni-forms-item> -->
                </view>
                <view class="profile-edit-content">
                    <uni-forms-item label="账户与安全">
                        <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" disabled placeholder="修改密码等" suffixIcon="right" @click="goPages('/pages/user/security/info')" />
                    </uni-forms-item>
                    <uni-forms-item label="手机号码">
                        <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" disabled :placeholder="form.mobile" suffixIcon="right" @click="goPages('/pages/user/security/info')" />
                    </uni-forms-item>
                </view>
            </uni-forms>
        </view>
        <view class="button-position">
            <button hover-class="base-button-hover" class="base-button" @click="onSubmit">提交</button>
        </view>

    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { ref, reactive, nextTick } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { getProfile, updateProfile } from "@/api/user/profile";
const parameter = {
    navbar: "1",
    return: "1",
    title: "个人资料",
    color: false
};
const form = reactive<any>({
    nickname: "",
    birthday: ""
});
const handleDateChange = (date:string) => {
    form.birthday = date
}
const selectedGender = ref(0);
const genderList = ref(['保密', '男', '女']);
const onPickerChange = (e:any) => {  
    selectedGender.value = e.detail.value;
};
const goPages = (url: string) => {
    uni.navigateTo({
        url
    });
};

const rules = {
    nickname: {
        rules: [{ required: true, errorMessage: "请您填写用户昵称" }]
    },
};

const formRef = ref();
const onSubmit = (values: any) => {
    formRef.value
        .validate()
        .then(() => {
            edit();
        })
        .catch((err: any) => {
            console.log("表单错误信息：", err);
        });
};

const edit = async () => {
    try {
        const result = await updateProfile({ ...form });
        if (result.message) {
            uni.showToast({
                title: result.message,
                icon: "none",
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

onShow(() => {
    nextTick(() => {
        formRef.value.setRules(rules);
    });
});

onLoad(() => {
    __getProfile();
});

const __getProfile = async () => {
    uni.showLoading({
        title: "加载中..."
    });
    try {
        const result = await getProfile();
        result.item.mobile = result.item.mobile?.replace(/(\d{2})\d*(\d{4})$/, "$1*****$2");
        Object.assign(form, result.item);
    } catch (error) {
        console.error(error);
    } finally {
        uni.hideLoading();
    }
};
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
    left: 18rpx;
}
:deep(.uni-input-input) {
    text-align: right;
}
:deep(.uni-easyinput__placeholder-class) {
    font-size: 26rpx;
    text-align: right;
}
:deep(.is-disabled) {
    background-color: #fff!important;
}
:deep(.icon-calendar) {
    display: none;
}
:deep(.uni-date__x-input) {
    text-align: right;
    color: #333;
}
.profile-edit-main {
    padding: 30rpx;
    .profile-edit-content {
        background-color: #fff;
        border-radius: 15rpx;
        padding: 20rpx;
        margin-bottom: 30rpx;
    }
}

.button-position {
    position: fixed;
    bottom: 30rpx;
    left: 0;
    right: 0;
    padding: 0 30rpx;
    padding-bottom: env(safe-area-inset-bottom) !important;
}
</style>
