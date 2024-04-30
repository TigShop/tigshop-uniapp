import request from "@/utils/request";
import type { UserDataResponse } from "@/types/user/user";

export const getUser = () => {
    return request<UserDataResponse>({
        url: "user/info/",
        method: "get"
    });
};

export const getMemberCenter = () => {
    return request<any>({
        url: "user/user/member_center",
        method: "get"
    });
};
//最近浏览
export const getHistoryProduct = (params?: any) => {
    return request<any>({
        url: "user/user/history_product",
        method: "get",
        params
    });
};
