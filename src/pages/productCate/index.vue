<template>
    <view style="height: 100%">
        <navbar :parameter="parameter"></navbar>
        <view class="page-loading" v-if="loading || !partAllLoading"
            ><view class="ico"></view
        ></view>
        <view class="pageMain" v-if="partAllLoading">
            <!-- <block v-if="showCatLevel == 1">
                <view class="productSort">
                    <view class="header acea-row row-center-wrapper" :style="'top:' + navH + 'rpx'">
                        <view
                            class="acea-row row-between-wrapper input"
                            @tap.stop.prevent="toSearch"
                        >
                            <text class="iconfont icon-sousuo"></text>
                            <input
                                type="text"
                                placeholder="点击搜索商品信息"
                                :disabled="true"
                                confirm-type="search"
                                name="search"
                                placeholder-class="placeholder"
                            />
                        </view>
                    </view>
                    <view class="aside" :style="'top:' + navH + 'rpx;margin-top:98rpx'">
                        <block v-for="(item, index) in productList" :key="index">
                            <view
                                :class="
                                    'item acea-row row-center-wrapper ' +
                                    (index == navActive ? 'on' : '')
                                "
                                :data-index="index"
                                :data-id="'b' + index"
                                @tap="tap"
                            >
                                <text v-if="item.cat_short_name">{{ item.cat_short_name }}</text>
                                <text v-else>{{ item.name }}</text>
                            </view>
                        </block>
                    </view>
                    <view class="conter">
                        <scroll-view
                            :scroll-y="true"
                            :scroll-into-view="toView"
                            :style="'height:' + height + 'rpx;'"
                            @scroll="scroll"
                            :scroll-with-animation="true"
                        >
                            <block v-for="(item, index) in productList" :key="index">
                                <view class="listw" :id="'b' + index">
                                    <view class="title acea-row row-center-wrapper">
                                        <view class="name">{{ item.name }}</view>
                                    </view>
                                    <view class="list acea-row">
                                        <block
                                            v-for="(item, index1) in item.child_cat"
                                            :key="index1"
                                        >
                                            <navigator
                                                hover-class="none"
                                                :url="
                                                    '/pages/goods_search/index?category=' +
                                                    item.id +
                                                    '&title=' +
                                                    item.name
                                                "
                                                class="item acea-row row-column row-middle"
                                            >
                                                <view class="picture" v-if="item.cat_pic"
                                                    ><image lazy-load  :src="item.cat_pic"></image
                                                ></view>
                                                <view class="name line1">{{ item.name }}</view>
                                            </navigator>
                                        </block>
                                    </view>
                                </view>
                            </block>
                            <view
                                :style="'height:' + (height - 300) + 'rpx;'"
                                v-if="number < 15"
                            ></view>
                        </scroll-view>
                    </view>
                </view>
            </block> -->
            <block v-if="showCatLevel == 0">
                <view class="productSort">
                    <view class="header acea-row row-center-wrapper" :style="'top:' + navH + 'rpx'">
                        <view @click.stop="toSearch" class="acea-row row-between-wrapper input">
                            <text class="iconfont icon-sousuo"></text>
                            <input
                                type="text"
                                placeholder="点击搜索商品信息"
                                :disabled="true"
                                confirm-type="search"
                                name="search"
                                placeholder-class="placeholder"
                            />
                        </view>
                    </view>
                    <view class="aside" :style="'top:' + navH + 'rpx;margin-top:98rpx'">
                        <view
                            :class="'item acea-row row-center-wrapper ' + (cat_id == 0 ? 'on' : '')"
                            data-cat_id="0"
                            @click="changeCat(0)"
                            ><text>推荐</text></view
                        >
                        <block v-for="(item, index) in productList" :key="index">
                            <view
                                :class="
                                    'item acea-row row-center-wrapper ' +
                                    (cat_id == item.category_id ? 'on' : '')
                                "
                                :data-cat_id="item.category_id"
                                @click="changeCat(item.category_id)"
                            >
                                <text v-if="item.cat_short_name">{{ item.cat_short_name }}</text>
                                <text v-else>{{ item.category_name }}</text>
                            </view>
                        </block>
                    </view>
                    <view class="conter">
                        <block v-if="!loading">
                            <block v-if="cat_id == 0">
                                <view class="listw">
                                    <view class="title acea-row row-center-wrapper">
                                        <view class="name">热门分类</view>
                                    </view>
                                    <view class="list acea-row">
                                        <block v-for="(hotCat, index) in hotCat" :key="index">
                                            <navigator
                                                hover-class="none"
                                                :url="
                                                    '/pages/goods_search/index?category=' +
                                                    hotCat.cat_id +
                                                    '&title=' +
                                                    hotCat.cat_name
                                                "
                                                class="item acea-row row-column row-middle"
                                            >
                                                <view class="picture" v-if="hotCat.cat_pic"
                                                    ><image lazy-load  :src="hotCat.cat_pic"></image
                                                ></view>
                                                <view class="name line1">{{
                                                    hotCat.cat_name
                                                }}</view>
                                            </navigator>
                                        </block>
                                    </view>
                                </view>
                            </block>
                            <block
                                v-if="cat_id > 0"
                                v-for="(childCat, index) in childCat"
                                :key="index"
                            >
                                <view class="listw" :id="'b' + index">
                                    <view class="title acea-row row-center-wrapper">
                                        <navigator
                                            hover-class="none"
                                            :url="
                                                '/pages/goods_search/index?category=' +
                                                childCat.id +
                                                '&title=' +
                                                childCat.name
                                            "
                                            class="item acea-row row-column row-middle"
                                        >
                                            <view class="name">{{ childCat.name }}</view>
                                        </navigator>
                                    </view>
                                    <view class="list acea-row">
                                        <block
                                            v-for="(childCatItem, index1) in childCat.child_cat"
                                            :key="index1"
                                        >
                                            <navigator
                                                hover-class="none"
                                                :url="
                                                    '/pages/goods_search/index?category=' +
                                                    childCatItem.id +
                                                    '&title=' +
                                                    childCatItem.name
                                                "
                                                class="item acea-row row-column row-middle"
                                            >
                                                <view class="picture" v-if="childCatItem.cat_pic"
                                                    ><image lazy-load  :src="childCatItem.cat_pic"></image
                                                ></view>
                                                <view class="name line1">{{
                                                    childCatItem.name
                                                }}</view>
                                            </navigator>
                                        </block>
                                    </view>
                                </view>
                            </block>
                        </block>
                    </view>
                </view>
            </block>
        </view>
        <tabbar></tabbar>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { useConfigStore } from "@/store/config";
