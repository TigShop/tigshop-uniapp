export interface updateCartItemDataParams {
    cart_id: number;
    data: {
        quantity?: number;
    };
}

export interface updateCartCheckParams {
    data: updateCartCheckitem[];
}
export interface updateCartCheckitem {
    cart_id: number;
    is_checked: number;
}
export interface removeCartItemDataParams {
    cart_ids: number[];
}



export interface CartResponse {
    cart_list: CartList[];
    total: Total;
    errcode: number;
    message: string;
}

export interface CartList {
    store_id: number;
    store_title: string;
    carts: Cart[];
}

export interface Cart {
    cart_id: number;
    user_id: number;
    product_id: number;
    product_sn: string;
    product_name: string;
    pic_thumb: string;
    market_price: string;
    original_price: string;
    quantity: number;
    sku_id: number;
    sku_data: SkuDatum[];
    product_type: number;
    is_checked: boolean;
    store_id: number;
    type: number;
    store_title: null | string;
    product_weight: string;
    shipping_tpl_id: number;
    free_shipping: number;
    product_status: number;
    price: string;
    stock: number;
    subtotal: number;
    is_disabled: boolean;
}

export interface SkuDatum {
    name: string;
    value: string;
}

export interface Total {
    product_amount: number;
    checked_count: number;
    discounts: number;
    total_count: number;
}
