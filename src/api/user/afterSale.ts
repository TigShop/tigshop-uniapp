import request from "@/utils/request";
import type { afterSaleEditResponse, afterSaleEditParams, afterSaleInfoResponse } from "@/types/user/afterSale";

export const getAftersalesEdit = (params: afterSaleEditParams) => {
    return request<afterSaleEditResponse>({
        url: "user/aftersales/edit",
        method: "get",
        params
    });
};

export const updateAfterSales = (data: object) => {
    return request({
        url: "user/aftersales/update/",
        method: "post",
        data
    });
};

// 售后记录详情
export const aftersalesViewRecord = (id: number) => {
    return request<afterSaleInfoResponse>({
        url: "user/aftersales/view_record?id=" + id,
        method: "get"
    });
};
