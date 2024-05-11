export interface getProductListFilterState {
    item: Item;
    errcode: number;
    message: string;
}

export interface Item {
    img_padding: number;
    frame: Frame;
    title: Title;
    products: Products;
    style: number;
    goods_style: number;
    goods_radio_style: number;
    text_align: number;
    text_weight: number;
    goods_name_row: number;
    goods_name_padding: number;
    show_name: number;
    show_brief: number;
    show_price: number;
    goods_padding: number;
    buy_btn_style: number;
    background_color: string;
    box_radius: number;
    inner_padding: number;
    box_padding: number;
    box_padding_top: number;
    box_padding_bottom: number;
    pic_type: number;
    waterfall: number;
}

export interface Frame {
    text_color: string;
    item_background_color: string;
    background_color: string;
    inner_padding: number;
    item_height: number;
    item_radius: number;
    box_radius: number;
    box_padding: number;
    box_padding_top: number;
    box_padding_bottom: number;
}

export interface Products {
    product_select_type: number;
    product_ids: number[];
    product_category_id: number;
    product_number: number;
    product_tag: string;
    product_list: ProductList[];
}

export interface ProductList {
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
    product_sku: any[];
}

export interface Title {
    show_title: number;
    title_style: number;
    title_align: number;
    title_background: string;
    title_background2: string;
    title_background_pic: TitleBackgroundPic;
    title_radius: number;
    title_text: string;
    title_color: string;
    desc_text: string;
    desc_color: string;
    show_more: number;
    more_link: any[];
    more_color: string;
    format: Format;
}

export interface Format {
    title_background: string;
    title_radius: string;
}

export interface TitleBackgroundPic {
    pic_url: string;
    pic_thumb: string;
}
