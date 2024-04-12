import request from "@/utils/request";
import type { updateCartItemDataParams, updateCartCheckParams, removeCartItemDataParams, CartResponse } from "@/types/cart/cart";
// 获取购物车
export const getCart = () => {
    return request<CartResponse>({
        url: "cart/index/",
        method: "get"
    });
};
export const updateCartItemData = (data: updateCartItemDataParams) => {
    return request({
        url: "cart/update_item/",
        method: "post",
        data
    });
};
export const updateCartCheck = (data: updateCartCheckParams) => {
    return request({
        url: 'cart/update_check/',
        method: 'post',
        data,
    });
}
export const clearCart = () => {
    return request({
        url: 'cart/clear/',
        method: 'post',
    });
}
export const removeCartItemData = (data: removeCartItemDataParams) => {
    return request({
        url: 'cart/remove_item/',
        method: 'post',
        data
    });
}