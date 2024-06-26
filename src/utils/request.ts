import indexConfig from "@/config/index.config";
import pinia from '@/store/index';
import { useUserStore } from "@/store/user";
import { useConfigStore } from "@/store/config"
const userStore = useUserStore(pinia);
const configStore = useConfigStore(pinia);

// 定义请求配置接口
interface RequestConfig {
    url: string;
    method?: "GET" | "POST" | "post" | "get";
    data?: any;
    params?: any;
    header?: any;
}
// 定义响应数据结构
interface ResponseData {
    errcode: number;
    [key: string]: any;
}
// 使用请求配置对象进行请求，返回Promise
export default function request<T extends ResponseData>(config: RequestConfig): Promise<T> {
    const method = (config.method || "GET").toUpperCase();
    const url = indexConfig.baseUrl + indexConfig.requestUrlPrefix + config.url;
    const header = {
        Authorization: userStore.token,
        ...config.header,
        "X-Client-Type": configStore.XClientType
    };
    return new Promise<T>((resolve, reject) => {
        uni.request({
            url,
            method: method as "GET" | "POST",
            data: config.data || config.params,
            header,
            success: (response) => {
                // 根据你的结构处理响应
                const data = response.data as T;
                if (data.data.errcode > 0) {
                    reject(data.data);
                } else {
                    resolve(data.data);
                }
            },
            fail: (err) => {
                reject(err);
                
            }
        });
    });
}
