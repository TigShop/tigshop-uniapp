import { createSSRApp } from "vue";
import App from "./App.vue";
import * as Pinia from "pinia";
import "./font/iconfont.css";
import "./static/css/style.css"; /**app.wxss**/

import Vant from "vant";
import "vant/lib/index.css";
import tabbar from "./components/tabbar/index.vue";
import FormatPrice from "./components/format/price.vue";
import tigpopup from '@/components/tigpopup/index.vue'

export function createApp() {
    const app = createSSRApp(App);
    app.component('tabbar', tabbar).component('FormatPrice',FormatPrice).component('tigpopup',tigpopup)
    const store = Pinia.createPinia();
    app.use(store).use(Vant);
    return {
        app,
        Pinia
    };
}
