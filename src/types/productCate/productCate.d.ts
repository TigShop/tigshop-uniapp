/* 分类树结构 */
export interface DataResponse {
    item:        Item;
    desc_arr:    DescArr[];
    sku_list:    any[];
    pic_list:    PicList[];
    attr_list:   DataResponseAttrList;
    rank_detail: RankDetail;
    errcode:     number;
    message:     string;
}

export interface filterSeleted {
    brand?: string;
    category?: string;
} 

export interface SearchFilterResult {
    filter: SearchFilterListResult;
    filter_selected: filterSeleted;
    errcode: number;
}

export interface SearchFilterListResult {
    brand: {
        brand_name: string;
        brand_id: number;
        brand_logo: string;
        first_word: string;
    }[];
    category: {
        category_name: string;
        category_id: number;
    }[];
}