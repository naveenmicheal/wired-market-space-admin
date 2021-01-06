<template>
	<div>
		<v-container>
				<v-toolbar dense class="elevation-0">
						<v-toolbar-title style="overflow-x: auto;">
							Wired Market Space
						</v-toolbar-title>
						<v-spacer></v-spacer>
						<!-- <v-btn-toggle tile dense color="deep-purple accent-3" group>
						<v-btn dense>
							Last 1 Day
						</v-btn>
						<v-btn dense>
							Last 7 Days
						</v-btn>

						<v-btn dense>
							Last 30 Days
						</v-btn>

						<v-btn dense>
							All Time
						</v-btn>
					</v-btn-toggle> -->
				</v-toolbar>
		<v-row>
			<v-col cols=4>
				<!-- <v-card :color="card.color" class="elevation-15 pa-4" tile dark >

					<h2 class="text-center" >{{card.cardname}}</h2>
					<h3 class="text-center">{{card.count}}<v-icon right large>{{card.icon}}</v-icon></h3>
					<v-icon large right>mdi-finance</v-icon>

				</v-card> -->
				<v-card color="pink darken-3" class="elevation-15 pa-4" tile dark >

					<h2 class="text-center" >Total Orders</h2>
					<h3 class="text-center">{{this.totalorders}}<v-icon right large>mdi-briefcase-check</v-icon></h3>
					<v-icon large right>mdi-finance</v-icon>

				</v-card>
			</v-col>

			<v-col cols=4>
				<v-card color="light-blue darken-4" class="elevation-15 pa-4" tile dark >

					<h2 class="text-center" >Total Income</h2>
					<h3 class="text-center">{{this.totalprice}} ₹</h3>
					<v-icon large right>mdi-finance</v-icon>

				</v-card>
			</v-col>
			<v-col cols=4>
				<v-card color="blue-grey darken-4" class="elevation-15 pa-4" tile dark >

					<h2 class="text-center" >Total Products</h2>
					<h3 class="text-center">{{this.totalproducts}}<v-icon right large>mdi-tag-multiple</v-icon></h3>
					<v-icon large right>mdi-finance</v-icon>

				</v-card>
			</v-col>
		</v-row>
		</v-container>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{

				width: 1,
				radius: 10,
				padding: 2,
				lineCap: 'round',
				labels:[""],
				value: [0, 2, 5, 9, 5, 0, 3, 5, 0, 0, 1, 8, 2, 9, 0, 1, 8, 2, 9,0,4,6,3,9,5,3,5,6,1, 3, 5, 0, 0, 1, 8, 2, 9, 7],
				

				fill: false,
				type: 'trend',
				autoLineWidth: false,
				// carddata:[
				// {
				// 	cardname:"Total Orders",
				// 	icon:"mdi-briefcase-check",
				// 	count:this.totalorders,
				// 	color:"pink darken-3"
				// },
				// {
				// 	cardname:"Total Income",
				// 	icon:"",
				// 	count:this.totalprice,
				// 	color:"light-blue darken-4"
				// },
				// {
				// 	cardname:"Total Products",
				// 	icon:"mdi-tag-multiple",
				// 	count:this.$store.getters["products/getproducts"].length,
				// 	color:"blue-grey darken-4"
				// },
				// ],
			}
		},
		computed:{
			totalprice(){
				return this.$store.getters["products/getprice"]
			},
			totalorders(){
				return this.$store.getters["products/getorders"]
			},
			totalproducts(){
				return this.$store.getters["products/getproducts"].length
			}
		},
		methods:{
			fetchorders(){
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				this.$axios.$get("https://wiredapi.herokuapp.com/orders/getsucess").then(data=>{
					console.log(data)
					this.$store.commit("products/totalorders",data.data.length)
					let totalprice = 0
					data.data.forEach(data =>{
						totalprice += parseInt(data.totalprice) 
					})
					console.log("#: ",totalprice)
					this.$store.commit("products/totalprice",totalprice)

				}).catch(err=>{
					console.log(err)
				})
			},
		},
		mounted(){
			this.fetchorders()
			
		}
	}
</script>

<style scoped>
h3.text-center{
	font-size: 30px;
}
</style>