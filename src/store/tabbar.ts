import { defineStore } from "pinia";
export const usetabbarStore = defineStore("tabbar", {
    state: () => ({
        tabbarList: [] as any[],
        tabbarHeightNum: 90
    }),
    getters: {
        tabbarHeight(state): string {
            return state.tabbarHeightNum + "rpx";
        }
    },
    actions: {
        async getTabbarList() {
            this.tabbarList = [
                {
                    pagePath: "/pages/index/index",
                    image: "/static/images/common/ico_1.png",
                    activeImage: "/static/images/common/ico_1h.png",
                    text: "首页"
                },
                {
                    pagePath: "/pages/productCate/index",
                    image: "/static/images/common/ico_2.png",
                    activeImage: "/static/images/common/ico_2h.png",
                    text: "分类"
                },
                {
                    pagePath: "/pages/cart/index",
                    image: "/static/images/common/ico_3.png",
                    activeImage: "/static/images/common/ico_3h.png",
                    text: "购物车"
                },
                {
                    pagePath: "/pages/user/index",
                    image: "/static/images/common/ico_4.png",
                    activeImage: "/static/images/common/ico_4h.png",
                    text: "我的"
                }
            ];


        }
    }
});
