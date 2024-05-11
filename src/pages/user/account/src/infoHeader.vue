<template>
    <view class="top-card">
        <view class="balance-row">
            可用余额
        </view>
        <view class="amount-row">
            <FormatPrice :priceData="formState.balance"></FormatPrice>
        </view>
        <view class="button-row">
            <view class="round-button">
                <navigator class="" target="" url="/pages/user/account/deposit" hover-class="navigator-hover" open-type="navigate">充值</navigator>
            </view>
            <view class="round-button">提现</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getUser } from "@/api/user/user";
import type { UserItem } from "@/types/user/user";

const formState = ref<UserItem>({} as UserItem);
const __getUser = async () => {
    try {
        const result = await getUser();
        Object.assign(formState.value, result.item);
    } catch (error: any) {
        console.log(error.message);
    }
};

onLoad(() => {
    __getUser();
})

</script>
<style lang="scss" scoped>
.top-card {
    background: url("/src/static/images/user/background.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5px;
    margin: 10px;
    color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 60rpx;

    .balance-row,
    .amount-row,
    .button-row {
        text-align: center;
        margin: 20rpx 10px 0;
    }

    .balance-row {
        font-size: 36rpx
    }

    .amount-row {
        font-size: 52rpx;
        font-weight: 400;
    }

    .button-row {
        display: flex;
        margin-top: 60rpx;
        justify-content: space-evenly;
        gap: 10px;
        height: 60rpx;

        .round-button {
            height: 60rpx;
            line-height: 60rpx;
            border-radius: 46rpx;
            flex: 1;
            border: 1px solid white;
            color: white;
            outline: none;
            cursor: pointer;
            font-size: 24rpx;
            background-color: #fa0;
        }
    }
}
</style>