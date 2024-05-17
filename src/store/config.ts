import { defineStore } from "pinia";

interface State {
    storageUrl: string; // 图片地址
    navHeightNum: number; // 导航高度
    previewId: number; //预览id
    XClientType: string; //运行环境
    currentActiveValue: number; // 当前tabbar索引
    safeAreaInsets: SafeAreaInsets; // 安全区
}

interface SafeAreaInsets {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export const useConfigStore = defineStore("config", {
    state: (): State => ({
        storageUrl: "http://lyecs2.oss-cn-zhangjiakou.aliyuncs.com/",
        navHeightNum: 0,
        previewId: 0,
        XClientType: "",
        currentActiveValue: uni.getStorageSync("currentActiveValue") || 0,
        safeAreaInsets: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    }),
    getters: {
        navHeight: (state: State): number => {
            return state.navHeightNum;
        },
        saveTop: (state: State): number => {
            return state.safeAreaInsets.top;
        },
        saveBottom: (state: State): number => {
            return state.safeAreaInsets.bottom;
        }
    },
    actions: {
        getNavHeight() {
            uni.getSystemInfo({
                success: (res: any) => {
                    this.navHeightNum = res.statusBarHeight * (750 / res.windowWidth) + 97;
                    this.safeAreaInsets = res.safeAreaInsets;
                },
                fail(err) {}
            });
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
