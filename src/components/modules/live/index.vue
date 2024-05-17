<template>
    <view
        :class="
            'module-ad-con module-ad-con-' +
            module_id +
            ' ad-pic_type__' +
            module.pic_type +
            ' ad-pic_page_type__' +
            module.pic_page_type +
            ' ad-radio_style__' +
            module.radio_style
        "
        :style="module.box_padding_format + ' ' + module.box_padding_top_format + module.box_padding_bottom_format"
    >
        <view class="module-ad-content" :style="module.background_color_format + module.box_radius_format">
            <block v-if="module.show_title">
                <view :class="'image-ad-title ad-title_style__' + module.title_style" :style="module.title_background_format + module.title_radius_format">
                    <view class="image-ad-title-l">
                        <view class="image-ad-title-h" :style="'color: ' + module.title_color">{{ module.title_text }}</view>
                        <view class="image-ad-title-d" :style="'color: ' + module.desc_color">{{ module.desc_text }}</view>
                    </view>
                    <block v-if="module.show_more">
                        <view class="image-ad-title-r">
                            <navigator class="more-link" :url="module.more_link ? module.more_link.wechat_link : ''" :style="'color: ' + module.more_color">
                                <text>查看更多</text>
                                <text class="module_ico module-ico-youjiantou"></text>
                            </navigator>
                        </view>
                    </block>
                </view>
            </block>

            <view class="live-list-warp">
                <view class="live-list">
                    <view class="live-item" @tap.stop.prevent="toLiveRoom" :data-room_id="item.room_id" v-for="(item, index) in module.live_list" :key="index">
                        <image lazy-load  class="bg_img" :src="item.thumb_img" mode="aspectFill"></image>

                        <view class="shadow_bg"></view>

                        <view class="live-status">
                            <view :class="'status-ico ' + (item.live_status == '101' ? 'status-live' : 'status-gray')">
                                <view class="status-dot"></view>
                                <text v-if="item.live_status == '101'">直播中</text>
                                <text v-else-if="item.live_status == '102'">未开始</text>
                                <text v-else-if="item.live_status == '105'">暂停中</text>
                                <text v-else>已结束</text>
                                <image lazy-load  v-if="item.live_status == '101'" src="/static/images/common/live2.gif"></image>
                            </view>
                        </view>

                        <view class="live-content">
                            <view class="title">{{ item.wechat_live_title }}</view>
                            <view class="name">
                                <image lazy-load  class="anchor_img" :src="item.anchor_img"></image>
                                {{ item.anchor_name }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const global: any = getApp().globalData;
const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    }
});

const module_id = ref('')


const toLiveRoom = (e: any) => {
    let roomId = e.currentTarget.dataset.room_id;
    let customParams = encodeURIComponent(
        JSON.stringify({
            path: "pages/index/index",
            pid: 1
        })
    );

    uni.navigateTo({
        url: "plugin-private://" + global.liveAppId + "/pages/live-player-plugin?room_id=" + roomId + "&custom_params=" + customParams
    });
};
</script>
<style>
@import '../../../static/css/modules.css';

.live-list-warp {
    overflow: hidden;
    padding: 10rpx 20rpx 6rpx;
}
.live-list {
    display: flex;
}
.live-list .live-item {
    background: #fff;
    width: 50%;
    border-radius: 10rpx;
    float: left;
    height: 600rpx;
    overflow: hidden;
    position: relative;
    margin-bottom: 20rpx;
}
.live-list .live-item:nth-child(2n) {
    float: right;
    margin-left: 20rpx;
}
.live-list .live-item .bg_img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}
.live-list .live-item .shadow_bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0) linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.1) 80%, #000000 130%) repeat scroll 0 0;
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
}
.live-list .live-item .live-content {
    position: absolute;
    bottom: 0;
    height: 100rpx;
    width: 100%;
    z-index: 3;
    color: #fff;
}
.live-list .live-item .live-content .title {
    font-size: 22rpx;
    padding-left: 15rpx;
    padding-bottom: 10rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 20rpx;
    overflow: hidden;
}
.live-list .live-item .live-content .name {
    font-size: 22rpx;
    padding-left: 15rpx;
}
.live-list .live-item .live-content .anchor_img {
    width: 40rpx;
    height: 40rpx;
    border-radius: 40rpx;
    border: 2rpx solid #fff;
    display: inline-block;
    margin-right: 10rpx;
    vertical-align: middle;
}
.live-list .live-item .live-status {
    position: absolute;
    top: 20rpx;
    left: 10rpx;
    z-index: 3;
}
.live-list .live-item .live-status .status-ico {
    background: #fc4141;
    color: #fff;
    padding: 0 10rpx 0 30rpx;
    height: 35rpx;
    line-height: 35rpx;
    font-size: 22rpx;
    position: relative;
}
.live-list .live-item .live-status .status-ico .status-dot {
    background: #fff;
    height: 10rpx;
    width: 10rpx;
    border-radius: 100%;
    left: 10rpx;
    top: 15rpx;
    position: absolute;
}
.live-list .live-item .live-status .status-ico.status-gray {
    background: #bbb;
}
.live-list .live-item .live-status .status-ico image {
    width: 15rpx;
    height: 15rpx;
    padding-left: 8rpx;
}
</style>
