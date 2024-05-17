export interface GuessLikeDataResponse {
    product_list: ProductList[];
    errcode: number;
    message: string;
}

export interface GuessLikeProductList {
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
    seckill_price: null;
    product_sku: ProductSku[];
}

export interface GuessLikeProductSku {
    sku_id: number;
    product_id: number;
    sku_value: string;
    sku_data: SkuDatum[];
    sku_sn: string;
    sku_stock: number;
    sku_tsn: string;
    sku_price: string;
}

export interface GuessLikeSkuDatum {
    name: string;
    value: string;
}

// 主题
export interface ThemeResponse {
    theme_id: number;
    theme_style: ThemeStyle;
    shop_name: string;
    shop_title: string;
    shop_title_suffix: string;
    shop_logo: string;
    shop_keywords: string;
    shop_desc: string;
    storage_url: string;
    dollar_sign: string;
    dollar_sign_cn: string;
    errcode: number;
    message: string;
}

export interface ThemeStyle {
    theme_id: number;
    "--general": string;
    "--main-bg": string;
    "--main-btn-hover-bg": string;
    "--main-bg-gradient": string;
    "--main-text": string;
    "--vice-bg": string;
    "--vice-text": string;
    "--icon": string;
    "--price": string;
    "--tag-text": string;
    "--tag-bg": string;
}
