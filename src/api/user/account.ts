import request from "@/utils/request";
import type {
    AccountFilterParams,
    AccountDetailFilterResult,
    AccountFilterResult,
    DepositFilterResult,
    AccountInfoResult,
    AccountNoFilterParams,
    AccountFormResult
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

// 提交充值申请
export const updateRechargeOrder = (data: object) => {
    return request({
        url: 'user/recharge_order/update',
        method: 'post',
        data
    });
}

// 提现
export const getAccountNoList = (params?: AccountNoFilterParams) => {
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

export const delAccount = (params: object) => {
    return request({
        url: "user/withdraw_apply/del_account/",
        method: "post",
        params
    });
};

export const getAccount = (params?: object) => {
    return request<AccountFormResult>({
        url: 'user/withdraw_apply/account_detail/',
        method: 'get',
        params,
    });
}

export const updateAccount = (params: object,url:string) => {
    return request({
        url: "user/withdraw_apply/"+url+"/",
        method: "post",
        params
    });
};