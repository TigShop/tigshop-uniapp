
import type { LinkType } from "@/types/decorate/decorate"
// 列表查询时筛选参数类型
export interface MobileCatNavFilterParams {
    page?: number;
    size?: number;
    sort_field?: string,
    sort_order?: string,
    paging?: number;
    is_show?: number;
}

// 获取列表返回参数类型
export interface MobileCatNavFilterState {
    mobile_cat_nav_id: number;
    category_name?: string;
    is_show?: boolean;
    sort_order?: number;
}
export interface MobileCatNavFilterResult {
    filter_result: MobileCatNavFilterState[];
    filter: MobileCatNavFilterParams;
    total: number;
    errcode: number;
    message: string;
}


// 获取详情返回参数类型
export interface MobileCatNavFormState {
    id?: number;
    category_id?: number;
    cat_color?: string;
    img_url?: any[];
    child_cat_ids?: number[];
    brand_ids: any[];
    is_show?: number;
    sort_order?: string;
}

export interface MobileCatNavFormResult {
    item: MobileCatNavFormState;
}



