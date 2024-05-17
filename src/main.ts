import { createSSRApp } from "vue";
import App from "./App.vue";
import pinia from "@/store/index";
import "./static/font/iconfont.css";
import "./static/css/style.css"; /**app.wxss**/

import "@/utils/permission";

import uviewPlus from "uview-plus";

import tabbar from "./components/tabbar/index.vue";
import FormatPrice from "./components/format/price.vue";
import tigpopup from "@/components/tigpopup/index.vue";
import tigImage from "@/components/tigImage/index.vue";
import tigUpload from "@/components/tigUpload/index.vue";
import tigButton from "@/components/tigButton/index.vue";
import saveContentbox from "@/components/saveContentbox/index.vue";

export function createApp() {
    const app = createSSRApp(App);
    app.use(pinia).use(uviewPlus);
    app.component("tabbar", tabbar)
        .component("FormatPrice", FormatPrice)
        .component("tigpopup", tigpopup)
        .component("tigImage", tigImage)
        .component("tigUpload", tigUpload)
        .component("tigButton", tigButton)
        .component("saveContentbox", saveContentbox);
    return {
        app,
        pinia
    };
}
