<template>
	<div>
		<main_search></main_search><br />
		<main_sou></main_sou><br />
		<main_swipper></main_swipper><br />
		<main_goods></main_goods><br />
		

	</div>
</template>

<script>
	import main_search from "./main_search.vue"
	import main_sou from "./main_sou.vue"
	import main_swipper from "./main_swipper.vue"
	import main_goods from "./main_goods.vue"
    
	export default {
		components: {
			main_search,
			main_sou,
			main_swipper,
			main_goods
		},
		watch: {
			$router: function() {
				this.$router.go(0)
			}
		}
	}
</script>


<style scoped="">
	
</style>
