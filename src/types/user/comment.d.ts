// 列表查询时筛选参数类型
export interface CommentFilterParams {
    page: number;
    size: number;
}

// 获取列表返回参数类型
export interface CommentFilterState {
    order_id: number;
    product_sn?: number;
    consignee: string;
    add_time: string;
    shipping_fee: string;
    pay_status_name: string;
    total_amount?: string;
    unpaid_amount?: string;
    order_status?: number;
    pay_type_id?:number;
    order_sn?: string;
    is_show?: boolean;
    items?: ProductItems[];
    invoice_data?:InvoiceData;
    comment_rank?:number;
    product_id?:number;
    comment_tag?:string[];
    pic_thumb?:string;
    product_name?:string;
    content?:string;
    reply?: ReplyObject;
    show_pics: any[];
}
export interface ReplyObject {
	comment_id: number;
	user_id: number;
	username: string;
	content: string;
	add_time: string;
	parent_id: number;
}
export interface InvoiceData{
    status:number;
}

export interface ProductItems{
    pic_thumb:string;
    product_name:string;
    sku_data:string;
    product_sn:string;
    product_id:number;
    quantity:number;
    price:string;
    subtotal:string;
}

export interface CommentFilterResult {
    filter_result: CommentFilterState[];
    filter: OrderFilterParams;
    total: number;
}


export interface subNumFilterResult {
	await_comment?: number;
	show_pics?: number;
	commented?: number;
}

export interface CommentEditFormData {
	product_id: number;
	order_id: number;
	order_item_id: number;
	store_id: number;
	comment_rank: number;
	comment_tag: string[];
	content: string;
	show_pics: any[];
}
