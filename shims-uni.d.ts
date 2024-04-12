/// <reference types='@dcloudio/types' />
import "vue";

declare module "@vue/runtime-core" {
    type Hooks = App.AppInstance & Page.PageInstance;

    interface ComponentCustomOptions extends Hooks {}
}
declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
