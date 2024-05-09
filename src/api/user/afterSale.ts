import request from "@/utils/request";
import type { afterSaleEditResponse, afterSaleEditParams, afterSaleInfoResponse, NegotiateResponse } from "@/types/user/afterSale";

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

// 售后申请撤销
export const aftersalesCancel = (data: object) => {
    return request({
        url: "user/aftersales/cancel",
        method: "post",
        data
    })
}


// 售后log
export const viewRecordLog = (id: number) => {
    return request<NegotiateResponse>({
        url: "user/aftersales/view_record_log?id=" + id,
        method: "get"
    })
}

//  提交售后反馈记录
export const aftersalesFeedback = (data: object) => {
    return request({
        url: "user/aftersales/feedback",
        method: "post",
        data
    })
}
