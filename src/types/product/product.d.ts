/* 商品详情 */
export interface DataResponse {
    item:        Item;
    desc_arr:    DescArr[];
    sku_list:    any[];
    pic_list:    PicList[];
    attr_list:   DataResponseAttrList;
    rank_detail: RankDetail;
    errcode:     number;
    message:     string;
}

export interface DataResponseAttrList {
    normal: Normal[];
    spe:    any[];
    extra:  any[];
}

export interface Normal {
    attr_name: string;
    attr_list: AttrListElement[];
}

export interface AttrListElement {
    attributes_id:  number;
    product_id:     number;
    attr_type:      number;
    attr_name:      string;
    attr_value:     string;
    attr_price:     string;
    attr_color:     string;
    attr_pic:       string;
    attr_pic_thumb: string;
}

export interface DescArr {
    type: string;
    pic:  string;
    html: string;
}

export interface Item {
    product_id:          number;
    product_name:        string;
    product_sn:          string;
    product_tsn:         string;
    product_stock:       number;
    product_price:       string;
    market_price:        string;
    shipping_tpl_id:     number;
    product_status:      number;
    product_type:        number;
    category_id:         number;
    brand_id:            number;
    store_id:            number;
    keywords:            string;
    store_category_id:   number;
    check_status:        number;
    check_reason:        string;
    click_count:         number;
    product_weight:      string;
    is_promote:          number;
    is_promote_activity: number;
    promote_price:       string;
    promote_start_date:  string;
    promote_end_date:    string;
    seckill_max_num:     number;
    product_brief:       string;
    product_desc:        string;
    pic_url:             string;
    pic_thumb:           string;
    pic_original:        string;
    comment_tag:         string;
    free_shipping:       number;
    integral:            number;
    add_time:            number;
    sort_order:          number;
    store_sort_order:    number;
    is_delete:           number;
    is_best:             number;
    is_new:              number;
    is_hot:              number;
    last_update:         number;
    remark:              string;
    give_integral:       number;
    rank_integral:       number;
    suppliers_id:        number;
    virtual_sales:       number;
    limit_number:        number;
    product_care:        string;
    product_related:     null;
    product_service_ids: null;
    is_support_return:   number;
    is_support_cod:      number;
    product_video:       string;
    prepay_price:        string;
    is_seckill:          number;
}

export interface PicList {
    pic_id:     number;
    product_id: number;
    pic_url:    string;
    pic_desc:   string;
    pic_thumb:  string;
    pic_large:  string;
    sort_order: number;
}

export interface RankDetail {
    total:        number;
    average_rank: number;
    good_percent: number;
}
