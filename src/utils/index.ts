import { useUserStore } from "@/store/user";

type getLengthType = string | object | any[];
export const getLength = (value: getLengthType) => {
    if (typeof value === "string") {
        return value.length;
    } else if (Array.isArray(value)) {
        return value.length;
    } else if (typeof value === "object") {
        return Object.keys(value).length;
    } else {
        return 0;
    }
};


export const hasToken = () => {
    const userStore = useUserStore();
    if (!userStore.token) {
        return () =>
            uni.navigateTo({
                url: "/pages/login/index"
            });
    }
};
