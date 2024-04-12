import { useConfigStore } from "@/store/config";

// 格式化图片地址
export function imageFormat(path: string) {
    const config = useConfigStore();
    if (!path) {
        return "";
    }
    if (Number(config.get("storage_type")) > 0) {
        // return path.includes("http") !== false ? path : config.get("storage_url") + path;
        return path.includes("http") !== false ? path : "https://oss.lyecs.com/" + path;
    } else {
        return path.includes("http") !== false ? path : "https://oss.lyecs.com/" + path;
    }
}
// 格式化金额
export function priceFormat(price: number | undefined, currencyFormat = true) {
    const config = useConfigStore();
    const currency = config.get("dollar_sign") ?? "¥";
    price = price ? price : 0;
    const num = typeof price === "string" ? parseFloat(price) : price;
    if (currencyFormat) {
        return currency + "" + num.toFixed(2);
    } else {
        return num.toFixed(2);
    }
}

// 链接格式化
export function urlFormat(params: string | { path: string; [key: string]: any }): string {
    if (!params) return "";
    if (typeof params === "string") {
        return params;
    } else {
        switch (params.path) {
            case "product":
                return "/pages/productDetail/index?id=" + params.id + "";
            case "list":
                return "/list/?cat=" + params.id;
            case "base":
                // 基础页面
                return "/" + params.link;
            case "custom":
                // 自定义页面
                return "/" + params.link;
            default:
                return params.path;
        }
    }
}
