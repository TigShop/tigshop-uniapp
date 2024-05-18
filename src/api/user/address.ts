import request from "@/utils/request";
import type { AddressFilterParams, AddressDetailResponse, AddressResponse } from "@/types/user/address";
// 获取收货地址列表
export const getAddressList = (params: AddressFilterParams) => {
    return request<AddressResponse>({
        url: "user/address/list",
        method: "get",
        params
    });
};

// 删除
export const delAddress = (params: object) => {
    return request({
        url: "user/address/del",
        method: "get",
        params
    });
};
//获取收货地址详情
export const getAddressData = (params: object) => {
    return request<AddressDetailResponse>({
        url: "user/address/detail",
        method: "get",
        params
    });
};

// 添加地址
export const addAddressData = (data: object) => {
    return request<any>({
        url: "user/address/create",
        method: "post",
        data
    });
}

// 更新地址详情
export const updateAddressData = (data: object) => {
    return request<any>({
        url: "user/address/update",
        method: "post",
        data
    });
};

// 切换地址
export const selectedAddress = (data: object) => {
    return request<any>({
        url: "user/address/set_selected",
        method: "post",
        data
    });
};
