import request from "@/utils/request";
import type {RegionFilterState} from '@/types/user/address'
// 获取购物车
export const getRegionByIds = (ids: Number[] = []) => {
    return request<RegionFilterState>({
        url: "sys/region/get_region",
        method: "post",
        params: { region_ids: ids },
    });
};
