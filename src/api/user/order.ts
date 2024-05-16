import request from "@/utils/request";
import type { OrderNumResponse, OrderListResponse, OrderInfoResponse } from "@/types/user/order";
// 获取商品订单列表
export const getOrderList = (params: any) => {
    return request<OrderListResponse>({
        url: "user/order/list",
        method: "get",
        params
    });
};

export const getOrderNum = () => {
    return request<OrderNumResponse>({
        url: "user/order/order_num",
        method: "post"
    });
};

// 删除
export const delOrder = (data: object) => {
    return request({
        url: "user/order/del_order",
        method: "post",
        data
    });
};
// 取消订单
export const cancelOrder = (data: object) => {
    return request({
        url: "user/order/cancel_order",
        method: "post",
        data
    });
};
//获取订单详情
export const getOrder = (params: object) => {
    return request<OrderInfoResponse>({
        url: "user/order/info",
        method: "get",
        params
    });
};

// 再次购买
export const orderBuyAgain = (data: object) => {
    return request({
        url: "user/order/buy_again",
        method: "post",
        data
    });
};

export const confirmReceipt = (data: object) => {
    return request({
        url: "user/order/confirm_receipt",
        method: "post",
        data
    });
};

export const getShippingInfo = ( params: object) => {
    return request<any>({
        url: "user/order/shipping_info",
        method: "get",
        params
    });
};
