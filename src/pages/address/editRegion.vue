<template>
    <view style="padding-bottom: env(safe-area-inset-bottom)">
        <navbar :parameter="parameter"></navbar>
        <view class="address-edit-main">
            <view class="address-edit-content">
                <uni-forms ref="formRef" :modelValue="form" label-width="170rpx">
                    <uni-forms-item label="收货人：" name="consignee">
                        <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="form.consignee" placeholder="请输入姓名" />
                    </uni-forms-item>
                    <uni-forms-item label="所在地区：" name="regionNames">
                        <uni-easyinput
                            @iconClick="handleShowSelectRegion"
                            @focus="handleShowSelectRegion"
                            style="background-color: #fff"
                            suffixIcon="right"
                            primaryColor="rgb(192, 196, 204)"
                            :inputBorder="false"
                            v-model="form.regionNames"
                            placeholder="点击选择所在地区"
                        />
                    </uni-forms-item>
                    <uni-forms-item label="详细地址：" name="address">
                        <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="form.address" placeholder="请您填写详细收货地址" />
                    </uni-forms-item>
                    <uni-forms-item label="手机号码：" name="mobile">
                        <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="form.mobile" placeholder="请输入手机号码" />
                    </uni-forms-item>
                    <uni-forms-item label="固定电话：" name="telephone">
                        <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="form.telephone" placeholder="请输入固定电话" />
                    </uni-forms-item>
                    <uni-forms-item label="邮箱地址：" name="email">
                        <uni-easyinput primaryColor="rgb(192, 196, 204)" :inputBorder="false" v-model="form.email" placeholder="请输入邮箱地址" />
                    </uni-forms-item>
                </uni-forms>
            </view>
        </view>
        <saveBottomBox :height="90" backgroundColor="#fff">
            <view class="btn-box">
                <tigButton style="width: 100%;" @click="onSubmit"> 提交 </tigButton>
            </view>
        </saveBottomBox>

        <selectRegion v-model:show="showSelectRegion" v-model="form.region_ids" @sendRegionNames="getRegionNames"></selectRegion>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import selectRegion from "@/components/region/selectRegion.vue";
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import { nextTick, reactive, ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { getAddressData, updateAddressData } from "@/api/user/address";

const parameter = reactive({
    navbar: "1",
    return: "1",
    title: "添加地址"
});
const id = ref(null);
const form = reactive({
    consignee: "",
    region_ids: [] as number[],
    address: "",
    mobile: "",
    telephone: "",
    email: "",
    regionNames: ""
});
const rules = {
    consignee: {
        rules: [{ required: true, errorMessage: "请您填写收货人姓名" }]
    },
    regionNames: {
        rules: [
            { required: true, errorMessage: "请选择所在地区" },
            {
                validateFunction: function (rule: any, value: any, data: any, callback: any) {
                    if (form.region_ids.length < 1) {
                        callback("请选择所在地区");
                    }
                    return true;
                }
            }
        ]
    },
    address: {
        rules: [{ required: true, errorMessage: "请您填写详细收货地址" }]
    },
    mobile: {
        rules: [
            { required: true, errorMessage: "请您填写收货人手机号码" },
            {
                validateFunction: function (rule: any, value: any, data: any, callback: any) {
                    const regex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
                    const status = regex.test(value);
                    if (!status) {
                        callback("请输入正确的手机号码");
                    }
                    return true;
                }
            }
        ]
    }
};

onShow(() => {
    nextTick(() => {
        formRef.value.setRules(rules);
    });
});

onLoad((option: any) => {
    if (option && option.id) {
        parameter.title = "编辑地址";
        id.value = option.id;
        __getAddressData();
    }
});

const __getAddressData = async () => {
    try {
        const result = await getAddressData({ id: id.value });
        const { region_names } = result.item;
        Object.assign(form, result.item);
        form.regionNames = region_names.join(" ");
    } catch (error) {
        console.error(error);
    }
};

const getRegionNames = (val: string[]) => {
    form.regionNames = val.join(" ");
};

const regionValidator = () => form.region_ids.length > 0;

const showSelectRegion = ref(false);
const handleShowSelectRegion = () => {
    showSelectRegion.value = true;
};

const formRef = ref();
const onSubmit = (values: any) => {
    formRef.value
        .validate()
        .then(() => {
            if (id.value) {
                edit();
            } else {
                add();
            }
        })
        .catch((err: any) => {
            console.log("表单错误信息：", err);
        });
};

const add = async () => {
    try {
        const result = await updateAddressData(form);
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

const edit = async () => {
    try {
        const result = await updateAddressData({ id: id.value, ...form });
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
</script>

<style lang="scss" scoped>
:deep(.uni-forms-item) {
    margin-bottom: 30rpx;
}
:deep(.uni-forms-item__error) {
    top: 90%;
    left: 18rpx;
}
:deep(.uni-easyinput__placeholder-class) {
    font-size: 26rpx;
}
:deep(.uni-forms-item__label) {
    font-size: 26rpx;
}
:deep(.is-disabled) {
    background-color: #fff;
}

.btn-box {
    padding: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.address-edit-main {
    padding: 30rpx;

    .address-edit-content {
        background-color: #fff;
        border-radius: 15rpx;
        padding: 20rpx;
    }
}

.button-position {
    position: fixed;
    bottom: 30rpx;
    left: 0;
    right: 0;
    padding: 0 30rpx;
}
</style>
