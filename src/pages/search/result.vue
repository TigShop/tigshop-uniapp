<template>
    <view style="height: 100%">
        <navbar :parameter="parameter"></navbar>
        <view class="pageMain productSort" v-if="loading">
            <view class="header acea-row row-center-wrapper" :style="'top:' + navH + 'rpx'">
                <view @click.stop="toSearch" class="acea-row row-between-wrapper input">
                    <text class="iconfont-h5 icon-sousuo"></text>
                    <view class="txt"> 请输入搜索内容 </view>
                </view>
            </view>
            <view class="tab-box flex align-center justify-between">
                <view class="item flex align-center" v-for="(item, index) in tabList" :key="item.value" :class="{active: tabIndex === item.value}" @click="onChangeTab(item)">
                    <text>{{ item.label }}</text>
                    <view class="price-ico-box flex flex-column" v-show="item.value === 'price' && tabIndex == item.value">
                        <text class="iconfont-h5 icon-shangjiantou" :class="{order: item.order === 'asc'}"></text>
                        <text class="iconfont-h5 icon-xiajiantou" :class="{order: item.order === 'desc'}"></text>
                    </view>
                </view>
                <view class="item" @click="showDrawer">
                    <text>筛选</text>
                    <text class="iconfont-h5 icon-sanjiaoright"></text>
                </view>
            </view>
            <view class="tag-row">
                <view class="tag-list flex-wrap align-center">
                    <view class="tag-item mr10">
                        <text>搜索关键词"1"</text>
                        <uni-icons type="closeempty" size="10"></uni-icons>
                    </view>
                    <view class="tag-item mr10">
                        <text>骆驼</text>
                        <uni-icons type="closeempty" size="10"></uni-icons>
                    </view>
                    <view class="tag-item mr10">
                        <text>122 - 444</text>
                        <uni-icons type="closeempty" size="10"></uni-icons>
                    </view>
                    <view class="tag-item">
                        <text>配饰</text>
                        <uni-icons type="closeempty" size="10"></uni-icons>
                    </view>
                    <view class="tag-interval">
                        <uni-icons type="right" size="10"></uni-icons>
                    </view>
                    <view class="tag-item">
                        <text>帽子</text>
                        <uni-icons type="closeempty" size="10"></uni-icons>
                    </view>
                    <view class="tag-interval">
                        <uni-icons type="right" size="10"></uni-icons>
                    </view>
                    <view class="tag-item">
                        <text>小黑伞</text>
                        <uni-icons type="closeempty" size="10"></uni-icons>
                    </view>
                </view>
            </view>
			<!-- 加载商品模块 -->
		<!-- 	<view class="goods-container" v-if="categoryId > 0">
			    <masonry :commodityList="commodityList"></masonry>
			</view> -->
			<tigpopup v-model:show="showDrawerRef" width="88vw" position="right" :showClose="false" :showTitle="false" paddingBottom="0">
			    <view class="search_condition">
			    	<view class="tab_box" v-if="json.category">
			    		<view class="title-box flex justify-between">
			    			<view class="txt">
			    				分类
			    			</view>
			    			<view class="more" @click="categoryShow = !categoryShow">
			    				<uni-icons v-if="categoryShow" type="up" size="16" color="#bfbfbf"></uni-icons>
			    				<uni-icons v-else type="down" size="16" color="#bfbfbf"></uni-icons>
			    			</view>
			    		</view>
			    		<view class="tabs flex-wrap">
			    			<view class="item" v-for="(item, index) in (categoryShow ? json.category : json.category.slice(0, 3))" :key="index" @click="filterParams.cat = item.category_id" :class="{'active': filterParams.cat == item.category_id}">
			    				<uni-icons v-if="filterParams.cat == item.category_id" type="checkmarkempty" size="12"></uni-icons>
			    				{{item.category_name}}
			    			</view>
			    		</view>
			    	</view>
			    	<view class="tab_box" v-if="json.brand">
			    		<view class="title-box flex justify-between">
			    			<view class="txt">
			    				品牌
			    			</view>
			    			<view class="more" @click="brandShow = !brandShow">
			    				<uni-icons v-if="brandShow" type="up" size="16" color="#bfbfbf"></uni-icons>
			    				<uni-icons v-else type="down" size="16" color="#bfbfbf"></uni-icons>
			    			</view>
			    		</view>
			    		<view class="tabs flex-wrap">
			    			<view class="item" v-for="(item, index) in (brandShow ? json.brand : json.brand.slice(0, 3))" @click="onChangeBrand(item.brand_id)" :key="index" :class="{'active': filterParams.brand.includes(item.brand_id)}">
			    				<uni-icons v-if="filterParams.brand.includes(item.brand_id)" type="checkmarkempty" size="12"></uni-icons>
			    				{{item.brand_name}}  
			    			</view>
			    		</view>
			    	</view>
			    	<view class="tab_box">
			    		<view class="title-box flex justify-between">
			    			<view class="txt">
			    				价格
			    			</view>
			    		</view>
			    		<view class="tabs flex justify-between align-center">
			    			<input class="uni-input" type="number" v-model="filterParams.min" placeholder="最低价" />
			    			<view class="xian"></view>
			    			<input class="uni-input" type="number" v-model="filterParams.max" placeholder="最高价" />
			    		</view>
			    	</view>
					<view class="btn-box flex">
						<view class="btn">重置</view>
						<view class="btn submit" @click="submit">确定</view>
					</view>
			    </view>
			</tigpopup>
        </view>
    </view>
