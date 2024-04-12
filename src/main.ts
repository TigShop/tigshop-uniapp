import { createSSRApp } from "vue";
import App from "./App.vue";
import * as Pinia from "pinia";

import Vant from "vant";
import "vant/lib/index.css";
import tabbar from "./components/tabbar/index.vue";

export function createApp() {
    const app = createSSRApp(App);
    app.component('tabbar', tabbar)
    const store = Pinia.createPinia();
    app.use(store).use(Vant);
    return {
        app,
        Pinia
    };
}
