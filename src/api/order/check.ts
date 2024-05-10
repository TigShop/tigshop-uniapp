import request from "@/utils/request";
import type { CheckResponse } from "@/types/order/check";

//  获取订单数据
export const getOrderCheckData = () => {
    return request<CheckResponse>({
        url: "order/check/index/",
        method: "post"
    });
};
export const updateOrderCheckData = (type: string, data: any) => {
    return request({
        url: "order/check/update/",
        method: "post",
        data: { type, ...data }
    });
};
export const updateCouponData = (data: any) => {
    return request({
        url: "order/check/update_coupon/",
        method: "post",
        data: data
    });
};
export const orderSubmit = (data: any) => {
    return request({
        url: "order/check/submit/",
        method: "post",
        data: data
    });
};
