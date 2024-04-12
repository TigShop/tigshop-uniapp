export interface getProductListFilterState {
    product_list: ProductListData[];
    errcode: number;
    message: string;
}

export interface ProductListData {
    product_id: number;
    pic_thumb: string;
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
}
