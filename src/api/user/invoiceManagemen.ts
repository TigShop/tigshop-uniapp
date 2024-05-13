import request from "@/utils/request";

// 订单电子发票申请添加
export const orderInvoiceInsert = (data: object) => {
    return request({
        url: "user/order_invoice/insert",
        method: "post",
        data
    });
};

// 编辑
export const orderInvoiceUpdate = (data: object) => {
    return request({
        url: "user/order_invoice/update",
        method: "post",
        data
    });
}

/**    增票资质          */
export const getUserInvoice = () => {
    return request<any>({
        url: "user/invoice/edit/",
        method: "get"
    });
};
export const updateUserInvoice = (params: object) => {
    return request<any>({
        url: "user/invoice/update/",
        method: "post",
        params
    });
};
export const getInvoiceStatus = () => {
    return request<any>({
        url: "user/invoice/get_status/",
        method: "get"
    });
};
