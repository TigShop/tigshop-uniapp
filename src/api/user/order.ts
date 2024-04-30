import request from "@/utils/request";
import type { OrderNumResponse, OrderListResponse } from "@/types/user/order";
// 获取商品订单列表
export const getOrderList = (params: any) => {
    return request<OrderListResponse>({
        url: "user/order/list/",
        method: "get",
        params
    });
};

export const getOrderNum = () => {
    return request<OrderNumResponse>({
        url: "user/order/order_num/",
        method: "post"
    });
};
