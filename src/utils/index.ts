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

// 节流
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => ReturnType<T> | undefined {
    let inThrottle: boolean = false;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            inThrottle = true;
            return func(...args);
        }
    };
}

// 防抖
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number, immediate: boolean = false): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null;

    return function (this: any, ...args: Parameters<T>) {
        const context = this;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

export const hasToken = () => {
    const userStore = useUserStore();
    if (!userStore.token) {
        return () =>
            uni.navigateTo({
                url: "/pages/login/index"
            });
    }
};
