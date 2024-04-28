import request from "@/utils/request";
import type { DataResponse } from "@/types/product/product";
// 获取商品详情
export const getProductDetail = (id: string) => {
    return request<DataResponse>({
        url: "product/index/",
        method: "get",
        params: { id }
    });
};

// 添加到购物车
export const addToCart = (params: { id: number; number: number; sku_id?: number; is_quick?: number }) => {
    return request({
        url: "product/add_to_cart/",
        method: "post",
        data: params
    });
};
