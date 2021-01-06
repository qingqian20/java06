<template>
	<div>

		<div class="register">
			<br />
			<p>请注册</p>
			<br />
			<div class="form-group">
				<input type="text" class="form-control"  v-model="logname"  placeholder="账号">
			</div>
			<br />
			<div class="form-group">
				<input type="password" class="form-control"  v-model="password" placeholder="密码">
			</div>
			<br />
			<div class="form-group">
				<div class="text"><input type="password" class="form-control" v-model="yzm"  placeholder="验证码" style="width: 60%; "></div>
				
				<div class="yzm"><img  @click="flush()"  src="http://127.0.0.1:8080/java06//kaptcha" /></div>
			</div>
			<br />
			<button class="btn btn-block btn-info" @click="register()">注册</button><br />
			<div class="item_4" style="float: left;">
				已注册<router-link to="/login">我要登录</router-link>
			</div>

			<a style="float:right;" href="/">返回首页</a>

		</div>
		
	</div>
</template>

<script scoped="">
	export default {
		data: function() {
			return {
				logname: "",
				password: "",
				yzm: ""
			}
		},
		methods: {
			//刷新验证码
			flush:function(){
				
			  $.get("http://127.0.0.1:8080/java06//kaptcha",function(){
			     $(".yzm").prop("src","http://127.0.0.1:8080/java06//kaptcha");
			  })
			},
			
			register: function() {
				var o = this;
				//检验验证码
				$.ajax({
						url: "http://127.0.0.1:8080/java06//kaptcha",
						data: {
							kaptcha: o.yzm

						},
						xhrFields: {
							withCredentials: true //传递cookie,保持session的唯一性
						},
						crossDomain: true,
						//
						success: function(r) {
							
							if(r){
								//请求注册
							$.ajax({
								url: "http://127.0.0.1:8080/java06/ajax/register",
								data: {
									logname: o.logname,
									password: o.password
								},
								//跳转登录界面登录状态
								success: function(r) {
									if (r > 0) {
										o.$router.push("/login")
									}
								},
							})

						} else {
							$.get("http://127.0.0.1:8084/java2020_06/kaptcha", function() {
								$(".yzm").prop("src", "http://127.0.0.1:8084/java2020_06/kaptcha");
							})
							alert("验证码错误！")
						}

					},
					xhrFields: {
						withCredentials: true //传递cookie,保持session的唯一性
					},
					crossDomain: true,
				})

		}
	}





	}
</script>

<style >
	.register {
		width: 400px;
		height: 500px;
		border: 2px solid aqua;
		margin: auto;
		padding: 20px;
		margin-top: 100px;

	}

	img {
		width: 40%;
		height: 37px;
		position: relative;
		margin-top: -63px;
		margin-left: 211px;
	}
</style>
