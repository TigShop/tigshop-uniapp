import { ComputedRef } from "vue";
// 列表查询时筛选参数类型
export interface ModulesType {
    moduleList: ModuleType[];
    pageModule: ModuleType;
}

export interface EditResult {
    item: {
        data: {
            moduleList?: ModuleType[];
            pageModule?: ModuleType;
        };
    };
}
export interface ModuleType {
    module: {};
    module_index?: number;
    is_show?: boolean;
    active?: boolean;
    type: string;
    text?: string;
    style: number;
    line_type?: number;
    line_style?: number;
    blank_height?: number;
    background_color?: string;
    background_image?: string;
    background_repeat: string;
    background_size: string;
    products?: ModuleProductsType;
    title?: ModuleTitleType;
    frame?: ModuleFrameType;
    ico_pic?: ModuleIcoPicType;
}
//分类导航结构
export interface ModuleCatNavType {
    nav_background_pic?: ModuleIcoPicType;
    logo_pic?: ModuleIcoPicType;
    item_width?: number;
    text_color?: string;
    background_color?: string;
    item_background_color?: string;
    search_text_color?: string;
    is_ganged?: number;
    logo_height?: number;
    search_text?: string;
    box_padding?: number;
    item_radius?: number;
    box_padding_top?: number;
    box_padding_bottom?: number;
}
//优惠券结构
export interface ModuleCouponType {
    show_title?: number;
    title?: string;
    desc?: string;
    color_style?: number;
    item_background_color?: string;
    background_color?: string;
    item_padding?: number;
    box_radius?: number;
    box_padding?: number;
    box_padding_top?: number;
    box_padding_bottom?: number;
}
//活动结构
export interface ModuleActivityType {
    style?: number;
    goods_style?: number;
    goods_radio_style?: number;
    text_align?: number;
    text_weight?: number;
    goods_name_row?: number;
    goods_name_padding?: number;
    show_name?: number;
    show_brief?: number;
    show_price?: number;
    goods_padding?: number;
    buy_btn_style?: number;
    background_color?: string;
    box_radius?: number;
    inner_padding?: number;
    box_padding?: number;
    box_padding_top?: number;
    box_padding_bottom?: number;
    title?: ModuleTitleType;
}
// 结构
export interface ModuleFrameType {
    text_color?: string;
    item_background_color?: string;
    item_radius?: string;
    item_height?: string;
    background_color?: string;
    inner_padding?: number;
    box_radius?: number;
    box_padding?: number;
    box_padding_top?: number;
    box_padding_bottom?: number;
    format?: {
        background_color?: string;
        inner_padding?: string;
        box_radius?: string;
        box_padding?: string;
        box_padding_top?: string;
        box_padding_bottom?: string;
    };
}
// 标题

export interface ModuleTitleType {
    show_title?: number;
    title_style?: number;
    title_align?: number;
    title_background?: string;
    title_background2?: string;
    title_background_pic?: {
        pic_url?: string;
        pic_thumb?: string;
    };
    title_radius?: number;
    title_text?: string;
    title_color?: string;
    desc_text?: string;
    desc_color?: string;
    show_more?: number;
    more_link?: {
        link?: string;
        title?: string;
    };
    more_color?: string;
    format?: {
        title_background?: string;
        title_radius?: string;
    };
}
export interface ModuleImageType {
    pic_type: number;
    pic_page_type: number;
    nav_type?: number;
    nav_style?: number;
    row_num?: number;
    col_num?: number;
    radio_style?: number;
    swiper_page_color?: string;
    swiper_pre_view?: number;
    img_padding?: number;
    is_flux_width?: number;
    pic_radio_style?: number;
    pic_list: ModulePicListType[];
    format?: {
        img_padding?: string;
    };
}
// 热图
export interface ModuleImageHotareaType {
    pic_list?: ModuleImageHotareaPicListType[];
    img_padding: number;
    pic_radio_style?: number;
    format?: {
        img_padding?: string;
    };
}
export interface ModuleImageHotareaPicListType {
    pic_title?: string;
    pic_url?: string;
    pic_desc?: string;
    hotarea?: HotareaType[];
}

export interface HotareaType {
    link?: LinkType;
    title?: string;
    width?: number;
    height?: number;
    left?: number;
    top?: number;
    position?: string;
}

// 商品
export interface ModuleProductsType {
    product_select_type?: number;
    product_ids?: number[];
    product_category_id?: number;
    product_number?: number;
    product_tag?: string;
}
export interface ModulePicListType {
    pic_url?: string;
    pic_thumb?: string;
    pic_link?: {
        link?: string;
        title?: string;
    };
    pic_title?: string;
    pic_desc?: string;
}
export interface ModuleLinkListType {
    link?: {
        link?: string;
        title?: string;
    };
    link_title?: string;
}

//公告图标
export interface ModuleIcoPicType {
    pic_url?: string;
    pic_thumb?: string;
}

export interface FilterParams {
    page: number;
    size: number;
    sort_field: string;
    sort_order: string;
    keyword?: string;
    is_show?: number;
}

// 获取列表返回参数类型
export interface FilterResult {
    filter_result: FilterState[];
    filter: {
        page: number;
    };
    total: number;
}
export interface FilterState {
    example_id?: number;
    example_name?: string;
    example_logo?: string;
    is_show?: boolean;
    sort_order?: number;
}

// 获取详情返回参数类型
export interface FormResult {
    item: FormState;
}
export interface FormState {
    example_name?: string;
    example_logo?: string;
    example_desc?: string;
    sort_order?: string;
    is_show?: number;
}
// PC端
export interface PcPageHeaderType {
    logo?: {
        pic_url?: string;
        pic_thumb?: string;
    };
    header_style?: number;
}
export interface PcCatProductType {
    category_id?: number;
    title?: string;
    short_title?: string;
    en_title?: string;
    color?: string;
    color2?: string;
    pic_list?: ModulePicListType[];
    pic_list2?: ModulePicListType[];
    pic_list3?: ModulePicListType[];
    link_list?: ModuleLinkListType[];
    product_ids?: number[];
}
export interface PcBannerType {
    logo?: {
        pic_url?: string;
        pic_thumb?: string;
    };
    banner_style?: number;
    show_cat?: number;
    pic_list?: ModulePicListType[];
    pic_list2?: ModulePicListType[];
    pic_list3?: ModulePicListType[];
}

export interface PcCustomAd1Type {
    pic_list?: ModulePicListType[];
    pic_list2?: ModulePicListType[];
    pic_list3?: ModulePicListType[];
}
export interface PcCustomAd2Type {
    link_list?: ModuleLinkListType[];
    pic_list?: ModulePicListType[];
    pic_list2?: ModulePicListType[];
    pic_list3?: ModulePicListType[];
}
export interface PcRecommendProduct {
    title_name?: string;
    products?: ModuleProductsType;
}
export interface PcSeckillType {
    seckill_title?: string;
}

export interface LinkType {
    path?: string;
    name?: string;
    label?: string;
    id?: number;
    sn?: string;
    link?: string;
    appLink?: string;
}
