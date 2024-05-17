
export interface PointFilterParams {
    page: number,
    size?: number,
}

// 获取列表返回参数类型
export interface PointFilterState {
    log_id?: number;
    user_id?: number;
    points?: string;
    change_type_name?: string;
    change_time?: string;
    change_desc?: string;
    change_type?: number;
}
export interface PointFilterResult {
    filter_result: PointFilterState[];
    filter: PointFilterParams;
    total: number;
    user_points: number;
    errcode: number;
    message: string;
}





