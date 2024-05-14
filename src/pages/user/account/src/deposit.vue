<template>
    <view class="recharge-box">
        <view class="recharge-wrap">
            <block v-for="(item, index) in filterState" :key="index">
                <view v-if="item.recharge_id!=0" class="recharge-item" :class="{ selected : item.selected}" @click="selectCard(index)">
                    <view class="recharge-amount">
                        <FormatPrice :priceData="item.money" :currencyStyle="{fontSize:'11px',lineHeight:'24px'}"></FormatPrice>
                    </view>
                    <view class="recharge-give" v-if="Number(item.discount_money)>0">
                        赠送 <FormatPrice :priceData="item.discount_money" :fontStyle="{fontSize:'11px'}"></FormatPrice>
                    </view>
                </view>
                <view v-else class="recharge-item" :class="{ selected : item.selected}" @click="selectCard(index)">
                    <view class="recharge-amount">
                        <uni-easyinput primaryColor="rgb(192, 196, 204)" v-model="pay.amount" :inputBorder="false" placeholder="" :clear-icon="false" />
                    </view>
                    <view class="recharge-give">自定义金额</view>
                </view>
            </block>
        </view>
        <view class="button-position">
            <button hover-class="base-button-hover" class="base-button recharge-btn" @click="onSubmit">提交申请</button>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getDepositList } from "@/api/user/account";
import type { DepositFilterState } from "@/types/user/account";

const filterState = ref<DepositFilterState[]>([]);
const __getDepositList = async () => {
    uni.showLoading({
        title: "加载中"
    });
    try {
        const result = await getDepositList();
        filterState.value = result.filter_result;
        //自定义金额
        let temp: any = {
            recharge_id: 0
        };
        filterState.value.push(temp);
        filterState.value.forEach((item: any) => {
            item.selected = false;
        });
    } catch (error: any) {
        console.log(error.message);
    } finally {
        uni.hideLoading();
    }
};

const selectCard = (index: number) => {
    filterState.value.forEach((item, idx) => {
        item.selected = idx === index;
    });
};

const pay = ref<any>({
    id: 0,
    amount: null,
    money: "",
    payType:'wechat'
});
const onSubmit = () => {
    let flag = false;
    filterState.value.forEach((item, idx) => {
        if (item.selected) {
            flag = true;
            pay.value.id = item.recharge_id;
            if (item.recharge_id != 0) {
                pay.value.amount = null;
                pay.value.money = item.money;
            } else {
                pay.value.money = pay.value.amount;
            }

        }
    });
    if (flag) {
        console.log(pay.value);
        const payParams = Object.keys(pay.value).map(key => `${key}=${encodeURIComponent(pay.value[key])}`).join('&');
        console.log(payParams);
        uni.navigateTo({
            url: `/pages/user/pay/index?${payParams}`
        })
    } else {
        uni.showToast({
            title: '请选择充值金额',
            icon: "none",
            duration: 1000
        });
    }
};

onLoad(() => {
    __getDepositList();
})
</script>
<style lang="scss" scoped>
.recharge-box {
    margin: 0 10px;
    margin-top: 20px;
    border-radius: 10rpx;
    background: #fff;
    .recharge-wrap {
        padding:20rpx;
        display:flex;
        flex-wrap:wrap;
        align-content:flex-start;
        .recharge-item {
            width:31.3%;
            border:2rpx solid #fef7ec;
            padding:30rpx 0;
            text-align:center;
            font-size:28rpx;
            border-radius:10rpx;
            color:#d7ac53;
            margin:1%;
            &.selected {
                border:2rpx solid #fcc282;
            }
            &:last-child {
                background: #fff;
            }
            &:last-child .recharge-amount {
                border-bottom: 1rpx solid #fef7ec;
                margin: 0 20rpx 10rpx 20rpx;
            }
            .recharge-amount {
                font-weight:500;
                font-size:32rpx;
            }
            .recharge-give {
                font-size:22rpx;
                font-weight:300
            }
        }
    }
}
.recharge-btn {
    background: linear-gradient(90deg,#fee2b7,#fdc383);
    color: #5d3324;
    &::after {
        border: 0;
    }
}
:deep(.uni-easyinput__content-input) {
    height: 48rpx;
}
:deep(.uniui-clear) {
    display: none;
}
</style>