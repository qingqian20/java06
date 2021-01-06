<template>
	<div>
	
		<div class="login">
			<br />
			<p>请登录</p>
			<br />
			<div class="form-group">
				<input type="text" class="form-control" v-model="logname"  placeholder="账号">
			</div>
			<br />
			<div class="form-group">
				<input type="password" class="form-control"  v-model="password"  placeholder="密码">
			</div>
			<a style="float: right;">忘记密码?</a><br />
			<br />
			<button class="btn btn-block btn-info" @click="querylogin">登录</button><br />
			<span style="float:left;">还没有账号?</span> <a href="/register" style="float:left;">立即注册</a>
			<a style="float:right;" href="/">返回首页</a>

		</div>
		
	</div>
</template>

<script>
	
	export default {
		
		data:function(){
			return{
				logname:"",
				password:""
				
			}
		},
		methods:{
			//发送请求登录
			querylogin:function(){
				var o=this;
				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/querylogin",
					data:{
						logname:o.logname,
						password:o.password,
						
					},
					//获取登录状态
					success: function(r) {
						if(r){
							$.ajax({
								url: "http://127.0.0.1:8080/java06/ajax/useronline",
								success: function(r) {
									alert("登录成功")
									console.log(r);
									o.$router.push("/");
								},
								xhrFields: {
									withCredentials: true //传递cookie,保持session的唯一性
								},
								crossDomain: true,
							})
							
						}else{
							alert("登录失败")
						}
						
					},
					xhrFields: {
					  withCredentials: true //传递cookie,保持session的唯一性
					},

				})
				
			},
		}
		
		
		
		
		
		
	}
</script>

<style scoped="">
	.login {
		width: 400px;
		height: 500px;
		border: 2px solid aqua;
		margin: auto;
		padding: 20px;
		margin-top: 100px;
		
	}
</style>
