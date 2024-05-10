export interface ProductItem {
    id?: string;
    product_id: number;
    product_name?: string;
    product_sn?: string;
    product_tsn?: string;
    product_stock: number;
    product_price?: string;
    market_price?: string;
    shipping_tpl_id?: number;
    product_status?: number;
    product_type?: number;
    category_id?: number;
    brand_id?: number;
    store_id?: number;
    keywords?: string;
    store_category_id?: number;
    check_status?: number;
    check_reason?: string;
    click_count?: number;
    product_weight?: string;
    is_promote?: number;
    is_promote_activity?: number;
    promote_price?: string;
    promote_start_date?: number;
    promote_end_date?: number;
    seckill_max_num?: number;
    product_brief?: string;
    product_desc?: string;
    pic_url?: string;
    pic_thumb?: string;
    pic_original?: string;
    comment_tag?: string;
    free_shipping?: number;
    integral?: number;
    add_time?: number;
    sort_order?: number;
    store_sort_order?: number;
    is_delete?: number;
    is_best?: number;
    is_new?: number;
    is_hot?: number;
    last_update?: number;
    remark?: string;
    give_integral?: number;
    rank_integral?: number;
    suppliers_id?: number;
    virtual_sales?: number;
    limit_number?: number;
    product_care?: string;
    product_related?: any;
    product_service_ids?: any;
    is_support_return?: number;
    is_support_cod?: number;
    product_video?: string;
    prepay_price?: string;
    number?: number;
    discounts_price?: string;
    exchange_integral?: number;
    is_seckill?: number;
    product_sku?: SkuList[];
}
export interface ProductFilterParams {
    page?: number;
    size?: number;
}
export interface ProductFilterResult {
    item: ProductItem;
    desc_arr: DescArr[];
    sku_list: SkuList[];
    pic_list: PicList[];
    attr_list: AttrList;
    rank_detail: RankDetail;
    checked_value:string[];
    errcode: number;
}
export interface RankDetail {
    total?: number;
    average_rank?: number;
    good_percent?: number;
}
export interface AttrList {
    normal: Normal[];
    spe?: Spe[];
    extra?: Extra[];
}

export interface Normal {
    attr_name: string;
    attr_list: Attr_list[];
}

export interface GuessLikeListResult {
    product_list: ProductItem[];
    errcode: number;
}
export interface Spe {
    attr_name: number;
    attr_list: Attr_list[];
}

export interface Extra {
    attr_name: string;
    attr_list: Attr_list[];
}

export interface Attr_list {
    attributes_id: number;
    product_id: number;
    attr_type: number;
    attr_name: string;
    attr_value: string;
    attr_price: string;
    attr_color: string;
    attr_pic: string;
    attr_pic_thumb: string;
}

export interface SkuList {
    sku_id?: number;
    product_id?: number;
    sku_value?: string;
    sku_data?: Sku_data[];
    sku_sn?: string;
    sku_stock?: number;
    sku_tsn?: string;
    sku_price?: string;
}

export interface Sku_data {
    name: string;
    value: string;
}

export interface PicList {
    pic_id?: number;
    product_id?: number;
    pic_url?: string;
    pic_desc?: string;
    pic_thumb?: string;
    pic_large?: string;
    sort_order?: number;
}
export interface DescArr {
    type?: string;
    pic?: string;
    html?: string;
}

export interface SkuDetail {
    price: string;
    stock: number;
    is_seckill: number;
    seckill_end_time: string;
    errcode: number;
    message: string;
}
export interface CommentDetailResult {
    item: CommentDetail;
    errcode: number;
}
export interface CommentDetail {
    total?: number;
    good_count?: number;
    moderate_count?: number;
    bad_count?: number;
    show_count?: number;
    good_percent?: number;
    moderate_percent?: number;
    bad_percent?: number;
}

export interface CommentFilterResult {
    filter_result: CommentItem[];
    total: number;
    errcode: number;
}

export interface CommentItem {
    comment_id?: number;
    user_id?: number;
    username?: string;
    avatar?: string;
    product_id?: number;
    order_id?: number;
    order_item_id?: number;
    comment_rank?: number;
    content?: string;
    add_time?: string;
    status?: number;
    parent_id?: number;
    usefull?: number;
    useless?: number;
    comment_tag?: any;
    show_pics?: any;
    is_recommend?: number;
    is_top?: number;
    is_showed?: number;
    is_default?: number;
    sort_order?: number;
    store_id?: number;
}

//商品优惠券
export interface ProductCouponItem {
    coupon_id?: number;
	coupon_name?: string;
	coupon_money?: string;
	coupon_discount?: number;
	coupon_desc?: string;
	coupon_type?: number;
	send_range?: number;
	send_range_data?: any[];
	min_order_amount?: string;
	send_start_date?: string;
	send_end_date?: string;
	send_type?: number;
	use_day?: number;
	use_start_date?: string;
	use_end_date?: string;
	is_show?: number;
	is_global?: number;
	is_new_user?: number;
	enabled_click_get?: number;
	limit_user_rank?: number[];
	store_id?: number;
	is_receive?: number;
}
export interface ProductCouponList {
    list: ProductCouponItem[];
    errcode: number;
}
//商品咨询
export interface ProductConsultationItem {
    add_time?: string;
    username?: string;
    content?: string;
    reply?: any;
}
export interface ProductConsultationList {
    filter_result: ProductConsultationItem[];
    total: number;
    errcode: number;
}

export interface ProductConsultationFormState {
    product_id?: number;
    content?: string;
    email?: string;
}

export interface ServiceList {
	product_service_id: number;
	product_service_name: string;
	ico_img: string;
}


export interface BrandInfo {
	brand_id: number;
	brand_name: string;
	brand_logo: string;
	site_url: string;
	first_word: string;
}
