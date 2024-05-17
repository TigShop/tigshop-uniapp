import { useUserStore } from "@/store/user";
const userStore = useUserStore();
const whiteList = ["/pages/login/index","/pages/register/index", "/pages/index/index", "/pages/search/index", "/pages/search/result", "/pages/productCate/index", "/pages/cart/index","/pages/productDetail/index"];

function hasPermission(url: string): boolean {
    let currentUrl = url
    if(url.includes("?")) {
        currentUrl = url.split("?")[0]
    }
    // 在白名单中或有token，直接跳转
    if (whiteList.indexOf(currentUrl) !== -1 || uni.getStorageSync("token" || userStore.token)) {
        return true;
    }
    return false;
}

const jumpInterceptorList = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];

//应用权限校验至拦截器
jumpInterceptorList.forEach((item) => {
    uni.addInterceptor(item, {
        //拦截前触发
        invoke(args) {
            if (!hasPermission(args.url)) {
                uni.setStorageSync("URL", args.url);
                uni.navigateTo({
                    url: "/pages/login/index"
                });

                return false;
            }
            return true;
        },
        fail(e) {
            console.error(`为 ${item} 拦截器添加权限校验失败：`, e);
        }
    });
});
