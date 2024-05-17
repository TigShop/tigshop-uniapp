<template>
    <navbar :parameter="parameter"></navbar>
    <view class="qianggou-list">
        <view class="qianggou-item acea-row row-middle norwrap" v-for="(item, index) in seckillProductList" :key="index" @click="toDetail(item.product_id)">
            <view class="qianggou-img-box">
                <image class="qianggou-img" :src="imageFormat(item.pic_thumb || '')" mode="aspectFill"></image>
                <view class="qianggou-out" v-if="item.seckill_sales >= item.seckill_stock">
                    <view class="qianggou-out-txt">已抢完</view>
                </view>
            </view>
            <view class="qianggou-info">
                <view class="qianggou-tit">
                    {{item.product_name}}
                </view>
                <view class="line1 pro-txt-small">
                    <text class='line1'>限时秒杀 抢先提醒</text>
                </view>
                <view class="qianggou-money-box">
                    <view class="qianggou-num">
                        <view class="num"><FormatPrice :priceData="item.seckill_price"></FormatPrice></view>
                        <view class="del"><FormatPrice :priceData="item.market_price"></FormatPrice></view>
                    </view>
                    <view class="qianggou-btn">
                        <view class="btn-txt" v-if="item.seckill_sales >= item.seckill_stock ">
                            已抢完
                        </view>
                        <view class="btn-txt" v-else>
                            <view class="txt">马上抢</view>
                            <view class="progress-box flex align-center">
                                <view class="progress-bar">
                                    <view class="progress" :style="{width:(item.seckill_limit_num===0?0:(Math.round(item.seckill_sales/item.seckill_limit_num * 100)))+'%'}"></view>
                                </view>
                                <view class="progress-txt">{{ (item.seckill_limit_num===0?0:(Math.round(item.seckill_sales/item.seckill_limit_num * 100))) }}%</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
    <view class="loading-box" v-if="filterParams.page > 1">
        <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
        <view v-else style="color: #fff;">没有更多了~</view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { ref, reactive } from "vue";
import { onLoad, onShow, onPageScroll, onReachBottom } from "@dcloudio/uni-app";
import { imageFormat } from "@/utils/format";
import { getSeckill } from "@/api/seckill/seckill";
import type {  SeckillFilterState } from "@/types/seckill/seckill";

const parameter = ref({
    navbar: "1",
    return: "1",
    title: "限时秒杀",
    class: "seckill",
    color: true
});
const filterParams = reactive({   //初始化用于查询的参数
    page: 1,
    size: 20,
});
const total = ref<number>(0)
const loaded = ref(false);
const seckillProductList = ref<SeckillFilterState[]>([])
const __getSeckillProduct = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    }
    uni.showLoading({
        title: "请求加载中..."
    });
    try {
        const result = await getSeckill({...filterParams});
        total.value = result.total;
        seckillProductList.value = [...seckillProductList.value, ...result.seckill_list];
    } catch (error:any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    } finally {
        loaded.value = false;
        uni.hideLoading();
    }
}
const toDetail = (id: number) => {
    uni.navigateTo({
        url: '/pages/productDetail/index?id=' + id
    })
}
onLoad(() => {
    __getSeckillProduct()
});


onShow(() => {
    uni.hideTabBar();
});
onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        __getSeckillProduct();
    }
});
</script>
<style scoped lang="scss">
page {
    background: linear-gradient(to right, #FF8853 0%, #F52828 100%);
}
.qianggou-list{
    padding: 20rpx;
}
.qianggou-item {
    margin-bottom: 15rpx;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 20rpx;

    .qianggou-img-box {
        width: 200rpx;
        height: 200rpx;
        position: relative;

        .qianggou-img,
        .qianggou-out {
            width: 100%;
            height: 100%;
            border-radius: 15rpx;
        }

        .qianggou-out {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.5);

            .qianggou-out-txt {
                width: 150rpx;
                height: 150rpx;
                line-height: 150rpx;
                background-color: rgba(0, 0, 0, 0.5);
                color: #FFFFFF;
                font-size: 32rpx;
                text-align: center;
                font-weight: bold;
                border-radius: 100rpx;
            }
        }
    }

    .qianggou-info {
        margin-left: 20rpx;
        flex: 1;

        .qianggou-tit {
            color: #333333;
            font-size: 30rpx;
            margin-bottom: 10rpx;
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
        }

        .pro-txt-small {
            font-size: 25rpx;
            color: #666666;
            margin-bottom: 10rpx;
            display: flex;

            .attr-tag {
                width: 25rpx;
                height: 25rpx;
                margin-right: 8rpx;
                margin-top: 3rpx;
            }
            .text{
                width:400rpx;
            }
        }

        .qianggou-money-box {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: 80rpx;

            .qianggou-num {
                display: flex;
                align-items: flex-end;
                .num {
                    color: $tig-color-primary;
                    font-weight: bold;
                    font-size: 36rpx;
                    display: flex;
                    align-items: center;
                    line-height: 36rpx;
                    :deep(.util) {
                        font-size: 24rpx;
                        line-height: 36rpx;
                    }
                }
                .del {
                    display: flex;
                    margin-left: 15rpx;
                    font-size: 24rpx;
                    color: #999;
                    text-decoration: line-through;
                    :deep(.util) {
                        font-size: 22rpx;
                    }
                }
            }

            .qianggou-btn {
                width: 170rpx;
                height: 75rpx;
                background: linear-gradient(130deg, #FF8853 0%, #F52828 100%);
                border-radius: 38rpx;
                line-height: 60rpx;
                text-align: center;

                .btn-txt {
                    color: #fff;
                    position: relative;
                }
                
                .progress-box{
                    position: absolute;
                    bottom: -30rpx;
                    left: 50%;
                    margin-left: -60rpx;
                    .progress-bar {
                        width: 80rpx; /* 进度条容器的总宽度 */
                        height: 8rpx; /* 进度条的高度 */
                        background-color: #fcaa9e; /* 进度条背景色 */
                        border-radius: 4rpx; /* 进度条容器的圆角 */
                        box-shadow: inset 0 1rpx 3rpx rgba(0, 0, 0, 0.2); /* 可选：为进度条添加内阴影效果 */
                    }
                    .progress-txt{
                        font-size: 20rpx;
                        margin-left: 5rpx;
                    }

                    .progress {
                        height: 8rpx; /* 进度条的高度 */
                        background-color: #fff; /* 进度条的颜色 */
                        border-radius: 4rpx; /* 进度部分的圆角 */
                        transition: width 0.4s ease; /* 进度变化时的过渡动画效果 */
                    }
                }
            }

            .btn-out {
                background: rgba(178, 178, 178, 1);
            }
        }
    }
}
</style>
