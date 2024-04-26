import request from "@/utils/request";

export function getMobileNav() {
    return request<any>({
        url: "home/mobile_nav",
        method: "get",
    });
};
