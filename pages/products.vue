<template>
	<div>
		<TopBar/>
		<Products class="px-2"/>
	</div>
</template>

<script type="text/javascript">
	import TopBar from "~/components/basics/topbar"
	// import ProductCards from "~/components/objects/productcards"
	import Products from "~/components/objects/product"
	export default{
		data(){
			return{

			}
		},
		components:{Products,TopBar},
		computed:{
			products(){
				return this.$store.getters["products/getproducts"]

			}
		}
	}
</script>