</template>

<script lang="ts" setup>
import navbar from "@/components/navbar/index.vue";
import { ref, reactive } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { useConfigStore } from "@/store/config";
import masonry from "@/components/masonry/masonry.vue";
import { imageFormat } from "@/utils/format";
import type { Brand, filterSeleted, ProductFilterParams, ProductList } from "@/types/search/search";
import { getCategoryTree, getCategoryProductFilter, getCategoryProduct } from "@/api/search/search";
const configStore = useConfigStore();
const parameter = ref({
    navbar: "1",
    return: "1",
    title: "商品搜索"
});
const navH = configStore.navHeight;
const loading = ref(true);
const filterParams = reactive<ProductFilterParams>({   //初始化用于查询的参数
    page: 1,
    size: 20,
    sort: '',
    order: 'asc',
    keyword: '',
	max: '',
	min: '',
	cat: 0,
	brand: [],
	page_type: 'search'
});
const tabIndex = ref('default')
const tabList = ref([
    {
        label: "默认",
        value: "default"
    },
    {
        label: "销量",
        value: "sales"
    },
    {
        label: "价格",
        value: "price",
        order: "desc"
    }
]);
const onChangeTab = (item:any) => {
    if(item.value == 'price'){
        item.order = item.order === 'desc' ? 'asc' : 'desc';
    }else{
        item.order = ''
    }
    tabIndex.value = item.value;
    console.log('筛选条件:',item)
};

const showDrawerRef = ref<boolean>(false)
// 打开窗口
const showDrawer = () => {
	showDrawerRef.value = true;
}
// 关闭窗口
const closeDrawer = () => {
	showDrawerRef.value = false;
}

const toSearch = () => {
    uni.navigateTo({
        url: "/pages/search/index"
    });
};
onLoad(() => {
});

onShow(() => {
    uni.hideTabBar();
});
const categoryShow = ref<boolean>(false)
const brandShow = ref<boolean>(false)

