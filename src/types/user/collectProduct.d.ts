// 列表查询时筛选参数类型
export interface CollectProductFilterParams {
    page: number;
    size: number;
    keyword?: string;
}

export interface CollectProductResponse {
    filter_result:filter_result[];
    total: number;
    errcode: number;
    message: string;
}

export interface CollectProductList {
    collect_id: number;
    product_stock: number;
    user_id?: number;
    product_id: number;
    add_time?: string;
    is_attention?: number;
    product_name?: string;
    product_sn?: string;
    pic_thumb: string;
    market_price?: string;
    is_promote?: number;
    promote_price?: string;
    promote_start_date?: string;
    promote_end_date?: string;
    username?: string;
    rank_id?: number;
    discount?: number;
    user_price?: string;
    actual_price?: string;
    product_price?: string;
    product_sku?: Array[];
}
