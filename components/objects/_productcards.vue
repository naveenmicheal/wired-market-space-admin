<template>
	<div>
		<v-container class="pa-6" >
			<v-row id="cards" v-if="!singleproduct" :class="{'d-none':singleproduct}" >
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
							<v-btn color="blue" block @click="view(item._id)" tile text outlined>View Product
								<v-icon left>mdi-playlist-edit</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-item-group>
			</v-col>
		</v-row>

		<v-row v-if="singleproduct">
			<v-col  cols=12 class="mx-auto" :class="{'d-none':!singleproduct}">
				<v-row>
					<v-col cols="5">
						<v-carousel cycle 
						delimiter-icon="mdi-minus"
						height="auto"
						>
						<v-carousel-item 
						v-for="(image,key) in sproduct.media" :key="key">
						<v-img :src="image"></v-img>
					</v-carousel-item>
				</v-carousel>

			</v-col>
			<v-col cols="7">
				<h1 class="prtitle">{{sproduct.productname}}</h1>
				<h2 class="prprice pt-3 pb-4"><b>PRICE:  </b>{{sproduct.productprice}}₹</h2>
				<hr>
				<h3 class="prprice pt-3 pb-4" >Available stock: {{sproduct.stock}}
				</h3>
				<v-btn color="blue"  @click="view(null)" text tile outlined>
					<v-icon left >mdi-close</v-icon>Close</v-btn>
					<v-btn color="red" @click="prompt =!prompt" text tile outlined>
						Remove <v-icon right >mdi-delete</v-icon></v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<p class="pt-1 pb-4"><strong>DESCRIPTION: </strong>{{sproduct.description}}</p>
					</v-col>
				</v-row>
				<v-dialog v-model="prompt"  max-width="400">
					<v-card>
						<v-card-title color="red">Are you sure want to remove?</v-card-title>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn text tile @click="removeproduct(sproduct._id)">Yes</v-btn>
							<v-btn text tile @click="prompt = !prompt">No</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>	

			</v-col>
		</v-row>
	</v-container>




	<v-dialog v-model="dialog" hide-overlay persistent color="blue"  width="300" >
		<v-card color="red" dark >
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
				prompt:false,
				loading:false,
				singleproduct:false,
				productid:''
			}
		},
		components:{},
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
					this.singleproduct = !this.singleproduct
					this.prompt = !this.prompt
				}

				else{
					alert("failed")
					console.log(data)
					this.dialog = false
					this.prompt = !this.prompt
				}

			},
			view:async function(arg){
				console.log(arg)
				this.productid = arg
				this.singleproduct = !this.singleproduct
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
	.prtitle{
		font-family: gotham a,gotham b,sans-serif;
		line-height: 1.3
	}
	.prprice{
		font-size: 1.5em;
		font-weight: 400;
		line-height: 1.4;
		letter-spacing: 2px;
	}
</style>