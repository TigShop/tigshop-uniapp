import request from "@/utils/request";
import type { UserMsgFilterParams, UserMsgFilterResult } from '@/types/user/messageLog'

//获取站内信列表
export const getMessageList = (params: UserMsgFilterParams) => {
    return request<UserMsgFilterResult>({
        url: "user/message/list",
        method: "get",
        params
    });
};

//站内信单个标记已读
export const addMessageRead = (id: number) => {
    return request({
        url: "user/message/update_message_read",
        method: "post",
        data: {id}
    });
};

//站内信全部标记已读
export const addMessageAllRead = () => {
    return request({
        url: "user/message/update_all_read",
        method: "post"
    });
};

//删除站内信
export const delMessage = (data: Object) => {
    return request({
        url: "user/message/del",
        method: "post",
        data
    });
};