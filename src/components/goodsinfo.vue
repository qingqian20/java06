<template>
	<div>
		<main_search></main_search><br />
		<p style="text-align: center;font-size: 30px;">商品信息</p>
		<div class="godsinfo" >
			<div class="imgs" >
				<img  :src="'../../static/tp/'+goods.gimgurl"/>
			</div>
			<div class="gooodstext">
				<div>
				  <span style="font-weight: bold;font-size: 30px;">
				    {{goods.gdname}}
				  </span>
				</div>
				<br />
				<div>
				  <span style="font-size: 25px;">
				    价格：<span style="font-size: 27px; color: red;">￥{{goods.price}}</span>
				  </span>
				
				</div>
				<br />
				<div>尺码：
				<label  v-for="v in goodsSize">
				  <input v-if="v.gsid==7" checked="checked" hidden="hidden" type="radio" name="size" />
				  <input v-else  hidden="hidden" type="radio" name="size" />
				  <button @click="gsid=v.gsid" class="size">{{v.gstext}}</button>
				</label>
				
				</div>
				<br />
				<div>数量：
				<button @click="gdcount==1?1:gdcount--" class=" btn btn-light" style="background-color: palegreen; border-radius: 8px;">-</button> 
				<span>&nbsp;{{gdcount}}&nbsp;</span>
				<button @click="gdcount++" class="btn btn-light" style="background-color: paleturquoise; border-radius: 8px;">+</button>
				</div>
				
				<br />
				<div>收藏：
				  <svg  v-if="isC" @click="addCollection()"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
				    <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 
					1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28
					 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
				  </svg>
				  
				  <svg  v-else @click="delCollection()"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
				    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
				  </svg>
				</div>
				<br />
				<div>
				  <button @click="addCart()" class="btn btn-block" style="background-color: orangered;color: white; width: 50%; border-radius: 10px;">添加购物车</button>
				</div>
				 <div style="padding-top:0px ;">
				   <h1>广告:</h1>
				   <h2 style="color: red;">快来赞助我!!!</h2>
				  
				   <br />
				 </div>
			</div>   
		</div>
	</div>
</template>

<script>
	import main_search from "./main_search.vue"
	export default {
		components: {
			main_search
		},
		watch: {
			$router: function() {
				this.$router.go(0)
			}
		},
		data:function(){
			return{
				goods:this.$route.query, //商品信息
				goodsSize:[],//商品尺码
				gdcount:1, //商品数量
				isC:true,// 判断商品是否被收藏
				gsid:7
			}
		},
		mounted() {
		  this.useronline()
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
			        o.queryGoodsSize();
			        o.isCollection();
			      }
			    },
			    xhrFields: {
			      withCredentials: true //传递cookie,保持session的唯一性
			    },
			    crossDomain: true,
			  })
			},
			
			//添加商品收藏
			addCollection:function(){
			    var o = this;
			    $.ajax({
			      url: "http://127.0.0.1:8080/java06/ajax/addCollection",
			      data:{gdid:o.goods.gdid},
			      success: function(r) {
			         if(r>0){
			           alert("收藏成功");
			           o.isCollection();
			         }
			      },
			      xhrFields: {
			        withCredentials: true //传递cookie,保持session的唯一性
			      },
			      crossDomain: true,
			    })
			},
			//取消商品收藏
			delCollection:function(){
			    var o = this;
			    $.ajax({
			      url: "http://127.0.0.1:8080/java06/ajax/delCollection",
			      data:{gdid:o.goods.gdid},
			      success: function(r) {
			         if(r>0){
			           alert("取消收藏成功");
			           o.isCollection();
			         }
			      },
			      xhrFields: {
			        withCredentials: true //传递cookie,保持session的唯一性
			      },
			      crossDomain: true,
			    })
			},
			//检测商品是否被收藏
			isCollection:function(){
			    var o = this;
			    $.ajax({
			      url: "http://127.0.0.1:8080/java06/ajax/isCollection",
			      data:{gdid:o.goods.gdid},
			      success: function(r) {
			         o.isC = r;
			      },
			      xhrFields: {
			        withCredentials: true //传递cookie,保持session的唯一性
			      },
			      crossDomain: true,
			    })
			},
			//查询尺码
			queryGoodsSize:function(){
			  var o = this;
			  $.ajax({
			    url: "http://127.0.0.1:8080/java06/ajax/queryGoodsSize",
			    success: function(r) {
			       for(var i in  r){
			         o.goodsSize = r;
			       }
			    },
			  })
			},
			
			//先检验是否已经添加
			addCart:function(){
			    var o = this;
			    $.ajax({
			      url: "http://127.0.0.1:8080/java06/ajax/isCart",
			      data: {gdid:o.goods.gdid,gsid:o.gsid},
			      success: function(r) {
			        if(r){
						//添加购物车
			          $.ajax({
			            url: "http://127.0.0.1:8080/java06/ajax/addCart",
			            data: {gdid:o.goods.gdid,gdcount:o.gdcount,gsid:o.gsid,ck:1},
			            success: function(r) {
			              if(r>0){
			                alert("添加成功");
			              }
			            },
			            xhrFields: {
			              withCredentials: true //传递cookie,保持session的唯一性
			            },
			            crossDomain: true,
			          })
			        }else{
			          alert("该商品已经添加到购物车")
			        }
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
	.godsinfo {
		width: 60%;
		height: 500px;
		margin: 50px auto;
		border: 3px solid peachpuff;
		background-color: papayawhip;
		
	}

	.imgs,
	.gooodstext {
		width: 30%;
		height: 500px;
		position: absolute;
		display: inline-block;
		padding: 20px 10px;
		
	}
	.gooodstext{
		
		margin-left: 30%;
	}
	
	img{
		width: 300px;
		margin-left: 65px;
	}
	.size{
		margin: 5px;
		color: red;
		border-radius: 5px;
		border: 1px solid pink;
		background-color: pink;
	}
	.size:focus{
		background-color:#FFEFD5;
	}
</style>
