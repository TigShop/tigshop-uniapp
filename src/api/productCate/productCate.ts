import request from "@/utils/request";
import type { DataResponse, SearchFilterResult } from "@/types/productCate/productCate";
// 获取商品分类
export const getSearchFilter = (data: {}) => {
    return request<SearchFilterResult>({
        url: "search/get_filter/",
        method: "get",
        params: data
    });
};
// 获取商品分类树
export const getCategoryTree = (id?: string) => {
    return request<DataResponse>({
        url: "category/parent_tree",
        method: "get",
        params: { id }
    });
};
