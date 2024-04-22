import request from "@/utils/request";
import type { payResponse, creatPayParams } from "@/types/order/pay";

export const orderPayInfo = (id: number) => {
    return request<payResponse>({
        url: "order/pay/index?id=" + id,
        method: "get"
    });
};

export const creatPay = (params: creatPayParams) => {
    return request({
        url: "order/pay/creat/",
        method: "get",
        params
    });
};
