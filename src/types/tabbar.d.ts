export interface TabbarDataResponse {
    item: Item;
    errcode: number;
    message: string;
}

export interface Item {
    id: number;
    decorate_sn: string;
    decorate_name: string;
    data: Data;
}

export interface Data {
    nav_list: List[];
    pic_list: Array<any[] | List>;
    background_color: string;
    background_pic: BackgroundPic;
}

export interface BackgroundPic {
    pic_url: string;
    pic_thumb: string;
    pic_id: number;
    pic_name: string;
}

export interface List {
    pic_active_thumb: string;
    pic_active_url: string;
    pic_id: number;
    pic_thumb: string;
    pic_url: string;
    pic_name: string;
    pic_title: string;
    pic_link?: PicLink;
}

export interface PicLink {
    path: string;
    label: string;
    name: string;
    link: string;
    appLink: string;
}
