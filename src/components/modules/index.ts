import type { ModuleFrameType } from '@/types/decorate/decorate.d';

// 格式化模块设置
export const formatFrame = (frame: ModuleFrameType) => {
    return {
        inner_padding: "padding:" + frame.inner_padding + "px;",
        box_padding: "padding-left:" + frame.box_padding + "px;padding-right:" + frame.box_padding + "px;",
        box_padding_top: "padding-top:" + frame.box_padding_top + "px;",
        box_padding_bottom: "padding-bottom:" + frame.box_padding_bottom + "px;",
        background_color: frame.background_color ? "background-color:" + frame.background_color + ";" : "",
        box_radius: "border-radius:" + frame.box_radius + "px;"
    };
};
