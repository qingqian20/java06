<template>
	<div class="mycollection">
		<main_search></main_search>
		<br />
		<div>
		<p style="text-align: center;font-size: 30px;">我的收藏</p>
		<div class="goods">
			
		<div class="gd" v-for="v in Collect">
			<img @click="jumpGoodsinfo(v)" :src="'../../static/tp/'+v.gimgurl" /><br />
			<hr  />
			<span>￥{{v.price}}</span><br />
			<span>{{v.gdname}}</span><br /><br />
		</div>
		
		</div>
		</div>
	</div>
</template>

<script>
	import main_search from "./main_search.vue"
	export default {
		components: {main_search},
		
		data:function(){
			return {
				Collect:"",
			}
		},
		mounted() {
			this.useronline();
		},
		
		methods:{
			//跳转商品详情页面
			jumpGoodsinfo:function(goods){
			  this.$router.push({path:"/goodsinfo",query:goods})
			},
			//检查登录状态
			useronline:function(){
			  var o = this;
			  $.ajax({
			    url: "http://127.0.0.1:8080/java06/ajax/useronline",
			    success: function(r) {
			      if(r==""){
			        o.$router.push("/login");
			      }else{
			        o.queryCollection()
			 
			      }
			    },
			    xhrFields: {
			      withCredentials: true //传递cookie,保持session的唯一性
			    },
			    crossDomain: true,
			  })
			},
			//查询我的收藏
			queryCollection:function(){
			  var o = this;
			  $.ajax({
			    url: "http://127.0.0.1:8080/java06/ajax/queryCollection",
			    success: function(r) {
					console.log(r)
			     o.Collect=r;
			    },
			    xhrFields: {
			      withCredentials: true //传递cookie,保持session的唯一性
			    },
			    crossDomain: true,
			  })
			},
		}
		
	}
</script>

<style scoped="">
	.goods{
		width: 75%;
		margin: auto;
		
	}
	.gd{
		width: 18%;
		display: inline-block;
		border: 1px solid aquamarine;
		margin: 12px 11px;
		text-align: center;
		
	}
	.gd:hover{
		transition: all 0.3s;
		transform: translateY(-5px);
		box-shadow: 0 0 10px #F1B0B7;
		
	}
	
	img{
		
		width: 80%;
		margin: auto;
		margin-top: 15px;
	}
</style>
