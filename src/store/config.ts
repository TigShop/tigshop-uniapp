import { defineStore } from "pinia";

interface ConfigState {
    page_size: number;
    ico_defined_css: string;
    dollar_sign: string;
    storage_type: number;
    storage_url: string;
    pc_domain: string;
    h5_domain: string;
    navHeight: number; // 导航高度
}

interface State {
    config: ConfigState;
    tabbarList: any[];//自定义tabber
    tabbarHeight: string;//自定义tabber高度
    previewId: number;//预览id
}

export const useConfigStore = defineStore("config", {
    state: (): State => ({
        config: {
            page_size: 15,
            ico_defined_css: "//at.alicdn.com/t/c/font_400590_7he137t8862",
            dollar_sign: "¥",
            storage_type: 0,
            storage_url: "",
            pc_domain: "",
            h5_domain: "",
            navHeight: 0
        },
        tabbarList: [],
        tabbarHeight: '90rpx',
        previewId: 0
    }),
    getters: {
        icoDefinedCss: (state: State): string => {
            return "https:" + state.config.ico_defined_css + ".css";
        },
        pageSize: (state: State): number => {
            return Number(state.config.page_size);
        },
        navHeight: (state: State): number => {
            return state.config.navHeight;
        },
        tabbarListData(state: State): any[] {
            return state.tabbarList;
        }
    },
    actions: {
        setConfig(data: Partial<ConfigState>) {
            this.config = Object.assign({}, this.config, data);
        },
        getConfig(key: keyof ConfigState): ConfigState[keyof ConfigState] {
            return this.config[key];
        },
        // getConfig的简写方法
        get(key: keyof ConfigState): ConfigState[keyof ConfigState] {
            return this.config[key] as ConfigState[keyof ConfigState];
        },
        getNavHeight() {
            uni.getSystemInfo({
                success: (res: any) => {
                    this.config.navHeight = res.statusBarHeight * (750 / res.windowWidth) + 97;
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
        }
    }
});
