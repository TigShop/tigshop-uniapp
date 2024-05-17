import request from "@/utils/request";
import type { SearchFilterResult, ProductFilterResult, ProductFilterParams } from "@/types/search/search";

// 获取分类树
export const getCategoryTree = (id?:number) => {
    return request<SearchFilterResult>({
        url: "category/category/parent_tree",
        method: "get",
        data: {id}
    });
};


// 获取分类筛选项
export const getCategoryProductFilter = (params:ProductFilterParams) => {
    return request<ProductFilterResult>({
        url: "search/search/get_filter",
        method: "get",
        params
    });
};


// 获取分类商品
export const getCategoryProduct = (params:ProductFilterParams) => {
    return request<ProductFilterResult>({
        url: "search/search/get_product",
        method: "get",
        params
    });
};
