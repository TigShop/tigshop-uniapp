import request from "@/utils/request";

export const orderInvoiceInsert = (data: object) =>{
    return request({
        url: 'user/order_invoice/insert',
        method: 'post',
        data
    })
}
