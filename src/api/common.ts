import request from "@/utils/request";
import type {GuessLikeDataResponse, ThemeResponse} from "@/types/common" 
//  猜你喜欢
export const getGuessLike = (params: any) => {
    return request<GuessLikeDataResponse>({
        url: 'common/recommend/guess_like',
        method: 'get',
        params
    })
}

export const getBaseConfig = () => {
    return request<ThemeResponse>({
        url: "common/config/base",
        method: "get"
    });
};
 
