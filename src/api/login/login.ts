import request from "@/utils/request";

export const userSignin = (data: any) => {
    return request({
        url: "user/login/signin",
        method: "post",
        data
    });
};
export const userLogout = () => {
    return request({
        url: "user/login/logout",
        method: "post"
    });
};

export const sendMobileCode = (data: any) => {
    return request({
        url: "user/login/send_mobile_code",
        method: "post",
        data
    });
};
