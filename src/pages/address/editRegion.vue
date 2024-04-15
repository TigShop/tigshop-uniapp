<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="address-edit-main">
            <view>
                <van-form @submit="onSubmit">
                    <van-cell-group inset>
                        <van-field
                            v-model="form.consignee"
                            name="consignee"
                            label="收货人："
                            placeholder="请输入姓名"
                            :rules="[{ required: true, message: '请您填写收货人姓名' }]"
                        />

                        <van-field
                            v-model="regionNames"
                            is-link
                            readonly
                            name="regionValidator"
                            label="所在地区："
                            placeholder="点击选择所在地区"
                            @click="handleShowSelectRegion"
                            :rules="[{ validator: regionValidator, message: '请您选择所在地区' }]"
                        />
                        <van-field
                            v-model="form.address"
                            name="address"
                            label="详细地址："
                            placeholder="请输入详细地址"
                            :rules="[{ required: true, message: '请您填写详细收货地址' }]"
                        />
                        <van-field
                            v-model="form.mobile"
                            name="mobile"
                            label="手机号码："
                            placeholder="请输入手机号码"
                            :rules="[{ required: true, message: '请您填写收货人手机号码' }]"
                        />
                        <van-field v-model="form.telephone" name="telephone" label="固定电话：" placeholder="请输入固定电话" />
                        <van-field v-model="form.email" name="email" label="邮箱地址：" placeholder="请输入邮箱地址" />
                    </van-cell-group>
                    <div style="margin: 16px">
                        <van-button round block type="danger" native-type="submit"> 保存 </van-button>
                    </div>
                </van-form>
            </view>
        </view>

        <selectRegion v-model:show="showSelectRegion" v-model="form.region_ids" @sendRegionNames="getRegionNames"></selectRegion>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import selectRegion from "@/components/region/selectRegion.vue";
import { reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
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
    email: ""
});
const regionNames = ref("");

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
        regionNames.value = region_names.join(" ");
    } catch (error) {
        console.error(error);
    }
};

const getRegionNames = (val: string[]) => {
    regionNames.value = val.join(" ");
};

const regionValidator = () => form.region_ids.length > 0;

const showSelectRegion = ref(false);
const handleShowSelectRegion = () => {
    showSelectRegion.value = true;
};
const onSubmit = (values: any) => {
    if (id.value) {
        edit();
    } else {
        add();
    }
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
                    uni.$emit("refreshData"); // 发送刷新信号和数据
                }
            });
        }, 1000);
    } catch (error) {
        console.error(error);
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
                    uni.$emit("refreshData"); // 发送刷新信号和数据
                }
            });
        }, 1000);
    } catch (error) {
        console.error(error);
    }
};
</script>

<style lang="scss" scoped>
.address-edit-main {
    padding: 20rpx 0;
}
</style>
