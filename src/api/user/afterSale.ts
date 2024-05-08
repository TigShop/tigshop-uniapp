import request from "@/utils/request";
import type {afterSaleEditResponse, afterSaleEditParams} from '@/types/user/afterSale'

export const getAftersalesEdit = (params: afterSaleEditParams) => {
    return request<afterSaleEditResponse>({
        url: 'user/aftersales/edit',
        method: 'get',
        params
    })
}
