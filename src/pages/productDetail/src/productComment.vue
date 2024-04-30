<template>
    <view class="product-comment-card">
        <view class="comment-title flex justify-between align-center">
            <view class="txt">
                评价<text>(2)</text>
            </view>
            <view class="more">
                好评<text>100%</text>
                <uni-icons type="right" size="16" color="#bfbfbf"></uni-icons>
            </view>
        </view>
        <view class="comment-item">
            <view class="user-info flex justify-between align-center">
                <view class="user-name flex align-center">
                    <view class="head_logo">
                        <image src="/static/logo.png"/>
                    </view>
                    <view>
                        <text>匿名用户</text>
                        <uni-rate :value="4" size="14" color="#bfbfbf" active-color="yellow" disabled></uni-rate>
                    </view>
                </view>
                <view class="time">2022-02-02</view>
            </view>
            <view class="user-content">
                厉害风扇电机发就是考虑到实际阿卡拉飞机的声卡拉法基索拉卡飞机打卡
            </view>
            <view class="user-imgs flex align-center">
                <image src="/static/logo.png"/>
                <image src="/static/logo.png"/>
                <image src="/static/logo.png"/>
            </view>
        </view>
        <view class="comment-btn-box flex align-center justify-around">
            <view class="btn flex align-center">
                <uni-icons type="chat" size="24" color="#333"></uni-icons>
                <text>全部评价(2)</text>
            </view>
            <view class="btn flex align-center">
                <uni-icons type="chatboxes" size="24" color="#333"></uni-icons>
                <text>购买咨询(2)</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
interface Props {
    productId: number;
}
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.product-comment-card{
    background-color: #fff;
    padding: 20rpx;
    border-radius: 20rpx;
    margin: 20rpx 0;
    .comment-title{
        padding-bottom: 20rpx;
        border-bottom: 1rpx solid #eee;
        .txt{
            font-size: 26rpx;
            font-weight: bold;
            text{
                margin-left: 5rpx;
                font-size: 22rpx;
                color: $tig-color-grey;
            }
        }
        .more{
            font-size: 26rpx;
            text{
                color: $tig-color-primary;
            }
        }
    }
    .comment-item{
        margin: 20rpx 0;
        border-bottom: 1rpx solid #eee;
        padding-bottom: 20rpx;
        .user-info{
            .user-name{
                font-size: 24rpx;
                .head_logo{
                    margin-right: 20rpx;
                    image{
                        width:60rpx;
                        height: 60rpx;
                        border-radius: 100rpx;
                    }
                }
            }
            .time{
                font-size: 24rpx;
                color: $tig-color-grey;
            }
        }
        .user-content{
            margin: 20rpx 0;
            font-size: 26rpx;
        }
        .user-imgs{
            image{
                width: 90rpx;
                height: 90rpx;
                margin-right: 10rpx;
                margin-bottom: 10rpx;
            }
        }
    }
    .comment-btn-box{
        padding: 10rpx 50rpx 10rpx 50rpx;
        .btn{
            color: #333;
            font-size: 24rpx;
            padding: 10rpx 4cm;
            border: 1px solid $tig-color-grey;
            border-radius: 36px;
        }
    }
}
</style>