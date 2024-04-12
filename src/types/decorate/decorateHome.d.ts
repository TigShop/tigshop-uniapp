// 列表查询时筛选参数类型
export interface FilterParams {
    page: number;
    size: number;
    sort_field: string,
    sort_order: string,
    keyword?: string;
}

// 获取列表返回参数类型
export interface FilterResult {
    filter_result: FilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface FilterState {
    decorate_id: number;
    decorate_title?: string;
    sort_order?: number;
}


// 获取详情返回参数类型
export interface FormResult {
    item: FormState;
}
export interface FormState {
    decorate_title?: string;
    decorate_desc?: string;
    sort_order?: string;
}
