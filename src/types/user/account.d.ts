// 列表查询时筛选参数类型
export interface AccountFilterParams {
    page: number;
    size: number;
    status?: number;
    account_type?: number;
}

export interface AccountDetailFilterResult {
    filter_result: AccountDetailFilterState[];
    filter: AccountFilterParams;
    total: number;
    errcode: number;
    message: string;
}

export interface AccountDetailFilterState {
    change_time?: string;
    balance?: number;
    frozen_balance?: number;
    change_type?: string;
    change_desc?: string;
    change_type_name?: string;
}

export interface AccountFilterResult {
    filter_result: AccountFilterState[];
    filter: AccountFilterParams;
    total: number;
    errcode: number;
    message: string;
}

export interface AccountFilterState {
    add_time?: string;
    amount?: string;
    type?: string;
    postscript?: string;
    status_type?: string;
}

export interface DepositFilterResult {
    filter_result: DepositFilterState[];
    filter: DepositFilterParams;
    total: number;
    errcode: number;
    message: string;
}

export interface DepositFilterState {
    discount_money?: string;
    money?: string;
    recharge_id?: number;
    selected?: boolean;
}