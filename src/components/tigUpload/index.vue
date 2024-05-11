<template>
    <view>
        
        <uni-file-picker
            :auto-upload="false"
            v-model="fileLists"
            @select="handlePicSelect"
            @delete="handlePicDelete"
            :limit="limit"
            :title="title"
        >
            <slot></slot>
        </uni-file-picker>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { PropType } from "vue";
import indexConfig from "@/config/index.config";
import { imageFormat } from "@/utils/format";
interface FileLists {
    name: string;
    extname: string;
    url: string;
}
const props = defineProps({
    limit: {
        type: Number,
        default: 1
    },
    title: {
        type: String,
        default: "图片上传"
    },
    fileLists: {
        type: Array as PropType<FileLists[]>,
        default: () => []
    }
});
const fileLists = ref<FileLists[]>(props.fileLists);
const emit = defineEmits(["change"]);
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

const uploadFile = (filePath: any) => {
    let name, extname, url;
    uni.uploadFile({
        url: indexConfig.baseUrl + indexConfig.requestUrlPrefix + "user/upload_img", //仅为示例，非真实的接口地址
        filePath,
        header: {
            Authorization: uni.getStorageSync("token")
        },
        success: (uploadFileRes: any) => {
            uni.hideLoading();
            const { data } = JSON.parse(uploadFileRes.data);
            name = data.pic_name;
            extname = data.pic_url.split(".")[1];
            url = imageFormat(data.pic_thumb);
            fileLists.value.push({
                name,
                extname,
                url
            });
            console.log("fileLists", fileLists.value);
            // uni.showToast({
            //     title: "图片上传成功"
            // });
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
const handlePicDelete = (e: any) => {
    fileLists.value.splice(e.index, 1);
};
// const handleChoose = () => {
//     uni.chooseImage({
//         count: props.count,
//         success: async (res: any) => {
//             uni.showLoading({
//                 title: "上传中..."
//             });
//             uni.uploadFile({
//                 url: indexConfig.baseUrl + indexConfig.requestUrlPrefix + "user/user/modify_avatar", //仅为示例，非真实的接口地址
//                 filePath: res.tempFilePaths[0],
//                 header: {
//                     Authorization: uni.getStorageSync("token")
//                 },
//                 success: (uploadFileRes) => {
//                     uni.hideLoading();

//                     uni.showToast({
//                         title: "图片上传成功",
//                     });
//                     emit("change");
//                 },
//                 fail: (error) => {
//                     uni.hideLoading();

//                     uni.showToast({
//                         title: "图片上传失败",
//                         icon: "none"
//                     });
//                 }
//             });
//         },
//         fail: (error) => {
//             uni.showToast({
//                 title: "图片选择失败",
//                 icon: "none"
//             });
//         }
//     });
// };
</script>

<style lang="scss" scoped></style>
