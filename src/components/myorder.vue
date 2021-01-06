<template>
	<div>
		<main_search></main_search><br />
		<p style="text-align: center; font-size: 30px;">我的订单</p>
		<div style="width: 80%;margin: 0 auto;">
		  <table class="table table-hover" style="text-align: center; border: 1px solid aquamarine;">
		    <tr>
		      <td>订单编号</td>
		      <td>下单日期</td>
		      <td>订单状态</td>
		      <td>地址</td>
		      <td>收件人</td>
		      <td>手机号</td>
		      <td>操作</td>
		    </tr>
		    <tr v-for="v in myOrderinfo" style="line-height: 70px;">
		      <td>{{v.ofid}}</td>
		      <td>{{v.ofdate}}</td>
		      <td>
		        <span v-if="v.ofstate==0">
		          未付款
		        </span>
		        <span v-if="v.ofstate==1">
		          已付款
		        </span>
		      </td>
		      <td>{{v.address}}</td>
		      <td>{{v.recipient}}</td>
		      <td>{{v.contactnumber}}</td>
		      <td>
		        <button @click="orderDetails(v.ofid)" class="btn btn-link">订单明细</button>
		      </td>
		    </tr>
		  </table>
		</div>
		<div class="order">
		  <table class="table">
		     <tr>
		       <td>商品信息</td>
		       <td>尺码</td>
		       <td>单价</td>
		       <td>数量</td>
		       <td>总价</td>
		     </tr>
		      <tr v-for="v in od">
		        <td>
		          <img @click="jumpGoodsinfo(v)" width="100px" height="150px" :src="'../../static/tp/'+v.gimgurl" />
		          {{v.gdname}}
		        </td>
		        <td style="line-height:150px;">{{v.gstext}}</td>
		        <td style="line-height:150px;">￥{{v.price}}</td>
		        <td style="line-height:150px;">{{v.gdcount}}</td>
		        <td style="line-height:150px ;">
		          ￥{{v.price*v.gdcount}}
		        </td>
		      </tr>
		  </table>
		   <button class="btn btn-link" @click="huiqu()" style="float: right; font-size: 20px;">返回</button>
		</div>
		
	</div>
</template>

<script>
	import main_search from "./main_search.vue"
	export default {
		components: {main_search},
		
		data:function(){
		  return{
		    myOrderinfo:[], //我的订单
			ofdate:"",
		    od:[], //订单明细
		  }
		},
		methods:{
			//检测用户是否在线
			useronline:function(){
			  var o = this;
			  $.ajax({
			    url: "http://127.0.0.1:8080/java06/ajax/useronline",
			    success: function(r) {
			      if(r==""){
			        o.$router.push("/login");
			      }else{
			        o.myorder();
			      }
			    },
			    xhrFields: {
			      withCredentials: true //传递cookie,保持session的唯一性
			    },
			    crossDomain: true,
			  })
			},
			//我的订单
			myorder:function(){
			  var o = this;
			  $.ajax({
			    url: "http://127.0.0.1:8080/java06/ajax/myorder",
			    success: function(r) {
			           o.myOrderinfo=r;
					   o.ofdate = o.myOrderinfo.ofdate.substring(0,10);
					   console.log(newstring); // 除了春天爱
			    },
			    xhrFields: {
			      withCredentials: true //传递cookie,保持session的唯一性
			    },
			    crossDomain: true,
			  })
			},
			//订单明细
			orderDetails:function(ofid){
			  var o = this;
			  $.ajax({
			    url: "http://127.0.0.1:8080/java06/ajax/orderDetails",
			    data:{ofid:ofid},
			    success: function(r) {
			       o.od = r;
			       setTimeout(function(){
			         $(".order").css("top","100px");
			       },200)
			       $(".order").css("display","block")
			    },
			    xhrFields: {
			      withCredentials: true //传递cookie,保持session的唯一性
			    },
			    crossDomain: true,
			  })
			},
			//跳转商品详情页面
			jumpGoodsinfo:function(goodsinfo){
			  console.log(goodsinfo)
			  this.$router.push({path:"/goodsinfo",query:goodsinfo})
			},
			//返回
			huiqu:function(){
			  $(".order").css("top","-400px");
			  setTimeout(function(){
			    $(".order").css("display","none")
			  },500)
			},
		},
		mounted() {
			this.useronline()
		}
		
	}
</script>

<style>
	.order{
		width: 80%;
		margin: 0 auto;
	
	    display: none;
	    transition: top 0.5s;
	  
	}
</style>
