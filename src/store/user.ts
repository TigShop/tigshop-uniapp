import { defineStore } from "pinia";
import { useConfigStore } from "@/store/config";
const configStore = useConfigStore();

export const useUserStore = defineStore("user", {
    state: () => ({
        token: uni.getStorageSync("token") || "",
        userInfo: {}
    }),
    getters: {},
    actions: {
        logout() {
            this.token = "";
            uni.removeStorageSync("token");
            uni.removeStorageSync("currentActiveValue");
            configStore.currentActiveValue = 0;
        },
        setUserInfo(data: any) {
            this.userInfo = data;
        },
        setToken(token: string) {
            this.token = token;
            uni.setStorageSync("token", token);
        }
    }
});
