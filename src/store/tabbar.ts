import { defineStore } from "pinia";
import { getMobileNav } from "@/api/tabbar";
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
            const defaultTabbarList = [
                {
                    pagePath: "/pages/index/index",
                    image: "/static/images/common/ico_1.png",
                    pic_active_thumb: "/static/images/common/ico_1h.png",
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
            this.tabbarList = defaultTabbarList;
            // try {
            //     const result = await getMobileNav();
            //     console.log(result)
            //     this.tabbarList = result.item.data.nav_list;
            // } catch (error) {
            //     console.error(error);
            //     this.tabbarList = defaultTabbarList;
            // }
        }
    }
});
