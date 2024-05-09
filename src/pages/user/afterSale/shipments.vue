<template>
    <view>
        <view class="leave-message">
            <uni-forms ref="formRef" :modelValue="form" label-width="170rpx" :rules="rules">
                <uni-forms-item label="详细地址：" name="logistics_name">
                    <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="form.logistics_name" placeholder="请您填写快递公司" />
                </uni-forms-item>
                <uni-forms-item label="详细地址：" name="tracking_no">
                    <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="form.tracking_no" placeholder="请您填写快递单号" />
                </uni-forms-item>
            </uni-forms>
        </view>
        <view class="leave-message-btn">
            <view class="btn-box" @click="handleSubmit">提交</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { aftersalesFeedback } from "@/api/user/afterSale";
import { onLoad } from "@dcloudio/uni-app";
const form = reactive({
    logistics_name: "",
    tracking_no: "",
    id: 0
});
const rules = {
    logistics_name: {
        rules: [{ required: true, errorMessage: "快递公司不能为空" }]
    },
    tracking_no: {
        rules: [{ required: true, errorMessage: "快递单号不能为空" }]
    }
};

onLoad((options) => {
    if (options && options.id) {
        form.id = options.id;
    }
});

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
            url: "/pages/user/afterSale/info",
            success: () => {
                uni.$emit("refreshInfo", form.id);
            }
        });
    } catch (error) {
        console.error(error);
    }
};
</script>

<style lang="scss" scoped>
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
    padding: 20rpx 0;
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
    top: 70%;
    left: 3.5%;
}
</style>
