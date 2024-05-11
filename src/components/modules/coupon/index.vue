<template>
    <view
        :class="`module-ad-con module-image_hotarea ad-color_style__${module?.color_style}`"
        :style="frameFormat.box_padding + frameFormat.box_padding_top + frameFormat.box_padding_bottom"
    >
        <view
            class="module-ad-content"
            :style="frameFormat.background_color + ' ' + frameFormat.box_radius + couponFormat.box_radius + couponFormat.background_color"
        >
            <view class="coupon-ad-warp" :style="couponFormat.box_padding + couponFormat.box_padding_bottom + couponFormat.box_padding_top">
                <view class="coupon-title" v-if="module?.show_title === 1">
                    <view class="coupon-title-text">
                        <view class="coupon-maintitle">{{ module.title }}</view>
                        <view class="coupon-title-con">{{ module.desc }}</view>
                    </view>
                    <view>
                        <navigator url="/pages/coupon/index">
                            <text class="more">更多</text>
                            <text class="module_ico module-ico-youjiantou"></text>
                        </navigator>
                    </view>
                </view>
                <view class="coupon-con">
                    <block v-for="item in couponList" :key="item.coupon_id">
                        <view class="coupon-item" :style="couponFormat.item_padding" @click="handleCoupon(item.coupon_id)">
                            <view class="item-coupon-con">
                                <view class="coupon-money">
                                    <view class="coupon-money-c">{{ item.coupon_money }}</view>
                                    <view class="coupon-money-d">元</view>
                                </view>
                                <view class="coupon-name">
                                    <view class="coupon-name-text">{{ item.coupon_name }}</view>
                                </view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { formatFrame } from "@/components/modules";
import { getHomeCoupon } from "@/api/home/home";
import type { CouponList } from "@/types/home/home";
const props = defineProps({
    module: {
        type: Object,
        default: () => ({})
    }
});
const { frame } = props.module;
const frameFormat = computed(() => {
    return formatFrame(frame ?? {});
});

const couponFormat = computed(() => {
    return {
        item_background_color: `background-color:${props.module?.item_background_color}`,
        box_padding: `padding-left:${props.module?.box_padding}px;padding-right:${props.module?.box_padding}px;`,
        box_padding_bottom: `padding-bottom:${props.module?.box_padding_bottom}px;`,
        box_padding_top: `padding-top:${props.module?.box_padding_top}px;`,
        box_radius: `border-radius:${props.module?.box_radius}px;`,
        item_padding: `padding:${props.module?.item_padding}px;`,
        background_color: `background-color:${props.module?.background_color}`
    };
});

const couponList = ref<CouponList[]>();

const __getHomeCoupon = async () => {
    try {
        const result = await getHomeCoupon();

        couponList.value = result.coupon_list;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    __getHomeCoupon();
});

