export interface HistoryProductResponse {
    list:    List[];
    errcode: number;
    message: string;
}

export interface HistoryProductList {
    category_id:     number;
    brand_id:        number;
    product_tsn:     string;
    market_price:    string;
    shipping_tpl_id: number;
    free_shipping:   number;
    product_id:      number;
    pic_thumb:       string;
    product_name:    string;
    check_status:    number;
    store_id:        number;
    suppliers_id:    number;
    product_type:    number;
    product_sn:      string;
    product_price:   string;
    product_status:  number;
    is_best:         number;
    is_new:          number;
    is_hot:          number;
    product_stock:   number;
    sort_order:      number;
}
