import request from "@/utils/request";
import type { SearchFilterResult } from "@/types/productCate/productCate";
// 获取商品分类
export const getCategoryAll = () => {
    return request<SearchFilterResult>({
        url: "/category/category/all",
        method: "get"
    });
};
// 获取热门商品
export const getCategoryHot = () => {
    return request<SearchFilterResult>({
        url: "/category/category/hot",
        method: "get",
    });
};
// 获取分类树
export const getCategoryTree = (id:number) => {
    return request<SearchFilterResult>({
        url: "/category/category/parent_tree",
        method: "get",
    });
};
