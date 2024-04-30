<template>
    <view style="height: 100%">
        <navbar :parameter="parameter"></navbar>
        <view class="page-loading" v-if="loading"><view class="ico"></view></view>
        <view class="pageMain productSort">
            <view class="header acea-row row-center-wrapper" :style="'top:' + navH + 'rpx'">
                <view @click.stop="toSearch" class="acea-row row-between-wrapper input">
                    <text class="iconfont-h5 icon-sousuo"></text>
                    <view class="txt"> 请输入搜索内容 </view>
                </view>
            </view>
            <view class="tab-box flex align-center justify-between">
                <view class="item flex align-center" v-for="item in tabList" :key="item.value" :class="{active: tabIndex === item.value}" @click="onChangeTab(item)">
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
                    <view class="tag-item mr10" v-if="filterParams.keyword" @click="del('keyword')">
                        <text>搜索关键词"{{ filterParams.keyword }}"</text>
                        <uni-icons type="closeempty" size="10"></uni-icons>
                    </view>
                    <view class="tag-item mr10 brand" v-if="brandNameTree.length > 0" @click="del('brand')">
                        <text>{{ brandNameTree.join(',') }}</text>
                        <uni-icons type="closeempty" size="10"></uni-icons>
                    </view>
                    <view class="tag-item mr10" v-if="filterParams.max || filterParams.min" @click="del('price')">
                        <text>{{ filterParams.min || 0 }} - {{ filterParams.max || 0}}</text>
                        <uni-icons type="closeempty" size="10"></uni-icons>
                    </view>
                    <view class="flex align-center" v-for="(item, index) in categoryTree" :key="index" @click="delCategory('category', index)">
                        <view class="tag-item">
                            <text>{{item.category_name}}</text>
                            <uni-icons type="closeempty" size="10"></uni-icons>
                        </view>
                        <view class="tag-interval" v-if="index < categoryTree.length - 1">
                            <uni-icons type="right" size="10"></uni-icons>
                        </view>
                    </view>
                </view>
            </view>
			<!-- 加载商品模块 -->
			<view class="goods-container" v-if="!loading">
			    <masonry :commodityList="productList"></masonry>
			</view>
            <view class="loading-box" v-if="filterParams.page > 1">
                <view class="bottomLoading" v-if="loaded"><image lazy-load class="loading" src="/static/images/common/loading.gif"></image></view>
                <view v-else>没有更多了~</view>
            </view>

			<tigpopup v-model:show="showDrawerRef" width="88vw" position="right" :showClose="false" :showTitle="false" paddingBottom="0">
			    <view class="search_condition">
			    	<view class="tab_box" v-if="categoryList.length > 0">
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
			    			<view class="item" v-for="(item, index) in (categoryShow ? categoryList : categoryList.slice(0, 3))" :key="index" @click="filterParams.cat = item.category_id" :class="{'active': filterParams.cat == item.category_id}">
			    				<uni-icons v-if="filterParams.cat == item.category_id" type="checkmarkempty" size="12"></uni-icons>
			    				{{item.category_name}}
			    			</view>
			    		</view>
			    	</view>
			    	<view class="tab_box" v-if="brandList.length > 0">
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
			    			<view class="item" v-for="(item, index) in (brandShow ? brandList : brandList.slice(0, 3))" @click="onChangeBrand(item)" :key="index" :class="{'active': filterParams.brand.includes(item.brand_id)}">
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
                    <view style="height: 100rpx;"></view>
					<view class="btn-box flex">
						<view class="btn" @click="reset">重置</view>
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
import { onLoad, onShow, onReachBottom } from "@dcloudio/uni-app";
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
const brandList = ref<Brand[]>([])
const brandNameTree = ref<string[]>([])
const categoryList = ref<filterSeleted[]>([])
const categoryTree = ref<filterSeleted[]>([])
const productList = ref<ProductList[]>([])
const total = ref<number>(0)
const loaded = ref(false);
// 获取列表的查询结果
const loadFilter = async () => {
    loading.value = true;
    try {
        const productFilter = await getCategoryProductFilter({...filterParams});
        console.log('分类筛选项',productFilter)
        brandList.value = productFilter.filter.brand;
        categoryList.value = productFilter.filter.category;
        if(filterParams.cat){
            const tree = await getCategoryTree(filterParams.cat);
            categoryTree.value = tree.category_tree
            console.log('分类树',tree)
        }
    } catch (error:any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    } finally {
        loading.value = false;
    }

}
const __getCategoryProduct = async () => {
    if (filterParams.page > 1) {
        loaded.value = true;
    }
    try {
        const productInfo = await getCategoryProduct({...filterParams});
        total.value = productInfo.total;
        productList.value = [...productList.value, ...productInfo.product_list];
        console.log('商品列表',productInfo)
    } catch (error:any) {
        uni.showToast({
            title: error.message,
            icon: "none"
        })
    } finally {
        loaded.value = false;
    }
}
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
    console.log('筛选条件:',item)
    tabIndex.value = item.value;
    filterParams.sort = item.value;
    filterParams.order = item.order;
    loadFilter()
};

const del = (type:string) => {
    if(type == "brand"){
        filterParams.brand = [];
        brandNameTree.value = [];
    }else if(type == "price"){
        filterParams.min = '';
        filterParams.max = '';
    }else if(type == "keyword"){
        filterParams.keyword = '';
    }
    loadFilter()
}
const delCategory = (type:string, index:number) => {
    if(type == "category"){
        if(index > 0) {
            filterParams.cat  = categoryTree.value[index -1].category_id
        }else{
            filterParams.cat = 0;
        }
        loadFilter()
    }
}

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
onLoad((option:any) => {
    if(option && option.keyWords){
        filterParams.keyword = option.keyWords;
    }
    if(option && option.category_id){
        filterParams.cat = option.category_id;
    }
    loadFilter();
    __getCategoryProduct();
});

onShow(() => {
    uni.hideTabBar();
});
const categoryShow = ref<boolean>(false)
const brandShow = ref<boolean>(false)

const onChangeBrand = (item:any) => {
	let index = filterParams.brand.indexOf(item.brand_id); // 查找新书在数组中的下标
	if (index !== -1) {
	  filterParams.brand.splice(index,1)
      brandNameTree.value.splice(index,1)
	} else {
	  filterParams.brand.push(item.brand_id);
      brandNameTree.value.push(item.brand_name);
	}
}
const submit = () => {
    if(Number(filterParams.min) > Number(filterParams.max)){
        uni.showToast({
            title: '最低价不能大于最高价',
            icon: 'none'
        });
        return
    }
    loadFilter()
    closeDrawer()
}
const reset = () => {
    filterParams.min = '';
    filterParams.max = '';
    filterParams.brand = [];
    filterParams.cat = 0;
}
onReachBottom(() => {
    if (filterParams.page < Math.ceil(total.value / filterParams.size)) {
        filterParams.page++;
        __getCategoryProduct();
    }
});
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
			position: fixed;
			bottom: 0;
			right:0;
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
.goods-container{
    padding: 20rpx;
}
</style>