import { getLength } from "@/utils/index";
import type { DataResponse } from "@/types/productCate/productCate";
import { getSearchFilter } from "@/api/productCate/productCate";
const configStore = useConfigStore();

const navlist = ref([]);
const productList = ref<any>([]);
const navActive = ref(1);
const parameter = ref({
    navbar: "1",
    return: "0",
    title: "产品分类"
});
const navH = configStore.navHeight;
const number = ref(0);
const cat_id = ref(0);
const childCat = ref([]);
const hotCat = ref<any>([]);
const partAllLoading = ref(false);
const loading = ref(true);
const height = ref("");
const hightArr = ref("");
const toView = ref("");
const showCatLevel = ref(0);
const lastActive = ref(0);
const childCatItem = ref({
    id: "",
    name: "",
    cat_pic: ""
});

const infoScroll = () => {
    // let len = getLength(productList.value);
    // number.value = productList.value[len - 1] ? getLength(productList.value[len - 1].cat_id) : 0;
};

const tap = () => {};
const toSearch = () => {
    uni.navigateTo({
        url: "/pages/search/index"
    });
};
onLoad(() => {
    getAllCategory();
    getAllChildCatList();
});
const getAllCategory = async () => {
    partAllLoading.value = true;
    try {
        const result = await getSearchFilter({})
        console.log(result)
        productList.value = result.filter.category || [];
        console.log(productList.value)
        // showCatLevel.value = result.data.show_cat_level;
        infoScroll();
    } catch (err) {
        console.error(err);
    }
};

