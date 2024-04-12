// 获取地址列表类型
export interface RegionFilterState {
    region_list?: [];
    errcode: number;
    message: string;
}

export interface AddressFilterParams {
    page: number;
    size: number;
}

export interface AddressResponse {
    filter_result: FilterResult[];
    filter: Filter;
    total: number;
    errcode: number;
    message: string;
}

export interface AddressFilterResult {
    region_name: string;
    address_id: number;
    user_id: number;
    consignee: string;
    email: string;
    region_names: string[];
    address: string;
    telephone: string;
    mobile: string;
    is_selected: number;
}

/* 地址详情 */
export interface AddressDetailResponse {
    item: Item;
    errcode: number;
    message: string;
}

export interface Item {
    address_id: number;
    address_tag: string;
    user_id: number;
    consignee: string;
    email: string;
    region_ids: number[];
    region_names: string[];
    address: string;
    postcode: string;
    telephone: string;
    mobile: string;
    is_default: number;
    is_selected: number;
}
