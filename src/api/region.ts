import request from "@/utils/request";
import type {RegionFilterState} from '@/types/user/address'
export const getRegionByIds = (ids: Number[] = []) => {
    return request<RegionFilterState>({
        url: "sys/region/get_region",
        method: "get",
        params: { region_ids: ids },
    });
};
