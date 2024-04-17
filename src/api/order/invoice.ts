import request from "@/utils/request";
import type { InvoiceResponse } from "@/types/order/invoice";

// 获取增票资质详情 状态
export const getInvoiceStatus = () => {
    return request<InvoiceResponse>({
        url: "user/invoice/get_status/",
        method: "get"
    });
};