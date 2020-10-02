<template>
	<div>
		<v-overlay :value="overlay">
			<v-btn icon @click="overlay = false" >
				<v-progress-circular indeterminate size="64"></v-progress-circular>
			</v-btn>
		</v-overlay>
		<v-container class="pa-6">

			<v-row id="cards">
				<v-col wrap cols=12 md=4 v-for="item in products" :key="item._id" >
					<v-item-group>
						<v-card class="elevation-7 pa-3" tile>
							<v-img  class="mx-auto primage" lazy-src aspect-ratio="1.77"
							:src="item['media'][0]">
						</v-img>
						<v-card-title style="height: 90px;  overflow-y: auto;" class="d-flex justify-center pt-1">
							{{item.productname}}
						</v-card-title> 


						<v-card-actions class="pa-0 pt-4">
							<v-spacer></v-spacer>
							<v-btn color="blue" @click="view(item._id)" tile text outlined>View Product
								<v-icon left>mdi-playlist-edit</v-icon>
							</v-btn>
									<!-- <v-btn :loading="loading" @click="removeproduct(item._id)" color="red" text tile outlined>Remove
										<v-icon left>mdi-delete</v-icon>
									</v-btn> -->
								</v-card-actions>

							</v-card>

						</v-item-group>
						<v-dialog v-if="sproduct" v-model="viewproduct" 
						hide-overlay width="800">
							<v-card dark>
								<!-- {{sproduct}} -->
								
								<h1 class="text-center pa-3">{{sproduct.productname}}</h1>
								<h2 class="text-center">{{sproduct.productprice}} ₹</h2>
								<h3 class="text-center">{{sproduct.description}}</h3>
								
								<v-card-actions>
							<v-spacer></v-spacer>

									<v-btn :loading="loading" @click="viewproduct = !viewproduct" color="blue" text tile outlined>Close
										<v-icon left>mdi-close</v-icon>
									</v-btn>
									<v-btn :loading="loading" @click="removeproduct(sproduct._id)" color="red" text tile outlined>Remove
										<v-icon left>mdi-delete</v-icon>
									</v-btn>
						</v-card-actions>

						<v-carousel class="pt-5 pl-16 pr-16 pb-3"
								cycle
								delimiter-icon="mdi-minus"
								hide-delimiters
								show-arrows-on-hover>
								<v-carousel-item
								v-for="(image, i) in sproduct.media" :key="i">
								<v-img lazy-src aspect-ratio="1.77" :src="image"></v-img>
							</v-carousel-item>
						</v-carousel>
						
					</v-card> 
				</v-dialog>
			</v-col>
		</v-row>
	</v-container>
	<v-dialog v-model="dialog" hide-overlay persistent  width="300" >
		<v-card color="danger" dark >
			<v-card-text>
				Product Removing From the Database
				<v-progress-linear indeterminate color="white" class="mb-0"
				></v-progress-linear>
			</v-card-text>
		</v-card>
	</v-dialog>
	<!-- END MODEL -->
</div>
</template>

<script type="text/javascript">
	export default{
		name:"productcards",
		data(){
			return{
				overlay:false,
				dialog:false,
				viewproduct:false,
				loading:false,
				productid:""
			}
		},
		// async mounted(){
		// 	console.log("%c Mount Fired ",'background: #222; color: green')
		// },
		computed:{
			products(){
				return this.$store.getters["products/getproducts"]

			},
			sproduct(){
				return this.products.find(item => item._id == this.productid)
			}
		},
		methods:{
			removeproduct: async function (e) {
				this.dialog = true
				console.log(e)
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				let data = await this.$axios.$delete("https://wiredapi.herokuapp.com/product/delete/"+e)
				console.log(data)
				if(data['status'] == "success"){
					console.log('Ok')
					this.$store.commit("products/removeproduct",e)
					this.dialog = false
				}

				else{
					console.log(result)
				}

			},
			view:async function(arg){
				console.log(arg)
				this.productid = arg
				this.viewproduct = true
			}
		}
	}
</script>


<style scoped>
/*#cards{
	min-height: 300px;
	max-height: 400px;
	}*/
	.v-alert{
		margin-bottom:0;
	}
	.v-image.v-responsive.mx-auto.primage.theme--light{
		border-radius: 2px;
	}
</style>