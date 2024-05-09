// 列表查询时筛选参数类型
export interface ExchangeFilterParams {
    page: number;
    size?: number;
    sort_field: string;
    sort_order: string;
    is_enabled?: number;
}

// 获取列表返回参数类型
export interface ExchangeFilterState {
    id?: number;
	product_id?: number;
	exchange_integral?: number;
	points_deducted_amount?: string;
	is_hot?: number;
	is_enabled?: number;
	product_name?: string;
	market_price?: string;
	pic_url?: string;
	discounts_price?: string;
}

export interface ExchangeFilterResult {
    filter_result: ExchangeFilterState[];
    filter: ExchangeFilterParams;
    errcode: number;
    total: number;
}
