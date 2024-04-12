<template>
    <view class="address-info">
        <view class="address-box" @click="handleAddressMore">
            <view>
                <view class="user-info">
                    <view class="name">{{ data.consignee }}</view>
                    <view class="phone">{{ data.mobile }}</view>
                </view>
                <view class="address">{{ data.region_name }} {{ data.address }}</view>
            </view>
            <view class="iconfont icon-jiantou arrow_ico"> </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
const props = defineProps({
    data: {
        type: Object,
        default: () => []
    }
});

const handleAddressMore = () => {
    uni.navigateTo({
        url: "/pages/address/list"
    });
};
</script>

<style lang="scss" scoped>
.address-info {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAKBAMAAACOO0tGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURf///4u16Oxtbezz/J3B7NDh9vvd3fSmprjS8vGNje57e/jDw/7w8IQ3dnAAAABSSURBVCjPY2CAAG4l7GADVJ4hUBArEIXJJ2HXrw6TZ8auX7ABKs+zCLsBE2AGmGDXLwKT58SuX+sATIEjdgOcYfJF2A1Qg8lz4PCBwWgQUiMIAWCaOFG2MdFRAAAAAElFTkSuQmCC")
        #fff repeat-x scroll -14rpx bottom / 64rpx 5rpx;
    padding-bottom: 10rpx;
    border-radius: 0 0 18rpx 18rpx;
    margin-bottom: 15rpx;

    .address-box {
        padding: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .user-info {
        color: #333;
        display: block;
        font-size: 30rpx;
        font-weight: bold;
        display: flex;
    }
    .name {
        margin-right: 10rpx;
    }

    .address {
        color: #666;
        display: block;
        font-size: 24rpx;
        overflow: hidden;
        padding-top: 16rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
