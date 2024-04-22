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
                                v-if="item.is_show == 1"
                                :class="
                                    'item acea-row row-center-wrapper ' +
                                    (cat_id == item.id ? 'on' : '')
                                "
                                :data-cat_id="item.id"
                                @click="changeCat(item.id)"
                            >
                                <text v-if="item.cat_short_name">{{ item.cat_short_name }}</text>
                                <text v-else>{{ item.name }}</text>
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
        <tabbar :currentActive="1"></tabbar>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { useConfigStore } from "@/store/config";
import { getLength } from "@/utils/index";
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
        const result = {
            data: {
                app_domain: "https:\/\/demo2.lyecs.com\/mobile\/",
                domain: "https:\/\/demo2.lyecs.com\/",
                img_domain: "https:\/\/demo2.lyecs.com\/",
                wap_domain: "https:\/\/demo2.lyecs.com\/mobile\/",
                pname: "catalog",
                module_edit: false,
                wechat_app: 1,
                userid: 0,
                from_mould_id: 0,
                page_title: "所有分类 - LYECS",
                page_keywords: "",
                page_desc: "",
                crumb: [{ title: "所有分类" }],
                page_subtitle: "所有分类",
                stats_code: null,
                shop_name: "LYECS",
                points_name: "积分",
                searchkeywords: [
                    { value: "手机N5", real_value: "手机N5" },
                    { value: "儿童手表5C", real_value: "儿童手表5C" },
                    { value: "儿童机器人", real_value: "儿童机器人" },
                    { value: "安全路由", real_value: "安全路由" },
                    { value: "<b>iphone 6<\/b>", real_value: "iphone 6<\/b>" },
                    { value: "苹果手机", real_value: "苹果手机" }
                ],
                show_cat_level: 0,
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
                cat_id: null,
                categories: [
                    {
                        cat_id: 2,
                        cat_name: "男装",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142486fJuYc559tI8jDAsb20!!pic.png",
                        is_hot: 0,
                        measure_unit: "件",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 3,
                        id: 2,
                        name: "男装",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=2",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=2",
                        child_cat: [
                            {
                                cat_id: 34,
                                cat_name: "内搭",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 2,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 34,
                                name: "内搭",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=34",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=34",
                                child_cat: [
                                    {
                                        cat_id: 37,
                                        cat_name: "T恤衫",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141635lnLO9uOYtOjc1FmHO0!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 34,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 37,
                                        name: "T恤衫",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=37",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=37"
                                    },
                                    {
                                        cat_id: 38,
                                        cat_name: "针织衫",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141705SgdjGmlBdXbkX0PqZ6!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 34,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 38,
                                        name: "针织衫",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=38",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=38"
                                    },
                                    {
                                        cat_id: 39,
                                        cat_name: "套头卫衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801417468CllLXOUOaVKrdmObR!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 34,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 39,
                                        name: "套头卫衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=39",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=39"
                                    },
                                    {
                                        cat_id: 40,
                                        cat_name: "薄款卫衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141775phNAAEQVURV773coZb!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 34,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 40,
                                        name: "薄款卫衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=40",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=40"
                                    },
                                    {
                                        cat_id: 41,
                                        cat_name: "衬衫",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141801c6z5Jif2dD43MZgqG7!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 34,
                                        cat_ico: "",
                                        is_show: 0,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 41,
                                        name: "衬衫",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=41",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=41"
                                    },
                                    {
                                        cat_id: 42,
                                        cat_name: "长袖T恤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141827cIxTB3hrwO0YBP5f3G!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 34,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 42,
                                        name: "长袖T恤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=42",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=42"
                                    },
                                    {
                                        cat_id: 43,
                                        cat_name: "连帽卫衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141851ik1BX1Q8kOkSA4OAS0!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 34,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 43,
                                        name: "连帽卫衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=43",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=43"
                                    },
                                    {
                                        cat_id: 44,
                                        cat_name: "羊绒\/羊毛衫",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141875FyOlCGXM2RsOlZ1NOA!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 34,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 44,
                                        name: "羊绒\/羊毛衫",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=44",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=44"
                                    },
                                    {
                                        cat_id: 45,
                                        cat_name: "毛衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141898BmLG5gYnD3ZJp0lPSH!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 34,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 45,
                                        name: "毛衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=45",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=45"
                                    }
                                ]
                            },
                            {
                                cat_id: 35,
                                cat_name: "裤装",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 2,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 35,
                                name: "裤装",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=35",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=35",
                                child_cat: [
                                    {
                                        cat_id: 46,
                                        cat_name: "休闲裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141956wdhigLnb1I9NvagVpG!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 35,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 46,
                                        name: "休闲裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=46",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=46"
                                    },
                                    {
                                        cat_id: 47,
                                        cat_name: "牛仔裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680141997Q72WkyDAXyuYDLTKkX!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 35,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 47,
                                        name: "牛仔裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=47",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=47"
                                    },
                                    {
                                        cat_id: 48,
                                        cat_name: "西裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801420194fhbDKGpLB1ovQthI5!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 35,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 48,
                                        name: "西裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=48",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=48"
                                    },
                                    {
                                        cat_id: 49,
                                        cat_name: "哈伦裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142042otK2FOQvWvxUqi4Ost!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 35,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 49,
                                        name: "哈伦裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=49",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=49"
                                    },
                                    {
                                        cat_id: 50,
                                        cat_name: "束脚裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142098mYeWLjHfDCeK8oWhKH!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 35,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 50,
                                        name: "束脚裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=50",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=50"
                                    },
                                    {
                                        cat_id: 51,
                                        cat_name: "工装裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142152O8uApgebbsa26TpyD0!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 35,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 51,
                                        name: "工装裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=51",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=51"
                                    },
                                    {
                                        cat_id: 52,
                                        cat_name: "运动裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142179OeOEX9rwVZ2BAnz3eN!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 35,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 52,
                                        name: "运动裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=52",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=52"
                                    },
                                    {
                                        cat_id: 53,
                                        cat_name: "小脚裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801422177zx7xNi0HIgZYKPzcs!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 35,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 53,
                                        name: "小脚裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=53",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=53"
                                    },
                                    {
                                        cat_id: 54,
                                        cat_name: "短裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142294wZjQxhaWbtwX4J8AA9!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 35,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 54,
                                        name: "短裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=54",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=54"
                                    }
                                ]
                            },
                            {
                                cat_id: 36,
                                cat_name: "外套",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 2,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 36,
                                name: "外套",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=36",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=36",
                                child_cat: [
                                    {
                                        cat_id: 55,
                                        cat_name: "夹克",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142339sMl28dyQVudvVF7CNU!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 36,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 55,
                                        name: "夹克",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=55",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=55"
                                    },
                                    {
                                        cat_id: 56,
                                        cat_name: "薄外套",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142373qgXYt7jij9I00mI6aZ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 36,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 56,
                                        name: "薄外套",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=56",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=56"
                                    },
                                    {
                                        cat_id: 57,
                                        cat_name: "风衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801424118swllXrQVGOSQ52JRU!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 36,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 57,
                                        name: "风衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=57",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=57"
                                    },
                                    {
                                        cat_id: 58,
                                        cat_name: "厚外套",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142433SXO9YiY2xX83mUtres!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 36,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 58,
                                        name: "厚外套",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=58",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=58"
                                    },
                                    {
                                        cat_id: 59,
                                        cat_name: "棒球服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142459JWlEG0t6Odv6EPH7ZC!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 36,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 59,
                                        name: "棒球服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=59",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=59"
                                    },
                                    {
                                        cat_id: 60,
                                        cat_name: "西装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142486fJuYc559tI8jDAsb20!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 36,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 60,
                                        name: "西装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=60",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=60"
                                    },
                                    {
                                        cat_id: 61,
                                        cat_name: "皮衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142512VUtYXEi32FcBlOJuwt!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 36,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 61,
                                        name: "皮衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=61",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=61"
                                    },
                                    {
                                        cat_id: 62,
                                        cat_name: "马甲\/背心",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801425384UUk4P1w3XkPC0Fs78!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 36,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 62,
                                        name: "马甲\/背心",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=62",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=62"
                                    },
                                    {
                                        cat_id: 63,
                                        cat_name: "大衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801425698m0AFLjsb9aKzOXxEe!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 36,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 63,
                                        name: "大衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=63",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=63"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 3,
                        cat_name: "内衣",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142949CyfitCYjAJsQAG8F4d!!pic.png",
                        is_hot: 1,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 3,
                        id: 3,
                        name: "内衣",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=3",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=3",
                        child_cat: [
                            {
                                cat_id: 64,
                                cat_name: "女士内衣",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 3,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 64,
                                name: "女士内衣",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=64",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=64",
                                child_cat: [
                                    {
                                        cat_id: 66,
                                        cat_name: "无钢圈文胸",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142950YDYSC5g2vkL7590q41!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 64,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 66,
                                        name: "无钢圈文胸",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=66",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=66"
                                    },
                                    {
                                        cat_id: 67,
                                        cat_name: "聚拢文胸",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142949CyfitCYjAJsQAG8F4d!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 64,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 67,
                                        name: "聚拢文胸",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=67",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=67"
                                    },
                                    {
                                        cat_id: 68,
                                        cat_name: "薄杯文胸",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142949mULQ1HjNI0Mj7NhtIv!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 64,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 68,
                                        name: "薄杯文胸",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=68",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=68"
                                    },
                                    {
                                        cat_id: 69,
                                        cat_name: "调整型文胸",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142949c6XlUJEEWF6pjM7nOa!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 64,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 69,
                                        name: "调整型文胸",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=69",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=69"
                                    },
                                    {
                                        cat_id: 70,
                                        cat_name: "少女文胸",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142949hgyNVwQxzoqIhYFDFK!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 64,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 70,
                                        name: "少女文胸",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=70",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=70"
                                    },
                                    {
                                        cat_id: 71,
                                        cat_name: "女士内裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801429499ksOohtJV3k2geCNgT!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 64,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 71,
                                        name: "女士内裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=71",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=71"
                                    },
                                    {
                                        cat_id: 72,
                                        cat_name: "睡裙\/睡袍",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142950viLuFKDm0ichBkgFOn!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 64,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 72,
                                        name: "睡裙\/睡袍",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=72",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=72"
                                    },
                                    {
                                        cat_id: 73,
                                        cat_name: "塑身内衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142950bNTFJ73atFSaTIDROt!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 64,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 73,
                                        name: "塑身内衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=73",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=73"
                                    },
                                    {
                                        cat_id: 74,
                                        cat_name: "运动内衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680142950PnOziyfPoD7JiHkrAm!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 64,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 74,
                                        name: "运动内衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=74",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=74"
                                    }
                                ]
                            },
                            {
                                cat_id: 65,
                                cat_name: "男士内衣",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 3,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 65,
                                name: "男士内衣",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=65",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=65",
                                child_cat: [
                                    {
                                        cat_id: 75,
                                        cat_name: "睡衣\/家居服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801432142pIYsilL837KEQFchx!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 65,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 75,
                                        name: "睡衣\/家居服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=75",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=75"
                                    },
                                    {
                                        cat_id: 76,
                                        cat_name: "男士内裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680143214D0kugq2T72eJGzdDAy!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 65,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 76,
                                        name: "男士内裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=76",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=76"
                                    },
                                    {
                                        cat_id: 77,
                                        cat_name: "男袜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801432145R5qHFV4O9sANIp0St!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 65,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 77,
                                        name: "男袜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=77",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=77"
                                    }
                                ]
                            },
                            {
                                cat_id: 78,
                                cat_name: "特色专区",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 3,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 78,
                                name: "特色专区",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=78",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=78",
                                child_cat: [
                                    {
                                        cat_id: 79,
                                        cat_name: "情侣睡衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801433361bOO939i8Pe0PDet80!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 78,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 79,
                                        name: "情侣睡衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=79",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=79"
                                    },
                                    {
                                        cat_id: 80,
                                        cat_name: "儿童睡衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680143337Rvp3jzg8CO6xLpCPqF!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 78,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 80,
                                        name: "儿童睡衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=80",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=80"
                                    },
                                    {
                                        cat_id: 81,
                                        cat_name: "隐形胸贴",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680143337caBs9DWlEJBOs0xCBk!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 78,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 81,
                                        name: "隐形胸贴",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=81",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=81"
                                    },
                                    {
                                        cat_id: 82,
                                        cat_name: "大码文胸",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680143336uxjvxKNjxNO2NwZWG3!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 78,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 82,
                                        name: "大码文胸",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=82",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=82"
                                    },
                                    {
                                        cat_id: 83,
                                        cat_name: "生理内裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680143337EWcQdalSzqYqBj0IuY!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 78,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 83,
                                        name: "生理内裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=83",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=83"
                                    },
                                    {
                                        cat_id: 84,
                                        cat_name: "安全裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801433362CJjK8OSQlo7Fzq5Sh!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 78,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 84,
                                        name: "安全裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=84",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=84"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 4,
                        cat_name: "鞋包",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144461QNi18vnLDy1UY5HA1L!!pic.png",
                        is_hot: 1,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 7,
                        id: 4,
                        name: "鞋包",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=4",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=4",
                        child_cat: [
                            {
                                cat_id: 85,
                                cat_name: "女单鞋",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 4,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 85,
                                name: "女单鞋",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=85",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=85",
                                child_cat: [
                                    {
                                        cat_id: 92,
                                        cat_name: "高跟单鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144052QlKYoadOHNt3TiASwk!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 85,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 92,
                                        name: "高跟单鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=92",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=92"
                                    },
                                    {
                                        cat_id: 93,
                                        cat_name: "玛丽珍鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144052FOoqn0qqDawm7I5V6C!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 85,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 93,
                                        name: "玛丽珍鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=93",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=93"
                                    },
                                    {
                                        cat_id: 94,
                                        cat_name: "平底鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144052cjqt12rORQ7VIxeIOS!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 85,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 94,
                                        name: "平底鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=94",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=94"
                                    }
                                ]
                            },
                            {
                                cat_id: 86,
                                cat_name: "女休闲鞋",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 4,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 86,
                                name: "女休闲鞋",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=86",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=86",
                                child_cat: [
                                    {
                                        cat_id: 95,
                                        cat_name: "女老爹鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144119FObZl7ARNVm8YQsSeb!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 86,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 95,
                                        name: "女老爹鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=95",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=95"
                                    },
                                    {
                                        cat_id: 96,
                                        cat_name: "小白鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144119CMQ0jUCwWbR21BtkPk!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 86,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 96,
                                        name: "小白鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=96",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=96"
                                    },
                                    {
                                        cat_id: 97,
                                        cat_name: "高帮鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144119b9og359TpszmUVf7aM!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 86,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 97,
                                        name: "高帮鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=97",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=97"
                                    }
                                ]
                            },
                            {
                                cat_id: 87,
                                cat_name: "女靴",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 4,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 87,
                                name: "女靴",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=87",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=87",
                                child_cat: [
                                    {
                                        cat_id: 98,
                                        cat_name: "短筒靴",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144199CHjBeEZ7vOiFAOsbuX!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 87,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 98,
                                        name: "短筒靴",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=98",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=98"
                                    },
                                    {
                                        cat_id: 99,
                                        cat_name: "高筒靴",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144198CJWq3VM74hNGFI0Rq9!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 87,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 99,
                                        name: "高筒靴",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=99",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=99"
                                    },
                                    {
                                        cat_id: 100,
                                        cat_name: "过膝靴",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144198DHJTmBSFVBEGXfCF16!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 87,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 100,
                                        name: "过膝靴",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=100",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=100"
                                    },
                                    {
                                        cat_id: 101,
                                        cat_name: "马丁靴",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144199WSv2PlBaVT6yvCcF7E!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 87,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 101,
                                        name: "马丁靴",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=101",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=101"
                                    },
                                    {
                                        cat_id: 102,
                                        cat_name: "切尔西\/烟筒靴",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144198r3f5mxYzQyI3aw1ele!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 87,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 102,
                                        name: "切尔西\/烟筒靴",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=102",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=102"
                                    },
                                    {
                                        cat_id: 103,
                                        cat_name: "雪地靴",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801441986Y50VaBWOOI2gOgyAG!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 87,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 103,
                                        name: "雪地靴",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=103",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=103"
                                    }
                                ]
                            },
                            {
                                cat_id: 88,
                                cat_name: "男休闲鞋",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 4,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 88,
                                name: "男休闲鞋",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=88",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=88",
                                child_cat: [
                                    {
                                        cat_id: 104,
                                        cat_name: "老爹鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144312ugMWesPhkBOtDLi1Gs!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 88,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 104,
                                        name: "老爹鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=104",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=104"
                                    },
                                    {
                                        cat_id: 105,
                                        cat_name: "小白鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144312FZhMoY2CHK9l8ViO8v!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 88,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 105,
                                        name: "小白鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=105",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=105"
                                    },
                                    {
                                        cat_id: 106,
                                        cat_name: "休闲皮鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144312uReEXUp3N5LDx5Hl6M!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 88,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 106,
                                        name: "休闲皮鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=106",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=106"
                                    }
                                ]
                            },
                            {
                                cat_id: 89,
                                cat_name: "男商务鞋",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 4,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 89,
                                name: "男商务鞋",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=89",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=89",
                                child_cat: [
                                    {
                                        cat_id: 107,
                                        cat_name: "商务休闲",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144377JAC6MwBHdfWqeNmcWr!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 89,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 107,
                                        name: "商务休闲",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=107",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=107"
                                    },
                                    {
                                        cat_id: 108,
                                        cat_name: "正装鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801443777oblFkgFRyUOaPN6LY!!pic.png",
                                        is_hot: 1,
                                        measure_unit: "",
                                        parent_id: 89,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 108,
                                        name: "正装鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=108",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=108"
                                    },
                                    {
                                        cat_id: 109,
                                        cat_name: "套脚商务鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144376CO9agHPcn2KKyg0Am4!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 89,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 109,
                                        name: "套脚商务鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=109",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=109"
                                    }
                                ]
                            },
                            {
                                cat_id: 90,
                                cat_name: "女包",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 4,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 90,
                                name: "女包",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=90",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=90",
                                child_cat: [
                                    {
                                        cat_id: 110,
                                        cat_name: "链条包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144460EgAdV3ul5IYCF9poTO!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 90,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 110,
                                        name: "链条包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=110",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=110"
                                    },
                                    {
                                        cat_id: 111,
                                        cat_name: "托特包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144460kYnVz9VZ9fSX8LnXxa!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 90,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 111,
                                        name: "托特包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=111",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=111"
                                    },
                                    {
                                        cat_id: 112,
                                        cat_name: "实用大包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144461QNi18vnLDy1UY5HA1L!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 90,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 112,
                                        name: "实用大包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=112",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=112"
                                    },
                                    {
                                        cat_id: 113,
                                        cat_name: "手提包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144460PpOj29cTFyJ3RyuMo0!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 90,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 113,
                                        name: "手提包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=113",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=113"
                                    },
                                    {
                                        cat_id: 114,
                                        cat_name: "斜挎包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144460ffgEXzYveYc4l9Lej4!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 90,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 114,
                                        name: "斜挎包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=114",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=114"
                                    },
                                    {
                                        cat_id: 115,
                                        cat_name: "双肩包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144460fMjsJ0tdl8wlSqm7kT!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 90,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 115,
                                        name: "双肩包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=115",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=115"
                                    }
                                ]
                            },
                            {
                                cat_id: 91,
                                cat_name: "男包",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 4,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 91,
                                name: "男包",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=91",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=91",
                                child_cat: [
                                    {
                                        cat_id: 116,
                                        cat_name: "单肩\/斜挎包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144570vSTWmTOkV9WNWFUHu4!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 91,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 116,
                                        name: "单肩\/斜挎包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=116",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=116"
                                    },
                                    {
                                        cat_id: 117,
                                        cat_name: "商务公文包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144570JM1aJ7jCOarxJdMRUN!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 91,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 117,
                                        name: "商务公文包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=117",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=117"
                                    },
                                    {
                                        cat_id: 118,
                                        cat_name: "男皮带",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680144570iALCAHmVwCxUQADd4x!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 91,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 118,
                                        name: "男皮带",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=118",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=118"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 5,
                        cat_name: "母婴",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801476459yQrLr3TKTYDHJgJBa!!pic.png",
                        is_hot: 1,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 10,
                        id: 5,
                        name: "母婴",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=5",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=5",
                        child_cat: [
                            {
                                cat_id: 119,
                                cat_name: "中大童装",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 5,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 10,
                                id: 119,
                                name: "中大童装",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=119",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=119",
                                child_cat: [
                                    {
                                        cat_id: 130,
                                        cat_name: "羽绒棉服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147236AoCxnvnnBX8qcsxmMZ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 119,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 130,
                                        name: "羽绒棉服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=130",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=130"
                                    },
                                    {
                                        cat_id: 131,
                                        cat_name: "卫衣\/运动服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147237t7BJxcl0hnLucZWX89!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 119,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 131,
                                        name: "卫衣\/运动服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=131",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=131"
                                    },
                                    {
                                        cat_id: 132,
                                        cat_name: "儿童外套",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147238N0i35iJ9tA2HjQRJzp!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 119,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 132,
                                        name: "儿童外套",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=132",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=132"
                                    },
                                    {
                                        cat_id: 133,
                                        cat_name: "裤装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147237Csz2swc1jWR7yYlBBE!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 119,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 133,
                                        name: "裤装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=133",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=133"
                                    },
                                    {
                                        cat_id: 134,
                                        cat_name: "T恤\/POLO",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147237xzMoBnGThF4Xn4JzTO!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 119,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 134,
                                        name: "T恤\/POLO",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=134",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=134"
                                    },
                                    {
                                        cat_id: 135,
                                        cat_name: "裙装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147237F3rWtIGkMrUk7iCWeX!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 119,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 135,
                                        name: "裙装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=135",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=135"
                                    },
                                    {
                                        cat_id: 136,
                                        cat_name: "内衣\/家居服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147238SGg5hDVv5laZ9O1Spg!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 119,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 136,
                                        name: "内衣\/家居服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=136",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=136"
                                    },
                                    {
                                        cat_id: 137,
                                        cat_name: "儿童套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147238fqxx0e5OlOMd1UIad7!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 119,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 137,
                                        name: "儿童套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=137",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=137"
                                    },
                                    {
                                        cat_id: 138,
                                        cat_name: "儿童衬衫",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147238OzF9eRDMgD4jJDZpFW!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 119,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 138,
                                        name: "儿童衬衫",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=138",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=138"
                                    },
                                    {
                                        cat_id: 139,
                                        cat_name: "儿童袜子",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147236CSYhbmSlVWZFX59R76!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 119,
                                        cat_ico: "",
                                        is_show: 0,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 139,
                                        name: "儿童袜子",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=139",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=139"
                                    }
                                ]
                            },
                            {
                                cat_id: 120,
                                cat_name: "童鞋",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 5,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 10,
                                id: 120,
                                name: "童鞋",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=120",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=120",
                                child_cat: [
                                    {
                                        cat_id: 140,
                                        cat_name: "男童运动鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147457c9Vr8pUCWxDuTHRJOM!!pic.gif",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 120,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 140,
                                        name: "男童运动鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=140",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=140"
                                    },
                                    {
                                        cat_id: 141,
                                        cat_name: "女童运动鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147457Ki07BzPqUGgeY2slW0!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 120,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 141,
                                        name: "女童运动鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=141",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=141"
                                    },
                                    {
                                        cat_id: 142,
                                        cat_name: "儿童休闲鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801474575oXZ3LUwU5ZiosFVPv!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 120,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 142,
                                        name: "儿童休闲鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=142",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=142"
                                    },
                                    {
                                        cat_id: 143,
                                        cat_name: "儿童帆布鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147458ppzeDJuRfl1aBtQZJL!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 120,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 143,
                                        name: "儿童帆布鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=143",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=143"
                                    },
                                    {
                                        cat_id: 144,
                                        cat_name: "学步鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147458qwujNVKDAmSs6nQ467!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 120,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 144,
                                        name: "学步鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=144",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=144"
                                    },
                                    {
                                        cat_id: 145,
                                        cat_name: "棉鞋\/雪地靴",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147457Oh0ZCleactIVgxHDJP!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 120,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 145,
                                        name: "棉鞋\/雪地靴",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=145",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=145"
                                    },
                                    {
                                        cat_id: 146,
                                        cat_name: "儿童皮靴",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147457WLl5x1ytsxskL0xfR6!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 120,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 146,
                                        name: "儿童皮靴",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=146",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=146"
                                    },
                                    {
                                        cat_id: 147,
                                        cat_name: "儿童凉鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147457IsfyeNCN0qlOQXUVpH!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 120,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 147,
                                        name: "儿童凉鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=147",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=147"
                                    },
                                    {
                                        cat_id: 148,
                                        cat_name: "儿童雨鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147456YbtePKe2MpwOitJAYd!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 120,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 148,
                                        name: "儿童雨鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=148",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=148"
                                    },
                                    {
                                        cat_id: 149,
                                        cat_name: "儿童拖鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801474577PcVhlB0twDqKQ0qHS!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 120,
                                        cat_ico: "",
                                        is_show: 0,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 149,
                                        name: "儿童拖鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=149",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=149"
                                    }
                                ]
                            },
                            {
                                cat_id: 121,
                                cat_name: "婴幼服饰",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 5,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 10,
                                id: 121,
                                name: "婴幼服饰",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=121",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=121",
                                child_cat: [
                                    {
                                        cat_id: 150,
                                        cat_name: "婴幼裤装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147645IvWdKj3nUEVgJiuE4v!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 121,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 150,
                                        name: "婴幼裤装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=150",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=150"
                                    },
                                    {
                                        cat_id: 151,
                                        cat_name: "T恤\/衬衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801476456Righq0I2eVnAJTiqs!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 121,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 151,
                                        name: "T恤\/衬衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=151",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=151"
                                    },
                                    {
                                        cat_id: 152,
                                        cat_name: "婴童套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147645y7CUO612Uoj6vzew97!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 121,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 152,
                                        name: "婴童套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=152",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=152"
                                    },
                                    {
                                        cat_id: 153,
                                        cat_name: "婴童裙装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801476459yQrLr3TKTYDHJgJBa!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 121,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 153,
                                        name: "婴童裙装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=153",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=153"
                                    },
                                    {
                                        cat_id: 154,
                                        cat_name: "内衣\/家居服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/168014764454ELB2msqEAdzGJ5QL!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 121,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 154,
                                        name: "内衣\/家居服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=154",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=154"
                                    },
                                    {
                                        cat_id: 155,
                                        cat_name: "卫衣\/运动服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147645Y1ot3wBwezIPGZxgq9!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 121,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 155,
                                        name: "卫衣\/运动服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=155",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=155"
                                    },
                                    {
                                        cat_id: 156,
                                        cat_name: "哈衣爬服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147646TYtmwOboNG1oIFZKtQ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 121,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 156,
                                        name: "哈衣爬服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=156",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=156"
                                    },
                                    {
                                        cat_id: 157,
                                        cat_name: "外套\/风衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147644SV3zL6yB1JoQY0iX2p!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 121,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 157,
                                        name: "外套\/风衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=157",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=157"
                                    },
                                    {
                                        cat_id: 158,
                                        cat_name: "背心\/马甲",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147644hDHfOy9tsaNCgYyMN1!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 121,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 158,
                                        name: "背心\/马甲",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=158",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=158"
                                    },
                                    {
                                        cat_id: 159,
                                        cat_name: "毛衣线衫",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147644OErtim2ZlcXh22egmx!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 121,
                                        cat_ico: "",
                                        is_show: 0,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 159,
                                        name: "毛衣线衫",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=159",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=159"
                                    }
                                ]
                            },
                            {
                                cat_id: 122,
                                cat_name: "妈咪专区",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 5,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 10,
                                id: 122,
                                name: "妈咪专区",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=122",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=122",
                                child_cat: [
                                    {
                                        cat_id: 160,
                                        cat_name: "孕妇裙",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147857Wtk1bClOjN421ymJIQ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 122,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 160,
                                        name: "孕妇裙",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=160",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=160"
                                    },
                                    {
                                        cat_id: 161,
                                        cat_name: "孕妇裤装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147856Su7stj2F45JtpoSnv1!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 122,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 161,
                                        name: "孕妇裤装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=161",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=161"
                                    },
                                    {
                                        cat_id: 162,
                                        cat_name: "孕妇文胸",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147855GQVkObxw2VfFw4npAt!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 122,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 162,
                                        name: "孕妇文胸",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=162",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=162"
                                    },
                                    {
                                        cat_id: 163,
                                        cat_name: "孕妇内裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147856FajgoTWrXZLSPB8T1s!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 122,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 163,
                                        name: "孕妇内裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=163",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=163"
                                    },
                                    {
                                        cat_id: 164,
                                        cat_name: "哺乳衣\/家居服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147857cY7jE1YMovSFoYy6g0!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 122,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 164,
                                        name: "哺乳衣\/家居服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=164",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=164"
                                    },
                                    {
                                        cat_id: 165,
                                        cat_name: "孕妇上衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147856r9jQQWVtualUnurlI6!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 122,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 165,
                                        name: "孕妇上衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=165",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=165"
                                    },
                                    {
                                        cat_id: 166,
                                        cat_name: "孕妇防辐射服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147856FTr7kN0zfhdBpF2Vt1!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 122,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 166,
                                        name: "孕妇防辐射服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=166",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=166"
                                    },
                                    {
                                        cat_id: 167,
                                        cat_name: "产后塑身",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680147855DwmVYhzktSJQZXHTzZ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 122,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 167,
                                        name: "产后塑身",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=167",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=167"
                                    },
                                    {
                                        cat_id: 168,
                                        cat_name: "背带\/妈咪包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801478559sHuqsxyhLGvatwsDL!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 122,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 168,
                                        name: "背带\/妈咪包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=168",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=168"
                                    },
                                    {
                                        cat_id: 169,
                                        cat_name: "月子鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801478577i7sI9ZfFC6w9mNxih!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 122,
                                        cat_ico: "",
                                        is_show: 0,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 169,
                                        name: "月子鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=169",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=169"
                                    }
                                ]
                            },
                            {
                                cat_id: 123,
                                cat_name: "奶粉辅食",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 5,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 123,
                                name: "奶粉辅食",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=123",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=123",
                                child_cat: [
                                    {
                                        cat_id: 170,
                                        cat_name: "惠氏",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680148068UqwcgMUVCkSC2t2kol!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 123,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 170,
                                        name: "惠氏",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=170",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=170"
                                    },
                                    {
                                        cat_id: 171,
                                        cat_name: "美赞臣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680148069TiOnmza7Rif12cFsYw!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 123,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 171,
                                        name: "美赞臣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=171",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=171"
                                    },
                                    {
                                        cat_id: 172,
                                        cat_name: "A2",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680148069ukIICANsjht23GdIHV!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 123,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 172,
                                        name: "A2",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=172",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=172"
                                    },
                                    {
                                        cat_id: 173,
                                        cat_name: "爱他美",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680148069QHIiXuY3SulhzXGCv3!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 123,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 173,
                                        name: "爱他美",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=173",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=173"
                                    },
                                    {
                                        cat_id: 174,
                                        cat_name: "1段",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680148068NWIkjolOi1kauBhhzi!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 123,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 174,
                                        name: "1段",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=174",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=174"
                                    },
                                    {
                                        cat_id: 175,
                                        cat_name: "2段",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680148069rKRdpOi2JbSrWyzc66!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 123,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 175,
                                        name: "2段",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=175",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=175"
                                    },
                                    {
                                        cat_id: 176,
                                        cat_name: "3段",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680148068bi6tiyb5zFwzjMD8aR!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 123,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 176,
                                        name: "3段",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=176",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=176"
                                    },
                                    {
                                        cat_id: 177,
                                        cat_name: "4段",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680148068UeLcDGZOYy0y5V3QGP!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 123,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 177,
                                        name: "4段",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=177",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=177"
                                    },
                                    {
                                        cat_id: 178,
                                        cat_name: "雅培",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680148413H5FILL6dp5gk7CuPoq!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 123,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 178,
                                        name: "雅培",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=178",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=178"
                                    }
                                ]
                            },
                            {
                                cat_id: 124,
                                cat_name: "洗护\/喂养",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 5,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 8,
                                id: 124,
                                name: "洗护\/喂养",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=124",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=124",
                                child_cat: [
                                    {
                                        cat_id: 179,
                                        cat_name: "宝宝护肤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156359lqTl9n53CHXNnRGFXe!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 124,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 179,
                                        name: "宝宝护肤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=179",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=179"
                                    },
                                    {
                                        cat_id: 180,
                                        cat_name: "水杯餐具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156360Fur1ljfVLjI0fLTxN5!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 124,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 180,
                                        name: "水杯餐具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=180",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=180"
                                    },
                                    {
                                        cat_id: 181,
                                        cat_name: "奶瓶奶嘴",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156359OwHFur80XI59yUhgiQ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 124,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 181,
                                        name: "奶瓶奶嘴",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=181",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=181"
                                    },
                                    {
                                        cat_id: 182,
                                        cat_name: "洗护用品",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156359TrxRvxvrS8ZAH4KRHN!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 124,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 182,
                                        name: "洗护用品",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=182",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=182"
                                    },
                                    {
                                        cat_id: 183,
                                        cat_name: "清洁用品",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801563592ws84jSSiYLeVeOdry!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 124,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 183,
                                        name: "清洁用品",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=183",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=183"
                                    },
                                    {
                                        cat_id: 184,
                                        cat_name: "吸奶储奶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156359QSYOAk21l20KFu1oL0!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 124,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 184,
                                        name: "吸奶储奶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=184",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=184"
                                    },
                                    {
                                        cat_id: 185,
                                        cat_name: "湿巾\/纸品",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156360XUwkpAaCOe6QbICmkE!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 124,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 185,
                                        name: "湿巾\/纸品",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=185",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=185"
                                    },
                                    {
                                        cat_id: 186,
                                        cat_name: "背带",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156360wWUj4FryImrCvgCjxg!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 124,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 186,
                                        name: "背带",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=186",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=186"
                                    }
                                ]
                            },
                            {
                                cat_id: 125,
                                cat_name: "纸尿裤",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 5,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 125,
                                name: "纸尿裤",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=125",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=125",
                                child_cat: [
                                    {
                                        cat_id: 187,
                                        cat_name: "纸尿裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801565959hpFgZhTOFLMUbwohC!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 125,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 187,
                                        name: "纸尿裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=187",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=187"
                                    },
                                    {
                                        cat_id: 188,
                                        cat_name: "拉拉裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156595B6rNxtsaB9zllsjRi8!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 125,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 188,
                                        name: "拉拉裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=188",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=188"
                                    },
                                    {
                                        cat_id: 189,
                                        cat_name: "湿巾\/纸品",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156596YjpdOFaqGZiQY2Gtcs!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 125,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 189,
                                        name: "湿巾\/纸品",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=189",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=189"
                                    },
                                    {
                                        cat_id: 190,
                                        cat_name: "好奇",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156596Q7m40R6lqyEwsR4tTR!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 125,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 190,
                                        name: "好奇",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=190",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=190"
                                    },
                                    {
                                        cat_id: 191,
                                        cat_name: "花王",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156595geHMVjRMjMlh2Z3OFN!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 125,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 191,
                                        name: "花王",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=191",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=191"
                                    },
                                    {
                                        cat_id: 192,
                                        cat_name: "帮宝适",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156595DXn8hOVDqBQGNUlLCu!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 125,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 192,
                                        name: "帮宝适",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=192",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=192"
                                    },
                                    {
                                        cat_id: 193,
                                        cat_name: "MOONY",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156595IlMQULPWA8Z9J1L1c5!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 125,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 193,
                                        name: "MOONY",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=193",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=193"
                                    },
                                    {
                                        cat_id: 194,
                                        cat_name: "大王",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156596t8x6Al0jZB1OqK9GGw!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 125,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 194,
                                        name: "大王",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=194",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=194"
                                    },
                                    {
                                        cat_id: 195,
                                        cat_name: "茵茵",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156596nFd397EY2fpC1hug2Y!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 125,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 195,
                                        name: "茵茵",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=195",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=195"
                                    }
                                ]
                            },
                            {
                                cat_id: 126,
                                cat_name: "玩具",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 5,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 126,
                                name: "玩具",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=126",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=126",
                                child_cat: [
                                    {
                                        cat_id: 196,
                                        cat_name: "男童玩具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156794e2AMjuzYrp7OFszS1d!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 126,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 196,
                                        name: "男童玩具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=196",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=196"
                                    },
                                    {
                                        cat_id: 197,
                                        cat_name: "女童玩具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156793NfwomOD2HozOVKx8QC!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 126,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 197,
                                        name: "女童玩具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=197",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=197"
                                    },
                                    {
                                        cat_id: 198,
                                        cat_name: "婴幼启蒙",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156793QTY5vBCRyefHcLtd48!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 126,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 198,
                                        name: "婴幼启蒙",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=198",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=198"
                                    },
                                    {
                                        cat_id: 199,
                                        cat_name: "休闲玩具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156793Er3fMCAWuPacwAhlqk!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 126,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 199,
                                        name: "休闲玩具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=199",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=199"
                                    },
                                    {
                                        cat_id: 200,
                                        cat_name: "积木拼插",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156794qrU4UkUQFpcWRuoRFh!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 126,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 200,
                                        name: "积木拼插",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=200",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=200"
                                    },
                                    {
                                        cat_id: 201,
                                        cat_name: "动漫模型",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156794e574AeeROWVPuR4eDU!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 126,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 201,
                                        name: "动漫模型",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=201",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=201"
                                    },
                                    {
                                        cat_id: 202,
                                        cat_name: "毛绒\/娃娃",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801567931jIm1CQHkAuwTmwyor!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 126,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 202,
                                        name: "毛绒\/娃娃",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=202",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=202"
                                    },
                                    {
                                        cat_id: 203,
                                        cat_name: "儿童手表",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680156794I7DihuYIPxXaKu4whi!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 126,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 203,
                                        name: "儿童手表",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=203",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=203"
                                    },
                                    {
                                        cat_id: 204,
                                        cat_name: "早教学习",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801567940rWJid4f9jeBa8Q33F!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 126,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 204,
                                        name: "早教学习",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=204",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=204"
                                    }
                                ]
                            },
                            {
                                cat_id: 127,
                                cat_name: "文具",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 5,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 5,
                                id: 127,
                                name: "文具",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=127",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=127",
                                child_cat: [
                                    {
                                        cat_id: 205,
                                        cat_name: "儿童包袋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157061ntBEOWwgoMn2sS5Erc!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 127,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 205,
                                        name: "儿童包袋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=205",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=205"
                                    },
                                    {
                                        cat_id: 206,
                                        cat_name: "水杯水壶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157061Byi3YW1K6316fNjLWG!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 127,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 206,
                                        name: "水杯水壶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=206",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=206"
                                    },
                                    {
                                        cat_id: 207,
                                        cat_name: "笔盒笔袋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157061Wj4d5knouDdRIFs096!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 127,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 207,
                                        name: "笔盒笔袋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=207",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=207"
                                    },
                                    {
                                        cat_id: 208,
                                        cat_name: "书写工具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157061G1182MbDN6O3yikHLJ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 127,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 208,
                                        name: "书写工具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=208",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=208"
                                    },
                                    {
                                        cat_id: 209,
                                        cat_name: "画具画材",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157061Zaj6Wtr77gB1YIIB2O!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 127,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 209,
                                        name: "画具画材",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=209",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=209"
                                    }
                                ]
                            },
                            {
                                cat_id: 128,
                                cat_name: "宝宝寝居",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 5,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 128,
                                name: "宝宝寝居",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=128",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=128",
                                child_cat: [
                                    {
                                        cat_id: 210,
                                        cat_name: "婴童床品",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157328oJP8xOA4nJNQpbKlGW!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 128,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 210,
                                        name: "婴童床品",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=210",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=210"
                                    },
                                    {
                                        cat_id: 211,
                                        cat_name: "睡袋\/抱被",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157329WNvBPgUqDR0blMyVtE!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 128,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 211,
                                        name: "睡袋\/抱被",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=211",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=211"
                                    },
                                    {
                                        cat_id: 212,
                                        cat_name: "儿童毛巾",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157328E29oUu0JzAANzAGEdt!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 128,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 212,
                                        name: "儿童毛巾",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=212",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=212"
                                    },
                                    {
                                        cat_id: 213,
                                        cat_name: "餐椅童床",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157328CtK6o5jTYhTWLyQPcT!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 128,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 213,
                                        name: "餐椅童床",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=213",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=213"
                                    },
                                    {
                                        cat_id: 214,
                                        cat_name: "寝居配件",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157329YT3xyQBWZs2wzi1oRM!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 128,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 214,
                                        name: "寝居配件",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=214",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=214"
                                    },
                                    {
                                        cat_id: 215,
                                        cat_name: "洗澡\/如厕用具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157329Kb0yNRBDDCFPhJG7Uj!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 128,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 215,
                                        name: "洗澡\/如厕用具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=215",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=215"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 6,
                        cat_name: "运动",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801580687Rp7Igr3WNw9HIyeKb!!pic.png",
                        is_hot: 1,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 8,
                        id: 6,
                        name: "运动",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=6",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=6",
                        child_cat: [
                            {
                                cat_id: 216,
                                cat_name: "运动鞋",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 6,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 216,
                                name: "运动鞋",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=216",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=216",
                                child_cat: [
                                    {
                                        cat_id: 224,
                                        cat_name: "小白鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801577442Mnz43MLd34Ltwb9XZ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 216,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 224,
                                        name: "小白鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=224",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=224"
                                    },
                                    {
                                        cat_id: 225,
                                        cat_name: "老爹鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157744JOqOQYocz4YFbFX08b!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 216,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 225,
                                        name: "老爹鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=225",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=225"
                                    },
                                    {
                                        cat_id: 226,
                                        cat_name: "气垫鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157745iBJoTtDwVEZ7QapJiL!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 216,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 226,
                                        name: "气垫鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=226",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=226"
                                    },
                                    {
                                        cat_id: 227,
                                        cat_name: "运动休闲鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157744daPGalM7MaYkOzmlng!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 216,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 227,
                                        name: "运动休闲鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=227",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=227"
                                    },
                                    {
                                        cat_id: 228,
                                        cat_name: "跑步鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801577449vgU8e3sEaUkZGTKN9!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 216,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 228,
                                        name: "跑步鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=228",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=228"
                                    },
                                    {
                                        cat_id: 229,
                                        cat_name: "帆布鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157745iKMdaTDMu9DoKpQB7n!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 216,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 229,
                                        name: "帆布鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=229",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=229"
                                    },
                                    {
                                        cat_id: 230,
                                        cat_name: "板鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157745OPqVSxCcPdqCFpUNCZ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 216,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 230,
                                        name: "板鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=230",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=230"
                                    },
                                    {
                                        cat_id: 231,
                                        cat_name: "透气网面鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157744jTKzrtM8cEDXq0Nbvt!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 216,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 231,
                                        name: "透气网面鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=231",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=231"
                                    },
                                    {
                                        cat_id: 232,
                                        cat_name: "篮球鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157744sAnCtRVeWL7qFS4h8z!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 216,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 232,
                                        name: "篮球鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=232",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=232"
                                    }
                                ]
                            },
                            {
                                cat_id: 217,
                                cat_name: "运动服",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 6,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 217,
                                name: "运动服",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=217",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=217",
                                child_cat: [
                                    {
                                        cat_id: 233,
                                        cat_name: "运动羽绒服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157904hk74a46R8t1Zd5OPL3!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 217,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 233,
                                        name: "运动羽绒服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=233",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=233"
                                    },
                                    {
                                        cat_id: 234,
                                        cat_name: "冲锋衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157904JIb0vyAipeaL75CM8s!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 217,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 234,
                                        name: "冲锋衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=234",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=234"
                                    },
                                    {
                                        cat_id: 235,
                                        cat_name: "外套\/夹克",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157904JRZFQM6T5fOgDB8zlq!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 217,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 235,
                                        name: "外套\/夹克",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=235",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=235"
                                    },
                                    {
                                        cat_id: 236,
                                        cat_name: "运动卫衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157905yFzKT1TyB1cPxTMFki!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 217,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 236,
                                        name: "运动卫衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=236",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=236"
                                    },
                                    {
                                        cat_id: 237,
                                        cat_name: "运动裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157904jrRjxJtY7hTIBAqxAu!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 217,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 237,
                                        name: "运动裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=237",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=237"
                                    },
                                    {
                                        cat_id: 238,
                                        cat_name: "运动套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157905XwNcvd4JSKcDjA0o61!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 217,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 238,
                                        name: "运动套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=238",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=238"
                                    },
                                    {
                                        cat_id: 239,
                                        cat_name: "马夹\/马甲",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157903aY78WMVr8BhhV1JIBC!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 217,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 239,
                                        name: "马夹\/马甲",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=239",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=239"
                                    },
                                    {
                                        cat_id: 240,
                                        cat_name: "户外裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157904Ue55EWK6GGY5t6DdmU!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 217,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 240,
                                        name: "户外裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=240",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=240"
                                    },
                                    {
                                        cat_id: 241,
                                        cat_name: "软壳衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680157904AovsRYkB09c8aWwFOk!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 217,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 241,
                                        name: "软壳衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=241",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=241"
                                    }
                                ]
                            },
                            {
                                cat_id: 218,
                                cat_name: "儿童鞋服",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 6,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 218,
                                name: "儿童鞋服",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=218",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=218",
                                child_cat: [
                                    {
                                        cat_id: 242,
                                        cat_name: "运动休闲鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158068p4UHiAjnrPvvHbObAg!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 218,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 242,
                                        name: "运动休闲鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=242",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=242"
                                    },
                                    {
                                        cat_id: 243,
                                        cat_name: "跑鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158068VtgcahTTXMqse1tsen!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 218,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 243,
                                        name: "跑鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=243",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=243"
                                    },
                                    {
                                        cat_id: 244,
                                        cat_name: "儿童凉拖鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158068gcZGMZkC2AhwzejniW!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 218,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 244,
                                        name: "儿童凉拖鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=244",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=244"
                                    },
                                    {
                                        cat_id: 245,
                                        cat_name: "运动T恤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801580687Rp7Igr3WNw9HIyeKb!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 218,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 245,
                                        name: "运动T恤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=245",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=245"
                                    },
                                    {
                                        cat_id: 246,
                                        cat_name: "运动裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158068ZI1cIAvIT1hMy7GOOh!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 218,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 246,
                                        name: "运动裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=246",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=246"
                                    },
                                    {
                                        cat_id: 247,
                                        cat_name: "风衣外套",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801580689z5sPg4lUrHBSwuO5L!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 218,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 247,
                                        name: "风衣外套",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=247",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=247"
                                    },
                                    {
                                        cat_id: 248,
                                        cat_name: "运动套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158069GCB1woGRf2024ITpLB!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 218,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 248,
                                        name: "运动套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=248",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=248"
                                    },
                                    {
                                        cat_id: 249,
                                        cat_name: "运动卫衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801580681XybZ7lb3SmKn9jmji!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 218,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 249,
                                        name: "运动卫衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=249",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=249"
                                    },
                                    {
                                        cat_id: 250,
                                        cat_name: "户外衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158067o30rC3wYc1PSB3LzqY!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 218,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 250,
                                        name: "户外衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=250",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=250"
                                    }
                                ]
                            },
                            {
                                cat_id: 219,
                                cat_name: "健美瑜伽",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 6,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 219,
                                name: "健美瑜伽",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=219",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=219",
                                child_cat: [
                                    {
                                        cat_id: 251,
                                        cat_name: "运动内衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801583565Qm93iZKPitNR2aTi8!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 219,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 251,
                                        name: "运动内衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=251",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=251"
                                    },
                                    {
                                        cat_id: 252,
                                        cat_name: "瑜伽套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158355sQKxns2GjuNQr8RkKz!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 219,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 252,
                                        name: "瑜伽套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=252",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=252"
                                    },
                                    {
                                        cat_id: 253,
                                        cat_name: "瑜伽裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158356c4ztLpTRY65fhNU8Wi!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 219,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 253,
                                        name: "瑜伽裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=253",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=253"
                                    },
                                    {
                                        cat_id: 254,
                                        cat_name: "健身套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158356V7JH0wtCuKCJlUtLLg!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 219,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 254,
                                        name: "健身套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=254",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=254"
                                    },
                                    {
                                        cat_id: 255,
                                        cat_name: "瑜伽T恤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801583566EcLooBQrRRfaj0RM6!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 219,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 255,
                                        name: "瑜伽T恤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=255",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=255"
                                    },
                                    {
                                        cat_id: 256,
                                        cat_name: "发汗服",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158355AnzStBDtwn2I8aG8xY!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 219,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 256,
                                        name: "发汗服",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=256",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=256"
                                    },
                                    {
                                        cat_id: 257,
                                        cat_name: "紧身衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158355S8U26GcGZg8GgNM4CG!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 219,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 257,
                                        name: "紧身衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=257",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=257"
                                    },
                                    {
                                        cat_id: 258,
                                        cat_name: "健身\/压缩裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158355I3oVxXeSBFXWzfjKyv!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 219,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 258,
                                        name: "健身\/压缩裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=258",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=258"
                                    },
                                    {
                                        cat_id: 259,
                                        cat_name: "瑜伽辅助用品",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801583552Cnmmmpmjyn4dYQ7zR!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 219,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 259,
                                        name: "瑜伽辅助用品",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=259",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=259"
                                    }
                                ]
                            },
                            {
                                cat_id: 220,
                                cat_name: "游泳运动",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 6,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 220,
                                name: "游泳运动",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=220",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=220",
                                child_cat: [
                                    {
                                        cat_id: 260,
                                        cat_name: "分体泳衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801585181BUiQ17Cv9AZKQ0LEe!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 220,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 260,
                                        name: "分体泳衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=260",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=260"
                                    },
                                    {
                                        cat_id: 261,
                                        cat_name: "连体泳衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158517L4SNZ19fopvH6BW4ly!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 220,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 261,
                                        name: "连体泳衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=261",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=261"
                                    },
                                    {
                                        cat_id: 262,
                                        cat_name: "型男泳装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158518ONSQGMtsmOeyFiuLjk!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 220,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 262,
                                        name: "型男泳装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=262",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=262"
                                    },
                                    {
                                        cat_id: 263,
                                        cat_name: "儿童泳衣",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158518v14Ks06OszU2XASOSG!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 220,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 263,
                                        name: "儿童泳衣",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=263",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=263"
                                    },
                                    {
                                        cat_id: 264,
                                        cat_name: "披纱\/罩衫",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158517xEFtdZir6RIJknI792!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 220,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 264,
                                        name: "披纱\/罩衫",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=264",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=264"
                                    },
                                    {
                                        cat_id: 265,
                                        cat_name: "沙滩裤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801585191fAX2AopDbKRhmCXkQ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 220,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 265,
                                        name: "沙滩裤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=265",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=265"
                                    },
                                    {
                                        cat_id: 266,
                                        cat_name: "游泳镜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158518iyJtiqaXOXK7c6Ob0N!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 220,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 266,
                                        name: "游泳镜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=266",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=266"
                                    },
                                    {
                                        cat_id: 267,
                                        cat_name: "游泳帽",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158518NYGN4Il1XnuD9etH5z!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 220,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 267,
                                        name: "游泳帽",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=267",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=267"
                                    },
                                    {
                                        cat_id: 268,
                                        cat_name: "游泳配件",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158518IFfFk1ZVGovIeKfGMl!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 220,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 268,
                                        name: "游泳配件",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=268",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=268"
                                    }
                                ]
                            },
                            {
                                cat_id: 221,
                                cat_name: "运动配件",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 6,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 221,
                                name: "运动配件",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=221",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=221",
                                child_cat: [
                                    {
                                        cat_id: 269,
                                        cat_name: "双肩包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158665jsUc8r8hRu5CZOxlhR!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 221,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 269,
                                        name: "双肩包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=269",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=269"
                                    },
                                    {
                                        cat_id: 270,
                                        cat_name: "帽子",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158664wWxbZrGRkT6Bq1OPnK!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 221,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 270,
                                        name: "帽子",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=270",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=270"
                                    },
                                    {
                                        cat_id: 271,
                                        cat_name: "运动袜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158663P0fcyomb71v6TiotVk!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 221,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 271,
                                        name: "运动袜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=271",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=271"
                                    },
                                    {
                                        cat_id: 272,
                                        cat_name: "单肩\/斜挎包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158664WwTGCrHZTmUdy5ysZb!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 221,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 272,
                                        name: "单肩\/斜挎包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=272",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=272"
                                    },
                                    {
                                        cat_id: 273,
                                        cat_name: "臂包\/腰包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158664KY3OFjEOOrwMT2iDkN!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 221,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 273,
                                        name: "臂包\/腰包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=273",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=273"
                                    },
                                    {
                                        cat_id: 274,
                                        cat_name: "手提包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158665jwlNTv1Zj6xoScuGcN!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 221,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 274,
                                        name: "手提包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=274",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=274"
                                    },
                                    {
                                        cat_id: 275,
                                        cat_name: "防晒配饰",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158664CYgMW0lYeuRPexSKyb!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 221,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 275,
                                        name: "防晒配饰",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=275",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=275"
                                    },
                                    {
                                        cat_id: 276,
                                        cat_name: "水壶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158664KhjSO35zU8DfzNIOYE!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 221,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 276,
                                        name: "水壶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=276",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=276"
                                    },
                                    {
                                        cat_id: 277,
                                        cat_name: "护具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801586644rHBRtxUmqpOVVSsIQ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 221,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 277,
                                        name: "护具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=277",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=277"
                                    }
                                ]
                            },
                            {
                                cat_id: 222,
                                cat_name: "运动用品",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 6,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 222,
                                name: "运动用品",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=222",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=222",
                                child_cat: [
                                    {
                                        cat_id: 278,
                                        cat_name: "篮球",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158859uAuomFiTzzhv0fRl6F!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 222,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 278,
                                        name: "篮球",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=278",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=278"
                                    },
                                    {
                                        cat_id: 279,
                                        cat_name: "足球",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158858g63LHIjiM4v1OOo58g!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 222,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 279,
                                        name: "足球",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=279",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=279"
                                    },
                                    {
                                        cat_id: 280,
                                        cat_name: "羽毛球\/拍",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158858luzI5chCJjLw0oCPmT!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 222,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 280,
                                        name: "羽毛球\/拍",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=280",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=280"
                                    },
                                    {
                                        cat_id: 281,
                                        cat_name: "乒乓球\/拍",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/168015885870WM1BkWI6qsyYOAbZ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 222,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 281,
                                        name: "乒乓球\/拍",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=281",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=281"
                                    },
                                    {
                                        cat_id: 282,
                                        cat_name: "跑步机",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158858of8zTERvxyFPbLHerZ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 222,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 282,
                                        name: "跑步机",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=282",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=282"
                                    },
                                    {
                                        cat_id: 283,
                                        cat_name: "甩脂机",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158858S9EwBqqEuiyxKspvRt!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 222,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 283,
                                        name: "甩脂机",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=283",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=283"
                                    },
                                    {
                                        cat_id: 284,
                                        cat_name: "动感单车",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801588589YYFvPKvfIeMwaEeoh!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 222,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 284,
                                        name: "动感单车",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=284",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=284"
                                    },
                                    {
                                        cat_id: 285,
                                        cat_name: "仰卧板",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158858oqAKoc9mBRmFjh9ISa!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 222,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 285,
                                        name: "仰卧板",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=285",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=285"
                                    },
                                    {
                                        cat_id: 286,
                                        cat_name: "轮滑\/滑板",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680158858qMWrYgwpBbKiuF2Nia!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 222,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 286,
                                        name: "轮滑\/滑板",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=286",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=286"
                                    }
                                ]
                            },
                            {
                                cat_id: 223,
                                cat_name: "户外装备",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 6,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 223,
                                name: "户外装备",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=223",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=223",
                                child_cat: [
                                    {
                                        cat_id: 287,
                                        cat_name: "帐篷",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680159023zBvZYlwYbv8wW36rLa!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 223,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 287,
                                        name: "帐篷",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=287",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=287"
                                    },
                                    {
                                        cat_id: 288,
                                        cat_name: "睡袋\/垫子",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680159023UxUCST3Us5kdl8O0Ed!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 223,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 288,
                                        name: "睡袋\/垫子",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=288",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=288"
                                    },
                                    {
                                        cat_id: 289,
                                        cat_name: "骑行装备",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680159023YaE2OBsQTF3OURJzbW!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 223,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 289,
                                        name: "骑行装备",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=289",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=289"
                                    },
                                    {
                                        cat_id: 290,
                                        cat_name: "自行车",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680159023AzEo3xO66gyeTENjoX!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 223,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 290,
                                        name: "自行车",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=290",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=290"
                                    },
                                    {
                                        cat_id: 291,
                                        cat_name: "电动车",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680159023GdoK7ugbAQHu4of64l!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 223,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 291,
                                        name: "电动车",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=291",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=291"
                                    },
                                    {
                                        cat_id: 292,
                                        cat_name: "平衡车",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680159023o1xLOJuXESpsLt9YXd!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 223,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 292,
                                        name: "平衡车",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=292",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=292"
                                    },
                                    {
                                        cat_id: 293,
                                        cat_name: "垂钓装备",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680159024NYhllqVzlYAf3a9asX!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 223,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 293,
                                        name: "垂钓装备",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=293",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=293"
                                    },
                                    {
                                        cat_id: 294,
                                        cat_name: "烧烤装备",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680159024edPOTbM8u9rwKLAxtr!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 223,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 294,
                                        name: "烧烤装备",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=294",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=294"
                                    },
                                    {
                                        cat_id: 295,
                                        cat_name: "登山杖",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680159024HGef68Vxc3nOyEiRlM!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 223,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 295,
                                        name: "登山杖",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=295",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=295"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 7,
                        cat_name: "美妆",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801612170Xyra6sWTD9B8cD5qy!!pic.png",
                        is_hot: 1,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 11,
                        id: 7,
                        name: "美妆",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=7",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=7",
                        child_cat: [
                            {
                                cat_id: 296,
                                cat_name: "面部保养",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 7,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 296,
                                name: "面部保养",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=296",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=296",
                                child_cat: [
                                    {
                                        cat_id: 307,
                                        cat_name: "面膜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801609628g4kaBqSDzexKTH0Cv!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 296,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 307,
                                        name: "面膜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=307",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=307"
                                    },
                                    {
                                        cat_id: 308,
                                        cat_name: "防晒",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680160961rS1T9f3AuXanwqsWF7!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 296,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 308,
                                        name: "防晒",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=308",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=308"
                                    },
                                    {
                                        cat_id: 309,
                                        cat_name: "护肤套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680160961AZ5CAt9T8vixbSmdO0!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 296,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 309,
                                        name: "护肤套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=309",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=309"
                                    },
                                    {
                                        cat_id: 310,
                                        cat_name: "面部精华",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801609622ilcOtBWUdXWA1ST5G!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 296,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 310,
                                        name: "面部精华",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=310",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=310"
                                    },
                                    {
                                        cat_id: 311,
                                        cat_name: "T区护理",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680160961AfM1juOi1XbyJ1ql9m!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 296,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 311,
                                        name: "T区护理",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=311",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=311"
                                    },
                                    {
                                        cat_id: 312,
                                        cat_name: "化妆水",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680160961SFnzRsLT9FsVHDRxBb!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 296,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 312,
                                        name: "化妆水",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=312",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=312"
                                    },
                                    {
                                        cat_id: 313,
                                        cat_name: "敏感肌护肤",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680160961JigDDJQOstchVZJbZ2!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 296,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 313,
                                        name: "敏感肌护肤",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=313",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=313"
                                    },
                                    {
                                        cat_id: 314,
                                        cat_name: "眼部护理",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680160961Y8nL5IXTjSrPcp5FUY!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 296,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 314,
                                        name: "眼部护理",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=314",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=314"
                                    },
                                    {
                                        cat_id: 315,
                                        cat_name: "卸妆",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680160962xWVaInTKgnLPYmBcaS!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 296,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 315,
                                        name: "卸妆",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=315",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=315"
                                    }
                                ]
                            },
                            {
                                cat_id: 297,
                                cat_name: "迷人彩妆",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 7,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 297,
                                name: "迷人彩妆",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=297",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=297",
                                child_cat: [
                                    {
                                        cat_id: 316,
                                        cat_name: "口红",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161217i441YbliOxajTcs5fe!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 297,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 316,
                                        name: "口红",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=316",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=316"
                                    },
                                    {
                                        cat_id: 317,
                                        cat_name: "隔离\/妆前乳",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161216ufX8Irm7VILzbJdZ90!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 297,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 317,
                                        name: "隔离\/妆前乳",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=317",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=317"
                                    },
                                    {
                                        cat_id: 318,
                                        cat_name: "粉底",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161216SjrNfFXOOLq99Y15rO!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 297,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 318,
                                        name: "粉底",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=318",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=318"
                                    },
                                    {
                                        cat_id: 319,
                                        cat_name: "唇彩\/唇釉",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801612170Xyra6sWTD9B8cD5qy!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 297,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 319,
                                        name: "唇彩\/唇釉",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=319",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=319"
                                    },
                                    {
                                        cat_id: 320,
                                        cat_name: "眼唇卸妆",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161216BpMOjyONPCNycesbbh!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 297,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 320,
                                        name: "眼唇卸妆",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=320",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=320"
                                    },
                                    {
                                        cat_id: 321,
                                        cat_name: "眼影",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161216Qe2NPsxdHlcOwzPxHO!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 297,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 321,
                                        name: "眼影",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=321",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=321"
                                    },
                                    {
                                        cat_id: 322,
                                        cat_name: "气垫bb",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161217NfF18a9ay3EPII5oSq!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 297,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 322,
                                        name: "气垫bb",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=322",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=322"
                                    },
                                    {
                                        cat_id: 323,
                                        cat_name: "粉饼",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161217PzObV9b7Q64XjSs4Rl!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 297,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 323,
                                        name: "粉饼",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=323",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=323"
                                    },
                                    {
                                        cat_id: 324,
                                        cat_name: "BB霜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801612169359VozpVy3OAPQ3ZP!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 297,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 324,
                                        name: "BB霜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=324",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=324"
                                    }
                                ]
                            },
                            {
                                cat_id: 298,
                                cat_name: "香水",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 7,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 298,
                                name: "香水",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=298",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=298",
                                child_cat: [
                                    {
                                        cat_id: 325,
                                        cat_name: "女士香水",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161362EJkY2KhOklQRuKfOhA!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 298,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 325,
                                        name: "女士香水",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=325",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=325"
                                    },
                                    {
                                        cat_id: 326,
                                        cat_name: "香水套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161362wG1XhlL5bokgO8eIB9!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 298,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 326,
                                        name: "香水套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=326",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=326"
                                    },
                                    {
                                        cat_id: 327,
                                        cat_name: "男士香水",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161362VntnHCOWLrbDqfgfLc!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 298,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 327,
                                        name: "男士香水",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=327",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=327"
                                    }
                                ]
                            },
                            {
                                cat_id: 299,
                                cat_name: "洗发护发",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 7,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 299,
                                name: "洗发护发",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=299",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=299",
                                child_cat: [
                                    {
                                        cat_id: 328,
                                        cat_name: "洗护套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161428SLJ11yQK8rSUgOuUqy!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 299,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 328,
                                        name: "洗护套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=328",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=328"
                                    },
                                    {
                                        cat_id: 329,
                                        cat_name: "洗发水",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161428TG65DFJamaB4B4ErOC!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 299,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 329,
                                        name: "洗发水",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=329",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=329"
                                    },
                                    {
                                        cat_id: 330,
                                        cat_name: "护发素",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801614282YptC8b9T9o3fgrlwO!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 299,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 330,
                                        name: "护发素",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=330",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=330"
                                    },
                                    {
                                        cat_id: 331,
                                        cat_name: "护发精油",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161428ht0eOA788XY3DRqlXk!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 299,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 331,
                                        name: "护发精油",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=331",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=331"
                                    },
                                    {
                                        cat_id: 332,
                                        cat_name: "发膜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161428jY4NiVjVFkt0icVbb0!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 299,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 332,
                                        name: "发膜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=332",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=332"
                                    },
                                    {
                                        cat_id: 333,
                                        cat_name: "染发\/造型",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801612170Xyra6sWTD9B8cD5qy!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 299,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 333,
                                        name: "染发\/造型",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=333",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=333"
                                    }
                                ]
                            },
                            {
                                cat_id: 300,
                                cat_name: "沐浴润肤",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 7,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 300,
                                name: "沐浴润肤",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=300",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=300",
                                child_cat: [
                                    {
                                        cat_id: 334,
                                        cat_name: "沐浴露",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161717jg9NO7F5yahcTZ2lC9!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 300,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 334,
                                        name: "沐浴露",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=334",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=334"
                                    },
                                    {
                                        cat_id: 335,
                                        cat_name: "沐浴套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801617188FGKVzqM4GJQLkTA5O!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 300,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 335,
                                        name: "沐浴套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=335",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=335"
                                    },
                                    {
                                        cat_id: 336,
                                        cat_name: "身体乳",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161717UfqnOrRFQpkQ5t8jzH!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 300,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 336,
                                        name: "身体乳",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=336",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=336"
                                    },
                                    {
                                        cat_id: 337,
                                        cat_name: "沐浴油\/磨砂",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161718xvI1rvAnMVzXTKsvll!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 300,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 337,
                                        name: "沐浴油\/磨砂",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=337",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=337"
                                    },
                                    {
                                        cat_id: 338,
                                        cat_name: "护肤皂",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161718I10WhbgwCVw9FX92hu!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 300,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 338,
                                        name: "护肤皂",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=338",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=338"
                                    },
                                    {
                                        cat_id: 339,
                                        cat_name: "沐浴工具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161718zIiPQfMFjKI1FLQy1f!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 300,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 339,
                                        name: "沐浴工具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=339",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=339"
                                    }
                                ]
                            },
                            {
                                cat_id: 301,
                                cat_name: "男士护理",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 7,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 301,
                                name: "男士护理",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=301",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=301",
                                child_cat: [
                                    {
                                        cat_id: 340,
                                        cat_name: "护肤套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161970kvGNNHMRUG5AHmVq2M!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 301,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 340,
                                        name: "护肤套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=340",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=340"
                                    },
                                    {
                                        cat_id: 341,
                                        cat_name: "男士洁面",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161970nLTuath8hEIfBb0pMT!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 301,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 341,
                                        name: "男士洁面",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=341",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=341"
                                    },
                                    {
                                        cat_id: 342,
                                        cat_name: "剃须用品",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/168016196913pNHzSv4Z1456v9n0!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 301,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 342,
                                        name: "剃须用品",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=342",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=342"
                                    },
                                    {
                                        cat_id: 343,
                                        cat_name: "男士洗护",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161970YET0IzetVy9qm76w7w!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 301,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 343,
                                        name: "男士洗护",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=343",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=343"
                                    },
                                    {
                                        cat_id: 344,
                                        cat_name: "染发\/造型",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161970Ppxa5eJCvoOsdbdshR!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 301,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 344,
                                        name: "染发\/造型",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=344",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=344"
                                    },
                                    {
                                        cat_id: 345,
                                        cat_name: "男士面膜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680161970I7qIWlLr4aHwZVUpcW!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 301,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 345,
                                        name: "男士面膜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=345",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=345"
                                    }
                                ]
                            },
                            {
                                cat_id: 302,
                                cat_name: "口腔护理",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 7,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 302,
                                name: "口腔护理",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=302",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=302",
                                child_cat: [
                                    {
                                        cat_id: 346,
                                        cat_name: "牙膏",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801620882O44YpXKkYOb8y2RrO!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 302,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 346,
                                        name: "牙膏",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=346",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=346"
                                    },
                                    {
                                        cat_id: 347,
                                        cat_name: "漱口水",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162088VA0pqOVjCbQkOXCj0e!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 302,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 347,
                                        name: "漱口水",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=347",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=347"
                                    },
                                    {
                                        cat_id: 348,
                                        cat_name: "牙刷\/牙线",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162088TXkXfxOcIcmLzM2vG3!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 302,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 348,
                                        name: "牙刷\/牙线",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=348",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=348"
                                    }
                                ]
                            },
                            {
                                cat_id: 303,
                                cat_name: "女性护理",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 7,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 303,
                                name: "女性护理",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=303",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=303",
                                child_cat: [
                                    {
                                        cat_id: 349,
                                        cat_name: "卫生巾",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162183UmcPWPRAmzKjyKglua!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 303,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 349,
                                        name: "卫生巾",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=349",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=349"
                                    },
                                    {
                                        cat_id: 350,
                                        cat_name: "护垫\/棉条",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162183d1aV1bQmhF8LmAHBFf!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 303,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 350,
                                        name: "护垫\/棉条",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=350",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=350"
                                    },
                                    {
                                        cat_id: 351,
                                        cat_name: "私处护理",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162183FPOeqzvfoJdF85zEtx!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 303,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 351,
                                        name: "私处护理",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=351",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=351"
                                    }
                                ]
                            },
                            {
                                cat_id: 304,
                                cat_name: "身体护理",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 7,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 304,
                                name: "身体护理",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=304",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=304",
                                child_cat: [
                                    {
                                        cat_id: 352,
                                        cat_name: "脱毛止汗",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/168016227846hg7012jAP2PwkEFG!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 304,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 352,
                                        name: "脱毛止汗",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=352",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=352"
                                    },
                                    {
                                        cat_id: 353,
                                        cat_name: "剃脱毛器",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162277HtOYMlH9MHtzMA8qbL!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 304,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 353,
                                        name: "剃脱毛器",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=353",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=353"
                                    },
                                    {
                                        cat_id: 354,
                                        cat_name: "颈部护理",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162278oKrUr68fXANDeyi9FD!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 304,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 354,
                                        name: "颈部护理",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=354",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=354"
                                    },
                                    {
                                        cat_id: 355,
                                        cat_name: "手部护理",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162278RHdzFhD6PWXgEQDkKx!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 304,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 355,
                                        name: "手部护理",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=355",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=355"
                                    },
                                    {
                                        cat_id: 356,
                                        cat_name: "身体护理工具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801622784odkVC0IDCtHdNekLz!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 304,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 356,
                                        name: "身体护理工具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=356",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=356"
                                    },
                                    {
                                        cat_id: 357,
                                        cat_name: "香薰精油",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162278BCkvJwHPLw94OSAZBp!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 304,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 357,
                                        name: "香薰精油",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=357",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=357"
                                    }
                                ]
                            },
                            {
                                cat_id: 305,
                                cat_name: "美甲",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 7,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 305,
                                name: "美甲",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=305",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=305",
                                child_cat: [
                                    {
                                        cat_id: 358,
                                        cat_name: "美甲",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801624367xOy2zfJZY8zOpmoD9!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 305,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 358,
                                        name: "美甲",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=358",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=358"
                                    },
                                    {
                                        cat_id: 359,
                                        cat_name: "美甲套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162436mo23Mc3kGi1FfjnH91!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 305,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 359,
                                        name: "美甲套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=359",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=359"
                                    },
                                    {
                                        cat_id: 360,
                                        cat_name: "指甲油",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162436I4YIwu6sktdOEGmyJP!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 305,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 360,
                                        name: "指甲油",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=360",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=360"
                                    }
                                ]
                            },
                            {
                                cat_id: 306,
                                cat_name: "美容工具",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 7,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 306,
                                name: "美容工具",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=306",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=306",
                                child_cat: [
                                    {
                                        cat_id: 361,
                                        cat_name: "化妆刷\/包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162541ZaZHWe1WZipf7V7qOU!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 306,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 361,
                                        name: "化妆刷\/包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=361",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=361"
                                    },
                                    {
                                        cat_id: 362,
                                        cat_name: "化妆棉",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801625418HFMfAsY4lSXGNQIEl!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 306,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 362,
                                        name: "化妆棉",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=362",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=362"
                                    },
                                    {
                                        cat_id: 363,
                                        cat_name: "洁面工具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801625412XGd3qDxqnFacb6uVj!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 306,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 363,
                                        name: "洁面工具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=363",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=363"
                                    },
                                    {
                                        cat_id: 364,
                                        cat_name: "睫毛夹",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162540tgkUinotIlshkYXm2V!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 306,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 364,
                                        name: "睫毛夹",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=364",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=364"
                                    },
                                    {
                                        cat_id: 365,
                                        cat_name: "修眉刀",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162540uYaHpPoDE6nKhYGnfo!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 306,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 365,
                                        name: "修眉刀",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=365",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=365"
                                    },
                                    {
                                        cat_id: 366,
                                        cat_name: "粉扑",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680162540d2o7xlucqHsPB7Jqdr!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 306,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 366,
                                        name: "粉扑",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=366",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=366"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 8,
                        cat_name: "配饰",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/168016724400Fl8aXrUkDYj9Ws2T!!pic.jpeg",
                        is_hot: 0,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 7,
                        id: 8,
                        name: "配饰",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=8",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=8",
                        child_cat: [
                            {
                                cat_id: 367,
                                cat_name: "黄金钻石",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 8,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 367,
                                name: "黄金钻石",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=367",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=367",
                                child_cat: [
                                    {
                                        cat_id: 374,
                                        cat_name: "黄金戒指",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167243HR6fRInjIjdnuTIT3O!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 367,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 374,
                                        name: "黄金戒指",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=374",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=374"
                                    },
                                    {
                                        cat_id: 375,
                                        cat_name: "黄金手饰",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167243mUzifKALc1AyUCarwS!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 367,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 375,
                                        name: "黄金手饰",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=375",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=375"
                                    },
                                    {
                                        cat_id: 376,
                                        cat_name: "黄金项链\/吊坠",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167243cgeEtc10NPbEkkPb2M!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 367,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 376,
                                        name: "黄金项链\/吊坠",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=376",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=376"
                                    },
                                    {
                                        cat_id: 377,
                                        cat_name: "黄金耳饰",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167244amPnvJsXXqZLuyAV9m!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 367,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 377,
                                        name: "黄金耳饰",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=377",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=377"
                                    },
                                    {
                                        cat_id: 378,
                                        cat_name: "黄金转运珠",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167244hkZ5GjP97lHi5yZhhc!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 367,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 378,
                                        name: "黄金转运珠",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=378",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=378"
                                    },
                                    {
                                        cat_id: 379,
                                        cat_name: "钻戒",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167244Ne19l2f2WNeNXa1zxT!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 367,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 379,
                                        name: "钻戒",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=379",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=379"
                                    },
                                    {
                                        cat_id: 380,
                                        cat_name: "钻石耳饰",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/168016724467054v70ZppB5HJBPX!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 367,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 380,
                                        name: "钻石耳饰",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=380",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=380"
                                    },
                                    {
                                        cat_id: 381,
                                        cat_name: "钻石吊坠",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/168016724400Fl8aXrUkDYj9Ws2T!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 367,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 381,
                                        name: "钻石吊坠",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=381",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=381"
                                    },
                                    {
                                        cat_id: 382,
                                        cat_name: "铂金首饰",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167244OkczhD8JDNp4o1VPLY!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 367,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 382,
                                        name: "铂金首饰",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=382",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=382"
                                    }
                                ]
                            },
                            {
                                cat_id: 368,
                                cat_name: "手表专区",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 8,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 368,
                                name: "手表专区",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=368",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=368",
                                child_cat: [
                                    {
                                        cat_id: 383,
                                        cat_name: "机械男表",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167415TZSo9bnieSzQOUERWX!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 368,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 383,
                                        name: "机械男表",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=383",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=383"
                                    },
                                    {
                                        cat_id: 384,
                                        cat_name: "机械女表",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167415Z27avjcs9SWp1axsFE!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 368,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 384,
                                        name: "机械女表",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=384",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=384"
                                    },
                                    {
                                        cat_id: 385,
                                        cat_name: "石英女表",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167415Yf5a8Xq9huXh16TVSt!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 368,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 385,
                                        name: "石英女表",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=385",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=385"
                                    },
                                    {
                                        cat_id: 386,
                                        cat_name: "石英男表",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167415AaGdWEg2l4CXeicCMi!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 368,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 386,
                                        name: "石英男表",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=386",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=386"
                                    },
                                    {
                                        cat_id: 387,
                                        cat_name: "商务腕表",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167415q41ElXmsyrxMqJdazC!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 368,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 387,
                                        name: "商务腕表",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=387",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=387"
                                    },
                                    {
                                        cat_id: 388,
                                        cat_name: "情侣对表",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167415AqhpFUGMxJpBmajx9I!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 368,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 388,
                                        name: "情侣对表",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=388",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=388"
                                    }
                                ]
                            },
                            {
                                cat_id: 369,
                                cat_name: "帽子伞具",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 8,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 369,
                                name: "帽子伞具",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=369",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=369",
                                child_cat: [
                                    {
                                        cat_id: 389,
                                        cat_name: "鸭舌\/棒球帽",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801675206JxFWtInPAqbgn3xFF!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 369,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 389,
                                        name: "鸭舌\/棒球帽",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=389",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=389"
                                    },
                                    {
                                        cat_id: 390,
                                        cat_name: "渔夫帽&草帽",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167520QdH8H0C28WQ9Am4RFp!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 369,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 390,
                                        name: "渔夫帽&草帽",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=390",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=390"
                                    },
                                    {
                                        cat_id: 391,
                                        cat_name: "贝雷帽",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167520kwkJ1RZXaiU9uVZEAG!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 369,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 391,
                                        name: "贝雷帽",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=391",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=391"
                                    },
                                    {
                                        cat_id: 392,
                                        cat_name: "超轻遮阳伞",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167521Y5OB8IoUrGy30k1Fpg!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 369,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 392,
                                        name: "超轻遮阳伞",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=392",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=392"
                                    },
                                    {
                                        cat_id: 393,
                                        cat_name: "小黑伞",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801675218lHph6DLvFv3ubMHoy!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 369,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 393,
                                        name: "小黑伞",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=393",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=393"
                                    },
                                    {
                                        cat_id: 394,
                                        cat_name: "长柄伞",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167521U0F3sPzQ6jJfGPacnH!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 369,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 394,
                                        name: "长柄伞",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=394",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=394"
                                    }
                                ]
                            },
                            {
                                cat_id: 370,
                                cat_name: "眼镜专区",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 8,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 370,
                                name: "眼镜专区",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=370",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=370",
                                child_cat: [
                                    {
                                        cat_id: 395,
                                        cat_name: "太阳眼镜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801676344Hu3UXKZYSikhYZyi6!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 370,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 395,
                                        name: "太阳眼镜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=395",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=395"
                                    },
                                    {
                                        cat_id: 396,
                                        cat_name: "蛤蟆镜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167635e2FJ8emHGwPnNmttO1!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 370,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 396,
                                        name: "蛤蟆镜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=396",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=396"
                                    },
                                    {
                                        cat_id: 397,
                                        cat_name: "防蓝光眼镜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801676354FKqvkZYeS55HRRXLF!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 370,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 397,
                                        name: "防蓝光眼镜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=397",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=397"
                                    }
                                ]
                            },
                            {
                                cat_id: 371,
                                cat_name: "围巾专区",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 8,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 371,
                                name: "围巾专区",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=371",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=371",
                                child_cat: [
                                    {
                                        cat_id: 398,
                                        cat_name: "真丝丝巾",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167696vNHmmqy45Rho1akPzy!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 371,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 398,
                                        name: "真丝丝巾",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=398",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=398"
                                    },
                                    {
                                        cat_id: 399,
                                        cat_name: "披肩\/大方巾",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167696cZG0SuCrigfCs49FmR!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 371,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 399,
                                        name: "披肩\/大方巾",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=399",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=399"
                                    },
                                    {
                                        cat_id: 400,
                                        cat_name: "羊毛围巾",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167696fhGHOwccMGSax7sCQO!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 371,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 400,
                                        name: "羊毛围巾",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=400",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=400"
                                    },
                                    {
                                        cat_id: 401,
                                        cat_name: "羊绒围巾",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167696WIu4Dh71ZGH7PiCGIR!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 371,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 401,
                                        name: "羊绒围巾",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=401",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=401"
                                    },
                                    {
                                        cat_id: 402,
                                        cat_name: "女士围巾",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167696L1jFwOqr87Sk1yvOna!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 371,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 402,
                                        name: "女士围巾",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=402",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=402"
                                    },
                                    {
                                        cat_id: 403,
                                        cat_name: "男士围巾",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167696KGx46hBDi9jhsYfshC!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 371,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 403,
                                        name: "男士围巾",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=403",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=403"
                                    }
                                ]
                            },
                            {
                                cat_id: 372,
                                cat_name: "玉石珍珠",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 8,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 372,
                                name: "玉石珍珠",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=372",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=372",
                                child_cat: [
                                    {
                                        cat_id: 404,
                                        cat_name: "珍珠项链",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801678006v67EnMA1WL0BRgUbK!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 372,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 404,
                                        name: "珍珠项链",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=404",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=404"
                                    },
                                    {
                                        cat_id: 405,
                                        cat_name: "珍珠吊坠",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167800SflQ5QarofuvGmKpWI!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 372,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 405,
                                        name: "珍珠吊坠",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=405",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=405"
                                    },
                                    {
                                        cat_id: 406,
                                        cat_name: "玉石珍珠耳饰",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167800w1NfzHTsM4iEfJMPga!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 372,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 406,
                                        name: "玉石珍珠耳饰",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=406",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=406"
                                    },
                                    {
                                        cat_id: 407,
                                        cat_name: "玉手镯",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167799ZEULLMJ2m7cjcbIWUm!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 372,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 407,
                                        name: "玉手镯",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=407",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=407"
                                    },
                                    {
                                        cat_id: 408,
                                        cat_name: "玉吊坠",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167799Vg2uCmV3Jg05LGDPZN!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 372,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 408,
                                        name: "玉吊坠",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=408",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=408"
                                    },
                                    {
                                        cat_id: 409,
                                        cat_name: "玉戒指",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801677991UGdxSbI6aPAnPZm9r!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 372,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 409,
                                        name: "玉戒指",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=409",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=409"
                                    },
                                    {
                                        cat_id: 410,
                                        cat_name: "彩宝首饰",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167910sF9GzaHSBGcvnqNi1z!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 372,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 410,
                                        name: "彩宝首饰",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=410",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=410"
                                    },
                                    {
                                        cat_id: 411,
                                        cat_name: "琥珀手饰",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167910OipmdTyz0WiJuhokav!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 372,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 411,
                                        name: "琥珀手饰",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=411",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=411"
                                    },
                                    {
                                        cat_id: 412,
                                        cat_name: "琥珀吊坠",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167910TuKArW5jmfpxNeQDEx!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 372,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 412,
                                        name: "琥珀吊坠",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=412",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=412"
                                    }
                                ]
                            },
                            {
                                cat_id: 373,
                                cat_name: "银饰木玩",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 8,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 373,
                                name: "银饰木玩",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=373",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=373",
                                child_cat: [
                                    {
                                        cat_id: 413,
                                        cat_name: "银手饰",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167964yarxaOblfSXGzmhliZ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 373,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 413,
                                        name: "银手饰",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=413",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=413"
                                    },
                                    {
                                        cat_id: 414,
                                        cat_name: "银项链吊坠",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16801679649ksyGixSs7hO89f3Z0!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 373,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 414,
                                        name: "银项链吊坠",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=414",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=414"
                                    },
                                    {
                                        cat_id: 415,
                                        cat_name: "木饰文玩",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680167964B6GYaqDQ72r8fSCnOu!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 373,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 415,
                                        name: "木饰文玩",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=415",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=415"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 9,
                        cat_name: "家电",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228058Oiu2dmXPrL0xfeaK4h!!pic.jpeg",
                        is_hot: 0,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 5,
                        id: 9,
                        name: "家电",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=9",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=9",
                        child_cat: [
                            {
                                cat_id: 416,
                                cat_name: "3C数码",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 9,
                                cat_ico: "lyecs-defined-icon-shumashouji",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 416,
                                name: "3C数码",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=416",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=416",
                                child_cat: [
                                    {
                                        cat_id: 421,
                                        cat_name: "手机",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227788vovet2mpYj9Lm1pzf5!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 416,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 421,
                                        name: "手机",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=421",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=421"
                                    },
                                    {
                                        cat_id: 422,
                                        cat_name: "平板电脑",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227788KCxt10lmbOVefeOxIu!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 416,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 422,
                                        name: "平板电脑",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=422",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=422"
                                    },
                                    {
                                        cat_id: 423,
                                        cat_name: "笔记本",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227788qZaWN7RHxrreKBH8HI!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 416,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 423,
                                        name: "笔记本",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=423",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=423"
                                    },
                                    {
                                        cat_id: 424,
                                        cat_name: "智能手表",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227788Y2OvcPvNL3x8x8UXla!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 416,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 424,
                                        name: "智能手表",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=424",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=424"
                                    },
                                    {
                                        cat_id: 425,
                                        cat_name: "智能手环",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227788MerBGYFLo2xRUgVh1E!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 416,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 425,
                                        name: "智能手环",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=425",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=425"
                                    },
                                    {
                                        cat_id: 426,
                                        cat_name: "电子词典",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227788VbfRnBHQTmRtIk7RgH!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 416,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 426,
                                        name: "电子词典",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=426",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=426"
                                    }
                                ]
                            },
                            {
                                cat_id: 417,
                                cat_name: "空调",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 9,
                                cat_ico: "lyecs-defined-icon-youhuiquan",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 417,
                                name: "空调",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=417",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=417",
                                child_cat: [
                                    {
                                        cat_id: 427,
                                        cat_name: "1匹",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227890V6YOjH8lFnBOQn8JzY!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 417,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 427,
                                        name: "1匹",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=427",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=427"
                                    },
                                    {
                                        cat_id: 428,
                                        cat_name: "1.5匹",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227890bDQgwKrU4JpgwZbP34!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 417,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 428,
                                        name: "1.5匹",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=428",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=428"
                                    },
                                    {
                                        cat_id: 429,
                                        cat_name: "2匹",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227890FUQMQmF6mHJks9BusJ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 417,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 429,
                                        name: "2匹",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=429",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=429"
                                    },
                                    {
                                        cat_id: 430,
                                        cat_name: "3匹",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802278905KCsajTIHgMTgSn1id!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 417,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 430,
                                        name: "3匹",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=430",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=430"
                                    },
                                    {
                                        cat_id: 431,
                                        cat_name: "壁挂式空调",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227890YReWuaM6OHDwp0q5Vz!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 417,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 431,
                                        name: "壁挂式空调",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=431",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=431"
                                    },
                                    {
                                        cat_id: 432,
                                        cat_name: "立柜式空调",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227890EuREKhZhLhwKyDp4GZ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 417,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 432,
                                        name: "立柜式空调",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=432",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=432"
                                    }
                                ]
                            },
                            {
                                cat_id: 418,
                                cat_name: "冰箱",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 9,
                                cat_ico: "lyecs-defined-icon-jiayongdianqi",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 5,
                                id: 418,
                                name: "冰箱",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=418",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=418",
                                child_cat: [
                                    {
                                        cat_id: 433,
                                        cat_name: "双门冰箱",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227980AULAuS5mn4nP33biKT!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 418,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 433,
                                        name: "双门冰箱",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=433",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=433"
                                    },
                                    {
                                        cat_id: 434,
                                        cat_name: "对开门冰箱",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802279805EAdD77YHUBcPs5zFU!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 418,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 434,
                                        name: "对开门冰箱",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=434",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=434"
                                    },
                                    {
                                        cat_id: 435,
                                        cat_name: "三门冰箱",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227980lXn0SPatik8ZE7kAEZ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 418,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 435,
                                        name: "三门冰箱",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=435",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=435"
                                    },
                                    {
                                        cat_id: 436,
                                        cat_name: "多门冰箱",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227980p3ZVuQc9wDaRo0O1KK!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 418,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 436,
                                        name: "多门冰箱",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=436",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=436"
                                    },
                                    {
                                        cat_id: 437,
                                        cat_name: "冷柜\/冰吧",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680227980y2h1N3Kk0vOlV1oBd3!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 418,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 437,
                                        name: "冷柜\/冰吧",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=437",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=437"
                                    }
                                ]
                            },
                            {
                                cat_id: 419,
                                cat_name: "电视",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 9,
                                cat_ico: "lyecs-defined-icon-dianshi",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 5,
                                id: 419,
                                name: "电视",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=419",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=419",
                                child_cat: [
                                    {
                                        cat_id: 438,
                                        cat_name: "曲面电视",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228058qFewhRO1MisKKUJNqL!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 419,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 438,
                                        name: "曲面电视",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=438",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=438"
                                    },
                                    {
                                        cat_id: 439,
                                        cat_name: "智能电视",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228057TtPP0onna6j8nkJW5g!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 419,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 439,
                                        name: "智能电视",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=439",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=439"
                                    },
                                    {
                                        cat_id: 440,
                                        cat_name: "HDR电视",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228058qdAR6KDQMHUWpre22C!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 419,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 440,
                                        name: "HDR电视",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=440",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=440"
                                    },
                                    {
                                        cat_id: 441,
                                        cat_name: "4K超高清",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228058Oiu2dmXPrL0xfeaK4h!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 419,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 441,
                                        name: "4K超高清",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=441",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=441"
                                    },
                                    {
                                        cat_id: 442,
                                        cat_name: "超薄电视",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228058yQZZGNL2OJraXJupHl!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 419,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 442,
                                        name: "超薄电视",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=442",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=442"
                                    }
                                ]
                            },
                            {
                                cat_id: 420,
                                cat_name: "厨卫大电",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 9,
                                cat_ico: "lyecs-defined-icon-dianfanguo",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 420,
                                name: "厨卫大电",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=420",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=420",
                                child_cat: [
                                    {
                                        cat_id: 443,
                                        cat_name: "电热水器",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/168022814904vauIdbYA20P9C9E0!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 420,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 443,
                                        name: "电热水器",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=443",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=443"
                                    },
                                    {
                                        cat_id: 444,
                                        cat_name: "燃气热水器",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228149PtsOCUTusoaO1u2NOF!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 420,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 444,
                                        name: "燃气热水器",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=444",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=444"
                                    },
                                    {
                                        cat_id: 445,
                                        cat_name: "欧式烟机",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802281498rJCXsm1OUXRODChpP!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 420,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 445,
                                        name: "欧式烟机",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=445",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=445"
                                    },
                                    {
                                        cat_id: 446,
                                        cat_name: "灶具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228149XfpUGJPzXLGBI727cf!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 420,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 446,
                                        name: "灶具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=446",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=446"
                                    },
                                    {
                                        cat_id: 447,
                                        cat_name: "消毒柜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228149zJNASWCM95tJkj5Z2u!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 420,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 447,
                                        name: "消毒柜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=447",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=447"
                                    },
                                    {
                                        cat_id: 448,
                                        cat_name: "洗碗机",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228149g6ZwYS9HsDTxcf4DC8!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 420,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 448,
                                        name: "洗碗机",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=448",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=448"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 10,
                        cat_name: "家居",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802300220c92f22G8OGoYPJBtn!!pic.png",
                        is_hot: 0,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 7,
                        id: 10,
                        name: "家居",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=10",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=10",
                        child_cat: [
                            {
                                cat_id: 449,
                                cat_name: "家纺床品",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 10,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 449,
                                name: "家纺床品",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=449",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=449",
                                child_cat: [
                                    {
                                        cat_id: 456,
                                        cat_name: "床上套件",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802284812mv6agLHNz15H84wCQ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 449,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 456,
                                        name: "床上套件",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=456",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=456"
                                    },
                                    {
                                        cat_id: 457,
                                        cat_name: "被芯",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/168022848192ECg2Y5vZ0umhaDbD!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 449,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 457,
                                        name: "被芯",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=457",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=457"
                                    },
                                    {
                                        cat_id: 458,
                                        cat_name: "电热毯",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228482tlsbMP3ZdtX4JOVPhL!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 449,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 458,
                                        name: "电热毯",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=458",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=458"
                                    },
                                    {
                                        cat_id: 459,
                                        cat_name: "枕头",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228481Og1I2ObGtQHrVAjjHZ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 449,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 459,
                                        name: "枕头",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=459",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=459"
                                    },
                                    {
                                        cat_id: 460,
                                        cat_name: "毛毯",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228481XFVRzkajsJ3Ogi9bbf!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 449,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 460,
                                        name: "毛毯",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=460",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=460"
                                    },
                                    {
                                        cat_id: 461,
                                        cat_name: "床垫床褥",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228481K930tMRc0cZOwebnzO!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 449,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 461,
                                        name: "床垫床褥",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=461",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=461"
                                    }
                                ]
                            },
                            {
                                cat_id: 450,
                                cat_name: "杯壶餐具",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 10,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 450,
                                name: "杯壶餐具",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=450",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=450",
                                child_cat: [
                                    {
                                        cat_id: 462,
                                        cat_name: "保温杯壶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802286298LK2E2MLkOLmQUoVbi!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 450,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 462,
                                        name: "保温杯壶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=462",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=462"
                                    },
                                    {
                                        cat_id: 463,
                                        cat_name: "冷水壶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228630IWBRMFZFifeiTkHYy1!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 450,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 463,
                                        name: "冷水壶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=463",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=463"
                                    },
                                    {
                                        cat_id: 464,
                                        cat_name: "玻璃杯",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228628KeLHn7Ipcv3jOPvikZ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 450,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 464,
                                        name: "玻璃杯",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=464",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=464"
                                    },
                                    {
                                        cat_id: 465,
                                        cat_name: "碗碟盘",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228629txQafxocVLglYsmXlH!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 450,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 465,
                                        name: "碗碟盘",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=465",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=465"
                                    },
                                    {
                                        cat_id: 466,
                                        cat_name: "餐具套装",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228629OjS4iE0sKdZUgSxLJq!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 450,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 466,
                                        name: "餐具套装",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=466",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=466"
                                    },
                                    {
                                        cat_id: 467,
                                        cat_name: "保鲜\/饭盒",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228629pkN7QhrCjgrJ4PUhL0!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 450,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 467,
                                        name: "保鲜\/饭盒",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=467",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=467"
                                    }
                                ]
                            },
                            {
                                cat_id: 451,
                                cat_name: "烹饪厨具",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 10,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 451,
                                name: "烹饪厨具",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=451",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=451",
                                child_cat: [
                                    {
                                        cat_id: 468,
                                        cat_name: "锅具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228752NHNdG3unFkcnWURuBw!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 451,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 468,
                                        name: "锅具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=468",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=468"
                                    },
                                    {
                                        cat_id: 469,
                                        cat_name: "厨房置物架",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228752JpJtJ8n7ourRc7flAl!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 451,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 469,
                                        name: "厨房置物架",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=469",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=469"
                                    },
                                    {
                                        cat_id: 470,
                                        cat_name: "刀具\/剪刀",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228752w5w3z7KU4xgqOdFw9a!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 451,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 470,
                                        name: "刀具\/剪刀",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=470",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=470"
                                    },
                                    {
                                        cat_id: 471,
                                        cat_name: "厨用小工具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228752pz29iigCp9ySBDmVo2!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 451,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 471,
                                        name: "厨用小工具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=471",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=471"
                                    },
                                    {
                                        cat_id: 472,
                                        cat_name: "砧板",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802287520ZSDwblh9SGGgMGOCR!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 451,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 472,
                                        name: "砧板",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=472",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=472"
                                    },
                                    {
                                        cat_id: 473,
                                        cat_name: "铲勺",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228752PaPVx0l8J3n0AAsAvl!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 451,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 473,
                                        name: "铲勺",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=473",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=473"
                                    }
                                ]
                            },
                            {
                                cat_id: 452,
                                cat_name: "百货日用",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 10,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 452,
                                name: "百货日用",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=452",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=452",
                                child_cat: [
                                    {
                                        cat_id: 474,
                                        cat_name: "毛巾\/浴巾",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228927xWOcJuDKhGbRfvQ7je!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 452,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 474,
                                        name: "毛巾\/浴巾",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=474",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=474"
                                    },
                                    {
                                        cat_id: 475,
                                        cat_name: "家居拖鞋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802289281fcFFBHU1gLHlgibrD!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 452,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 475,
                                        name: "家居拖鞋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=475",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=475"
                                    },
                                    {
                                        cat_id: 476,
                                        cat_name: "拖把",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228927i9MAXO2eDkHTXMuNUC!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 452,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 476,
                                        name: "拖把",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=476",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=476"
                                    },
                                    {
                                        cat_id: 477,
                                        cat_name: "垃圾桶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228928tgLGy3Bf5UlT1Eeelk!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 452,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 477,
                                        name: "垃圾桶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=477",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=477"
                                    },
                                    {
                                        cat_id: 478,
                                        cat_name: "清洁刷",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680228928CkqX9ge7SLc3b85h9O!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 452,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 478,
                                        name: "清洁刷",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=478",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=478"
                                    },
                                    {
                                        cat_id: 479,
                                        cat_name: "扫把\/簸箕",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802289288yaLw4AT1ofDcKcUKE!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 452,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 479,
                                        name: "扫把\/簸箕",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=479",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=479"
                                    }
                                ]
                            },
                            {
                                cat_id: 453,
                                cat_name: "收纳晾晒",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 10,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 5,
                                id: 453,
                                name: "收纳晾晒",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=453",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=453",
                                child_cat: [
                                    {
                                        cat_id: 480,
                                        cat_name: "收纳柜\/箱\/盒",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229022D34OWFjtttn70KvOcC!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 453,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 480,
                                        name: "收纳柜\/箱\/盒",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=480",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=480"
                                    },
                                    {
                                        cat_id: 481,
                                        cat_name: "防尘罩",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229023AeEC7AZFRO2UTRjiXW!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 453,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 481,
                                        name: "防尘罩",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=481",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=481"
                                    },
                                    {
                                        cat_id: 482,
                                        cat_name: "压缩袋",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229022xWG3lyUnFVgcpflFhh!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 453,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 482,
                                        name: "压缩袋",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=482",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=482"
                                    },
                                    {
                                        cat_id: 483,
                                        cat_name: "鞋架",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229022e6O0NtpH9oeqkrDEnk!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 453,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 483,
                                        name: "鞋架",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=483",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=483"
                                    },
                                    {
                                        cat_id: 484,
                                        cat_name: "衣架\/裤架",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229022t6tQOEAQ04CHZiWkgL!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 453,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 484,
                                        name: "衣架\/裤架",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=484",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=484"
                                    }
                                ]
                            },
                            {
                                cat_id: 454,
                                cat_name: "纸品清洁",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 10,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 454,
                                name: "纸品清洁",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=454",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=454",
                                child_cat: [
                                    {
                                        cat_id: 485,
                                        cat_name: "洗洁精",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229102LcBJkX6QnPF8xD2NiW!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 454,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 485,
                                        name: "洗洁精",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=485",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=485"
                                    },
                                    {
                                        cat_id: 486,
                                        cat_name: "柔顺剂",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802291023kGTIA37igkAj9C0R5!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 454,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 486,
                                        name: "柔顺剂",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=486",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=486"
                                    },
                                    {
                                        cat_id: 487,
                                        cat_name: "抽纸",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229103QNDCxCSLu0lllNgQlu!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 454,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 487,
                                        name: "抽纸",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=487",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=487"
                                    },
                                    {
                                        cat_id: 488,
                                        cat_name: "卷筒纸",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229102O9t4SuegASRS8uSvgR!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 454,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 488,
                                        name: "卷筒纸",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=488",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=488"
                                    },
                                    {
                                        cat_id: 489,
                                        cat_name: "手帕纸\/湿巾",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229103Um6aLuRoJKCw9ud0vi!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 454,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 489,
                                        name: "手帕纸\/湿巾",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=489",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=489"
                                    },
                                    {
                                        cat_id: 490,
                                        cat_name: "油污清洗剂",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229102hFTDRQk5ZQYifvP7Gt!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 454,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 490,
                                        name: "油污清洗剂",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=490",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=490"
                                    }
                                ]
                            },
                            {
                                cat_id: 455,
                                cat_name: "家饰布艺",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 10,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 455,
                                name: "家饰布艺",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=455",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=455",
                                child_cat: [
                                    {
                                        cat_id: 491,
                                        cat_name: "钟饰\/摆件",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229197gNTQA4ixbWt9bxbWPr!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 455,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 491,
                                        name: "钟饰\/摆件",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=491",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=491"
                                    },
                                    {
                                        cat_id: 492,
                                        cat_name: "鲜花绿植",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229198qRk3Lj7rnTSx8MLuix!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 455,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 492,
                                        name: "鲜花绿植",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=492",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=492"
                                    },
                                    {
                                        cat_id: 493,
                                        cat_name: "装饰画",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229197T9V6NPPiEUvzJNJEGc!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 455,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 493,
                                        name: "装饰画",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=493",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=493"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 11,
                        cat_name: "家装",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229662mMBRcqtj9bpTMvGOh3!!pic.png",
                        is_hot: 0,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 11,
                        id: 11,
                        name: "家装",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=11",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=11",
                        child_cat: [
                            {
                                cat_id: 494,
                                cat_name: "厨房卫浴",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 11,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 494,
                                name: "厨房卫浴",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=494",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=494",
                                child_cat: [
                                    {
                                        cat_id: 505,
                                        cat_name: "马桶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229496p3qvpfPeho3wJq73pl!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 494,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 505,
                                        name: "马桶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=505",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=505"
                                    },
                                    {
                                        cat_id: 506,
                                        cat_name: "淋浴花洒",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229495yxZRwLXFo5n7dfbFYB!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 494,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 506,
                                        name: "淋浴花洒",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=506",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=506"
                                    },
                                    {
                                        cat_id: 507,
                                        cat_name: "浴缸\/浴桶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229496NgDxelusSTfphJiTqU!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 494,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 507,
                                        name: "浴缸\/浴桶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=507",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=507"
                                    }
                                ]
                            },
                            {
                                cat_id: 495,
                                cat_name: "灯饰照明",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 11,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 495,
                                name: "灯饰照明",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=495",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=495",
                                child_cat: [
                                    {
                                        cat_id: 508,
                                        cat_name: "吸顶灯",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/168022957649NMrE3N6vZB91umQn!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 495,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 508,
                                        name: "吸顶灯",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=508",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=508"
                                    },
                                    {
                                        cat_id: 509,
                                        cat_name: "吊灯",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229576lJPtojC5JgoSGdMlpR!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 495,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 509,
                                        name: "吊灯",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=509",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=509"
                                    },
                                    {
                                        cat_id: 510,
                                        cat_name: "筒灯\/射灯",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229576SRu6jCY1wqgXXOQXt1!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 495,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 510,
                                        name: "筒灯\/射灯",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=510",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=510"
                                    },
                                    {
                                        cat_id: 511,
                                        cat_name: "光源\/灯带",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229576Jyf9xZvHOnxFg7qiom!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 495,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 511,
                                        name: "光源\/灯带",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=511",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=511"
                                    },
                                    {
                                        cat_id: 512,
                                        cat_name: "壁灯\/过道灯",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229577idf1JO6t7cssTXUW4a!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 495,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 512,
                                        name: "壁灯\/过道灯",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=512",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=512"
                                    },
                                    {
                                        cat_id: 513,
                                        cat_name: "浴霸",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229576Oi0vQdlM8ErKMWRpYG!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 495,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 513,
                                        name: "浴霸",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=513",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=513"
                                    }
                                ]
                            },
                            {
                                cat_id: 496,
                                cat_name: "电工电料",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 11,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 496,
                                name: "电工电料",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=496",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=496",
                                child_cat: [
                                    {
                                        cat_id: 514,
                                        cat_name: "开关插座",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229662mMBRcqtj9bpTMvGOh3!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 496,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 514,
                                        name: "开关插座",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=514",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=514"
                                    },
                                    {
                                        cat_id: 515,
                                        cat_name: "排插\/插线板",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802296611RMynVHc3BCrsdLK6J!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 496,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 515,
                                        name: "排插\/插线板",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=515",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=515"
                                    },
                                    {
                                        cat_id: 516,
                                        cat_name: "门铃\/电子猫眼",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229661MetTQXac3Iq9qwXV5K!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 496,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 516,
                                        name: "门铃\/电子猫眼",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=516",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=516"
                                    }
                                ]
                            },
                            {
                                cat_id: 497,
                                cat_name: "五金工具",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 11,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 497,
                                name: "五金工具",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=497",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=497",
                                child_cat: [
                                    {
                                        cat_id: 517,
                                        cat_name: "电动工具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229720QFNsEii7CMq6d1HlgQ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 497,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 517,
                                        name: "电动工具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=517",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=517"
                                    },
                                    {
                                        cat_id: 518,
                                        cat_name: "手动工具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802297218JWCiJadbCTUZPGEkQ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 497,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 518,
                                        name: "手动工具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=518",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=518"
                                    },
                                    {
                                        cat_id: 519,
                                        cat_name: "测量工具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229721OBrrysWImbImUXbSeq!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 497,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 519,
                                        name: "测量工具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=519",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=519"
                                    }
                                ]
                            },
                            {
                                cat_id: 498,
                                cat_name: "墙地面材料",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 11,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 498,
                                name: "墙地面材料",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=498",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=498",
                                child_cat: [
                                    {
                                        cat_id: 520,
                                        cat_name: "乳胶漆",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229784BQ9SLMDOXZKiWW2QEG!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 498,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 520,
                                        name: "乳胶漆",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=520",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=520"
                                    },
                                    {
                                        cat_id: 521,
                                        cat_name: "防水涂料",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229784PvivfNaCuTcgelX69l!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 498,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 521,
                                        name: "防水涂料",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=521",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=521"
                                    },
                                    {
                                        cat_id: 522,
                                        cat_name: "勾缝剂",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802297846v0cvguOYo9GEqFHRG!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 498,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 522,
                                        name: "勾缝剂",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=522",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=522"
                                    }
                                ]
                            },
                            {
                                cat_id: 499,
                                cat_name: "卧室家具",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 11,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 499,
                                name: "卧室家具",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=499",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=499",
                                child_cat: [
                                    {
                                        cat_id: 523,
                                        cat_name: "实木床",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229864zPaOErPixGzha0jjcg!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 499,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 523,
                                        name: "实木床",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=523",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=523"
                                    },
                                    {
                                        cat_id: 524,
                                        cat_name: "皮床",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229863k881hgQu57r5yodxgZ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 499,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 524,
                                        name: "皮床",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=524",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=524"
                                    },
                                    {
                                        cat_id: 525,
                                        cat_name: "床垫",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802298635uGqFK2JyLlI9x5Qrb!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 499,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 525,
                                        name: "床垫",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=525",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=525"
                                    },
                                    {
                                        cat_id: 526,
                                        cat_name: "梳妆台凳",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229863axkmv9OdRrUD0VXRmp!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 499,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 526,
                                        name: "梳妆台凳",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=526",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=526"
                                    },
                                    {
                                        cat_id: 527,
                                        cat_name: "床头柜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229863YO5vjdE0NbOuYJLvSm!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 499,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 527,
                                        name: "床头柜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=527",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=527"
                                    },
                                    {
                                        cat_id: 528,
                                        cat_name: "穿衣镜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680229863deSN9mlQhxOtg3OI0y!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 499,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 528,
                                        name: "穿衣镜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=528",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=528"
                                    }
                                ]
                            },
                            {
                                cat_id: 500,
                                cat_name: "客厅家具",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 11,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 500,
                                name: "客厅家具",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=500",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=500",
                                child_cat: [
                                    {
                                        cat_id: 529,
                                        cat_name: "沙发",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802300220c92f22G8OGoYPJBtn!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 500,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 529,
                                        name: "沙发",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=529",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=529"
                                    },
                                    {
                                        cat_id: 530,
                                        cat_name: "边桌茶几",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230022UYxx0aPyQLhHX1ynZL!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 500,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 530,
                                        name: "边桌茶几",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=530",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=530"
                                    },
                                    {
                                        cat_id: 531,
                                        cat_name: "电视柜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230022bHqmJsfcnlqkTq5ciN!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 500,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 531,
                                        name: "电视柜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=531",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=531"
                                    }
                                ]
                            },
                            {
                                cat_id: 501,
                                cat_name: "书房家具",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 11,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 501,
                                name: "书房家具",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=501",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=501",
                                child_cat: [
                                    {
                                        cat_id: 532,
                                        cat_name: "书桌",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230086Jcg8Fm2PJm2scPIQft!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 501,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 532,
                                        name: "书桌",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=532",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=532"
                                    },
                                    {
                                        cat_id: 533,
                                        cat_name: "书柜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230086Fl2KAQI4IfH01KIli0!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 501,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 533,
                                        name: "书柜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=533",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=533"
                                    },
                                    {
                                        cat_id: 534,
                                        cat_name: "书架",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230086WHDgyurNLkY3W2yesW!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 501,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 534,
                                        name: "书架",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=534",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=534"
                                    }
                                ]
                            },
                            {
                                cat_id: 502,
                                cat_name: "餐厅家具",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 11,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 502,
                                name: "餐厅家具",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=502",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=502",
                                child_cat: [
                                    {
                                        cat_id: 535,
                                        cat_name: "餐桌",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802301507q6vuZiPwz7mKvbXwS!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 502,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 535,
                                        name: "餐桌",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=535",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=535"
                                    },
                                    {
                                        cat_id: 536,
                                        cat_name: "餐椅",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230150ZbNXJ9pNBMk2QsqP0G!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 502,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 536,
                                        name: "餐椅",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=536",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=536"
                                    },
                                    {
                                        cat_id: 537,
                                        cat_name: "酒柜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230150QGc9ye652O1ZxIfOcO!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 502,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 537,
                                        name: "酒柜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=537",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=537"
                                    }
                                ]
                            },
                            {
                                cat_id: 503,
                                cat_name: "阳台户外",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 11,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 503,
                                name: "阳台户外",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=503",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=503",
                                child_cat: [
                                    {
                                        cat_id: 538,
                                        cat_name: "落地晾衣架",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802302223KGOGtVTeBphKF5AOE!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 503,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 538,
                                        name: "落地晾衣架",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=538",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=538"
                                    },
                                    {
                                        cat_id: 539,
                                        cat_name: "折叠床",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230222bem3zito0ZrisCprO4!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 503,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 539,
                                        name: "折叠床",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=539",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=539"
                                    },
                                    {
                                        cat_id: 540,
                                        cat_name: "休闲椅",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230222I9cizHzEYJvPHvw7T4!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 503,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 540,
                                        name: "休闲椅",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=540",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=540"
                                    },
                                    {
                                        cat_id: 541,
                                        cat_name: "花架\/装饰架",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230223DJCNUm06RivGvb7OuD!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 503,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 541,
                                        name: "花架\/装饰架",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=541",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=541"
                                    },
                                    {
                                        cat_id: 542,
                                        cat_name: "户外桌椅",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802302226rZYO3sAADmZ01qv6Y!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 503,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 542,
                                        name: "户外桌椅",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=542",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=542"
                                    },
                                    {
                                        cat_id: 543,
                                        cat_name: "吊篮\/秋千",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230223LHZP8pdwCKsAoHKDK8!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 503,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 543,
                                        name: "吊篮\/秋千",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=543",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=543"
                                    }
                                ]
                            },
                            {
                                cat_id: 504,
                                cat_name: "家饰软装",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 11,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 504,
                                name: "家饰软装",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=504",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=504",
                                child_cat: [
                                    {
                                        cat_id: 544,
                                        cat_name: "钟饰",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230321b1Kwc3Pi0bngyVlxaQ!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 504,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 544,
                                        name: "钟饰",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=544",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=544"
                                    },
                                    {
                                        cat_id: 545,
                                        cat_name: "窗帘窗纱",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230322PGwyKjuSpbquLbquO9!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 504,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 545,
                                        name: "窗帘窗纱",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=545",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=545"
                                    },
                                    {
                                        cat_id: 546,
                                        cat_name: "抱枕\/靠枕",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230322dmgFlPrxLw5XcCXwRw!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 504,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 546,
                                        name: "抱枕\/靠枕",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=546",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=546"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 12,
                        cat_name: "食品",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230632c0V3dUfJTsBa7GG7x9!!pic.jpeg",
                        is_hot: 0,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 7,
                        id: 12,
                        name: "食品",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=12",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=12",
                        child_cat: [
                            {
                                cat_id: 547,
                                cat_name: "人气零食",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 12,
                                cat_ico: "lyecs-defined-icon-jianguo",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 547,
                                name: "人气零食",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=547",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=547",
                                child_cat: [
                                    {
                                        cat_id: 554,
                                        cat_name: "坚果炒货",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230528Kbu3tAjXdcnFsSw7GG!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 547,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 554,
                                        name: "坚果炒货",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=554",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=554"
                                    },
                                    {
                                        cat_id: 555,
                                        cat_name: "巧克力",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230529SiO6GnlXB3xsprmSEZ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 547,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 555,
                                        name: "巧克力",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=555",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=555"
                                    },
                                    {
                                        cat_id: 556,
                                        cat_name: "点心糕点",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230528knCfV7Mxj3vHjLG3uR!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 547,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 556,
                                        name: "点心糕点",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=556",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=556"
                                    },
                                    {
                                        cat_id: 557,
                                        cat_name: "蜜饯果干",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802305285gBzpZUQqawBJD6lVs!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 547,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 557,
                                        name: "蜜饯果干",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=557",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=557"
                                    },
                                    {
                                        cat_id: 558,
                                        cat_name: "饼干曲奇",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230528rTP4AkxiCNWRuCGxYK!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 547,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 558,
                                        name: "饼干曲奇",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=558",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=558"
                                    },
                                    {
                                        cat_id: 559,
                                        cat_name: "肉类零食",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230529h3uhwVEnKRSzRt7614!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 547,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 559,
                                        name: "肉类零食",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=559",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=559"
                                    },
                                    {
                                        cat_id: 560,
                                        cat_name: "糖果",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230631uOcpNyQBl6DdBrg53Q!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 547,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 560,
                                        name: "糖果",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=560",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=560"
                                    },
                                    {
                                        cat_id: 561,
                                        cat_name: "膨化食品",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230632c0V3dUfJTsBa7GG7x9!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 547,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 561,
                                        name: "膨化食品",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=561",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=561"
                                    },
                                    {
                                        cat_id: 562,
                                        cat_name: "豆\/海制品",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230631uvygOkavvtPbGVv1Pm!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 547,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 562,
                                        name: "豆\/海制品",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=562",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=562"
                                    }
                                ]
                            },
                            {
                                cat_id: 548,
                                cat_name: "营养保健",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 12,
                                cat_ico: "lyecs-defined-icon-yiyaobaojian",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 548,
                                name: "营养保健",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=548",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=548",
                                child_cat: [
                                    {
                                        cat_id: 563,
                                        cat_name: "男性保健",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230699Pyz6HOO1Q7aJj2QbFJ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 548,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 563,
                                        name: "男性保健",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=563",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=563"
                                    },
                                    {
                                        cat_id: 564,
                                        cat_name: "维生素",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230699wF6cbPwdoZPBeHvFAn!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 548,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 564,
                                        name: "维生素",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=564",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=564"
                                    },
                                    {
                                        cat_id: 565,
                                        cat_name: "骨骼关节",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230699NnXubOJyByA4PHgBKX!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 548,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 565,
                                        name: "骨骼关节",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=565",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=565"
                                    }
                                ]
                            },
                            {
                                cat_id: 549,
                                cat_name: "冲调饮料",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 12,
                                cat_ico: "lyecs-defined-icon-chalou0101",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 549,
                                name: "冲调饮料",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=549",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=549",
                                child_cat: [
                                    {
                                        cat_id: 566,
                                        cat_name: "奶粉",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230779WfZptxuBnmnmlhfdrI!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 549,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 566,
                                        name: "奶粉",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=566",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=566"
                                    },
                                    {
                                        cat_id: 567,
                                        cat_name: "牛奶豆奶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230780DDhrHyQcWcBuAKRSSW!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 549,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 567,
                                        name: "牛奶豆奶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=567",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=567"
                                    },
                                    {
                                        cat_id: 568,
                                        cat_name: "麦片谷粉",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230779sKaUW0vOmhbZOS750P!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 549,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 568,
                                        name: "麦片谷粉",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=568",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=568"
                                    },
                                    {
                                        cat_id: 569,
                                        cat_name: "蜂蜜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802307805uayjxWyU6VTy1OxC8!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 549,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 569,
                                        name: "蜂蜜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=569",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=569"
                                    },
                                    {
                                        cat_id: 570,
                                        cat_name: "冲调",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802307806o7CtYLhut7y8GQIPy!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 549,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 570,
                                        name: "冲调",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=570",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=570"
                                    },
                                    {
                                        cat_id: 571,
                                        cat_name: "咖啡",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230779Nc1kAB4f8f3rcZbs6J!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 549,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 571,
                                        name: "咖啡",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=571",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=571"
                                    },
                                    {
                                        cat_id: 572,
                                        cat_name: "固体饮料",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802307805wKoch7BbCZpTJTd2K!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 549,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 572,
                                        name: "固体饮料",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=572",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=572"
                                    },
                                    {
                                        cat_id: 573,
                                        cat_name: "饮用水",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230779kxFXSonD0PByEQIxFc!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 549,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 573,
                                        name: "饮用水",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=573",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=573"
                                    },
                                    {
                                        cat_id: 574,
                                        cat_name: "饮料",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230780aTuOlOkCaPqmfthwmo!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 549,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 574,
                                        name: "饮料",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=574",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=574"
                                    }
                                ]
                            },
                            {
                                cat_id: 550,
                                cat_name: "中式茗茶",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 12,
                                cat_ico: "lyecs-defined-icon-jujia",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 550,
                                name: "中式茗茶",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=550",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=550",
                                child_cat: [
                                    {
                                        cat_id: 575,
                                        cat_name: "普洱茶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230943fCxfvwqvgOJIbMBodH!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 550,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 575,
                                        name: "普洱茶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=575",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=575"
                                    },
                                    {
                                        cat_id: 576,
                                        cat_name: "红茶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230943KqV9i7eE1TTwqfXEo0!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 550,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 576,
                                        name: "红茶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=576",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=576"
                                    },
                                    {
                                        cat_id: 577,
                                        cat_name: "龙井",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230944nNTHi6ePMOZdUZQkew!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 550,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 577,
                                        name: "龙井",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=577",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=577"
                                    },
                                    {
                                        cat_id: 578,
                                        cat_name: "绿茶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230943FG9VPtidGHOJNknTNd!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 550,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 578,
                                        name: "绿茶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=578",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=578"
                                    },
                                    {
                                        cat_id: 579,
                                        cat_name: "茶具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230943z5tJHDTJt6jGRlKCnh!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 550,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 579,
                                        name: "茶具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=579",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=579"
                                    },
                                    {
                                        cat_id: 580,
                                        cat_name: "花草茶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230943hSx3423iqOvEzaaoEA!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 550,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 580,
                                        name: "花草茶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=580",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=580"
                                    },
                                    {
                                        cat_id: 581,
                                        cat_name: "白\/黑\/黄茶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230943bLzl2ziJ0iEnF2m2Hk!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 550,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 581,
                                        name: "白\/黑\/黄茶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=581",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=581"
                                    },
                                    {
                                        cat_id: 582,
                                        cat_name: "铁观音",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230943MYCi4CQDX6mwjwigVv!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 550,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 582,
                                        name: "铁观音",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=582",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=582"
                                    },
                                    {
                                        cat_id: 583,
                                        cat_name: "乌龙茶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680230944nc4CfBkBTaOaDcR1tB!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 550,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 583,
                                        name: "乌龙茶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=583",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=583"
                                    }
                                ]
                            },
                            {
                                cat_id: 551,
                                cat_name: "精酿美酒",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 12,
                                cat_ico: "lyecs-defined-icon-jinkoushuiyinliao",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 551,
                                name: "精酿美酒",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=551",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=551",
                                child_cat: [
                                    {
                                        cat_id: 584,
                                        cat_name: "白酒",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231091c88Oganq3YfJI4u0AM!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 551,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 584,
                                        name: "白酒",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=584",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=584"
                                    },
                                    {
                                        cat_id: 585,
                                        cat_name: "红酒",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231091tC3nRAhU3kUXxis2p3!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 551,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 585,
                                        name: "红酒",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=585",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=585"
                                    },
                                    {
                                        cat_id: 586,
                                        cat_name: "干型葡萄酒",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231091mWojRwT0hr0odb3xzz!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 551,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 586,
                                        name: "干型葡萄酒",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=586",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=586"
                                    },
                                    {
                                        cat_id: 587,
                                        cat_name: "起泡酒",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802310918mvVbiZNJ1JgwZHtla!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 551,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 587,
                                        name: "起泡酒",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=587",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=587"
                                    },
                                    {
                                        cat_id: 588,
                                        cat_name: "洋酒",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802310910ndVUFSDUgW0xo90ev!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 551,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 588,
                                        name: "洋酒",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=588",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=588"
                                    },
                                    {
                                        cat_id: 589,
                                        cat_name: "日韩酒",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231091x6wSsaZbeaKmEA1pxZ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 551,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 589,
                                        name: "日韩酒",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=589",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=589"
                                    }
                                ]
                            },
                            {
                                cat_id: 552,
                                cat_name: "传统滋补",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 12,
                                cat_ico: "lyecs-defined-icon-shipin",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 552,
                                name: "传统滋补",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=552",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=552",
                                child_cat: [
                                    {
                                        cat_id: 590,
                                        cat_name: "阿胶",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231185jOuPSmC2QYQZsqzEml!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 552,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 590,
                                        name: "阿胶",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=590",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=590"
                                    },
                                    {
                                        cat_id: 591,
                                        cat_name: "燕窝",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231184zYUm2Pc7kt6DR5GaKk!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 552,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 591,
                                        name: "燕窝",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=591",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=591"
                                    },
                                    {
                                        cat_id: 592,
                                        cat_name: "海参",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231184Wl0qnwVgQW0C7fN86D!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 552,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 592,
                                        name: "海参",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=592",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=592"
                                    }
                                ]
                            },
                            {
                                cat_id: 553,
                                cat_name: "生鲜",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 12,
                                cat_ico: "lyecs-defined-icon-shipin-copy",
                                is_show: 0,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 553,
                                name: "生鲜",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=553",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=553",
                                child_cat: [
                                    {
                                        cat_id: 593,
                                        cat_name: "禽肉蛋品",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231239BOKSiHI9fUwyKoUuqK!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 553,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 593,
                                        name: "禽肉蛋品",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=593",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=593"
                                    },
                                    {
                                        cat_id: 594,
                                        cat_name: "猪牛羊肉",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231239XSabOICYuUmPMiiedR!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 553,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 594,
                                        name: "猪牛羊肉",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=594",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=594"
                                    },
                                    {
                                        cat_id: 595,
                                        cat_name: "熟食",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802312396WG1NUVAU1DA00UUUI!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 553,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 595,
                                        name: "熟食",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=595",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=595"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 13,
                        cat_name: "国际",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231426i2TxEtfMSed1SOdMXn!!pic.jpeg",
                        is_hot: 0,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 2,
                        id: 13,
                        name: "国际",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=13",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=13",
                        child_cat: [
                            {
                                cat_id: 596,
                                cat_name: "全球馆",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 13,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 596,
                                name: "全球馆",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=596",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=596",
                                child_cat: [
                                    {
                                        cat_id: 598,
                                        cat_name: "韩国馆",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231426o8or1Cs6VlS9PwbqlY!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 596,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 598,
                                        name: "韩国馆",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=598",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=598"
                                    },
                                    {
                                        cat_id: 599,
                                        cat_name: "日本馆",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231425U2xPYNOHBNShBLsInW!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 596,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 599,
                                        name: "日本馆",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=599",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=599"
                                    },
                                    {
                                        cat_id: 600,
                                        cat_name: "澳新馆",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231425TuCaLAjWGfhyUI8HlR!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 596,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 600,
                                        name: "澳新馆",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=600",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=600"
                                    },
                                    {
                                        cat_id: 601,
                                        cat_name: "欧洲馆",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231426zxuh8RUauB8I5wjsQr!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 596,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 601,
                                        name: "欧洲馆",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=601",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=601"
                                    },
                                    {
                                        cat_id: 602,
                                        cat_name: "美洲馆",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231426i2TxEtfMSed1SOdMXn!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 596,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 602,
                                        name: "美洲馆",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=602",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=602"
                                    },
                                    {
                                        cat_id: 603,
                                        cat_name: "港台馆",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802314266KBNFC0NZQPJ4cpBzO!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 596,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 603,
                                        name: "港台馆",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=603",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=603"
                                    }
                                ]
                            },
                            {
                                cat_id: 597,
                                cat_name: "时尚穿搭",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 13,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 597,
                                name: "时尚穿搭",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=597",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=597",
                                child_cat: [
                                    {
                                        cat_id: 604,
                                        cat_name: "包包",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231519KYAdongy7fOws0U8YB!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 597,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 604,
                                        name: "包包",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=604",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=604"
                                    },
                                    {
                                        cat_id: 605,
                                        cat_name: "饰品首饰",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231519DFRSl4pp6PYFuXWY2F!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 597,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 605,
                                        name: "饰品首饰",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=605",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=605"
                                    },
                                    {
                                        cat_id: 606,
                                        cat_name: "手表眼镜",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231519bwwQEffH6tnHcdZSQc!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 597,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 606,
                                        name: "手表眼镜",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=606",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=606"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 14,
                        cat_name: "医药",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231808jppg83Z29ra0tlxHF8!!pic.png",
                        is_hot: 0,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 4,
                        id: 14,
                        name: "医药",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=14",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=14",
                        child_cat: [
                            {
                                cat_id: 607,
                                cat_name: "隐形眼镜",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 14,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 607,
                                name: "隐形眼镜",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=607",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=607",
                                child_cat: [
                                    {
                                        cat_id: 611,
                                        cat_name: "美瞳\/彩片",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231647ejILqUVLG8VtkjDGra!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 607,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 611,
                                        name: "美瞳\/彩片",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=611",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=611"
                                    },
                                    {
                                        cat_id: 612,
                                        cat_name: "隐形眼镜\/白片",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231647bUqEB9BaAxeSQ1RdOR!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 607,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 612,
                                        name: "隐形眼镜\/白片",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=612",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=612"
                                    },
                                    {
                                        cat_id: 613,
                                        cat_name: "护理液",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231647cfS1ttDltG2V444IbL!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 607,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 613,
                                        name: "护理液",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=613",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=613"
                                    }
                                ]
                            },
                            {
                                cat_id: 608,
                                cat_name: "医疗器械",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 14,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 608,
                                name: "医疗器械",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=608",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=608",
                                child_cat: [
                                    {
                                        cat_id: 614,
                                        cat_name: "血压计",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231717uMjHmRqOEG259Os61C!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 608,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 614,
                                        name: "血压计",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=614",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=614"
                                    },
                                    {
                                        cat_id: 615,
                                        cat_name: "体温计",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231717tDXOzsUKiaJS67HX4m!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 608,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 615,
                                        name: "体温计",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=615",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=615"
                                    },
                                    {
                                        cat_id: 616,
                                        cat_name: "洗鼻器",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802317174JBslVrT5W78a2ztee!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 608,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 616,
                                        name: "洗鼻器",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=616",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=616"
                                    }
                                ]
                            },
                            {
                                cat_id: 609,
                                cat_name: "计生用品",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 14,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 2,
                                id: 609,
                                name: "计生用品",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=609",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=609",
                                child_cat: [
                                    {
                                        cat_id: 617,
                                        cat_name: "避孕套",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231769fsAxgDcv7tjINALgqu!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 609,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 617,
                                        name: "避孕套",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=617",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=617"
                                    },
                                    {
                                        cat_id: 618,
                                        cat_name: "验孕备孕",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231768v8LcBEQO4UIYNcK7Xm!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 609,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 618,
                                        name: "验孕备孕",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=618",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=618"
                                    }
                                ]
                            },
                            {
                                cat_id: 610,
                                cat_name: "营养保健",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 14,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 610,
                                name: "营养保健",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=610",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=610",
                                child_cat: [
                                    {
                                        cat_id: 619,
                                        cat_name: "纤体瘦身",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231809QY73mct7owJRvZk7xD!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 610,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 619,
                                        name: "纤体瘦身",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=619",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=619"
                                    },
                                    {
                                        cat_id: 620,
                                        cat_name: "膳食补充",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231808jppg83Z29ra0tlxHF8!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 610,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 620,
                                        name: "膳食补充",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=620",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=620"
                                    },
                                    {
                                        cat_id: 621,
                                        cat_name: "传统滋补",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680231809KRNtFMSy62VbvB3rKN!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 610,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 621,
                                        name: "传统滋补",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=621",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=621"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 15,
                        cat_name: "图书",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234529RfXOmbJCSUrundYEVt!!pic.jpeg",
                        is_hot: 0,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 6,
                        id: 15,
                        name: "图书",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=15",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=15",
                        child_cat: [
                            {
                                cat_id: 622,
                                cat_name: "童书学习",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 15,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 622,
                                name: "童书学习",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=622",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=622",
                                child_cat: [
                                    {
                                        cat_id: 628,
                                        cat_name: "儿童文学",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234258pBINzF4DOxJtG8ivjg!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 622,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 628,
                                        name: "儿童文学",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=628",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=628"
                                    },
                                    {
                                        cat_id: 629,
                                        cat_name: "启蒙早教",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234258QJydKNqzs4ZhJp0IxI!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 622,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 629,
                                        name: "启蒙早教",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=629",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=629"
                                    },
                                    {
                                        cat_id: 630,
                                        cat_name: "益智游戏",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234258rMJ95WlNYWSuABWNQO!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 622,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 630,
                                        name: "益智游戏",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=630",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=630"
                                    },
                                    {
                                        cat_id: 631,
                                        cat_name: "科普百科",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234259iCvzSCyqOrNL2njaBl!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 622,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 631,
                                        name: "科普百科",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=631",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=631"
                                    },
                                    {
                                        cat_id: 632,
                                        cat_name: "英语学习",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234259wFJkmvnKeK85GQL5wB!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 622,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 632,
                                        name: "英语学习",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=632",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=632"
                                    },
                                    {
                                        cat_id: 633,
                                        cat_name: "少儿励志与成长",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234259xfOhIA90jrtknn3CLV!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 622,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 633,
                                        name: "少儿励志与成长",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=633",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=633"
                                    }
                                ]
                            },
                            {
                                cat_id: 623,
                                cat_name: "教辅考试",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 15,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 623,
                                name: "教辅考试",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=623",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=623",
                                child_cat: [
                                    {
                                        cat_id: 634,
                                        cat_name: "幼小衔接",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802343894L5HOeOF78xJ7uv5u0!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 623,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 634,
                                        name: "幼小衔接",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=634",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=634"
                                    },
                                    {
                                        cat_id: 635,
                                        cat_name: "小学教辅",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234389FgGO1dpktYuKkUubBe!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 623,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 635,
                                        name: "小学教辅",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=635",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=635"
                                    },
                                    {
                                        cat_id: 636,
                                        cat_name: "初中教辅",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234389IB31zgeCMrn48MQ6gu!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 623,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 636,
                                        name: "初中教辅",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=636",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=636"
                                    },
                                    {
                                        cat_id: 637,
                                        cat_name: "高中教辅",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234389DJm1MikSlu4fqDSywE!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 623,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 637,
                                        name: "高中教辅",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=637",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=637"
                                    },
                                    {
                                        cat_id: 638,
                                        cat_name: "工具书",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234389r5W9gjB5MsFzxS6b2V!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 623,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 638,
                                        name: "工具书",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=638",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=638"
                                    },
                                    {
                                        cat_id: 639,
                                        cat_name: "作文",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234389ttmO5hIZkWvAPOtiUO!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 623,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 639,
                                        name: "作文",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=639",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=639"
                                    },
                                    {
                                        cat_id: 640,
                                        cat_name: "课外阅读",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234389fOPzRPnAFm9ALAcnZe!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 623,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 640,
                                        name: "课外阅读",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=640",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=640"
                                    },
                                    {
                                        cat_id: 641,
                                        cat_name: "字帖",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234389QwBL6WsSuwsfyQtTZF!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 623,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 641,
                                        name: "字帖",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=641",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=641"
                                    },
                                    {
                                        cat_id: 642,
                                        cat_name: "考试",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234390aG31JuMg9uOGVXCVlN!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 623,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 642,
                                        name: "考试",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=642",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=642"
                                    }
                                ]
                            },
                            {
                                cat_id: 624,
                                cat_name: "文学小说",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 15,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 9,
                                id: 624,
                                name: "文学小说",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=624",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=624",
                                child_cat: [
                                    {
                                        cat_id: 643,
                                        cat_name: "青春文学",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234530Ykl9uGpqXYYwC1tyvQ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 624,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 643,
                                        name: "青春文学",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=643",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=643"
                                    },
                                    {
                                        cat_id: 644,
                                        cat_name: "世界名著",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234529auuLVeKQaAOIGf8PpO!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 624,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 644,
                                        name: "世界名著",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=644",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=644"
                                    },
                                    {
                                        cat_id: 645,
                                        cat_name: "中国文学",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234529gbpf2mH1si8cazGg6m!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 624,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 645,
                                        name: "中国文学",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=645",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=645"
                                    },
                                    {
                                        cat_id: 646,
                                        cat_name: "外国小说",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234529d70p8RU10qvwBrb9pW!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 624,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 646,
                                        name: "外国小说",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=646",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=646"
                                    },
                                    {
                                        cat_id: 647,
                                        cat_name: "科幻小说",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234529gShq9j3crLlqkTOEAj!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 624,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 647,
                                        name: "科幻小说",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=647",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=647"
                                    },
                                    {
                                        cat_id: 648,
                                        cat_name: "推理小说",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234530SaJPOCaoL0v1LqU9br!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 624,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 648,
                                        name: "推理小说",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=648",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=648"
                                    },
                                    {
                                        cat_id: 649,
                                        cat_name: "其他文学",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234530cDlbuJldLIGOW2fG0j!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 624,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 649,
                                        name: "其他文学",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=649",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=649"
                                    },
                                    {
                                        cat_id: 650,
                                        cat_name: "其他小说",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234530ZXDQSiRd1RDKh7TBhj!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 624,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 650,
                                        name: "其他小说",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=650",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=650"
                                    },
                                    {
                                        cat_id: 651,
                                        cat_name: "传记",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680234529RfXOmbJCSUrundYEVt!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 624,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 651,
                                        name: "传记",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=651",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=651"
                                    }
                                ]
                            },
                            {
                                cat_id: 625,
                                cat_name: "美好生活",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 15,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 625,
                                name: "美好生活",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=625",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=625",
                                child_cat: [
                                    {
                                        cat_id: 652,
                                        cat_name: "孕产育儿",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802428841fQDnGmxObLUNVeigr!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 625,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 652,
                                        name: "孕产育儿",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=652",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=652"
                                    },
                                    {
                                        cat_id: 653,
                                        cat_name: "养生保健",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680242885hzlq2vV7xMOPXnMjEV!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 625,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 653,
                                        name: "养生保健",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=653",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=653"
                                    },
                                    {
                                        cat_id: 654,
                                        cat_name: "烹饪美食",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680242885WJLncZ4xrCZHaD8LKE!!pic.png",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 625,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 654,
                                        name: "烹饪美食",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=654",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=654"
                                    },
                                    {
                                        cat_id: 655,
                                        cat_name: "艺术",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680242885TTpBzq5bTUJmxcLJuW!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 625,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 655,
                                        name: "艺术",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=655",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=655"
                                    },
                                    {
                                        cat_id: 656,
                                        cat_name: "旅游地图",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680242885mj6Ds3lFTmsZZUd8PS!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 625,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 656,
                                        name: "旅游地图",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=656",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=656"
                                    },
                                    {
                                        cat_id: 657,
                                        cat_name: "时尚美妆",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680242885LRJgBx0nGK7g4zMqlg!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 625,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 657,
                                        name: "时尚美妆",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=657",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=657"
                                    }
                                ]
                            },
                            {
                                cat_id: 626,
                                cat_name: "人文社科",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 15,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 626,
                                name: "人文社科",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=626",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=626",
                                child_cat: [
                                    {
                                        cat_id: 658,
                                        cat_name: "文化历史",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680242982cC3vEu55r81qA5QNgM!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 626,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 658,
                                        name: "文化历史",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=658",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=658"
                                    },
                                    {
                                        cat_id: 659,
                                        cat_name: "法律",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680242982V2Xr2H4NgwOrwIs3Sc!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 626,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 659,
                                        name: "法律",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=659",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=659"
                                    },
                                    {
                                        cat_id: 660,
                                        cat_name: "哲学",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680242982IZziOPXXqWKO07p4tx!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 626,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 660,
                                        name: "哲学",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=660",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=660"
                                    },
                                    {
                                        cat_id: 661,
                                        cat_name: "政治军事",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680242983SQEBC6crNA1P9bpk74!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 626,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 661,
                                        name: "政治军事",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=661",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=661"
                                    },
                                    {
                                        cat_id: 662,
                                        cat_name: "社科综合",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680242983mjG0BKtn6Il6r8pKxi!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 626,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 662,
                                        name: "社科综合",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=662",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=662"
                                    },
                                    {
                                        cat_id: 663,
                                        cat_name: "科学",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680242983tAIvbQfPiOXPnECryP!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 626,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 663,
                                        name: "科学",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=663",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=663"
                                    }
                                ]
                            },
                            {
                                cat_id: 627,
                                cat_name: "经管励志",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 15,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 3,
                                id: 627,
                                name: "经管励志",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=627",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=627",
                                child_cat: [
                                    {
                                        cat_id: 664,
                                        cat_name: "励志成功",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243084LdEuUn4uUObUsq3lom!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 627,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 664,
                                        name: "励志成功",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=664",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=664"
                                    },
                                    {
                                        cat_id: 665,
                                        cat_name: "经济",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243084fns6HgmaBgKIy8xw9F!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 627,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 665,
                                        name: "经济",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=665",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=665"
                                    },
                                    {
                                        cat_id: 666,
                                        cat_name: "管理",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243084jTzn5iYPhOKBTEvoNg!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 627,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 666,
                                        name: "管理",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=666",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=666"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cat_id: 16,
                        cat_name: "宠物",
                        cat_pic:
                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243275FNxCSo1TfOpOfCoPRi!!pic.jpeg",
                        is_hot: 0,
                        measure_unit: "",
                        parent_id: 0,
                        cat_ico: "",
                        is_show: 1,
                        show_in_nav: 0,
                        grade: 0,
                        sort_order: 50,
                        has_children: 3,
                        id: 16,
                        name: "宠物",
                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=16",
                        wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=16",
                        child_cat: [
                            {
                                cat_id: 667,
                                cat_name: "宠物食品",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 16,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 667,
                                name: "宠物食品",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=667",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=667",
                                child_cat: [
                                    {
                                        cat_id: 670,
                                        cat_name: "猫主粮",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243186piHPWaX3zfaSpjfmLt!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 667,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 670,
                                        name: "猫主粮",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=670",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=670"
                                    },
                                    {
                                        cat_id: 671,
                                        cat_name: "狗主粮",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243186qAYoILD2yUwGiVknOS!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 667,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 671,
                                        name: "狗主粮",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=671",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=671"
                                    },
                                    {
                                        cat_id: 672,
                                        cat_name: "冻干",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243186N7WdHND8OyrvKjR27G!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 667,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 672,
                                        name: "冻干",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=672",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=672"
                                    },
                                    {
                                        cat_id: 673,
                                        cat_name: "罐头",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243186OO1cvoeupUOniVc1iD!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 667,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 673,
                                        name: "罐头",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=673",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=673"
                                    },
                                    {
                                        cat_id: 674,
                                        cat_name: "猫零食",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243187IwLq02uJI0XIZ5h92H!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 667,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 674,
                                        name: "猫零食",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=674",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=674"
                                    },
                                    {
                                        cat_id: 675,
                                        cat_name: "狗零食",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243187WxojOQn24W8oxvJRKG!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 667,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 675,
                                        name: "狗零食",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=675",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=675"
                                    }
                                ]
                            },
                            {
                                cat_id: 668,
                                cat_name: "宠物营养保健",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 16,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 5,
                                id: 668,
                                name: "宠物营养保健",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=668",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=668",
                                child_cat: [
                                    {
                                        cat_id: 676,
                                        cat_name: "肠胃调理",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243275zQL15gW9B1jv0VTGyV!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 668,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 676,
                                        name: "肠胃调理",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=676",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=676"
                                    },
                                    {
                                        cat_id: 677,
                                        cat_name: "健骨补钙",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243275S5eY7XvejDUEaSOYOs!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 668,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 677,
                                        name: "健骨补钙",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=677",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=677"
                                    },
                                    {
                                        cat_id: 678,
                                        cat_name: "健骨补钙",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243275834MBowTPiwS0An4n7!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 668,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 678,
                                        name: "健骨补钙",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=678",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=678"
                                    },
                                    {
                                        cat_id: 679,
                                        cat_name: "狗驱虫",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243275GapjhbIgW9kLpGTlQ5!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 668,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 679,
                                        name: "狗驱虫",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=679",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=679"
                                    },
                                    {
                                        cat_id: 680,
                                        cat_name: "猫驱虫",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243275FNxCSo1TfOpOfCoPRi!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 668,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 680,
                                        name: "猫驱虫",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=680",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=680"
                                    }
                                ]
                            },
                            {
                                cat_id: 669,
                                cat_name: "宠物日用",
                                cat_pic: "",
                                is_hot: 0,
                                measure_unit: "",
                                parent_id: 16,
                                cat_ico: "",
                                is_show: 1,
                                show_in_nav: 0,
                                grade: 0,
                                sort_order: 50,
                                has_children: 6,
                                id: 669,
                                name: "宠物日用",
                                url: "https:\/\/demo2.lyecs.com\/list.html?cat=669",
                                wap_url: "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=669",
                                child_cat: [
                                    {
                                        cat_id: 681,
                                        cat_name: "猫砂",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243367e6tusRlh9Zp7FI7IUx!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 669,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 681,
                                        name: "猫砂",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=681",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=681"
                                    },
                                    {
                                        cat_id: 682,
                                        cat_name: "狗狗日用",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243367d65qTtOyDm0LDYWv5m!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 669,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 682,
                                        name: "狗狗日用",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=682",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=682"
                                    },
                                    {
                                        cat_id: 683,
                                        cat_name: "美容洗护",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243367ZuxQwnASisHeYEvgEZ!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 669,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 683,
                                        name: "美容洗护",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=683",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=683"
                                    },
                                    {
                                        cat_id: 684,
                                        cat_name: "猫玩具",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243367VIo9KJHeueLKf5Bbo1!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 669,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 684,
                                        name: "猫玩具",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=684",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=684"
                                    },
                                    {
                                        cat_id: 685,
                                        cat_name: "宠物出行",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/1680243367C0p0Tid0nNMIrACFQw!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 669,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 685,
                                        name: "宠物出行",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=685",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=685"
                                    },
                                    {
                                        cat_id: 686,
                                        cat_name: "猫咪日用",
                                        cat_pic:
                                            "https:\/\/oss.lyecs.com\/img\/gallery\/demo\/16802433673mbryG7fN0LCfEUVHD!!pic.jpeg",
                                        is_hot: 0,
                                        measure_unit: "",
                                        parent_id: 669,
                                        cat_ico: "",
                                        is_show: 1,
                                        show_in_nav: 0,
                                        grade: 0,
                                        sort_order: 50,
                                        has_children: 0,
                                        id: 686,
                                        name: "猫咪日用",
                                        url: "https:\/\/demo2.lyecs.com\/list.html?cat=686",
                                        wap_url:
                                            "https:\/\/demo2.lyecs.com\/mobile\/list.html?cat=686"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                bottom_nav: [
                    {
                        pic_org: "img\/gallery\/demo\/1680247587QG2y44h7a7f0M1dx9T!!pic.png",
                        pic_org2: "img\/gallery\/demo\/16802475870v7jHejQtgFvn7Yd6e!!pic.png",
                        pic_thumb:
                            "img\/gallery\/demo\/1680247587QG2y44h7a7f0M1dx9T!!pic200x200.png",
                        pic_thumb2:
                            "img\/gallery\/demo\/16802475870v7jHejQtgFvn7Yd6e!!pic200x200.png",
                        pic_title: "首页",
                        pic_link: {
                            link: "index.html",
                            wechat_link: "\/pages\/index\/index",
                            title: "商城首页"
                        },
                        pic_thumb_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247587QG2y44h7a7f0M1dx9T!!pic200x200.png",
                        pic_org_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247587QG2y44h7a7f0M1dx9T!!pic.png",
                        pic_thumb2_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/16802475870v7jHejQtgFvn7Yd6e!!pic200x200.png",
                        pic_org2_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/16802475870v7jHejQtgFvn7Yd6e!!pic.png",
                        pic_link_format: "https:\/\/demo2.lyecs.com\/mobile\/index.html"
                    },
                    {
                        pic_org: "img\/gallery\/demo\/16802476274VrIgYXSKI9GN9O3yG!!pic.png",
                        pic_org2: "img\/gallery\/demo\/1680247634WITeORzHMPv2y72Nxr!!pic.png",
                        pic_thumb:
                            "img\/gallery\/demo\/16802476274VrIgYXSKI9GN9O3yG!!pic200x200.png",
                        pic_thumb2:
                            "img\/gallery\/demo\/1680247634WITeORzHMPv2y72Nxr!!pic200x200.png",
                        pic_title: "分类",
                        pic_link: {
                            link: "catalog.html",
                            wechat_link: "\/pages\/goods_cate\/index",
                            title: "分类页面（仅分类）"
                        },
                        pic_thumb_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/16802476274VrIgYXSKI9GN9O3yG!!pic200x200.png",
                        pic_org_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/16802476274VrIgYXSKI9GN9O3yG!!pic.png",
                        pic_thumb2_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247634WITeORzHMPv2y72Nxr!!pic200x200.png",
                        pic_org2_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247634WITeORzHMPv2y72Nxr!!pic.png",
                        pic_link_format: "https:\/\/demo2.lyecs.com\/mobile\/catalog.html",
                        active: true
                    },
                    {
                        pic_org: "img\/gallery\/demo\/1680247656ZxrHGLra5jt3Wausu3!!pic.png",
                        pic_org2: "img\/gallery\/demo\/1680247659hhhxwNMyQg7kBDrxnc!!pic.png",
                        pic_thumb:
                            "img\/gallery\/demo\/1680247656ZxrHGLra5jt3Wausu3!!pic200x200.png",
                        pic_thumb2:
                            "img\/gallery\/demo\/1680247659hhhxwNMyQg7kBDrxnc!!pic200x200.png",
                        pic_title: "购物车",
                        pic_link: {
                            link: "cart.html",
                            wechat_link: "\/pages\/cart\/index",
                            title: "购物车"
                        },
                        pic_thumb_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247656ZxrHGLra5jt3Wausu3!!pic200x200.png",
                        pic_org_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247656ZxrHGLra5jt3Wausu3!!pic.png",
                        pic_thumb2_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247659hhhxwNMyQg7kBDrxnc!!pic200x200.png",
                        pic_org2_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247659hhhxwNMyQg7kBDrxnc!!pic.png",
                        pic_link_format: "https:\/\/demo2.lyecs.com\/mobile\/cart.html"
                    },
                    {
                        pic_org: "img\/gallery\/demo\/1680247679vqWSO1Ci9sAGJCzzZa!!pic.png",
                        pic_org2: "img\/gallery\/demo\/1680247682VX4iwQSO82hyzUedDz!!pic.png",
                        pic_thumb:
                            "img\/gallery\/demo\/1680247679vqWSO1Ci9sAGJCzzZa!!pic200x200.png",
                        pic_thumb2:
                            "img\/gallery\/demo\/1680247682VX4iwQSO82hyzUedDz!!pic200x200.png",
                        pic_title: "个人中心",
                        pic_link: {
                            link: "member\/",
                            wechat_link: "\/pages\/user\/user",
                            title: "会员首页"
                        },
                        pic_thumb_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247679vqWSO1Ci9sAGJCzzZa!!pic200x200.png",
                        pic_org_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247679vqWSO1Ci9sAGJCzzZa!!pic.png",
                        pic_thumb2_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247682VX4iwQSO82hyzUedDz!!pic200x200.png",
                        pic_org2_format:
                            "https:\/\/demo2.lyecs.com\/img\/gallery\/demo\/1680247682VX4iwQSO82hyzUedDz!!pic.png",
                        pic_link_format: "https:\/\/demo2.lyecs.com\/mobile\/member\/"
                    }
                ]
            }
        };
        productList.value = result.data.categories || [];
        showCatLevel.value = result.data.show_cat_level;
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
