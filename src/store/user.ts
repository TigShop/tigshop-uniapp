import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        token: uni.getStorageSync("token") || "",
        userInfo:{},

    }),
    getters: {},
    actions: {
        logout() {
            uni.removeStorageSync("token");
        },
        setUserInfo(data: any) {
            this.userInfo = data;
        },
        setToken(token: string) {
            console.log('token',token)
            this.token = token;
            uni.setStorageSync("token", token);
        }
    }
});
