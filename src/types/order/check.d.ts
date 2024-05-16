export interface CheckResponse {
    address_list: AddressList[];
    available_payment_type: AvailablePaymentType[];
    store_shipping_type: Array<StoreShippingType[]>;
    cart_list: CartList[];
    total: Total;
    balance: number;
    points: number;
    available_points: number;
    coupon_list: CouponList;
    item: Item;
    errcode: number;
    message: string;
}

export interface AddressList {
    region_name: string;
    address_id: number;
    address_tag: string;
    user_id: number;
    consignee: string;
    email: string;
    region_ids: number[];
    region_names: string[];
    address: string;
    postcode: string;
    telephone: string;
    mobile: string;
    is_default: number;
    is_selected: number;
}

export interface AvailablePaymentType {
    type_id: number;
    type_name: string;
    disabled: boolean;
    disabled_desc: string;
    is_show: boolean;
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
    sku_data: any[];
    product_type: number;
    is_checked: boolean;
    store_id: number;
    type: number;
    store_title: null;
    product_weight: string;
    shipping_tpl_id: number;
    free_shipping: number;
    product_status: number;
    price: string;
    stock: number;
    subtotal: number;
    is_disabled: boolean;
}

export interface CouponList {
    enable_coupons: EnableCoupon[];
    disable_coupons: DisableCoupon[];
}

export interface DisableCoupon {
    id: number;
    coupon_name: string;
    min_order_amount: string;
    coupon_desc: string;
    coupon_type: number;
    coupon_money: string;
    is_global: number;
    coupon_discount: number;
    store_id: number;
    end_date: string;
    coupon_id: number;
    disable_reason: string;
    disabled: boolean;
    selected: boolean;
}

export interface EnableCoupon {
    id: number;
    coupon_name: string;
    coupon_desc: string;
    min_order_amount: string;
    coupon_type: number;
    coupon_money: number | string;
    is_global: number;
    coupon_discount: number;
    store_id: number;
    end_date: string;
    coupon_id: number;
    disable_reason: string;
    disabled: boolean;
    selected: boolean;
}

export interface Item {
    address_id: number;
    shipping_type: ShippingType[];
    pay_type_id: number;
    use_point: number;
    use_balance: number;
    use_coupon_ids: number[];
}

export interface ShippingType {
    type_id: number;
    store_id: number;
    type_name: string;
}

export interface StoreShippingType {
    shipping_type_id: number;
    shipping_type_name: string;
    shipping_default_id: number;
    shipping_type_desc: string;
    shipping_time_desc: string;
    is_support_cod: number;
    sort_order: number;
    store_id: number;
}

export interface Total {
    total_amount: number;
    paid_amount: number;
    unpaid_amount: number;
    unrefund_amount: number;
    product_amount: number;
    coupon_amount: number;
    points_amount: number;
    balance: number;
    service_fee: number;
    shipping_fee: number;
    invoice_fee: number;
    discount_amount: number;
    store_shipping_fee: number[];
}
