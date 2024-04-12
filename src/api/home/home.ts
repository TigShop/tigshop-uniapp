import request from "@/utils/request";
import type { HomeResponse, GetCateProductFilterParams, GetCateProductResponse, SeckillResponse, CouponResponse } from "@/types/home/home";
import type { MobileCatNavFilterParams, MobileCatNavFilterResult } from "@/types/decorate/mobileCatNav.d";
import type { getProductListFilterState } from "@/types/decorate/mobileProduct";

// 首页
export const getIndex = () => {
    return request<HomeResponse>({
        url: "home/index",
        method: "post"
    });
};

// 获取首页分类栏
export const getMobileCatNavList = (params: MobileCatNavFilterParams) => {
    return request<MobileCatNavFilterResult>({
        url: "home/mobile_cat_nav",
        method: "get",
        params
    });
};

// 获取首页分类商品列表
export const getCateProduct = (params: GetCateProductFilterParams) => {
    return request<GetCateProductResponse>({
        url: "product/get_list",
        method: "get",
        params
    });
};

// 获取首页商品
export const getProductList = (params: object) => {
    return request<getProductListFilterState>({
        url: "decorate/decorate_request/product_list/",
        method: "get",
        params
    });
};

// 首页秒杀
export const getHomeSeckill = () => {
    return request<SeckillResponse>({
        url: "home/get_seckill/",
        method: "get"
    });
};

// 首页优惠券
export const getHomeCoupon = () => {
    return request<CouponResponse>({
        url: "home/get_coupon/",
        method: "get"
    });
};
