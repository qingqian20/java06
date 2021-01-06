<template>
	<div >
		<nav class="navbar navbar-expand-sm  navbar-light" style="margin: 0px 5px; border-bottom: 1px solid #ADB5BD; text-align: center;">
			

			<ul class="navbar-nav" style="text-align: center;margin-left: 180px;">
				<li class="nav-item">
					<router-link class="navbar-brand" to="/">首页</router-link>
				</li>
				
				<li class="nav-item">
					<router-link class="navbar-brand" to="/cart">购物车</router-link>
				</li>
				
				<li class="nav-item">
					<router-link class="navbar-brand" to="/myorder">我的订单</router-link>
				</li>
				
				
				<li class="nav-item">
					<router-link class="navbar-brand" to="/mycollection">我的收藏</router-link>
				</li>
				
				<li class="nav-item"  style="text-align: center;margin-left: 760px;">
					<router-link class="navbar-brand" v-if="username==''" to="/login">登录</router-link>
					
				</li>
                <li class="nav-item">
					<router-link class="navbar-brand" v-if="username==''" to="/register">注册</router-link>
					<span class="logname  navbar-brand"  v-else>{{username.logname}}</span>
					<ul class="usercase">
					  <li>
					    <a href="#" @click="personal()" >个人信息</a>
					  </li>
					  <li>
					    <a  href="http://127.0.0.1:8080/java06/quit">退出登录</a>
					  </li>
					</ul>
				</li>
			</ul>
		</nav>
		<!-- 个人信息窗口-->
		<div class="personal" style="text-align: left;">
		  <span @click="closeWindow()" class="closeX" style="float: right; margin-top: -20px; font-size: 40px;">&times;</span><br />
		
		  昵&emsp;称：<input readonly type="text" v-model="userinfo.name" /><br /><br />
		
		  性&emsp;别：<label>男 <input readonly v-model="userinfo.sex" value="0" type="radio"/></label>
		  <label>女 <input readonly v-model="userinfo.sex" value="1" type="radio"/></label><br /><br />
		
		  生&emsp;日：<input readonly type="date" v-model="userinfo.birthday" /><br /><br />
		
		  手机号：<input readonly type="text" v-model="userinfo.ufnum" /><br /><br />
		
		  地&emsp;址：<input readonly type="text" v-model="userinfo.address"/><br /><br />
		  <button @click="update()" class="btn btn-info update">修改</button>
		</div>
	</div>
</template>

<script scoped="">
	
	
	export default {
		data: function() {
			return {
				username:[],//买家对象 用户在线状态
				userinfo:"",// 用户的个人信息
			}
		},
		mounted() {
			this.useronline();
		},
		methods: {
			closeWindow:function(){
			     $(".personal").css("transform","scale(0)")
			},
			
			//获取登录状态
			useronline: function() {
				var obj = this;
				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/useronline",
					success: function(r) {
						obj.username=r;
						
					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
				})
			},
			//个人信息展示
			personal:function(){
			    var userid = this.username.userid;
			    var o = this;
			    $.ajax({
			      url: "http://127.0.0.1:8080/java06/ajax/personal",
			      data: {userid:userid},
			      success: function(r) {
			         o.userinfo = r;
					 console.log(r);
			         if(o.userinfo.birthday!=null){
			           o.userinfo.birthday = o.userinfo.birthday.substr(0,10)
			         }
			
			
			         $(".personal").css("transform","scale(1)")
			      },
			    })
			
			},
			//修改个人信息
			  update:function(){
			      var o = this;
			      if($(".update").text()=="修改"){
			          $(".personal input").css("border-bottom","1px solid skyblue");
			          $(".personal input").prop("readonly",false);
			          $(".update").text("保存");
			      }else{
			          $.ajax({
			            url: "http://127.0.0.1:8080/java06/ajax/update",
			            data: o.userinfo,
			            success: function(r) {
			               o.personal();
			               $(".update").text("修改");
			               $(".personal input").css("border-bottom","none");
			               $(".personal input").prop("readonly",true);
			            },
			          })
			      }
			  },

		}
	}


	
</script>

<style scoped="">
	.usercase{
	  list-style-type: none;
	  background-color: white;
	  border: 1px solid gainsboro;
	  position: absolute;
	  display: none;
	  padding: 5px;
	  margin-top: 8px;
	  
	}
	.usercase>li a{
	  display: block;
	  color: #20BDFE;
	  padding: 5px 0px;
	 
	}
	.usercase li:hover{
	 display: block;
	
	}
	.logname:hover + .usercase{
	  display: block;
	   
	}
	.usercase:hover{
	  display: block;
	
	}
	.personal{
	    width: 30%;
	    background-color: white;
		border: 1px solid #ADB5BD;
		border-top: none;
	    margin-left: 35%;
	    position: absolute;
	    z-index: 111;
	    padding: 20px;
	    transform: scale(0);
	    transition: all 0.3s;
	
	}
	.personal input{
	      background-color: transparent;
	      border: none;
	      outline: none;
	 }
	
	  
</style>
