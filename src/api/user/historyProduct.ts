import request from "@/utils/request";
import type {HistoryProductResponse} from '@/types/user/historyProduct'

export const historyProductList = () => {
    return request<HistoryProductResponse>({
        url: 'user/user/history_product',
        method: 'get',
    })
}
