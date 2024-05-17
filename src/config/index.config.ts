const CONFIG: any = {
    // 开发环境配置
    development: {
        // baseUrl: "http://192.168.5.109:82/", // 接口请求地址
        baseUrl: "api/", // 接口请求地址
        requestUrlPrefix: "index/"
    },
    // 生产环境配置
    production: {
        baseUrl: "http://192.168.5.109:82/", // 接口请求地址
        requestUrlPrefix: "index/"
    }
};
// export default CONFIG[import.meta.env.MODE];
export default CONFIG[process.env.NODE_ENV];
