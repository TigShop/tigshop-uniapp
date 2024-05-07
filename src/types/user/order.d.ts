export interface OrderNumResponse {
    item: Item;
    errcode: number;
    message: string;
}

export interface OrderNumItem {
    await_pay: number;
    await_shipping: number;
    await_received: number;
    await_comment: number;
    order_completed: number;
}

export interface OrderListFilterParams {
    page: number;
    size: number;
    order_status: number;
    comment_status: number;
}

export interface OrderListResponse {
    filter_result: OrderListFilterResult[];
    filter: Filter;
    total: number;
    errcode: number;
    message: string;
}

export interface OrderListFilter {
    keyword: string;
    order_status: number;
    pay_status: number;
    shipping_status: number;
    comment_status: number;
    date_type: number;
    page: number;
    size: number;
    sort_field: string;
    sort_order: string;
    user_id: number;
}

export interface OrderListFilterResult {
    order_status_name: string;
    user_address: string;
    shipping_status_name: string;
    pay_status_name: string;
    order_id: number;
    order_sn: string;
    user_id: number;
    parent_order_id: number;
    parent_order_sn: string;
    order_status: number;
    shipping_status: number;
    pay_status: number;
    add_time: string;
    consignee: string;
    address: string;
    region_ids: number[];
    region_names: string[];
    address_data: null;
    mobile: string;
    email: string;
    buyer_note: string;
    admin_note: string;
    shipping_method: number;
    logistics_id: number;
    logistics_name: string;
    shipping_type_id: number;
    shipping_type_name: string;
    tracking_no: string;
    shipping_time: string;
    received_time: string;
    pay_type_id: number;
    pay_time: string;
    use_points: number;
    distribution_status: number;
    promoter_user_id: number;
    is_del: number;
    store_id: number;
    store_title: string;
    is_store_splited: number;
    comment_status: number;
    total_amount: string;
    paid_amount: string;
    unpaid_amount: string;
    unrefund_amount: string;
    product_amount: string;
    coupon_amount: string;
    points_amount: string;
    discount_amount: string;
    balance: string;
    online_paid_amount: string;
    offline_paid_amount: string;
    service_fee: string;
    shipping_fee: string;
    invoice_fee: string;
    order_extension: OrderListExtension;
    order_source: string;
    invoice_data: InvoiceData;
    out_trade_no: string;
    username: string;
    available_actions: { [key: string]: boolean };
    items: OrderListItem[];
}

export interface OrderListInvoiceData {
    invoice_type: number;
    title_type: number;
    company_code?: string;
    company_name?: string;
    company_address?: string;
    company_phone?: string;
    company_bank?: string;
    company_account?: string;
    invoice_content?: string;
    amount?: number | string;
    mobile?: string;
    email?: string;
    user_id: number;
    status: number;
    order_id: number;
}

export interface OrderListItem {
    item_id: number;
    order_id: number;
    order_sn: string;
    user_id: number;
    price: string;
    quantity: number;
    product_id: number;
    product_name: string;
    product_sn: string;
    pic_thumb: string;
    sku_id: number;
    sku_data: OrderListSkuDatum[];
    delivery_quantity: number;
    product_type: number;
    is_gift: number;
    store_id: number;
    is_pin: number;
    prepay_price: string;
    product_pic_thumb: string;
    product_stock: number;
    product_weight: string;
    sku_stock: number | null;
    sku_sn: null | string;
    sku_value: null | string;
    aftersales_item: null;
}

export interface OrderListSkuDatum {
    name: string;
    value: string;
}

export interface OrderListExtension {
    coupon_money?: number[] | OrderListCouponMoneyClass;
    coupon?: Array<number[]> | OrderListCouponClass;
    shipping_fee: number[];
    shipping_type: OrderListShippingType[];
}

export interface OrderListCouponClass {
    "0"?: number[];
    "-1": number[];
}

export interface OrderListCouponMoneyClass {
    "0"?: number;
    "-1": number;
}

export interface OrderListShippingType {
    type_id: number;
    type_name: string;
}





/* 详情 */
export interface OrderInfoResponse {
    item: OrderInfoResponseItem;
    errcode: number;
    message: string;
}

export interface OrderInfoResponseItem {
    order_status_name: string;
    user_address: string;
    shipping_status_name: string;
    pay_status_name: string;
    order_id: number;
    order_sn: string;
    user_id: number;
    parent_order_id: number;
    parent_order_sn: string;
    order_status: number;
    shipping_status: number;
    pay_status: number;
    add_time: string;
    consignee: string;
    address: string;
    region_ids: number[];
    region_names: string[];
    address_data: null;
    mobile: string;
    email: string;
    buyer_note: string;
    admin_note: string;
    shipping_method: number;
    logistics_id: number;
    logistics_name: string;
    shipping_type_id: number;
    shipping_type_name: string;
    tracking_no: string;
    shipping_time: string;
    received_time: string;
    pay_type_id: number;
    pay_time: string;
    use_points: number;
    distribution_status: number;
    promoter_user_id: number;
    is_del: number;
    store_id: number;
    store_title: string;
    is_store_splited: number;
    comment_status: number;
    total_amount: string;
    paid_amount: string;
    unpaid_amount: number;
    unrefund_amount: string;
    product_amount: number;
    coupon_amount: number;
    points_amount: number;
    discount_amount: number;
    balance: number;
    online_paid_amount: string;
    offline_paid_amount: string;
    service_fee: string;
    shipping_fee: number;
    invoice_fee: string;
    order_extension: OrderInfoExtension;
    order_source: string;
    invoice_data: OrderInfoInvoiceData;
    out_trade_no: string;
    username: string;
    available_actions: { [key: string]: boolean };
    step_status: OrderInfoStepStatus;
    items: OrderInfoItemElement[];
}

export interface OrderInfoInvoiceData {
    title_type: number;
    invoice_type: number;
    user_id: number;
    status: number;
    order_id: number;
}

export interface OrderInfoItemElement {
    item_id: number;
    order_id: number;
    order_sn: string;
    user_id: number;
    price: string;
    quantity: number;
    product_id: number;
    product_name: string;
    product_sn: string;
    pic_thumb: string;
    sku_id: number;
    sku_data: any[];
    delivery_quantity: number;
    product_type: number;
    is_gift: number;
    store_id: number;
    is_pin: number;
    prepay_price: string;
    product_pic_thumb: string;
    product_stock: number;
    product_weight: string;
    sku_stock: null;
    sku_sn: null;
    sku_value: null;
    stock: number;
    subtotal: number;
    aftersales_item: null;
}

export interface OrderInfoExtension {
    coupon_money: OrderInfoCouponMoney;
    coupon: OrderInfoCoupon;
    shipping_fee: number[];
    shipping_type: OrderInfoShippingType[];
}

export interface OrderInfoCoupon {
    "-1": number[];
}

export interface OrderInfoCouponMoney {
    "-1": number;
}

export interface OrderInfoShippingType {
    type_id: number;
    type_name: string;
}

export interface OrderInfoStepStatus {
    current: number;
    status: string;
    steps: Step[];
}

export interface OrderInfoStep {
    title: string;
    description: string;
}
