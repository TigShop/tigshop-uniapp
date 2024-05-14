import request from "@/utils/request";
import type { payResponse, creatPayParams } from "@/types/order/pay";

export const orderPayInfo = (id: number) => {
    return request<payResponse>({
        url: "order/pay/index?id=" + id,
        method: "get"
    });
};

// 创建订单支付
export const creatPay = (params: creatPayParams) => {
    return request({
        url: "order/pay/creat/",
        method: "get",
        params
    });
};

export const checkPayStatus = (params: {}) => {
    return request({
        url: "order/pay/check_status/",
        method: "get",
        params
    });
};

export const rechargeOrderPay = (data: { order_id: number }) => {
    return request({
        url: "user/recharge_order/pay",
        method: "post",
        data
    });
};

// 创建充值支付
export const rechargeOrderCreate = (data: creatPayParams) => {
    return request({
        url: "user/recharge_order/create",
        method: "post",
        data
    });
};
