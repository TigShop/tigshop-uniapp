const CONFIG: any = {
    // 开发环境配置
    development: {
        baseUrl: "api/", // 接口请求地址 
        requestUrlPrefix: 'index/',
    },
    // 生产环境配置
    production: {
        baseUrl: "http://www.tigshop.com/", // 接口请求地址
        requestUrlPrefix: 'index/',
    }
};
// export default CONFIG[import.meta.env.MODE];
export default CONFIG[process.env.NODE_ENV];
