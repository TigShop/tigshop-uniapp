/* 分类树结构 */
export interface DataResponse {
    item: Item;
    desc_arr: DescArr[];
    sku_list: any[];
    pic_list: PicList[];
    attr_list: DataResponseAttrList;
    rank_detail: RankDetail;
    errcode: number;
    message: string;
}

export interface filterSeleted {
    category_id?: number;
    category_name?: stringnumber;
    keywords?: stringnumber;
    category_desc?: stringnumber;
    nparent_id?: number;
    sort_order?: number;
    measure_unit?: stringnumber;
    is_show?: number;
    seo_title?: stringnumber;
    short_name?: stringnumber;
    category_pic?: stringnumber;
    category_ico?: number;
    is_hot?: number;
    search_keywords?: string; 
    children?:filterSeleted[]
}

export interface SearchFilterResult {
    category_tree: filterSeleted[];
    category: filterSeleted[];
    errcode: number;
}




