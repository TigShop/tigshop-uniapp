// 列表查询时筛选参数类型
export interface UserMsgFilterParams {
    page: number;
    size: number;
    unread: number;
}

export interface UserMsgFilterResult {
    filter_result: UserMsgFilterState[];
    filter: UserMsgFilterParams;
    total: number;
    errcode: number;
    message: string;
}

export interface UserMsgFilterState {
    add_time_date: string;
	add_time_hms: string;
	message_id: number;
	message_log_id: number;
	user_id: number;
	user_rank: number;
	is_read: number;
	title: string;
	content: string;
	link: string;
	add_time: string;
}
