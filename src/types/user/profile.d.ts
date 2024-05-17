export interface ProfileFormResult {
    item: ProfileFormState;
    errcode: number;
    message: string;
}

// 获取详情返回参数类型
export interface ProfileFormState {
    user_id?: number;
    birthday: string;
    nickname?: string;
    email?: string;
    mobile?: string;
    showMobile?: string;
}





