import request from "@/utils/request";
// 老手机获得验证码
export const sendMobileCodeByMobileValidate = (params: object) => {
    return request({
        url: "user/user/send_mobile_code_by_mobile_validate",
        method: "post",
        params
    });
};
// 修该手机老手机验证码验证
export const mobileValidate = ( params: object) => {
    return request({
        url: "user/user/mobile_validate",
        method: "post",
        params
    });
};
// 新手机获得验证码
export const sendMobileCodeByMobileMobile = (params: object) => {
    return request({
        url: "user/user/send_mobile_code_by_modify_mobile",
        method: "post",
        params
    });
};
// 新手机验证码验证
export const mobileMobile = ( params: object) => {
    return request({
        url: "user/user/modify_mobile",
        method: "post",
        params
    });
};


// 修改密码获得验证码
export const sendMobileCodeByMobilePassword = (params: object) => {
    return request({
        url: "user/user/send_mobile_code_by_modify_password",
        method: "post",
        params
    });
};

export const checkModifyPasswordMobileCode = (params: object) => {
    return request({
        url: "user/user/check_modify_password_mobile_code",
        method: "post",
        params
    });
};
