<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="message-main">
            <view class="head-tabs-box" :style="'top:' + navH + 'rpx'">
                <view class="tabs flex align-center justify-between">
                    <view class="flex align-end">
                        <view class="tab" :class="{'active': filterParams.unread === 0}" @click="readReadFn(0)">全部消息</view>
                        <view class="tab" :class="{'active': filterParams.unread === 1}" @click="readReadFn(1)">只看未读</view>
                    </view>
                    <view class="clear-unread flex align-end" @click="addMessageAllReadFn">
                        <text>一键已读</text>
                        <uni-icons type="auth" size="20" color="#999"></uni-icons>
                    </view>
                </view>
            </view>
            <view class="messages-list" v-if="messageList.length > 0">
                <uni-swipe-action>
                    <block v-for="(item, index) in messageList" :key="index">
                        <view class="move-item">
                            <uni-swipe-action-item :threshold="0" autoClose>
                                <view class="mitem" @click="__addMessageRead(item)">
                                    <view class="message">
                                        <view class="title">
                                            <text class="dot" v-if="item.is_read === 0"></text>
                                            <text>{{ item.title }}</text>
                                        </view>
                                        <view class="txt">{{ item.content }}</view>
                                        <view class="time">{{ item.add_time }}</view>
                                    </view>
                                </view>
                                <template #right>
                                    <view class="message-move-box">
                                        <view class="btn-del" @click="__delMessage(item.message_id, index)"><text>删除</text></view>
                                    </view>
                                </template>
                            </uni-swipe-action-item>
                        </view>
                    </block>
                </uni-swipe-action>
            </view>
            <view class="empty-box" v-if="messageList.length === 0 && loadend === true">
                <view class="pictrue"><image src="/static/images/common/data_empty.png"></image></view>
                <view class="txt">暂无站内消息！</view>
            </view>
            <view class="loading-box" v-if="filterParams.page > 1">
                <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
                <view v-else>没有更多了~</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { ref, reactive } from "vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { getMessageList, addMessageRead, addMessageAllRead, delMessage } from "@/api/user/messageLog";
import type { UserMsgFilterParams, UserMsgFilterState } from "@/types/user/messageLog";
import { useConfigStore } from "@/store/config";
const configStore = useConfigStore();
const navH = configStore.navHeight;
const parameter = {
    navbar: "1",
    return: "1",
    title: "站内信",
    color: false
};
const filterParams = reactive<UserMsgFilterParams>({   //初使化用于查询的参数
    page: 1,
    size: 10,
    unread: 0
});
const total = ref(0);
const loaded = ref(false);
const loadend = ref(false);
const messageList = ref<UserMsgFilterState[]>([]);
const __geMessageList = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    } else {
        uni.showLoading({
            title: "加载中"
        });
    }
    uni.showLoading({
        title: "请求加载中..."
    });
    try {
        const result = await getMessageList({ ...filterParams });
        total.value = result.total;
        messageList.value = [...messageList.value, ...result.filter_result];
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    } finally {
        uni.hideLoading();
        loaded.value = false;
        loadend.value = true;
        uni.hideLoading()
    }
};

const __delMessage = (id: number, index:number) => {
    uni.showModal({
        title: "提示",
        content: "确定删除此条站内信吗？",
        success: async (res) => {
            if (res.confirm) {
                deleteMsg(id, index);
            }
        }
    });
};
const deleteMsg = async (id: number, index:number) => {
    try {
        const result = await delMessage({ id: id });
        messageList.value.splice(index, 1)
        if (result.message) {
            uni.showToast({
                title: result.message,
                icon: "none"
            });
        }
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
};

const __addMessageRead = async (data: UserMsgFilterState) => {
    try {
        if (data.is_read !== 1){
            await addMessageRead(data.message_id);
            data.is_read = 1;
        }
        uni.navigateTo({
            url: data.link
        })
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
};

const addMessageAllReadFn = async () => {
    try {
        await addMessageAllRead();
        filterParams.unread = 0;
        filterParams.page = 1;
        messageList.value = [];
        await __geMessageList()
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
};

const readReadFn = async (type: number) => {
    filterParams.unread = type;
    try {
        filterParams.page = 1;
        messageList.value = [];
        await __geMessageList();
    } catch (error: any) {
        uni.showToast({
            title: error.message,
            icon: "none",
            duration: 1000
        });
    }
};

onLoad(() => {
    __geMessageList();
});

onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        __geMessageList();
    }
});
</script>

<style lang="scss" scoped>
.head-tabs-box{
    position: fixed;
    width: 100%;
    z-index: 99;
    .tabs{
        background-color: #fff;
        padding: 30rpx;
        .tab{
            font-size: 26rpx;
            margin-right: 40rpx;
            color: #666;
        }
        .active{
            color: $tig-color-primary;
            font-weight: bold;
            font-size: 32rpx;
        }
        .clear-unread{
            font-size: 26rpx;
            color: #999;
        }
    }
}

.messages-list {
    position: relative;
    padding: 0 20rpx;
    margin-top: 120rpx;
    .mitem {
        position: relative;
        border-bottom: 1rpx solid #dfdfdf;
        border-radius: 10rpx;
        margin-bottom: 10rpx;
        .message {
            position: relative;
            padding: 30rpx 20rpx;
            background-color: #fff;
            border-radius: 20rpx;
            .title {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                position: relative;
                height: 48rpx;
                color: #333;
                font-weight: 700;
                font-size: 32rpx;
                display: flex;
                align-items: center;
                .dot{
                    display: inline-block;
                    width: 10rpx;
                    height: 10rpx;
                    border-radius: 100rpx;
                    background-color: $tig-color-primary;
                    margin-right: 10rpx;
                }
            }
            .txt {
                color: #999;
                line-height: 36rpx;
                padding-top: 10rpx;
                font-size: 24rpx;
            }
            .time {
                position: absolute;
                top: 20rpx;
                right: 20rpx;
                color: #666;
                font-weight: 400;
                font-size: 22rpx;
            }
        }
    }
    .unread .message {
        background-color: #f4f4f4;
        box-shadow: 0 0 8rpx #e7e7e7;
    }
}
.message-move-box {
    width: 150rpx;
    height: 100%;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    display: flex;
    text {
        display: block;
        position: absolute;
        top: 50%;
        margin-top: -20rpx;
        font-size: 24rpx;
        text-align: center;
        width: 100%;
    }
    .btn-del {
        width: 150rpx;
        background: #ff4f18;
        background: linear-gradient(-41deg, #ff4f18, #ff2000 24%, #f10000);
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        display: table-cell;
        position: relative;
    }
}
</style>
