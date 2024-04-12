<template>
    <view style="height: 100%">
        <view class="product-bg" v-if="imgUrls.length > 0">
            <swiper :indicator-dots="false" :circular="circular" :interval="interval" :duration="duration" @change="change">
                <block v-for="(item, index) in imgUrls" :key="index">
                    <swiper-item>
                        <image :src="item.pic_url" class="slide-image" @tap.stop.prevent="showBigPic" :data-src="item.pic_url" />
                    </swiper-item>
                </block>
            </swiper>
            <view :class="'pages ' + (imgUrls || goodsImg ? 'show' : '')">
                <text>{{ currents }}</text>
                /{{ imgUrls.length || 1 }}
            </view>
        </view>
        <view class="product-bg" v-if="imgUrls.length == 0">
            <swiper :indicator-dots="false" :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration" @change="change">
                <swiper-item>
                    <image :src="goodsImg" class="slide-image" @tap.stop.prevent="showBigPic" :data-src="item.pic_url" />
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            global: app.globalData,
            indicatorDots: false,
            circular: true,
            autoplay: false,
            interval: 3000,
            duration: 500,
            currents: '1'
        };
    },
    props: {
        imgUrls: {
            default: () => []
        },
        goodsImg: {
            default: ''
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    methods: {
        attached: function () {},

        change: function (e) {
            this.setData({
                currents: e.detail.current + 1
            });
        },

        showBigPic: function (e) {
            var that = this;
            var src = e.currentTarget.dataset.src; //获取data-src
            var pics = [];
            if (that.imgUrls.length > 0) {
                for (var index in that.imgUrls) {
                    pics.push(that.imgUrls[index]['pic_url']);
                }
            } else {
                pics.push(that.goodsImg);
            }
            uni.previewImage({
                current: src,
                // 当前显示图片的http链接
                urls: pics // 需要预览的图片http链接列表
            });
        }
    },
    created: function () {}
};
</script>
<style>
.product-bg {
    width: 100%;
    height: 750rpx;
    position: relative;
    background: #fff;
}
.product-bg swiper {
    width: 100%;
    height: 100%;
    position: relative;
}
.product-bg .slide-image {
    width: 100%;
    height: 100%;
}
.product-bg .pages {
    visibility: hidden;
    transition: all 500ms ease-in-out 0s;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
    height: 40rpx;
    padding: 0 40rpx 0 30rpx;
    border-radius: 40rpx 0 0 40rpx;
    right: 0;
    bottom: 30rpx;
    line-height: 40rpx;
    font-size: 20rpx;
    color: #fff;
}
.product-bg .pages.show {
    visibility: visible;
}
.product-bg .pages text {
    font-weight: bold;
    font-size: 30rpx;
}
.product-bg .slide-navigator .slide-image {
    width: 100%;
    height: 100%;
    border-radius: 15rpx;
}
.product-bg .wx-swiper-dot {
    width: 20rpx;
    height: 5rpx;
    border-radius: 3rpx;
}
.product-bg .wx-swiper-dots.wx-swiper-dots-horizontal {
    margin-bottom: 5rpx;
}
</style>
