
export interface filterSeleted {
    category_id?: number;
    category_name?: string;
    keywords?: string;
    category_desc?: string;
    nparent_id?: number;
    sort_order?: number;
    measure_unit?: string;
    is_show?: number;
    seo_title?: string;
    short_name?: string;
    category_pic?: string;
    category_ico?: number;
    is_hot?: number;
    search_keywords?: string;
    children?: filterSeleted[]
}

export interface SearchFilterResult {
    category_tree: filterSeleted[];
    errcode: number;
}

export interface ProductFilterParams {
    page: number,
    size: number,
    sort?: string,  //销量:sale 新品:time 价格: price
    order?: string, //升序:asc 降序:desc
    max: any;  //最高价
    min: any;  //最低价
    keyword?: string;
    cat?: number; //分类id
    brand: number[]; //品牌id
    page_type?: string; //分类筛选项类型:search
}

export interface ProductFilterResult {
    product_list: ProductList[];
    filter: {
        brand: Brand[];
        category: filterSeleted[];
    },
    total:number;
    errcode: number;
}
export interface Brand {
    brand_id: number;
    brand_name?: string;
    brand_logo?: string;
    is_show?:number;
}

export interface ProductList {
    product_id?: number;
    pic_thumb?: stringnumber;
    pic_url?: stringnumber;
    product_name?: stringnumber;
    check_status?: number;
    store_id?: number;
    suppliers_id?: number;
    product_type?: number;
    product_sn?: stringnumber;
    product_price?: number;
    market_price?: number;
    product_status?: number;
    is_best?: number;
    is_new?: number;
    is_hot?: number;
    product_stock?: number;
    sort_order?: number;
    seckill_price?: number;
    org_product_price?: number;
}


