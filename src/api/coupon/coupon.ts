import request from "@/utils/request";
import type { CouponResponse, CouponFilterParams, CouponDetailResponse, CouponInfoParams } from "@/types/coupon/coupon";

export const getCouponList = (params: CouponFilterParams) => {
    return request<CouponResponse>({
        url: "user/coupon/get_list",
        method: "get",
        params
    });
};
// 获取我的优惠券列表
export const getMyCouponList = (params: CouponFilterParams) => {
    return request<CouponResponse>({
        url: "user/coupon/list",
        method: "get",
        params
    });
};
//领取优惠券
export const addCoupon = (data: object) => {
    return request({
        url: "user/user_coupon/claim",
        method: "post",
        data
    });
};
//删除我的优惠券
export const delCoupon = (data: object) => {
    return request({
        url: "user/coupon/del",
        method: "post",
        data
    });
};


// 获取我的优惠券详情
export const getMyCouponInfo = (params:CouponInfoParams) => {
    return request<CouponDetailResponse>({
        url: "user/coupon/edit",
        method: "get",
        params
    });
};
