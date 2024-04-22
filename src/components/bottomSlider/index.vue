<template>
    <view style="height: 100%">
        <view class="bottom-slider-mask-warp" data-tag="selectShipping" :data-id="id" v-if="showSliderClone != false" @tap="colseSlider"></view>
        <view :class="'bottom-slider-warp ' + (showSliderClone == true ? 'on' : '') + ' payment-bottom-slider-warp'">
            <form @submit="submit" :data-id="id">
                <view class="title">
                    {{ title }}
                    <view class="close" @tap="colseSlider"><image lazy-load  src="/static/images/common/close.png"></image></view>
                </view>
                <view class="bottom-slider-content">
                    <view style="height: 100rpx"></view>
                </view>
                <button formType="submit" class="button btn-submit">确定</button>
            </form>
        </view>
    </view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            global: app.globalData,
            id: '',
            showSliderClone: false
        };
    },
    props: {
        params: {
            type: Object,
            default: () => ({})
        },
        title: {
            type: String,
            default: ''
        },
        showSlider: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    methods: {
        attached: function () {
            this.setData({});
        },

        colseSlider: function (e) {
            this.setData({
                showSliderClone: false
            });
        },

        submit: function (e) {
            var that = this;
            //that.triggerEvent('**submit', {});
            this.setData({
                showSliderClone: false
            });
        }
    },
    created: function () {},
    watch: {
        showSlider: {
            handler: function (newVal, oldVal) {
                this.showSliderClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
.bottom-slider-mask-warp {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.5;
    z-index: 5;
}
.bottom-slider-warp {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 201;
    transform: translate3d(0, 100%, 0);
    transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
    height: 60%;
    border-radius: 18rpx 18rpx 0 0;
    overflow: hidden;
}
.right-slider-warp {
    width: 650rpx;
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;
    height: auto;
    transform: translate3d(100%, 0, 0);
}
.bottom-slider-warp.on {
    transform: translate3d(0, 0, 0);
}
.bottom-slider-warp .title {
    font-size: 32rpx;
    font-weight: bold;
    text-align: left;
    height: 123rpx;
    line-height: 123rpx;
    position: relative;
    padding-left: 30rpx;
    background: #fff;
}
.bottom-slider-warp .title .close {
    position: absolute;
    right: 0;
    color: #8a8a8a;
    padding: 30rpx;
    top: 10rpx;
}
.bottom-slider-warp .title .close image {
    width: 42rpx;
    height: 42rpx;
    display: block;
}
.bottom-slider-warp .btn-submit {
    position: fixed;
    bottom: 30rpx;
    left: 0;
    right: 0;
    margin: 0 30rpx;
    background-color: #f23030;
    border-radius: 66rpx;
    color: #ffffff;
    display: block;
    font-size: 100%;
    overflow: hidden;
    padding: 0 24rpx;
    vertical-align: middle;
    height: 82rpx;
    line-height: 82rpx;
    text-align: center;
}
.bottom-slider-warp .bottom-slide-content {
    overflow-y: auto;
    position: absolute;
    bottom: 130rpx;
    top: 120rpx;
    width: 100%;
}
</style>
