// import { getTheme } from "@/api/user/user";
export const useThemeStore = defineStore("theme", {
    state: () => {
        return {
            themeId: 0,
            themeColor: {},
            themeColors: [
                {
                    // 0:红色
                    "--general": "#ff4444", //主色
                    "--main-bg": "#ff4444", //主背景色
                    "--main-btn-hover-bg": "#ff6262", //主背景按钮悬停色
                    "--main-bg-gradient": "#ff4444", //主背景渐变色
                    "--main-text": "#ffffff", //主背景文字颜色
                    "--vice-bg": "#ff8855", //副背景色
                    "--vice-text": "#fff", //副文字颜色
                    "--icon": "#fc0000", //图标
                    "--price": "#fc0000", //价格颜色
                    "--tag-text": "#cf0000", //标签文字颜色
                    "--tag-bg": "#fff2f2" //标签背景颜色
                },
                {
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
            ]
        };
    },
    getters: {
        // themeColor: (state) => {
        //     return state.themeColors[state.themeId];
        // }
    },
    actions: {}
});
