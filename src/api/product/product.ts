import request from "@/utils/request";
import type {ProductFilterResult, SkuDetail,ProductCouponList,CommentFilterResult,CommentDetailResult,GuessLikeListResult,ProductConsultationFormState,ProductConsultationList} from "@/types/product/product.d";

// 获取商品详情
export const getProductDetail = (id: any) => {
    return request<ProductFilterResult>({
        url: "product/product/detail",
        method: "get",
        params: { id }
    });
};

export const getComment = (id: number) => {
    return request<CommentDetailResult>({
        url: "product/product/get_comment",
        method: "get",
        params: { id }
    });
};
export const getCommentList = (id: number, params: object) => {
    return request<CommentFilterResult>({
        url: "product/product/get_comment_list",
        method: "get",
        params: { id, ...params }
    });
};

export const getProductSkuDetail = (id: string, params: object) => {
    return request<SkuDetail>({
        url: "product/product/get_product_availability",
        method: "get",
        params: { id, ...params }
    });
};
export const addToCart = (params: { id: number; number: number; sku_id?: number; is_quick?: number }) => {
    return request({
        url: "product/product/add_to_cart",
        method: "post",
        data: params
    });
};
//商品咨询列表
export const getProductConsultationList = (params: object) => {
    return request<ProductConsultationList>({
        url: 'user/feedback/list?is_order=1',
        method: 'get',
        params
    });
}
//提交商品咨询
export const addConsultation = (data:ProductConsultationFormState) => {
    return request({
        url: "user/feedback/submit",
        method: "post",
        data
    });
};

//售后服务内容
export const getAfterSaleService = (id: number) => {
    return request<any>({
        url: 'common/config/after_sales_service',
        method: 'get',
    });
};


//收藏商品
export const getCollectProduct = (params: object) => {
    return request<any>({
        url: 'product/product/is_collect',
        method: 'get',
        params
    });
};
// 取消收藏商品
export const delCollectProduct = (params: object) => {
    return request({
        url: "user/collect_product/cancel",
        method: "get",
        params
    });
};
// 收藏商品
export const updateCollectProduct = (data: object) => {
    return request({
        url: "user/collect_product/save",
        method: "get",
        data
    });
};

//优惠券列表
export const getProductCouponList = (id: number) => {
    return request<ProductCouponList>({
        url: "product/product/get_coupon",
        method: "get",
        params: { id }
    });
}
