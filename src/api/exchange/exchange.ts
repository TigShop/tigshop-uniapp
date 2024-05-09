import request from '@/utils/request';
import type {
    ExchangeFilterResult,
    ExchangeFilterParams
} from "@/types/exchange/exchange.d";

// 获取积分兑换商品列表
export const getExchangeList = (params: ExchangeFilterParams) => {
    return request<ExchangeFilterResult>({
        url: "product/exchange/list/",
        method: "get",
        params
    });
};
export const getExchangeDetail = (id: any) => {
    return request({
        url: "product/exchange/edit",
        method: "get",
        params: { id }
    });
};
