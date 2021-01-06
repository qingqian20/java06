<template>
	<div class="input-group mb-3" style="width: 500px;margin: auto; margin-top: 15px;">
		<input class="form-control" v-model="searchtext" @blur="hide()" @focus="show()" @keyup="c1()" style=" outline: none; box-shadow: none;" >
		<div class="input-group-append">
			<button class="btn btn-info" type="submit"  style=" outline: none; box-shadow: none;" @click="jumpSearch()" >搜索</button>
		</div>
		<ul class="o">
			<li @click="check(v.gdname)" v-for="v in searchresult">{{v.gdname}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				searchtext: "",//搜索文本s
				searchresult:[], //搜索结果
				
			}
		},
		
		methods: {
			//跳转搜索页面
			jumpSearch:function(){
			  this.$router.push({path:"/goodssort",query:{searchtext:this.searchtext}})
			},
			//搜索提示
			c1: function() {
				var obj = this;
				$.ajax({
					url: "http://127.0.0.1:8080/java06/ajax/searchtit",
					data: {
						gdname: obj. searchtext
					},
					success: function(r) {
						obj.searchresult = r;
						console.log(r.gdname);
					},
					
				})
			},
			//显示提示
			show:function(){
			  $(".o").css("display","block");
			},
			//隐藏提示
			hide:function(){
			  setTimeout(function(){
			    $(".o").css("display","none");
			  },300)
			},
			//选择提示文本
			check:function(gdname){
			  this.searchtext = gdname;
			},
			
	
		}
	}
</script>

<style scoped="">
	
	.o {
		border: 1px solid  aquamarine;
		border-top: none;
		width: 500px;
		margin:0px auto;
		padding: 0px;
		position: absolute;
		list-style-type:none;
		z-index: 10;
	    background-color: white;
		margin-top: 40px;
		display:  none;
	}
	
	input:focus ~.o{
	  display: block;
	}
	
	
	.o li:hover{
	  background-color: gainsboro;
	}
	.o li{
	    font-size: 18px;
	    text-indent: 18px;
	}
	 .carousel-inner img {
	      width: 100%;
	      height: 100%;
	  }
	  .nav-item:focus{
		  background-color: #7FFFD4;
	  }
</style>
