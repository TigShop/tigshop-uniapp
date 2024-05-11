<template>
    <view @click="handleChoose">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import indexConfig from "@/config/index.config";
const props = defineProps({
    count: {
        type: Number,
        default: 1
    },
    modelValue: {
        type: String,
        default: ""
    },
    requestUrl: {
        type: String,
        default: "user/upload_img"
    }
});
const files = ref<string[]>([])
const emit = defineEmits(["update:modelValue", "change"]);

const handleChoose = () => {
    uni.chooseImage({
        count: props.count,
        success: async (res: any) => {
            uni.showLoading({
                title: "上传中..."
            });
            console.log(res.tempFilePaths)
            res.tempFilePaths.map((file: string) => {
                uni.uploadFile({
                    url: indexConfig.baseUrl + indexConfig.requestUrlPrefix + props.requestUrl, //仅为示例，非真实的接口地址
                    filePath: file,
                    header: {
                        Authorization: uni.getStorageSync("token")
                    },
                    success: (uploadFileRes) => {
                        if(props.count > 1){
                            console.log(uploadFileRes.data)
                            files.value.push(JSON.parse(uploadFileRes.data).data)
                            console.log(files.value)
                            emit("update:modelValue", files.value)
                            uni.hideLoading();
                        }else{
                            uni.showToast({
                                title: "图片上传成功",
                            });
                            emit("change");
                            uni.hideLoading();
                        }
                    },
                    fail: (error) => {
                        uni.hideLoading();
                        uni.showToast({
                            title: "图片上传失败",
                            icon: "none"
                        });
                    }
                });
            })
            
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