const scroll = () => {};
const changeCat = (id: number) => {
    cat_id.value = id;
    console.log("cat_id.value", cat_id.value);
};
const getAllChildCatList = () => {
    loading.value = true;
    const result = {
        app_domain: "https:\/\/demo2.lyecs.com\/mobile\/",
        domain: "https:\/\/demo2.lyecs.com\/",
        img_domain: "https:\/\/demo2.lyecs.com\/",
        wap_domain: "https:\/\/demo2.lyecs.com\/mobile\/",
        pname: "catalog",
        module_edit: false,
        wechat_app: 1,
        userid: 0,
        from_mould_id: 0,
        brands: [
            {
                brand_list: [
                    {
                        brand_id: 144,
                        brand_name: "Aekyung Age 20's",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680839244bSefVz3yP1gOB4LxgY!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=144"
                    },
                    {
                        brand_id: 130,
                        brand_name: "其妙",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837678rjjhbjCkOUghVP2ePR!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=130"
                    },
                    {
                        brand_id: 129,
                        brand_name: "Richeese",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837668b9pnFaleM3BZ4iblgL!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=129"
                    },
                    {
                        brand_id: 128,
                        brand_name: "憨豆熊",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837647aOKpxzsUcdPCfIoJnB!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=128"
                    },
                    {
                        brand_id: 127,
                        brand_name: "盐津铺子",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837634lz00B2KOav8131OZ7X!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=127"
                    },
                    {
                        brand_id: 126,
                        brand_name: "三只松鼠",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837619pHsv2paB25Nz2Q4L5y!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=126"
                    },
                    {
                        brand_id: 125,
                        brand_name: "洽洽",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837608hUOKq7SAW9xj9aJZ2V!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=125"
                    },
                    {
                        brand_id: 124,
                        brand_name: "蓝藤",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837494jlhVguBiy793chqSz8!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=124"
                    },
                    {
                        brand_id: 123,
                        brand_name: "家韵",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837483OmyB1D1zOmS58prj1w!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=123"
                    },
                    {
                        brand_id: 122,
                        brand_name: "LOVO",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837372Vgz1exopSt5HEF5IFM!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=122"
                    },
                    {
                        brand_id: 131,
                        brand_name: "泸州",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837786Rq8iNaEGP79sQCkktk!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=131"
                    },
                    {
                        brand_id: 133,
                        brand_name: "小红帽",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837817ziFfMwHoOdbiJFln8G!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=133"
                    },
                    {
                        brand_id: 134,
                        brand_name: "LES VIGNERONS DE TAVEL",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837831MrKFx089yRdE6gI38x!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=134"
                    },
                    {
                        brand_id: 143,
                        brand_name: "BOB",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680839230CMow3xmZsllsZCY8Wd!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=143"
                    },
                    {
                        brand_id: 142,
                        brand_name: "香奈儿",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680839212M0ar7zpoSRD9qeVPNi!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=142"
                    },
                    {
                        brand_id: 141,
                        brand_name: "卡姿兰",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/16808392021n2L4F2pEx7kujXvXx!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=141"
                    },
                    {
                        brand_id: 140,
                        brand_name: "卫康",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680838177u8ECG5Bki4dPKfnUiS!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=140"
                    },
                    {
                        brand_id: 139,
                        brand_name: "可糖",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680838156txilHZ0TXS7DZSJSdC!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=139"
                    },
                    {
                        brand_id: 138,
                        brand_name: "可啦啦",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680838144q4OsOFZeektiDgScsN!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=138"
                    },
                    {
                        brand_id: 137,
                        brand_name: "菲安妮",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680838053CqfZcxgpHdOpKISEUW!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=137"
                    },
                    {
                        brand_id: 136,
                        brand_name: "派斯顿",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/16808378630F7gknLvKpIuSKKdPO!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=136"
                    },
                    {
                        brand_id: 135,
                        brand_name: "沃歌堡",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837853clyp5N0mhQvR8dPRVY!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=135"
                    },
                    {
                        brand_id: 121,
                        brand_name: "艾维",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837362QbFUhI9U0I0ZHONY87!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=121"
                    },
                    {
                        brand_id: 120,
                        brand_name: "内野",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837352cca4KslHtCCI9dseFE!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=120"
                    },
                    {
                        brand_id: 119,
                        brand_name: "富安娜",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680837276hTocWOMBOlFxyYswjB!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=119"
                    },
                    {
                        brand_id: 105,
                        brand_name: "可优比",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680836520xWODasBBH9IpePjijA!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=105"
                    },
                    {
                        brand_id: 104,
                        brand_name: "HATHA",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680836396ExVt8bzACsHyKjY9vO!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=104"
                    },
                    {
                        brand_id: 103,
                        brand_name: "Pentaflex",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680836294ACvnIPoOUpMx7Mdfvi!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=103"
                    },
                    {
                        brand_id: 102,
                        brand_name: "迷你特工队",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680836269Gs3WVfXGBv6vDJJ4Yp!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=102"
                    },
                    {
                        brand_id: 101,
                        brand_name: "babycare",
                        brand_logo:
                            "https:\/\/oss.lyecs.com\/img\/demo\/brand\/202304\/1680836258J6bXeWbE3IYOClfsrN!!pic.png",
                        url: "https:\/\/demo2.lyecs.com\/mobile\/search\/?brand=101"
                    }
                ]
            }
        ],
        hot_cats: [
            {
                cat_id: 3,
                cat_name: "内衣",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142949CyfitCYjAJsQAG8F4d!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=3"
            },
            {
                cat_id: 4,
                cat_name: "鞋包",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144461QNi18vnLDy1UY5HA1L!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=4"
            },
            {
                cat_id: 5,
                cat_name: "母婴",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801476459yQrLr3TKTYDHJgJBa!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=5"
            },
            {
                cat_id: 6,
                cat_name: "运动",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801580687Rp7Igr3WNw9HIyeKb!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=6"
            },
            {
                cat_id: 7,
                cat_name: "美妆",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801612170Xyra6sWTD9B8cD5qy!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=7"
            },
            {
                cat_id: 22,
                cat_name: "T恤",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680081548dyg4S6CsdAZuIFW8eg!!pic.jpeg",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=22"
            },
            {
                cat_id: 23,
                cat_name: "针织衫",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16800815488spO1YEwiLHQGaxDOe!!pic.jpeg",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=23"
            },
            {
                cat_id: 24,
                cat_name: "外套装",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16800817010xgA0W1WnXpiD5PMM0!!pic.jpeg",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=24"
            },
            {
                cat_id: 25,
                cat_name: "女式西服",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16800817406z1c2Mfya4mXBPeWK5!!pic.jpeg",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=25"
            },
            {
                cat_id: 26,
                cat_name: "风衣",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16800817642vqqI5WOyFZx7tzWNt!!pic.jpeg",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=26"
            },
            {
                cat_id: 37,
                cat_name: "T恤衫",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141635lnLO9uOYtOjc1FmHO0!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=37"
            },
            {
                cat_id: 38,
                cat_name: "针织衫",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141705SgdjGmlBdXbkX0PqZ6!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=38"
            },
            {
                cat_id: 39,
                cat_name: "套头卫衣",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801417468CllLXOUOaVKrdmObR!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=39"
            },
            {
                cat_id: 40,
                cat_name: "薄款卫衣",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141775phNAAEQVURV773coZb!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=40"
            },
            {
                cat_id: 92,
                cat_name: "高跟单鞋",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144052QlKYoadOHNt3TiASwk!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=92"
            },
            {
                cat_id: 94,
                cat_name: "平底鞋",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144052cjqt12rORQ7VIxeIOS!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=94"
            },
            {
                cat_id: 98,
                cat_name: "短筒靴",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144199CHjBeEZ7vOiFAOsbuX!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=98"
            },
            {
                cat_id: 99,
                cat_name: "高筒靴",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144198CJWq3VM74hNGFI0Rq9!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=99"
            },
            {
                cat_id: 100,
                cat_name: "过膝靴",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144198DHJTmBSFVBEGXfCF16!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=100"
            },
            {
                cat_id: 107,
                cat_name: "商务休闲",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144377JAC6MwBHdfWqeNmcWr!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=107"
            },
            {
                cat_id: 108,
                cat_name: "正装鞋",
                cat_pic:
                    "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801443777oblFkgFRyUOaPN6LY!!pic.png",
                url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=108"
            }
        ],
        cat_id: 0
    };

    cat_id.value = result.cat_id;
    childCat.value = result.categories ?? [];
    hotCat.value = result.hot_cats;
    loading.value = false;
};

