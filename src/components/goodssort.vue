<template>
	<div class="goodssort">
		<main_search></main_search><br />
		<main_sou></main_sou><br />
		<div class="pricesort">
			<b style="float: left;">服饰价格:</b>
			<label style="margin-left: 85px;">
				最低价<input v-model="minprice" class="price" type="number" />
			</label>
			~
			<label>
				最高价<input v-model="maxprice" class="price" type="number" />
			</label>
			<button @click="">搜索</button>
			<br />
		</div>
		<br />
		<div class="sort">
			<b style="float: left;">服饰类型:</b>
			<span @click="searchGoods(1,'休闲')">休闲</span>
			<span @click="searchGoods(1,'韩版')">韩版</span>
			<span @click="searchGoods(1,'百搭')">百搭</span>
			<span @click="searchGoods(1,'新款')">新款</span>
			<span @click="searchGoods(1,'牛仔')">牛仔</span>
			<span @click="searchGoods(1,'针织')">针织</span>
			<span @click="searchGoods(1,'显瘦')">显瘦</span>
			<span @click="searchGoods(1,'v领')">v领</span>
			<span @click="searchGoods(1,'修身')">修身</span>
			<span @click="searchGoods(1,'吊带')">吊带</span>
			<span @click="searchGoods(1,'蕾丝')">蕾丝</span>

		</div>

		<div class="goods">
			<hr style="width: 98%;" />
			<div class="gd" v-for="v in goods">
				<img @click="jumpGoodsinfo(v)" :src="'../../static/tp/'+v.gimgurl" /><br />
				<hr />
				<span>￥{{v.price}}</span><br />
				<span>{{v.gdname}}</span><br /><br />

			</div>

		</div>

		<!--分页-->
		<div class="fy" style="width: 70%; margin:0  200px;">
			<ul class="pagination" v-if="flag==true"style="width: 100%; margin: auto;">
				<li style="font-size: 20px;" @click="searchGoods(1,searchtext)" class="page-item"><a class="page-link" href="#">首页</a></li>
				<li style="font-size: 20px;" @click="searchGoods(pn-1,searchtext)" v-if="pn!=1" class="page-item"><a class="page-link"
					 href="#">上一页</a></li>

				<li style="font-size: 20px;" @click="searchGoods(v,searchtext)" v-if="v==pn" v-for="v in pagenum" class="page-item active"><a
					 class="page-link" href="#">{{v}}</a></li>
				<li style="font-size: 20px;" @click="searchGoods(v,searchtext)" v-else class="page-item"><a class="page-link" href="#">{{v}}</a></li>

				<li style="font-size: 20px;" @click="searchGoods(pn+1,searchtext)" v-if="pn!=zy" class="page-item"><a class="page-link"
					 href="#">下一页</a></li>
				<li style="font-size: 20px;" @click="searchGoods(zy,searchtext)" class="page-item"><a class="page-link" href="#">尾页</a></li>
			</ul>
			<ul class="pagination" v-else>
				<li style="font-size: 20px;" @click="queryByprice(1,minprice,maxprice)" class="page-item"><a class="page-link" href="#">首页</a></li>
				<li style="font-size: 20px;" @click="queryByprice(pn-1,minprice,maxprice)" v-if="pn!=1" class="page-item"><a class="page-link"
					 href="#">上一页</a></li>

				<li style="font-size: 20px;" @click="queryByprice(v,minprice,maxprice)" v-if="v==pn" v-for="v in pagenum" class="page-item active"><a
					 class="page-link" href="#">{{v}}</a></li>
				<li style="font-size: 20px;" @click="queryByprice(v,minprice,maxprice)" v-else class="page-item"><a class="page-link"
					 href="#">{{v}}</a></li>

				<li style="font-size: 20px;" @click="queryByprice(pn+1,minprice,maxprice)" v-if="pn!=zy" class="page-item"><a class="page-link"
					 href="#">下一页</a></li>
				<li style="font-size: 20px;" @click="queryByprice(zy,minprice,maxprice)" class="page-item"><a class="page-link"
					 href="#">尾页</a></li>
			</ul>
		</div>
		<hr />

	</div>


	</div>
</template>

