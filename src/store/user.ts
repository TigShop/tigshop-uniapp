import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        token: uni.getStorageSync("token") || "",
        userInfo:{},

    }),
    getters: {},
    actions: {
        logout() {
            localStorage.removeItem("accessToken");
        },
        setUserInfo(data: any) {
            this.userInfo = data;
        },
        setToken(token: string) {
            this.token = token;
        }
    }
});
