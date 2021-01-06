<template>
	<div>

		<main_search></main_search><br />
		<div class="address">

			<p style="font-size: 25px;">收货地址:</p>

			<div class="ss">
				<label class="order" v-for="v in address">
					<input class="xz" hidden="hidden" type="radio" name="address" />
					
					<div class="abc" @click="orderAddress=v">
						<span>{{v.address}}</span>(<span style="color: red;">{{v.linkpeople}}</span>收)
						<hr />
						手机号:<span>{{v.phone}}</span><br />
						详细地址:<span>{{v.daddress}}</span><br />
						<span style="color: blue;cursor: pointer;" @click="openAddress(v)">修改</span>
						<span style="color: red;cursor: pointer;" @click="delAddress(v.aid)">删除</span>
					</div>
				</label>
			</div>



			<span class="btn tian " style="float: right;padding:10px;border: 1px solid black;margin: 15px; " @click="jumpAddress()">
				添加地址</span>
		</div>
		<br /><br /><br />



		<div class="addup">
			<!--关闭修改收货地址窗口-->
			<span @click="closeAddress()" style="float: right;cursor: pointer;margin-top: -20px;margin-right: -13px;">&times;</span>
			<linkage></linkage>
			<div class="form-group">
				<label for="dAddress">详细地址:</label>
				<input v-model="ar.daddress" type="text" class="form-control" id="dAddress">
			</div>

			<div class="form-group">
				<label for="usr">收件人:</label>
				<input v-model="ar.linkpeople" type="text" class="form-control" id="usr">
			</div>

			<div class="form-group">
				<label for="usr">手机号:</label>
				<input v-model="ar.phone" type="tel" class="form-control" id="usr">
			</div>

			<button class="btn btn-info btn-block" @click="updateAddress()">确定</button>
		</div>

		<!-- 订单商品信息-->
		<div class="godsinfo">

			<table class="table table-bordered" style="text-align: center;line-height: 50px;">
				<tr>
					<td>商品图片</td>
					<td>商品名</td>
					<td>尺码</td>
					<td>价格</td>
					<td>数量</td>
				</tr>
				<tr v-for="v in orderinfo" style="text-align: center;line-height: 100px;">

					<td>
						<img width="50px" height="90px" :src="'../../static/tp/'+v.gimgurl" />
					</td>

					<td class="td">{{v.gdname}}</td>
					<td class="td">{{v.gstext}}</td>
					<td class="td">{{v.price}}</td>
					<td class="td">{{v.gdcount}}</td>
				</tr>

			</table>

			<div style="float: right;">

				<span>￥{{price}}</span>
				<button class="btn " @click="submitOrder()" style=" border: 1px solid black;margin: 5px;">付款</button>

			</div>
		</div>
	</div>
</template>

<script>
	import main_search from "./main_search.vue"
	import linkage from "./linkage.vue" //三级联动组件
	export default {
		components: {
			main_search,
			linkage

		},

		data: function() {
			return {
				orderinfo: JSON.parse(this.$route.query.orders), //订单中的商品信息
				address: [], //收货地址
				daddress: "", //添加详细地址
				phone: "", //添加手机号
				linkpeople: "", //添加联系人
				ar: {
					daddress: "",
					phone: "",
					linkpeople: "",
				}, // 修改信息对象
				orderAddress: null, //订单地址
				price: this.$route.query.price, //订单金额
			}
		},

		methods: {
			//提交订单
			submitOrder:function(){
			  var o = this;
			  if(this.orderAddress!=null){
			     var ar = $("#province").val()+$("#city").val()+$("#area").val()
			      $.ajax({ //
			        url: "http://127.0.0.1:8080/java06/submitOrder",
			        data:{address:ar+o.orderAddress.daddress,
					      recipient:o.orderAddress.linkpeople,
			              contactnumber:o.orderAddress.phone,
						  orders:JSON.stringify(o.orderinfo)
						  },
			        success: function(r) {
			           window.open("http://127.0.0.1:8080/java06/ali/pay?orderid="+r.ofid+"&price="+r.price)
					   
			        },
			        xhrFields: {
			          withCredentials: true //传递cookie,保持session的唯一性
			        },
			        crossDomain: true,
			      })
			  }else{
			    alert("请选择收货地址")
			  }
			},
			//跳转到添加收货地址页面
			jumpAddress: function() {
				this.$router.push({
					path: "/addAddress",
					query: {
						orders: JSON.stringify(this.orderinfo)
					}
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
							o.queryAddress();
						}
					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
					crossDomain: true,
				})
			},
			//查询用户收货地址
			queryAddress: function() {
				var o = this;
				$.ajax({ //
					url: "http://127.0.0.1:8080/java06/ajax/queryAddress",
					success: function(r) {
						o.address = r;
					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
					crossDomain: true,
				})
			},
			//删除用户收货地址
			delAddress: function(aid) {
				var o = this;
				$.ajax({ //
					url: "http://127.0.0.1:8080/java06/ajax/delAddress",
					data: {
						aid: aid
					},
					success: function(r) {
						if (r > 0) {
							o.queryAddress();
						}
					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
					crossDomain: true,
				})
			},
			//修改后地址
			updateAddress: function() {
				var ar = $("#province").val() + $("#city").val() + $("#area").val()
				var o = this;
				console.log(o.ar.dAddress);
				$.ajax({ //

					url: "http://127.0.0.1:8080/java06/ajax/updateAddress",
					data: {
						address: ar,
						daddress: o.ar.daddress,
						phone: o.ar.phone,
						linkpeople: o.ar.linkpeople,
						aid: o.ar.aid
					},
					success: function(r) {

						o.queryAddress();
						o.closeAddress();
					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
					crossDomain: true,
				})
			},

			//打开修改收货地址窗口
			openAddress: function(v) {
				this.ar = v;
				$(".addup").css("display", "block");

			},
			//关闭修改收货地址窗口
			closeupdateAddress: function() {
				$(".addup").css("display", "none");
			},
			//关闭收货地址
			closeAddress: function() {
				$(".addup").css("display", "none");

			},
		},
		mounted() {
			this.useronline();
		}


	}
</script>

<style scoped="">
	.xz:checked+.abc{
	 color: red;
	}
	.address {
		width: 80%;
		margin: auto;
	}

	.ss {
		border: 1px solid #B9BBBE;
		width: 100%;
		height: 350px;
		border-left: none;
		border-right: none;
	}

	.order {
		width: 23%;
		height: 45%;
		border: 1px solid black;
		margin-top: 5px;
		margin-left: 11px;
		margin-right: 13px;
		padding: 5px;
	}

	.godsinfo {
		width: 80%;
		margin: auto;
	}

	.addup {
		position: absolute;
		display: none;
		margin-top: -440px;
		margin-left: 520px;
		width: 30%;
		border: 1px solid #00FFFF;
		background-color: white;
		padding: 20px;
	}
</style>