<script>
	import main_search from "./main_search.vue"
	import main_sou from "./main_sou.vue"
	export default {
		components: {
			main_search,
			main_sou,
		},
		watch: {
			$router: function() {
				this.$router.go(0)
			}
		},

		data: function() {
			return {
				searchtext: this.$route.query.searchtext,
				goods: [], //存储商品信息
				pagenum: [], //存储页码
				pn: 1, //当前页码
				zy: 1, //最大页码
				minprice: "", //最低价格
				maxprice: "", //最高价格
				flag: true,
			}
		},
		methods: {
			//跳转商品详情页面
			jumpGoodsinfo: function(goods) {
				this.$router.push({
					path: "/goodsinfo",
					query: goods
				})
			},
			//根据价格查询
			queryByprice: function(pn, minprice, maxprice) {
				var o = this;
				o.flag = false;
				o.minprice = minprice;
				o.maxprice = maxprice;
				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/queryByprice",
					data: {
						minprice: o.minprice,
						maxprice: o.maxprice,
						pn: pn
					},
					success: function(r) {
						o.goods = r.goods;
						console.log(r.goods)
						o.zy = r.zy;
						o.pn = r.pn;
						//当前页码大于15页时 将第一段最大页码赋值为15
						var newzy = r.zy;
						if (r.zy >= 15) {
							newzy = 15;
						}
						var k = r.pn < 7 ? 1 : r.pn - 7; //开始页码
						var j = r.pn < 7 ? newzy : r.pn + 7; //结束页码
						j = r.pn + 7 > r.zy ? r.zy : j; //当结束页码+7大于最大页码时,终止页码的相加
						o.pagenum = []; //清除上一次的页码
						//将页码存储到数组中
						for (var i = k; i <= j; i++) {
							o.pagenum.push(i);
						}
						if (r.goods == null) {
							alert("没有找到符号条件的商品")
						}
					},
				})
			},
			//查询商品信息
			searchGoods: function(pn, gdname) {
				var o = this;
				o.searchtext = gdname;
				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/searchGoods",
					data: {
						pn: pn,
						gdname: o.searchtext
					},
					success: function(r) {
						o.goods = r.goods;
						
						o.zy = r.zy;
						o.pn = r.pn;
						//当前页码大于15页时 将第一段最大页码赋值为15
						var newzy = r.zy;
						if (r.zy >= 15) {
							newzy = 15;
						}

						var k = r.pn < 7 ? 1 : r.pn - 7; //开始页码
						var j = r.pn < 7 ? newzy : r.pn + 7; //结束页码
						j = r.pn + 7 > r.zy ? r.zy : j; //当结束页码+7大于最大页码时,终止页码的相加
						o.pagenum = []; //清除上一次的页码
						//将页码存储到数组中
						for (var i = k; i <= j; i++) {
							o.pagenum.push(i);
						}
					},
				})
			}
		},
		//调用searchGoods查询商品信息
		mounted() {
			this.searchGoods(1, this.searchtext);
		},
	}
</script>

<style scoped="">
	.pricesort,
	.sort {
		width: 73.5%;
		margin: auto;
	}

	.sort {
		text-align: center;
		padding: 0 10px;
	}

	.pricesort {
		
		padding: 0 10px;
	}

	.pricesort>label {
		margin: 0 20px;
	}

	.pricesort>button {
		margin: 0 15px;
		border: 1px solid cyan;
		padding: 3px 8px;
		border-radius: 5px;
		background-color: white;
	}

	.pricesort>button:active {
		background-color: pink;
	}

	.sort>span {
		margin: 0 20px;
		border: 1px solid hotpink;
		padding: 3px 8px;
		border-radius: 5px;
	}

	.sort>span:hover {
		background-color: pink;
	}

	.sort>span:active {
		background-color: #6F42C1;
	}

	.goods {
		width: 75%;
		margin: auto;
	}

	.gd {
		width: 18%;
		display: inline-block;
		border: 1px solid aquamarine;
		margin: 12px 11px;
		text-align: center;

	}

	.gd:hover {
		transition: all 0.3s;
		transform: translateY(-5px);
		box-shadow: 0 0 10px #F1B0B7;

	}

	img {

		width: 80%;
		margin: auto;
		margin-top: 15px;
	}
</style>
