<template>
    <view class="recharge-box">
        <view class="recharge-wrap" v-if="filterState.length > 0">
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
                        <!-- <uni-easyinput primaryColor="#fcc282" :styles="{borderColor:'#fef7ec',color:'#d7ac53'}" :focus="inputFocus" type="number" v-model="pay.amount" :clear-icon="false" /> -->
                        <uni-easyinput :focus="inputFocus" type="number" v-model="pay.amount" :clear-icon="false" />
                    </view>
                    <view class="recharge-give">自定义金额</view>
                </view>
            </block>
        </view>
        <saveBottomBox :height="110" backgroundColor="#fff">
            <view class="btn-box">
                <tigButton plain style="width: 50%; height: 70rpx" @click="backDetail"> 取消充值 </tigButton>
                <tigButton style="width: 50%; height: 70rpx" @click="onSubmit"> 提交申请 </tigButton>
            </view>
        </saveBottomBox>
    </view>
</template>

<script lang="ts" setup>
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getDepositList, updateRechargeOrder } from "@/api/user/account";
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

const inputFocus = ref(false);
const selectCard = (index: number) => {
    index === 5 ? inputFocus.value = true : inputFocus.value = false;
    filterState.value.forEach((item, idx) => {
        item.selected = idx === index;
    });
};

const pay = ref<any>({
    id: 0,
    amount: null,
    money: "",
    payType:'recharge'
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
        // console.log(pay.value);
        // const payParams:any = Object.keys(pay.value).map(key => `${key}=${encodeURIComponent(pay.value[key])}`).join('&');
        // console.log(payParams);
        // uni.navigateTo({
        //     url: `/pages/user/pay/index?${payParams}`
        // })
        __updateRechargeOrder(pay.value);
    } else {
        uni.showToast({
            title: '请选择充值金额',
            icon: "none",
            duration: 1000
        });
    }
};

const __updateRechargeOrder = async (data: object) => {
    try {
        const result = await updateRechargeOrder(data);
        uni.navigateTo({
            url: `/pages/order/pay?order_id=${result.order_id}&type=recharge`
        })
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
}

const emit = defineEmits(["backDetail"]);
const backDetail = () => {
    emit('backDetail');
}

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
            border:2rpx solid #eee;
            padding:30rpx 0;
            text-align:center;
            font-size:28rpx;
            border-radius:10rpx;
            color:$tig-color-primary;
            margin:1%;
            &.selected {
                border:2rpx solid $tig-color-primary;
            }
            &:last-child {
                background: #fff;
            }
            &:last-child .recharge-amount {
                margin: 0 20rpx 4rpx 20rpx;
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

:deep(.uni-easyinput__content-input) {
    height: 40rpx;
}
:deep(.uniui-clear) {
    display: none;
}
:deep(.is-input-border) {
    color: $tig-color-primary !important;
}
:deep(.is-input-border.is-focused) {
    border-color: $tig-color-primary !important;
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