import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        token: uni.getStorageSync("token") || ""
    }),
    getters: {},
    actions: {}
});
