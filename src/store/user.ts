import { defineStore } from "pinia";
import { useConfigStore } from "@/store/config";

export const useUserStore = defineStore("user", {
    state: () => ({
        token: uni.getStorageSync("token") || "",
        userInfo: {}
    }),
    getters: {},
    actions: {
        logout() {
            const configStore = useConfigStore();
            this.token = "";
            uni.removeStorageSync("token");
            uni.removeStorageSync("userInfo");
            uni.removeStorageSync("currentActiveValue");
            configStore.currentActiveValue = 0;
        },
        setUserInfo(data: any) {
            this.userInfo = data;
            uni.setStorageSync("userInfo", data);
        },
        setToken(token: string) {
            this.token = token;
            uni.setStorageSync("token", token);
        }
    }
});
