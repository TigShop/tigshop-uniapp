<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="profile-edit-main">
            <uni-forms ref="formRef" :modelValue="form" label-width="170rpx">
                <view class="profile-edit-content">
                    <uni-forms-item label="用户ID" name="username">
                        <uni-easyinput v-model="form.dim_username" :inputBorder="false" disabled primaryColor="rgb(192, 196, 204)" />
                    </uni-forms-item>
                    <uni-forms-item label="昵称" name="nickname">
                        <uni-easyinput v-model="form.nickname" :inputBorder="false" placeholder="请输入昵称" primaryColor="rgb(192, 196, 204)" />
                    </uni-forms-item>
                    <uni-forms-item label="出生日期" name="birthday">
                        <uni-datetime-picker v-model="form.birthday" :border="false" :clear-icon="false" type="date" @change="handleDateChange" />
                    </uni-forms-item>
<!--                    <uni-forms-item label="性别" name="sex">-->
<!--                        <picker :range="genderList" :value="selectedGender" mode="selector" @change="onPickerChange">-->
<!--                            <view style="line-height: 78rpx;text-align: right;">{{ genderList[selectedGender] }}</view>-->
<!--                        </picker>-->
<!--                    </uni-forms-item>-->
                </view>
                <view class="profile-edit-content">
                    <uni-forms-item label="登录密码" @click="goPages('/pages/user/security/password'+'?mobile='+form.mobile,'password')">
                        <view class="el-input-id">
                            修改
                            <view class="iconfont icon-xiangyou"></view>
                        </view>
                    </uni-forms-item>
                    <uni-forms-item label="手机号码" @click="goPages('/pages/user/security/phone'+'?mobile='+form.mobile)">
                        <view class="el-input-id">
                            {{ form.showMobile }}
                            <view class="iconfont icon-xiangyou"></view>
                        </view>
                    </uni-forms-item>
                </view>
            </uni-forms>
        </view>
        <saveBottomBox :height="110" backgroundColor="#fff">
            <view class="btn-box">
                <tigButton plain style="width: 50%; height: 70rpx" @click="onLogout"> 退出登录 </tigButton>
                <tigButton style="width: 50%; height: 70rpx" @click="onSubmit"> 保存修改 </tigButton>
            </view>
        </saveBottomBox>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import { nextTick, reactive, ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { getProfile, updateProfile } from "@/api/user/profile";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const parameter = {
    navbar: "1",
    return: "1",
    title: "个人资料",
    color: false
};
const form = reactive<any>({
    nickname: "",
    birthday: "",
    mobile: ""
});
const handleDateChange = (date: string) => {
    form.birthday = date;
};
const selectedGender = ref(0);
const genderList = ref(["保密", "男", "女"]);
const onPickerChange = (e: any) => {
    selectedGender.value = e.detail.value;
};
const goPages = (url: string, type?: string) => {
    console.log(url);


    if (type == "password" && form.mobile == "") {
        uni.showToast({
            title: "未绑定手机号，请先绑定手机号再修改密码",
            icon: "none"
        });
        return;
    }
    uni.navigateTo({
        url
    });
};

const rules = {
    nickname: {
        rules: [{ required: true, errorMessage: "请您填写用户昵称" }]
    }
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
const onLogout = () => {
    uni.clearStorageSync();
    userStore.logout();
    uni.navigateBack();
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
                success: function(res) {
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
        let temp: any = result.item.mobile;
        result.item.showMobile = temp.replace(/(\d{2})\d*(\d{4})$/, "$1*****$2");
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
    background-color: #fff !important;
}

:deep(.icon-calendar) {
    display: none;
}

:deep(.uni-date__x-input) {
    text-align: right;
    color: #333;
}

.profile-edit-main {
    padding: 20rpx;

    .profile-edit-content {
        background-color: #fff;
        border-radius: 15rpx;
        padding: 20rpx;
        margin-bottom: 20rpx;

        .el-input-id {
            height: 100%;
            color: #999999;
            font-size: 24rpx;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
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