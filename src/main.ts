import { createSSRApp } from "vue";
import App from "./App.vue";
import * as Pinia from "pinia";
import "./font/iconfont.css";
import "./static/css/style.css"; /**app.wxss**/

import Vant from "vant";
import "vant/lib/index.css";
import tabbar from "./components/tabbar/index.vue";
import FormatPrice from "./components/format/price.vue";

export function createApp() {
    const app = createSSRApp(App);
    app.component('tabbar', tabbar).component('FormatPrice',FormatPrice)
    const store = Pinia.createPinia();
    app.use(store).use(Vant);
    return {
        app,
        Pinia
    };
}
