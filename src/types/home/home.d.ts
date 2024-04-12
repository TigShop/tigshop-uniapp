export interface PicItem {
    pic_id: number;
    pic_thumb: string;
    pic_url: string;
    pic_name: string;
}

export interface TitleBackgroundPic {
    pic_url: string;
    pic_thumb: string;
}

export interface TitleFormat {
    title_background: string;
    title_radius: string;
}

export interface Title {
    show_title: number;
    title_style: number;
    title_background: string;
    title_background_pic: TitleBackgroundPic;
    title_radius: number;
    title_text: string;
    desc_text: string;
    desc_color: string;
    show_more: number;
    more_link: any[]; // 这里假设more_link是一个任意对象数组，具体类型需要根据实际情况补充
    more_color: string;
    format: TitleFormat;
}

export interface Frame {
    background_color: string;
    inner_padding: number;
    box_radius: number;
    box_padding: number;
    box_padding_top: number;
    box_padding_bottom: number;
}

export interface Module {
    pic_type: number;
    pic_list: PicItem[];
    swiper_pre_view: number;
    swiper_page_color: string;
    img_padding: number;
    pic_page_type: number;
    pic_radio_style: number;
    is_flux_width: number;
    frame: Frame;
    title: Title;
}

export interface ModuleListItem {
    type: string;
    label: string;
    module: Module;
    is_show: boolean;
    module_index: number;
    active: boolean;
}

// 首页
export interface HomeResponse {
    message: string;
    module_list: ModuleListItem[];
    errcode: number;
    decorate_id: number;
}

/*      分类商品列表    */
export interface GetCateProductFilterParams {
    category_id: number;
    page: number;
}

export interface GetCateProductResponse {
    filter_result: FilterResult[];
    filter: Filter;
    total: number;
    waiting_checked_count: number;
    errcode: number;
    message: string;
}

export interface Filter {
    is_show: number;
    page: number;
    size: number;
    sort_field: string;
    sort_order: string;
    product_id: number;
    is_delete: number;
    category_id: number;
    brand_id: number;
    ids: null;
    store_id: number;
    intro_type: string;
}

export interface GetProductFilterResult {
    product_id: number;
    pic_thumb: string;
    product_name: string;
    check_status: number;
    store_id: number;
    suppliers_id: number;
    product_type: number;
    product_sn: string;
    product_price: string;
    product_status: number;
    is_best: number;
    is_new: number;
    is_hot: number;
    product_stock: number;
    sort_order: number;
}

/* 秒杀 */
export interface SeckillResponse {
    seckill_list: SeckillList[];
    errcode: number;
    message: string;
}

export interface SeckillList {
    product_id: number;
    pic_thumb: string;
    pic_url: string;
    product_name: string;
    check_status: number;
    store_id: number;
    suppliers_id: number;
    product_type: number;
    product_sn: string;
    product_price: string;
    market_price: string;
    product_status: number;
    is_best: number;
    is_new: number;
    is_hot: number;
    product_stock: number;
    sort_order: number;
    seckill_price: string;
    org_product_price: string;
    product_sku: ProductSku[];
}

export interface ProductSku {
    sku_id: number;
    product_id: number;
    sku_value: string;
    sku_data: null;
    sku_sn: string;
    sku_stock: number;
    sku_tsn: string;
    sku_price: string;
}



/* 优惠券 */
export interface CouponResponse {
    coupon_list: CouponList[];
    errcode:     number;
    message:     string;
}

export interface CouponList {
    is_receive:        number;
    coupon_id:         number;
    coupon_name:       string;
    coupon_money:      string;
    coupon_discount:   number;
    coupon_desc:       string;
    coupon_type:       number;
    send_range:        number;
    send_range_data:   number[];
    min_order_amount:  string;
    send_start_date:   string;
    send_end_date:     string;
    send_type:         number;
    use_day:           number;
    use_start_date:    string;
    use_end_date:      string;
    is_show:           number;
    is_global:         number;
    is_new_user:       number;
    enabled_click_get: number;
    limit_user_rank:   null;
    store_id:          number;
}
