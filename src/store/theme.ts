import { defineStore } from "pinia";
import { getBaseConfig } from "@/api/common";
import type { ThemeResponse } from "@/types/common";
export const useThemeStore = defineStore("theme", {
    state: () => {
        return {
            themeId: 0,
            themeStyle: {
                // 1:绿色
                "--general": " #09bb07",
                "--main-bg": " #09bb07",
                "--main-btn-hover-bg": "#35c232", //主背景按钮悬停色
                "--main-bg-gradient": " #09bb07",
                "--main-text": " #ffffff",
                "--vice-bg": " #383838",
                "--vice-text": " #ffffff",
                "--icon": " #09bb07",
                "--price": " #09bb07",
                "--tag-text": " #09bb07",
                "--tag-bg": " #e6f8e6"
            }
            // themeColors: [
            //     {
            //         // 1:绿色
            //         "--general": " #09bb07",
            //         "--main-bg": " #09bb07",
            //         "--main-btn-hover-bg": "#35c232", //主背景按钮悬停色
            //         "--main-bg-gradient": " #09bb07",
            //         "--main-text": " #ffffff",
            //         "--vice-bg": " #383838",
            //         "--vice-text": " #ffffff",
            //         "--icon": " #09bb07",
            //         "--price": " #09bb07",
            //         "--tag-text": " #09bb07",
            //         "--tag-bg": " #e6f8e6"
            //     }
            // ]
        };
    },
    getters:{
        getThemeStyle(state){
            return state.themeStyle["--general"]
        }
    },
    actions: {
        async getBaseConfigData() {
            try {
                const res = await getBaseConfig();
                this.themeStyle = res.theme_style
                console.log(this.themeStyle)
            } catch (error: any) {
                console.error(error);
                uni.showToast({
                    title: error.message,
                    icon: "none"
                });
            }
        }
    }
});
