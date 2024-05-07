import request from "@/utils/request";
import type { ProfileFormResult } from "@/types/user/profile.d";

export const getProfile = () => {
    return request<ProfileFormResult>({
        url: "user/user/info/",
        method: "get"
    });
};

// 更新个人信息
export const updateProfile = (data: object) => {
    return request({
        url: "user/user/update_information",
        method: "post",
        data
    });
};

