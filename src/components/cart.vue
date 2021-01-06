<template>
	<div>
		<main_search></main_search><br />
		<div class="cart">
			<p style="text-align: center;font-size: 30px;">我的购物车</p>
			<table class="table table-bordered " style="text-align: center;" v-if="cart.length!=0">
				<tr>
					<td><input type="checkbox" class="all" @click="checkAll()" /></td>
					<td>商品</td>
					<td>名称</td>
					<td>尺码</td>
					<td>数量</td>
					<td>单价</td>
					<td>总价</td>
					<td>操作</td>
				</tr>

				<tr v-for="v in cart" style="line-height: 150px;">
					<td>
						<input class="ck" @click="check(2,v.gdid)" v-if="v.ck==1" type="checkbox" />
						<input class="ck" @click="check(1,v.gdid)" v-if="v.ck==2" checked="checked" type="checkbox" />
					</td>
					<td>
						<img @click="jumpGoodsinfo(v)" :src="'../../static/tp/'+v.gimgurl" width="100px" height="150px" />
					</td>
					<td>{{v.gdname}}</td>
					<td>{{v.gstext}}</td>
					<td>
						<button @click="jiajian(v.gdcount,1,v.gdid)" class=" btn btn-light" style="background-color: palegreen; border-radius: 8px;">-</button>
						<span>&nbsp;{{v.gdcount}}&nbsp;</span>
						<button @click="jiajian(v.gdcount,2,v.gdid)" class="btn btn-light" style="background-color: paleturquoise; border-radius: 8px;">+</button>
					</td>
					<td style="font-size: 20px;">￥{{v.price}}</td>
					<td style="font-size: 20px;">￥{{v.price*v.gdcount}}</td>
					<td>
						<button class="btn " style="background-color: white; border: 1px solid black;" @click="removemycart(v.gdid)">取消订单</button>
					</td>
				</tr>
			</table>

			<div v-else style="text-align: center;">
				<span style="font-size: 40px;">
					您的购物车空空如也......
				</span>
			</div>
			<div style="float: right;">
				￥{{sum}} 元
				<button class="btn btn-info" @click="addOrderinfo()">提交订单</button>

			</div>

			<br />
			<br />
		</div>
		<br />
		<br />
	</div>
</template>

<script>
	import main_search from "./main_search.vue"
	export default {
		components: {
			main_search
		},

		data: function() {
			return {
				cart: [],
				sum: 0, //商品合计价格
			}
		},
		methods: {
			//跳转商品详情页面
			jumpGoodsinfo: function(cart) {
				console.log(cart)
				this.$router.push({
					path: "/goodsinfo",
					query: cart
				})
			},
			//检测用户是否在线
			useronline: function() {
				var o = this;
				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/useronline",
					success: function(r) {
						if (r == "") {
							o.$router.push("/login");
						} else {
							o.mycart();
							o.total()
						}
					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
					crossDomain: true,
				})
			},
			//我的购物车
			mycart: function() {
				var o = this;
				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/mycart",
					success: function(r) {
						o.cart = r
						o.total()
					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
					crossDomain: true,
				})
			},
			//删除我的购物车
			removemycart: function(gdid) {
				var o = this;
				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/removemycart",
					data: {
						gdid: gdid
					},
					success: function(r) {
						if (r > 0) {
							o.mycart();
							o.total()
						}
					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
					crossDomain: true,
				})
			},
			//商品数量++--
			jiajian: function(gdcount, n, gdid) {
				var o = this;
				if (n == 1) {
					if (gdcount > 1) {
						gdcount--;
					}
				}
				if (n == 2) {
					gdcount++;
				}

				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/jiajian",
					data: {
						gdid: gdid,
						gdcount: gdcount,
					},
					success: function(r) {
						if (r > 0) {
							o.mycart();
							o.total()
							console.log(r)
						} else {
							alert("修改失败")
						}
					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
					crossDomain: true,
				})
			},
			//商品选择
			check: function(c, gdid) {
				var o = this;
				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/check",
					data: {
						ck: c,
						gdid: gdid
					},
					success: function(r) {
						o.mycart();
						o.total()
					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
					crossDomain: true,
				})
			},
			//全选./取消
			checkAll: function() {
				var o = this;
				var ck = 2;
				if ($(".all").prop("checked")) {
					$(".ck").prop("checked", true);
				} else {
					$(".ck").prop("checked", false);
					ck = 1;
				}

				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/check",
					data: {
						ck: ck
					},
					success: function(r) {
						o.mycart();
						o.total();
					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
					crossDomain: true,
				})
			},
			//计算合计价格
			total: function() {
				console.log(this.cart)
				var sum = 0;
				for (var v in this.cart) {
					if (this.cart[v].ck == 2) {
						sum += this.cart[v].price * this.cart[v].gdcount
					}
				}
				this.sum = sum;
			},
			//跳转到订单页面
			addOrderinfo: function() {
				var orders = [];
				for (var v in this.cart) {
					if (this.cart[v].ck == 2) {
						orders.push(this.cart[v]);
					}
				}
				this.$router.push({
					path: "/orderinfo",
					query: {
						orders: JSON.stringify(orders),
						price: this.sum
					}
				})
			},

		},
		mounted() {
			this.useronline();
		}




	}
</script>

<style scoped="">
	.cart {
		width: 80%;
		margin: 0 auto;

	}
</style>
