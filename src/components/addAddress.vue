<template>
	<div>
		
	  <div class="updateaddress" style="width: 30%;margin: 100px auto ; border: 1px solid #00FFFF; padding: 20px;">
              <linkage></linkage>
	         <div class="form-group">
	           <label for="dAddress">详细地址:</label>
	           <textarea v-model="dAddress" class="form-control" id="dAddress"></textarea>
	         </div>
	         <div class="form-group">
	           <label for="usr">收件人:</label>
	           <input v-model="linkpeople" type="text" class="form-control" id="usr">
	         </div>
	         <div class="form-group">
	           <label for="usr">手机号:</label>
	           <input v-model="phone" type="text" class="form-control" id="usr">
	         </div>
	         <button class="btn btn-info btn-block" @click="addAddress()">确定</button>
	   </div>
	</div>
</template>

<script>
	import linkage from "./linkage.vue" //三级联动组件
	export default{
	  components:{
	   linkage
	  },
	  data:function(){
	    return{
	      dAddress:"", //添加详细地址
	      phone:"", //添加手机号
	      linkpeople:"", //添加联系人
	      orderinfo:this.$route.query.orders
	    }
	  },
	
	 methods:{
	   //添加收货地址
	   addAddress:function(){
	     var o = this;
	     var ar = $("#province").val()+$("#city").val()+$("#area").val()//通过三级联动组件id获取属性值
	     $.ajax({ //
	       url: "http://127.0.0.1:8080/java06/ajax/addAddress",
	       data:{address:ar,dAddress:o.dAddress,phone:o.phone,linkpeople:o.linkpeople},
	       success: function(r) {
	          if(r>0){
	            o.$router.push({path:"/orderinfo",query:{orders:o.orderinfo}})
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
</style>
