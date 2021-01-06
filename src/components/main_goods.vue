<template>
	<div style="width: 100%;">
		
		<div class="goods">
			<hr style="width: 98%;" />
		<div class="gd" v-for="v in goods">
			<img @click="jumpGoodsinfo(v)" :src="'../../static/tp/'+v.gimgurl" /><br />
			<hr  />
			<span>￥{{v.price}}</span><br />
			<span>{{v.gdname}}</span><br /><br />
			
		</div>
		
		</div>
	</div>
</template>
<script>
	
	var ss= null;
	$(function(){
	    var i = 2;
	    $(window).scroll(function(){
	      if ($(window).scrollTop()+$(window).height() > $(document).height() ) {
	          ss.querygoods(parseInt(Math.random()*30+1));
	      }
	    })
	})
	export default {
		name:"main_goods",
		data: function() {
			return {
				goods:[],
			}
		},
		
		//随机页码
		mounted() {
			ss=this;
			this.querygoods(parseInt(Math.random()*30+1))
		},
		
		methods: {
			jumpGoodsinfo: function(goods) {
				this.$router.push({
					path: "/goodsinfo",
					query: goods
				})
			},
			//请求商品信息(全表)
			querygoods: function(pn) {
				var obj = this;
				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/querygoods",
					data: {pn:pn},
					success: function(r) {
						for (var i in r) {
							obj.goods.push(r[i]);
						}
					},
				})
			},
			//请求商品信息(关键字)
			querygoods: function(pn,gdname) {
				var obj = this;
				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/querygoods",
					data: {pn:pn ,gdname:gdname} ,
					success: function(r) {
						for (var i in r) {
							obj.goods.push(r[i]);
						}
					},
				})
			}
	
		},
		
		
		
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
		margin: 11px 11px;
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
