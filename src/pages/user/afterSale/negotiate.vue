<template>
    <view class="negotiate">
        <block v-if="infoData.length > 0">
            <view class="negotiate-item" :class="{ user: item.user_name, store: item.admin_name }" v-for="item in infoData" :key="item.log_id">
                <view class="negotiate-item-title">
                    <view class="negotiate-title-text">{{ item.admin_name ? item.admin_name : item.user_name }}</view>
                    <view class="negotiate-title-time">{{ item.add_time }}</view>
                </view>
                <view class="negotiate-item-content">
                    <view class="negotiate-content-text"> {{ item.log_info }}</view>
                    <view class="negotiate-pics" v-if="item.return_pic && item.return_pic.length > 0">
                        <view class="pics-item" v-for="(sunItem, index) in item.return_pic" :key="index">
                            <tigImage v-model:src="item.return_pic[index].pic_thumb"></tigImage>
                        </view>
                    </view>
                </view>
                <view class="triangle"></view>
            </view>
            <saveBottomBox height="90" backgroundColor="#fff">
                <view class="btn-box" @click="handleLeaveMessage">
                    <uni-icons type="chat" color="#e9544d" size="20"></uni-icons>
                    <view class="btn-box-text">发表留言</view>
                </view>
            </saveBottomBox>
        </block>
    </view>
</template>

<script setup lang="ts">
import saveBottomBox from "@/components/saveBottomBox/index.vue";
import { onUnload, onLoad, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import { viewRecordLog } from "@/api/user/afterSale";
import type { NegotiateItem } from "@/types/user/afterSale";
const id = ref<null | number>();
const infoData = ref<NegotiateItem[]>([]);
onLoad((options) => {
    if (options && options.id) {
        id.value = options.id;
        getViewRecordLog();
    }
});

onShow(() => {
    uni.$on("refreshNegotiate", (data: number) => {
        id.value = data;
        getViewRecordLog();
    });
});

onUnload(() => {
    uni.$off("refreshNegotiate");
});

const getViewRecordLog = async () => {
    try {
        const result = await viewRecordLog(id.value!);
        infoData.value = result.item;
    } catch (error) {
        console.error(error);
    }
};

const handleLeaveMessage = () => {
    uni.navigateTo({
        url: `/pages/user/afterSale/leaveMessage?id=${id.value}`
    });
};
</script>

<style lang="scss" scoped>
.negotiate {
    padding: 30rpx 30rpx;
    .negotiate-item {
        width: 88vw;
        background-color: #fff;
        border-radius: 10rpx;
        padding: 20rpx 30rpx 20rpx 20rpx;
        filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.24));
        position: relative;
        margin-bottom: 50rpx;
        .negotiate-item-title {
            border-bottom: 1rpx solid #f5f5f5;
            display: flex;
            align-items: center;
            padding-bottom: 15rpx;
            font-size: 28rpx;

            .negotiate-title-text {
                font-weight: bold;
                padding-right: 30rpx;
            }

            .negotiate-title-time {
                font-size: 26rpx;
                color: #4e504b;
            }
        }

        .negotiate-item-content {
            .negotiate-content-reason {
                font-weight: 500;
                color: #010100;
                padding-top: 20rpx;
            }

            .negotiate-content-text {
                font-size: 24rpx;
                color: #4e504b;
                padding-top: 20rpx;
            }

            .negotiate-pics {
                padding: 20rpx 0;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-gap: 20rpx;

                .pics-item {
                    height: 160rpx;
                }
            }
        }

        &.user {
            background-color: #b2e56e;
        }
    }
}
.store {
    .triangle {
        width: 0;
        height: 0;
        border-left: 18rpx solid transparent;
        border-right: 18rpx solid transparent;
        border-bottom: 24rpx solid #fff;
        position: absolute;
        top: 28rpx;
        left: -26rpx;
        transform: rotate(270deg);
    }
}

.user {
    left: 30rpx;
    .triangle {
        width: 0;
        height: 0;
        border-left: 18rpx solid transparent;
        border-right: 18rpx solid transparent;
        border-bottom: 24rpx solid #b2e56e;
        position: absolute;
        top: 28rpx;
        right: -26rpx;
        transform: rotate(90deg);
    }
}

.btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .btn-box-text {
        padding-left: 6rpx;
        font-size: 30rpx;
        font-weight: 600;
    }
}
</style>