const handleCoupon = (id: number) => {
    uni.navigateTo({
        url: `/pages/coupon/detail?id=${id}`
    });
};
</script>
<style lang="scss" scoped>
@import "../../../static/css/modules.css";
/*优惠券*/
.coupon-ad-warp .coupon-con {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
}
.coupon-ad-warp .coupon-title {
    display: flex;
    justify-content: space-between;
    height: 60rpx;
    align-items: center;
    margin-bottom: 16rpx;
}
.coupon-ad-warp .coupon-title .coupon-title-l {
    display: flex;
    flex-wrap: nowrap;
}
.coupon-ad-warp .coupon-title .coupon-title-l .coupon-title-h {
    font-weight: 700;
    color: #2a3145;
    font-size: 32rpx;
}
.coupon-ad-warp .coupon-title .coupon-title-l .coupon-title-d {
    color: #aaa;
    font-size: 24rpx;
    margin-left: 10rpx;
    position: relative;
    top: 6rpx;
}
.coupon-ad-warp .coupon-title .coupon-title-r {
    display: flex;
}
.coupon-ad-warp .coupon-title .coupon-title-r navigator {
    color: #969799;
    display: flex;
    align-items: center;
    line-height: 20rpx;
}
.coupon-ad-warp .coupon-title .coupon-title-r .more {
    font-size: 24rpx;
}
.coupon-ad-warp .coupon-con .coupon-item {
    width: 38%;
    display: flex;
    align-items: center;
    flex: none;
    margin-right: 24rpx;
}
.coupon-ad-warp .coupon-con .coupon-item .item-coupon-con {
    background-color: #e74c2c;
    color: #fff;
    height: 152rpx;
    padding: 10rpx;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    position: relative;
    margin-left: 22rpx;
    margin-right: 22rpx;
}
.coupon-ad-warp .coupon-con .coupon-item .item-coupon-con .coupon-money {
    font-size: 52rpx;
    display: flex;
    flex-wrap: nowrap;
    line-height: 60rpx;
    align-items: center;
    font-weight: bold;
    height: 60rpx;
}
.coupon-ad-warp .coupon-con .coupon-item .item-coupon-con .coupon-money .coupon-money-c {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.coupon-ad-warp .coupon-con .coupon-item .item-coupon-con .coupon-money .coupon-money-d {
    font-size: 24rpx;
    top: 8rpx;
    position: relative;
    left: 8rpx;
}
.coupon-ad-warp .coupon-con .coupon-item .item-coupon-con .coupon-name {
    font-size: 20rpx;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: 32rpx;
    opacity: 0.8;
}
.coupon-ad-warp .coupon-con .coupon-item .item-coupon-con:before {
    position: absolute;
    top: 0;
    left: -20rpx;
    width: 22rpx;
    height: 100%;
    background-size: 100% 100%;
    content: "";
    z-index: 1;
}
.coupon-ad-warp .coupon-con .coupon-item .item-coupon-con:after {
    position: absolute;
    top: 0;
    right: -20rpx;
    width: 22rpx;
    height: 100%;
    background-size: 100% 100%;
    content: "";
    z-index: 1;
    transform: rotateY(180deg);
}
.coupon-ad-warp .coupon-con .coupon-item .item-coupon-con:before,
.coupon-con .coupon-item .item-coupon-con:after {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAC0CAYAAACUlQzjAAAAAXNSR0IArs4c6QAAAdFJREFUaAXtmUFKA0EURH/PiCDEjbjQMyiuXYprXXoCvZW68wZuxUMInkEJ4saFIGTayWAM01N/+L+nN4HKJunf1UXyUkMxTHi7OI5S8FUV9OqsNsCw3tnfDXV1GiTcBpHJPFuP9ev98uRcpHmIUQ7XU9+nnuHyaGcam6f2qw72LNaDP+Xg8eW59bqzHEaagWEnqsM9Eltm0LDa3nu1HEYaaIiE1hk0bH4+j6wGqQ4ayiJep0LrehCNorH5D3ZmBpe/IsyvzmYds+5nxpvcQK+QbC2+P75WixLv+E+Z4EzDCfD+jm4AQ3aKsFPcSYfBZqe4OLJTXLigGOYQKo1DGhpBjcgqdgo7ZSQfyha89NgpCi08ZqdgLp4pzKHHINXSMCXiX7NThJ2SERt0hJ2CqKgzdoqKxrzBCjCjUoXlGfI+hZ2ixk3dgDlkp6i80AY7BVHxzWAOfRZ9NQ37PHJWvE/hfUpGbuClx05xkWSnuHBBMcwhVBqHNDSCGpGxU9gpI/HQtuClx07RcME5OwVicQ1hDl0OiZiGCZCMJTuFnZITG3SGnYKoqDN2iorGvMEKMKNSheUZ8nkKn6eocVM3YA7ZKSovtMFOQVR8M5hDn0Vf/QvYqJ3lQEIVBgAAAABJRU5ErkJggg==);
}
.ad-color_style__2 .coupon-ad-warp .coupon-con .coupon-item .item-coupon-con {
    background-color: #ffe9b7;
}
.ad-color_style__2 .coupon-ad-warp .coupon-con .coupon-item .item-coupon-con:before,
.ad-color_style__2 .coupon-con .coupon-item .item-coupon-con:after {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAC0CAYAAACUlQzjAAAAAXNSR0IArs4c6QAAAdBJREFUaAXtWTFOw0AQ3HUQooCOhjfwAWoaHgK/Ajr+gJAQvIJHgOhoEFKy2JGjHL45Z/dsikiTJvbc7DgZz2mUWO390WTGVzOj1lpqHwT16EQWzYWI3orqZD819dA+ny5lZQ9idpbikeM/gt1gL/rcimZrHuHspujp1YuY3HmGEScTXJMWeo/IHgwLrg7fPMOIgwUR04lhwebn3Dmf0bDg0q4zphPIojFrbJJgZxdyfkBR+3g9ls6z7muq3NQGenPBA7HvL1n2p5N3sgi+KZvLVbxTsMK0wcg+eMhOYacMYrv7FAebnbLbuS2DnbL1ovYI57BWrZ2j4ATz+tFG2CnslHCO8NZjp0SMZKdE3MJcnEPMdaEUdNk0SmKntH/68b+v0YyARbz12CnAqiLETila417AOXSP50QK5p5EEXYKOyWamZaPtx47JWIlOyXiFubiHGKuC6Wgy6ZREjuFnTIaELyItx47BbuFUXYK9iWC4hxGFAZcCg4MqThlp7BTqmKDhtgpyJUSxk4pOePHWQF+r0rMf/CQz+j5PKUUtyKOc8hOKRoGFtgpwJQghHMYFEnpFEzdqDvm7xT+TqlIDt567JSIleyUiFuYi3OIuS70F1wX79Qz2wiaAAAAAElFTkSuQmCC);
}
.ad-color_style__2 .coupon-ad-warp .coupon-con .coupon-item .item-coupon-con {
    color: #f39343;
}
.ad-color_style__3 .coupon-ad-warp .coupon-con .coupon-item .item-coupon-con {
    background-color: #383b3e;
}
.ad-color_style__3 .coupon-ad-warp .coupon-con .coupon-item .item-coupon-con:before,
.ad-color_style__3 .coupon-con .coupon-item .item-coupon-con:after {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAC0CAYAAACUlQzjAAAAAXNSR0IArs4c6QAAAdVJREFUaAXtWcFKw0AU3E0jeNAPEAW9e/RSFEror+hfiTc/w9/wXMRP8CIYs2aFQHczL31vk0theml33uwkmU4YQvz6YRPcgp9qQa1/qSMQPD2pzmu/Wjvvn/tznu2n3/fwfrPdhq59DcFd7OOW34lg3BhFu9/2rf85mmmEVznp82O3u7q+uezxu3ymWcN/uXbVi2Yz4mDBOrwjsgaDgpqNEgcKtq2/lTYcwrGg6x4PbZTmo2jMjU1yhkOw+6OPDiSdUY77pmnOomdtvMwQnuaIRfH6+6f7yo8yZ51c8hyhYS8FByfKv4/AQ3aKY6eYEw6DzU4x+chOMdkFyTCHkKkEKag0aoJWsVPYKRP5EEbw1mOnCG5hmJ2CfbGgMIcWgZxLwdwR+5qd4tgpBbFBW9gpyBURY6eI1qgHrAC1VSJxeQ/5nMJOEeMmDmAO2SmiX2jATkGu2DCYQ5tEyqZg6kfJis8pfE4pyA289dgpJifZKSa7IBnmEDKVIAWVRk3Q2CnslIl4SCN467FTJLsgzk6BtphAmEOTQkamYGZIwZKdwk4piQ3aw05BrogYO0W0Rj1gBaitEonLe8j3KXyfIsZNHMAcslNEv9CAnYJcsWEwhzaJlP0HRISbhy7A7SwAAAAASUVORK5CYII=);
}
.ad-color_style__3 .coupon-ad-warp .coupon-con .coupon-item .item-coupon-con {
    color: #fff;
}
.ad-color_style__4 .coupon-ad-warp .coupon-con .coupon-item .item-coupon-con {
    background-color: #e0f4e4;
}
.ad-color_style__4 .coupon-ad-warp .coupon-con .coupon-item .item-coupon-con:before,
.ad-color_style__4 .coupon-con .coupon-item .item-coupon-con:after {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAC0CAYAAACUlQzjAAAAAXNSR0IArs4c6QAAAc9JREFUaAXtWctOwzAQjNMIVB53uHHnB3rmV+CvgBufgfgL7j1wQL0WqIpoTEOp5Niz1q6TS6WpVDXenZ2ok7FGVtz8481XI37qEbn+qA6A8OT06HxSNzPn3P32O1hPF2o4X73fuPbnyfvqMqxbrnuE3eCOdPPsvU96GuLkoVxNL162gw+aYYRJCDtQ7SaPCKypQcLjaf2qGUYYSIiA2hokXK/aay1BjIOErd/cxkDtOrHGUNs04Z0DYyc3CnG5a7fwi7NOs/+/eVdq6P1Nmq/P7+V+McYvfChDiEk4RL3d7AFoyEypmClmp0NjM1NMOjJTTHJBMPQhRCqLJFQKlYHVzBRmSsYfQgtuPWaKoBYuM1OwLpYq9KGFIMaSMFbEvmamVMyUAtugEWYKUkWsMVNEadQNRoBaKhE4voY8pzBTRLuJDehDZoqoF2owU5Aqthr0oY2ijyZhX4+SFc8pPKcU+AZuPWaKSUlmikkuCIY+hEhlkYRKoTIwZgozJWMPqQW3HjNFkgvWmSlQFlMR+tDEEIFJGAlSsGSmMFNKbINmmClIFbHGTBGlUTcYAWqpROD4GvJ9Ct+niHYTG9CHzBRRL9RgpiBVbDXoQxtFH/0LaCUp7PtuoaoAAAAASUVORK5CYII=);
}
.ad-color_style__4 .coupon-ad-warp .coupon-con .coupon-item .item-coupon-con {
    color: #4cac5a;
}

.coupon-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16rpx;

    .coupon-title-text {
        display: flex;

        .coupon-maintitle {
            color: #2a3145;
            font-size: 30rpx;
            margin-right: 10rpx;
            font-weight: bold;
        }

        .coupon-title-con {
            color: #aaa;
            font-size: 20rpx;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }
    }
}
</style>
