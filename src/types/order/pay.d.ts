export interface payResponse {
    order: Order;
    payment_list: string[];
    offline_payment_list: OfflinePaymentList;
    errcode: number;
    message: string;
}

export interface OfflinePaymentList {
    offline_pay_bank: string;
    offline_pay_company: string;
}

export interface Order {
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
    order_extension: OrderExtension;
    order_source: string;
    invoice_data: InvoiceData;
    username: string;
    items: Item[];
}

export interface InvoiceData {
    title_type: number;
    invoice_type: number;
    user_id: number;
    status: number;
    order_id: number;
}

export interface Item {
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
}

export interface OrderExtension {
    coupon_money: CouponMoney;
    coupon: Coupon;
    shipping_fee: number[];
    shipping_type: ShippingType[];
}

export interface Coupon {
    "0": number[];
    "-1": number[];
}

export interface CouponMoney {
    "0": number;
    "-1": number;
}

export interface ShippingType {
    type_id: number;
    type_name: string;
}



export interface creatPayParams {
  id: number;
  type: string;
}
