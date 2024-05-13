import request from "@/utils/request";
import type {
    AccountFilterParams,
    AccountDetailFilterResult,
    AccountFilterResult,
    DepositFilterResult,
    AccountInfoResult
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

export const getDepositList = () => {
    return request<DepositFilterResult>({
        url: 'user/recharge_order/setting/',
        method: 'get'
    });
}

// 提现
export const getAccountNoList = (params?: AccountFilterParams) => {
    return request<AccountInfoResult>({
        url: 'user/withdraw_apply/list/',
        method: 'get',
        params,
    });
}

export const updateWithdrawApply = (data: object) => {
    return request({
        url: 'user/withdraw_apply/update/',
        method: 'post',
        data
    });
}