import { createSSRApp } from "vue";
import App from "./App.vue";
import pinia from '@/store/index';
import "./font/iconfont.css";
import "./static/css/style.css"; /**app.wxss**/

import tabbar from "./components/tabbar/index.vue";
import FormatPrice from "./components/format/price.vue";
import tigpopup from "@/components/tigpopup/index.vue";
import tigImage from '@/components/tigImage/index.vue'
import tigUpload from '@/components/tigUpload/index.vue'

export function createApp() {
    const app = createSSRApp(App);
    app.use(pinia);
    app.component("tabbar", tabbar).component("FormatPrice", FormatPrice).component("tigpopup", tigpopup).component("tigImage", tigImage).component("tigUpload", tigUpload);
    return {
        app,
        pinia
    };
}
