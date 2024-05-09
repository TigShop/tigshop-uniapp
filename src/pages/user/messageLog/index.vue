<template>
    <view>
        <navbar :parameter="parameter"></navbar>
        <view class="message-main" v-if="messageList.length > 0">
            <view class="sign-btn">
                <view class="btn marked-read" @click="addMessageAllReadFn">全部标记为已读</view>
                <view class="btn see-unread" @click="unreadReadFn">只看未读</view>
            </view>
            <view class="messages-list">
                <uni-swipe-action>
                    <block v-for="(item, index) in messageList" :key="index">
                        <view class="move-item">
                            <uni-swipe-action-item :threshold="0" autoClose>
                                <view class="mitem" :class="{unread : item.is_read === 0}" @click="__addMessageRead(item)">
                                    <view class="message">
                                        <view class="title">
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
        </view>
        <view class="empty-box" v-else>
            <view class="pictrue"><image src="/static/images/common/data_empty.png"></image></view>
            <view class="txt">暂无站内消息！</view>
        </view>
        <view class="loading-box" v-if="filterParams.page > 1">
            <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
            <view v-else>没有更多了~</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar/index.vue";
import { ref, reactive } from "vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import { getMessageList, addMessageRead, addMessageAllRead, delMessage } from "@/api/user/messageLog";
import type { UserMsgFilterParams, UserMsgFilterState } from "@/types/user/messageLog";
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
const messageList = ref<UserMsgFilterState[]>([]);
const __geMessageList = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    }
    try {
        const result = await getMessageList({ ...filterParams });
        total.value = result.total;
        messageList.value = [...messageList.value, ...result.filter_result];
    } catch (error: any) {
        console.error(error);
    } finally {
        loaded.value = false;
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
        console.error(error);
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
        console.error(error);
    }
};

const unreadReadFn = async () => {
    filterParams.unread = 1;
    try {
        filterParams.page = 1;
        messageList.value = [];
        await __geMessageList();
    } catch (error: any) {
        console.error(error);
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
.sign-btn {
    margin: 20rpx;
    display: flex;
    .btn {
        background-color: #F23030;
        border: 1rpx solid #F23030;
        border-radius: 6rpx;
        color: #fff;
        display: inline-block;
        font-size: 26rpx;
        overflow: hidden;
        padding: 8rpx 24rpx;
        margin: 0 4rpx;
    }
    .marked-read {
        color: #333;
        border: 1rpx solid #ddd;
        background-color: #fff;
    }
}
.messages-list {
    position: relative;
    .move-item:last-child {
        margin-bottom: 40rpx;
    }
    .mitem {
        position: relative;
        border-bottom: 1rpx solid #dfdfdf;
        .message {
            position: relative;
            padding: 40rpx 20rpx;
            background-color: #fff;
            .title {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                position: relative;
                height: 48rpx;
                color: #333;
                font-weight: 700;
                font-size: 32rpx;
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