const onChangeBrand = (id:number) => {
	let index = filterParams.brand.indexOf(id); // 查找新书在数组中的下标
	if (index !== -1) {
	  filterParams.brand.splice(index,1)
	} else {
	  filterParams.brand.push(id);
	}
}
const submit = () => {
    // if(Number(filterParams.min) > Number(filterParams.max)){
        uni.showToast({
            title: '最低价不能大于最高价',
            icon: 'none'
        });
    // }
}
const json = {
    "category": [
        {
            "category_id": 85,
            "category_name": "女单鞋"
        },
        {
            "category_id": 86,
            "category_name": "女休闲鞋"
        },
        {
            "category_id": 87,
            "category_name": "女靴"
        },
        {
            "category_id": 88,
            "category_name": "男休闲鞋"
        },
        {
            "category_id": 89,
            "category_name": "男商务鞋"
        },
        {
            "category_id": 90,
            "category_name": "女包"
        },
        {
            "category_id": 91,
            "category_name": "男包"
        }
    ],
    "brand": [
        {
            "brand_id": 1,
            "brand_name": "PRICH22",
            "brand_logo": "img/gallery/202306/1687857585PUWPIq3otyfgAdLZ2e!!pic.jpeg",
            "first_word": "P",
            "is_show": 1
        },
        {
            "brand_id": 6,
            "brand_name": "纳纹",
            "brand_logo": "img/demo/brand/202304/1680589636G6nqvy9rts2roi8TJg!!pic.png",
            "first_word": "N",
            "is_show": 1
        },
        {
            "brand_id": 21,
            "brand_name": "骆驼",
            "brand_logo": "img/demo/brand/202304/1680762356jFjxymSXUvj809DUnB!!pic.png",
            "first_word": "L",
            "is_show": 1
        },
        {
            "brand_id": 25,
            "brand_name": "马克华菲",
            "brand_logo": "img/demo/brand/202304/16807624781UftvQVXIJP3rBXPvs!!pic.png",
            "first_word": "M",
            "is_show": 1
        },
        {
            "brand_id": 91,
            "brand_name": "接吻猫",
            "brand_logo": "img/demo/brand/202304/1680835503yg9nki0rZiAu93UaZJ!!pic.png",
            "first_word": "J",
            "is_show": 1
        },
        {
            "brand_id": 92,
            "brand_name": "欧利萨斯",
            "brand_logo": "img/demo/brand/202304/1680835646O0BmQQOr3v4NXJeCnk!!pic.png",
            "first_word": "O",
            "is_show": 1
        },
        {
            "brand_id": 93,
            "brand_name": "大洋洲•袋鼠",
            "brand_logo": "img/demo/brand/202304/1680835674a5uZwTOvWTe7QMnzOu!!pic.png",
            "first_word": "D",
            "is_show": 1
        },
        {
            "brand_id": 94,
            "brand_name": "木林森",
            "brand_logo": "img/demo/brand/202304/1680835756LUDq4FMmnGD2dmitP1!!pic.png",
            "first_word": "M",
            "is_show": 1
        },
        {
            "brand_id": 95,
            "brand_name": "ECCO",
            "brand_logo": "img/demo/brand/202304/16808358287OMqggz3sfP8jqOE4A!!pic.png",
            "first_word": "E",
            "is_show": 1
        }
    ]
}
</script>
<style lang="scss" scoped>
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
.productSort .header .input .txt {
    color: #999;
    width: 93%;
    font-size: 26rpx;
}
.tab-box {
    padding-top: 99rpx;
    background-color: #fff;
    .item {
        width: 20%;
        text-align: center;
        margin: 30rpx 40rpx;
        color: #333;
        font-size: 24rpx;
        .price-ico-box {
            margin-left: 10rpx;
            .icon-shangjiantou, .icon-xiajiantou {
                font-size: 12rpx;
                color: $tig-color-grey;
            }
            .order{
                color: $tig-color-primary;
            }
        }
        .icon-sanjiaoright {
            font-size: 22rpx;
            margin-left: 5rpx;
            color: $tig-color-grey;
        }
    }
    .active{
        color: $tig-color-primary;
    }
}
.tag-row{
    background-color: #fff;
    padding: 0rpx 30rpx 0rpx 30rpx;
    .tag-list{
        .tag-item{
            padding: 5rpx 10rpx;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: center;
            color: #232326;
            background-color: #f0f2f5;
            border-radius: 3px;
            border: solid 1px #f0f2f5;
            font-size: 24rpx;
            border-radius: 27px;
            vertical-align: middle;
            color: #232326;
            background-color: #f7f7f7;
            margin-bottom: 20rpx;
            text{
                margin:0 5rpx;
                display: inline-block;
            }
        }
        .mr10{
            margin-right: 10rpx;
        }
        .tag-interval{
            margin: 0 10rpx;
            margin-bottom: 20rpx;
            font-size: 18rpx;
        }
    }
}
.pageMain{
	:deep(.popup-container) {
		border-radius: 15rpx 0 0 0;
	}
	.search_condition{
		position: relative;
		height: 100%;
		.tab_box{
			padding: 20rpx;
			.title-box{
				color: #666;
				padding: 10rpx 0;
				margin-bottom: 10rpx;
			}
			.tabs{
				.item{
					margin-top: 10px;
					width: 30%;
					text-align: center;
					line-height: 29px;
					background-color: #f0f2f5;
					border: 1px solid #f0f2f5;
					border-radius: 5px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 20rpx;
					margin: 10rpx;
				}
				.active{
					border: 1px solid $tig-color-error;
					color: $tig-color-error;
					:deep(.uni-icons){
						color: $tig-color-error !important;
					}
				}
				.uni-input{
					width: 42%;
					background-color: #f0f2f5;
					padding: 10rpx;
					font-size:22rpx;
					text-align:center;
					border-radius: 5px;
				}
				.xian{
					width: 16rpx;
					margin:0 10rpx;
					border-bottom: 2rpx solid #848689;
				}
			}
		}
		.btn-box{
			position: absolute;
			bottom: 0;
			left:0;
			width: 100%;
			box-shadow: 0px -1px 3px #d7d7d7;
			.btn{
				width:50%;
				background-color: #fff;
				padding: 20rpx 0;
				text-align: center;
			}
			.submit{
				background-color: $tig-color-error;
				color: #fff;
			}
		}
	}
}
</style>