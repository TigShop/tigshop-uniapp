import indexConfig from "@/config/index";
import { useUserStore } from "@/store/user";
import { showNotify } from 'vant';

const userStore = useUserStore();

const getCacheJSON = (val: string) => {
    return JSON.parse(uni.getStorageSync(val) || "{}");
};

const setCacheJSON = (val: string, data: any) => {
    uni.setStorageSync(val, JSON.stringify(data));
};

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
        "X-Client-Type": "mobile"
    };

    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config?.header || {}).repeatSubmit === false;
    if (!isRepeatSubmit && (config.method === "post" || config.method === "get")) {
        console.log('isRepeatSubmit')
        const getData = config.data || config.params;
        const requestObj = {
            url: config.url,
            data: typeof getData === "object" ? JSON.stringify(config.data) : config.data,
            time: new Date().getTime()
        };
        const sessionObj = getCacheJSON("sessionObj");
        if (sessionObj === undefined || sessionObj === null || sessionObj === "") {
            setCacheJSON("sessionObj", requestObj);
        } else {
            const s_url = sessionObj.url; // 请求地址
            const s_data = sessionObj.data; // 请求数据
            const s_time = sessionObj.time; // 请求时间
            const interval = 2000; // 间隔时间(ms)，小于此时间视为重复提交
            if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
                const message = "数据正在处理，请勿重复提交";
                console.warn(`[${s_url}]: ` + message);
                showNotify({ type: 'danger', message });
                return Promise.reject(new Error(message));
            } else {
                setCacheJSON("sessionObj", requestObj);
            }
        }
    }

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
