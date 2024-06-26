

// 获取列表返回参数类型
export interface SeckillFilterState {
    product_id: number;
    seckill_limit_num: number;
    seckill_sales: number;
    product_name: string;
    pic_thumb: string;
    product_sn: string;
    market_price: string;
    seckill_price: string;
    seckill_stock: number;
}

export interface SeckillFilterResult {
    seckill_list: SeckillFilterState[];
    errcode: number;
    total: number;
}
