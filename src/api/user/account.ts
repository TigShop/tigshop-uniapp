import request from "@/utils/request";
import type {
    AccountFilterParams,
    AccountDetailFilterResult,
    AccountFilterResult
} from '@/types/user/account'

// 账户变动记录
export const getAccountList = (params?: AccountFilterParams) => {
    return request<AccountDetailFilterResult>({
        url: 'user/account/list/',
        method: 'get',
        params
    });
}

// 申请记录
export const getRechargeOrderList = (params?: AccountFilterParams) => {
    return request<AccountFilterResult>({
        url: 'user/recharge_order/list/',
        method: 'get',
        params
    });
}
