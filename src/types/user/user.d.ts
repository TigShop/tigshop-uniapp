export interface UserDataResponse {
    item: Item;
    errcode: number;
    message: string;
}

export interface  UserItem {
    dim_username: string;
    user_id: number;
    username: string;
    nickname: string;
    avatar: string;
    points: number;
    balance: string;
    frozen_balance: string;
    birthday: string;
    mobile: string;
    email: string;
    rank_id: number;
    rank_name: string;
    rank_ico: string;
    discount: number;
    total_balance: string;
    coupon: number;
}
