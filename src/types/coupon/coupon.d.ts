export interface CouponFilterParams {
    page: number;
    size: number;
}
export interface CouponResponse {
    filter_result: FilterResult[];
    filter: Filter;
    total: number;
    errcode: number;
    message: string;
}

export interface CouponFilterResult {
    is_receive: number;
    coupon_id: number;
    coupon_name: string;
    coupon_money: string;
    coupon_discount: number;
    coupon_desc: string;
    coupon_type: number;
    send_range: number;
    send_range_data: number[];
    min_order_amount: string;
    send_start_date: string;
    send_end_date: string;
    send_type: number;
    use_day: number;
    use_start_date: string;
    use_end_date: string;
    is_show: number;
    is_global: number;
    is_new_user: number;
    enabled_click_get: number;
    limit_user_rank: number[] | null;
    store_id: number;
}

export interface CouponDetailResponse {
    item: Item;
    errcode: number;
    message: string;
}

interface CouponInfoParams {
    id: number;
}

export interface CouponDetailItem {
    coupon_id: number;
    coupon_name: string;
    coupon_money: string;
    coupon_discount: number;
    coupon_desc: string;
    coupon_type: number;
    send_range: number;
    send_range_data: any[];
    min_order_amount: string;
    send_start_date: string;
    send_end_date: string;
    send_type: number;
    use_day: number;
    use_start_date: string;
    use_end_date: string;
    is_show: number;
    is_global: number;
    is_new_user: number;
    is_receive: number;
    enabled_click_get: number;
    limit_user_rank: null;
    store_id: number;
}
