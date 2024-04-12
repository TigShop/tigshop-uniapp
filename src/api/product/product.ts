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
