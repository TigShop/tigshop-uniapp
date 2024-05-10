import request from "@/utils/request";
import type {  SeckillFilterResult } from "@/types/seckill/seckill";

// 秒杀列表
export const getSeckill = (params:any) => {
    return request<SeckillFilterResult>({
        url: "home/get_seckill/",
        method: "get",
        params
    });
};
