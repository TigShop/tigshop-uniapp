import request from "@/utils/request";
import type { TabbarDataResponse } from "@/types/tabbar";

export const getMobileNav = () => {
    return request<TabbarDataResponse>({
        url: "home/mobile_nav",
        method: "get"
    });
};
