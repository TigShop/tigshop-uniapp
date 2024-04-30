<template>
    <view @click="handleChoose">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import indexConfig from "@/config/index.config";
const props = defineProps({
    count: {
        type: Number,
        default: 1
    },
    modelValue: {
        type: String,
        default: ""
    }
});
const emit = defineEmits(["update:modelValue", "change"]);

const handleChoose = () => {
    uni.chooseImage({
        count: props.count,
        success: async (res: any) => {
            uni.showLoading({
                title: "上传中..."
            });
            uni.uploadFile({
                url: indexConfig.baseUrl + indexConfig.requestUrlPrefix + "user/user/modify_avatar", //仅为示例，非真实的接口地址
                filePath: res.tempFilePaths[0],
                header: {
                    Authorization: uni.getStorageSync("token")
                },
                success: (uploadFileRes) => {
                    uni.hideLoading();

                    uni.showToast({
                        title: "图片上传成功",
                    });
                    emit("change");
                },
                fail: (error) => {
                    uni.hideLoading();

                    uni.showToast({
                        title: "图片上传失败",
                        icon: "none"
                    });
                }
            });
        },
        fail: (error) => {
            uni.showToast({
                title: "图片选择失败",
                icon: "none"
            });
        }
    });
};
</script>

<style lang="scss" scoped></style>