onShow(()=>{
    uni.hideTabBar();
})
</script>
<style>
page {
    background-color: #fff !important;
}
.productSort .header {
    width: 100%;
    height: 99rpx;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 9;
    border-bottom: 1rpx solid #f5f5f5;
}
.productSort .header .input {
    width: 700rpx;
    height: 60rpx;
    background-color: #f5f5f5;
    border-radius: 50rpx;
    box-sizing: border-box;
    padding: 0 25rpx;
}
.productSort .header .input .iconfont {
    font-size: 35rpx;
    color: #555;
}
.productSort .header .input .placeholder {
    color: #999;
}
.productSort .header .input input {
    font-size: 26rpx;
    height: 100%;
    width: 597rpx;
}
.productSort .aside {
    position: fixed;
    width: 180rpx;
    left: 0;
    bottom: 0;
    background-color: #f7f7f7;
    overflow-y: auto;
    overflow-x: hidden;
}
.productSort .aside .item {
    height: 80rpx;
    width: 100%;
    font-size: 26rpx;
    color: #424242;
}
.productSort .aside .item.on {
    background-color: #fff;
    width: 100%;
    text-align: center;
    color: #fc4141;
    font-weight: bold;
}
.productSort .conter {
    margin: 98rpx 0 0 180rpx;
    padding: 0 14rpx;
}
.productSort .conter .listw {
    padding-top: 20rpx;
}
.productSort .conter .listw .title {
    height: 90rpx;
    justify-content: left;
}
.productSort .conter .listw .title .line {
    width: 100rpx;
    height: 2rpx;
    background-color: #999;
}
.productSort .conter .listw .title .name {
    font-size: 28rpx;
    color: #333;
    margin: 0 30rpx;
    font-weight: bold;
}
.productSort .conter .list {
    flex-wrap: wrap;
}
.productSort .conter .list .item {
    width: 177rpx;
    margin-top: 26rpx;
}
.productSort .conter .list .item .picture {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
}
.productSort .conter .list .item .picture image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.productSort .conter .list .item .name {
    font-size: 24rpx;
    color: #333;
    height: 56rpx;
    line-height: 56rpx;
    width: 120rpx;
    text-align: center;
}
</style>
