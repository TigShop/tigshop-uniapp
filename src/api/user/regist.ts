import request from "@/utils/request";
// 获取购物车
export const userRegist = (data: {}) => {
    return request({
        url: "user/regist/regist_act",
        method: "post",
        data
    });
};

export const sendMobileCode = (data: {}) => {
    return request({
        url: "user/regist/send_mobile_code",
        method: "post",
        data
    });
};
