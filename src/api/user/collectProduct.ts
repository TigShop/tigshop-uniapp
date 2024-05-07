import request from "@/utils/request";
import type { CollectProductResponse } from '@/types/user/collectProduct'

// 收藏商品列表
export const collectProductList = () => {
    return request<CollectProductResponse>({
        url: 'user/collect_product/list/',
        method: 'get',
    })
}

// 取消收藏商品
export const delCollectProduct = (params: object) => {
    return request({
        url: "user/collect_product/del/",
        method: "get",
        params
    });
};

