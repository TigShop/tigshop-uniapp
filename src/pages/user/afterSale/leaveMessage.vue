<template>
    <view>
        <view class="leave-message">
            <uni-forms ref="formRef" :modelValue="form" label-width="170rpx" :rules="rules">
                <uni-forms-item label="问题描述" name="log_info">
                    <uni-easyinput
                        type="textarea"
                        primaryColor="rgb(192, 196, 204)"
                        maxlength="100"
                        :inputBorder="false"
                        v-model="form.log_info"
                        autoHeight
                        placeholder="为保障你的权益，请尽可能详细的描述，最多200字"
                        placeholderStyle="font-size: 26rpx;"
                    />
                </uni-forms-item>
                <uni-forms-item label="上传凭证" name="description">
                    <uni-file-picker
                        :auto-upload="false"
                        v-model="fileLists"
                        @select="handlePicSelect"
                        @delete="handlePicDelete"
                        limit="3"
                        title="最多选择3张图片"
                    >
                        <uni-icons type="camera" size="30" color="#cccccc"></uni-icons>
                    </uni-file-picker>
                </uni-forms-item>
            </uni-forms>
        </view>
        <view class="leave-message-btn">
            <tigButton :size="36" @click="handleSubmit">提交</tigButton>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { imageFormat } from "@/utils/format";
import indexConfig from "@/config/index.config";
import { aftersalesFeedback } from "@/api/user/afterSale";
import { onLoad } from "@dcloudio/uni-app";
interface ReturnPic {
    pic_name: string;
    pic_thumb: string;
    pic_url: string;
}

const form = reactive({
    log_info: "",
    return_pic: [] as ReturnPic[],
    id: 0
});
const rules = {
    log_info: {
        rules: [{ required: true, errorMessage: "留言不能为空" }]
    }
};

interface FileLists {
    name: string;
    extname: string;
    url: string;
}
const fileLists = ref<FileLists[]>([]);

onLoad((options) => {
    if (options && options.id) {
        form.id = options.id;
    }
});

const handlePicSelect = (e: any) => {
    // 兼容多端
    if (e.tempFilePaths.length === 1) {
        uploadFile(e.tempFilePaths[0]);
    } else {
        e.tempFilePaths.forEach((item: string) => {
            uploadFile(item);
        });
    }
};

const handlePicDelete = (e: any) => {
    fileLists.value.splice(e.index, 1);
};

const uploadFile = (filePath: any) => {
    let name, extname, url;
    uni.uploadFile({
        url: indexConfig.baseUrl + indexConfig.requestUrlPrefix + "user/upload_img",
        filePath,
        header: {
            Authorization: uni.getStorageSync("token")
        },
        success: (uploadFileRes: any) => {
            uni.hideLoading();
            const { data } = JSON.parse(uploadFileRes.data);
            name = data.pic_name;
            extname = data.pic_url.split(".")[1];
            url = data.pic_thumb;
            fileLists.value.push({
                name,
                extname,
                url
            });
            form.return_pic.push({
                pic_name: data.pic_name,
                pic_thumb: data.pic_thumb,
                pic_url: data.pic_url
            });
            uni.showToast({
                title: "图片上传成功"
            });
        },
        fail: (error) => {
            uni.hideLoading();

            uni.showToast({
                title: "图片上传失败",
                icon: "none"
            });
        }
    });
};
const formRef = ref();
const handleSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            __aftersalesFeedback();
        })
        .catch((err: any) => {
            console.log("表单错误信息：", err);
        });
};

const __aftersalesFeedback = async () => {
    try {
        const result = await aftersalesFeedback(form);

        uni.redirectTo({
            url: "/pages/user/afterSale/negotiate",
            success: () => {
                uni.$emit("refreshNegotiate", form.id);
            }
        });
    } catch (error) {
        console.error(error);
    }
};
</script>

<style lang="scss" scoped>
page {
    background-color: #fff;
}
.leave-message {
    background-color: #fff;
    height: 100%;
}
:deep(.special-item) {
    &.uni-forms-item {
        border-bottom: none;
        margin-bottom: 0;
    }
}
.uni-forms-item {
    margin: 10rpx 25rpx 10rpx 25rpx;
    border-bottom: 1px solid #eee;
    &:last-child {
        border-bottom: none;
        padding-bottom: 20rpx;
    }
}
.leave-message-btn {
    margin-top: 30rpx;
    padding: 0 20rpx;

    .btn-box {
        width: 100%;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $tig-color-primary;
        color: #fff;

        &:active {
            opacity: 0.7;
        }
    }
}

:deep(.uni-forms-item__error) {
    top: 75%;
}
:deep(.uni-progress-bar) {
    display: none;
}
</style>
