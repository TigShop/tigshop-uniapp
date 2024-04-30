/* 商品详情 */
export interface ProductDetailResponse {
    item: Item;
    desc_arr: any[];
    sku_list: SkuList[];
    pic_list: PicList[];
    attr_list: DataResponseAttrList;
    rank_detail: RankDetail;
    seckill_detail: SeckillDetail[];
    service_list: ServiceList[];
    checked_value: string[];
    errcode: number;
    message: string;
}

export interface ProductDetailResponseAttrList {
    normal: any[];
    spe: Spe[];
    extra: any[];
}

export interface ProductDetailSpe {
    attr_name: string;
    attr_list: AttrListElement[];
}

export interface ProductDetailAttrList {
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

export interface ProductDetailItem {
    product_id: number;
    product_name: string;
    product_sn: string;
    product_tsn: string;
    product_stock: number;
    product_price: string;
    market_price: string;
    shipping_tpl_id: number;
    product_status: number;
    product_type: number;
    category_id: number;
    brand_id: number;
    store_id: number;
    keywords: string;
    store_category_id: number;
    check_status: number;
    check_reason: string;
    click_count: number;
    product_weight: string;
    is_promote: number;
    is_promote_activity: number;
    promote_price: string;
    promote_start_date: string;
    promote_end_date: string;
    seckill_max_num: number;
    product_brief: string;
    product_desc: string;
    pic_url: string;
    pic_thumb: string;
    pic_original: string;
    comment_tag: string;
    free_shipping: number;
    integral: number;
    add_time: number;
    sort_order: number;
    store_sort_order: number;
    is_delete: number;
    is_best: number;
    is_new: number;
    is_hot: number;
    last_update: number;
    remark: string;
    give_integral: number;
    rank_integral: number;
    suppliers_id: number;
    virtual_sales: number;
    limit_number: number;
    product_care: string;
    product_related: any[];
    product_service_ids: number[];
    is_support_return: number;
    is_support_cod: number;
    product_video: string;
    prepay_price: string;
    is_seckill: number;
}

export interface ProductDetailPicList {
    pic_id: number;
    product_id: number;
    pic_url: string;
    pic_desc: string;
    pic_thumb: string;
    pic_large: string;
    sort_order: number;
}

export interface ProductDetailRankDetail {
    total: number;
    average_rank: number;
    good_percent: number;
}

export interface ProductDetailSeckillDetail {
    seckill_id: number;
    seckill_name: string;
    seckill_start_time: string;
    seckill_end_time: string;
    seckill_limit_num: number;
    product_id: number;
    seckill_item: SeckillItem[];
}

export interface ProductDetailSeckillItem {
    rec_id: number;
    seckill_id: number;
    product_id: number;
    sku_id: number;
    seckill_price: string;
    seckill_stock: number;
    seckill_sales: number;
    seckill_start_time: number;
    seckill_end_time: number;
    sku_data: SkuDatum[];
    sku_stock: number;
    sku_price: string;
}

export interface ProductDetailSkuDatum {
    name: string;
    value: string;
}

export interface ProductDetailServiceList {
    product_service_id: number;
    product_service_name: string;
    ico_img: string;
}

export interface ProductDetailSkuList {
    sku_id: number;
    product_id: number;
    sku_value: string;
    sku_data: SkuDatum[];
    sku_sn: string;
    sku_stock: number;
    sku_tsn: string;
    sku_price: string;
}
