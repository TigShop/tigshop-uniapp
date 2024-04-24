import { defineStore } from "pinia";

interface State {
    storageUrl: string; // 图片地址
    navHeightNum: number; // 导航高度
    tabbarList: any[]; //自定义tabber
    tabbarHeightNum: number; //自定义tabber高度
    previewId: number; //预览id
    XClientType: string; //运行环境
    currentActiveValue: number; // 当前tabbar索引
}

export const useConfigStore = defineStore("config", {
    state: (): State => ({
        storageUrl: "http://lyecs2.oss-cn-zhangjiakou.aliyuncs.com/",
        navHeightNum: 0,
        tabbarList: [],
        tabbarHeightNum: 90,
        previewId: 0,
        XClientType: "",
        currentActiveValue: uni.getStorageSync("currentActiveValue") || 0
    }),
    getters: {
        navHeight: (state: State): number => {
            return state.navHeightNum;
        },
        tabbarListData(state: State): any[] {
            return state.tabbarList;
        },
        tabbarHeight(state: State): string {
            return state.tabbarHeightNum + "rpx";
        }
    },
    actions: {
        getNavHeight() {
            uni.getSystemInfo({
                success: (res: any) => {
                    this.navHeightNum = res.statusBarHeight * (750 / res.windowWidth) + 97;
                },
                fail(err) {}
            });
        },
        getTabbarList() {
            this.tabbarList = [
                {
                    pagePath: "/pages/index/index",
                    image: "static/images/common/ico_1.png",
                    activeImage: "static/images/common/ico_1h.png",
                    text: "首页"
                },
                {
                    pagePath: "/pages/productCate/index",
                    image: "static/images/common/ico_2.png",
                    activeImage: "static/images/common/ico_2h.png",
                    text: "分类"
                },
                {
                    pagePath: "/pages/cart/index",
                    image: "static/images/common/ico_3.png",
                    activeImage: "static/images/common/ico_3h.png",
                    text: "购物车"
                },
                {
                    pagePath: "/pages/user/index",
                    image: "static/images/common/ico_4.png",
                    activeImage: "static/images/common/ico_4h.png",
                    text: "我的"
                }
            ];
        },
        setPreviewId(val: number) {
            this.previewId = val;
        },
        setXClientType() {
            const { uniPlatform } = uni.getSystemInfoSync();
            switch (uniPlatform) {
                case "web":
                    return (this.XClientType = "h5");
                case "mp-weixin":
                    return (this.XClientType = "miniProgram");
            }
        },
        setCurrentActiveValue(val: number) {
            this.currentActiveValue = val;
            uni.setStorageSync("currentActiveValue", val);
        }
    }
});
