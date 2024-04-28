import request from "@/utils/request";
import type {GuessLikeDataResponse} from "@/types/common" 
//  猜你喜欢
export const getGuessLike = (params: any) => {
    return request<GuessLikeDataResponse>({
        url: 'common/recommend/guess_like',
        method: 'get',
        params
    })
}
