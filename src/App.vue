<script setup lang="ts">
import { onLaunch, onShow, onExit } from "@dcloudio/uni-app";
import { useConfigStore } from "@/store/config";
import { usetabbarStore } from "@/store/tabbar";
const configStore = useConfigStore();
const tabbarStore = usetabbarStore();
onLaunch(() => {
    configStore.getNavHeight();
    configStore.setXClientType();
    tabbarStore.getTabbarList();
});
onShow(() => {
    uni.hideTabBar();
});
onExit(() => {
    configStore.setCurrentActiveValue(0);
});
</script>
<style>
page {
    font-size: 28rpx;
    background-color: #f5f5f5;
    color: #333;
}
view {
    box-sizing: border-box;
}
.acea-row {
    display: flex;
    flex-wrap: wrap;
}
.acea-row.row-top {
    align-items: flex-start;
}
.acea-row.row-middle {
    align-items: center;
}
.acea-row.row-bottom {
    align-items: flex-end;
}
.acea-row.row-left {
    justify-content: flex-start;
}
.acea-row.row-center {
    justify-content: center;
}
.acea-row.row-right {
    justify-content: flex-end;
}
.acea-row.row-between {
    justify-content: space-between;
}
.acea-row.row-around {
    justify-content: space-around;
}
.acea-row.row-column {
    flex-direction: column;
}
.acea-row.row-column-between {
    flex-direction: column;
    justify-content: space-between;
}
.acea-row.row-column-around {
    flex-direction: column;
    justify-content: space-around;
}
.acea-row.row-center-wrapper {
    align-items: center;
    justify-content: center;
}
.acea-row.row-between-wrapper {
    align-items: center;
    justify-content: space-between;
}
.font-color {
    color: #fc4141 !important;
}
.bg-color {
    background-color: #e93323 !important;
}
.icon-color {
    color: #ff3c2b;
}
.cart-color {
    color: #ff3700 !important;
    border: 1px solid #ff3700 !important;
}
.navigator-hover {
    background: none;
    opacity: 1;
}


.line1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.line2 {
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.5;
    z-index: 5;
}
button {
    padding: 0;
    margin: 0;
    line-height: normal;
    background-color: #fff;
}
button::after {
    border: 0;
}
@keyframes load {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.loadingpic {
    animation: load 3s linear 1s infinite;
}
.loading-list {
    animation: load linear 1s infinite;
    font-size: 40rpx;
    margin-right: 22rpx;
}
.loading {
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
}
.loading .line {
    position: absolute;
    width: 450rpx;
    left: 150rpx;
    top: 50rpx;
    height: 1px;
    border-top: 1px solid #eee;
}
.loading .text {
    position: relative;
    display: inline-block;
    padding: 0 20rpx;
    background: #fff;
    z-index: 2;
    color: #777;
}

.loadingicon .loading {
    animation: load linear 1s infinite;
    font-size: 45rpx;
    color: #000;
}
.loadingicon {
    width: 100%;
    height: 80rpx;
}
/* 将toast的z-index设置为最高 */
uni-toast {
    z-index: 9999 !important;
}
/* //通用flex */
.flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.justify-start {
    justify-content: flex-start;
}

.justify-end {
    justify-content: flex-end;
}
.justify-center {
    justify-content: center;
}

.justify-between {
    justify-content: space-between;
}

.justify-around {
    justify-content: space-around;
}

.align-start {
    align-items: flex-start;
}

.align-end {
    align-items: flex-end;
}

.align-center {
    align-items: center;
}

.align-baseline {
    align-items: baseline;
}

.flex-wrap {
    display: flex;
    flex-wrap: wrap;
}

/* 触底加载 */
.loading-box {
    display: flex;
    justify-content: center;
    padding-bottom: 30rpx;
}
</style>
