<!-- Add product with a image selecting strategy -->

<template>
	<div>
		<TopBar/>
		<v-container class="pa-10">
			<h1 class="text-center">Add a New Product</h1>
			<v-form>
				<v-row>
					<v-col cols="9">
						<v-text-field background-color="blue lighten-5" prepend-icon="mdi-note" v-model="productname" outlined label="Product Name"></v-text-field>
					</v-col>
					<v-col cols="3">
						<v-text-field background-color="blue lighten-5" type="number" prepend-icon="mdi-cash-multiple" v-model="productprice" outlined label="Product Price"></v-text-field>
					</v-col>

				</v-row>
				<v-row>
					<v-col cols=12>
						<v-textarea row-height=25  auto-grow background-color="blue lighten-5" prepend-icon="mdi-format-align-left" v-model="desc" outlined label="Product Description"></v-textarea>
					</v-col>
					<v-col cols=12>
						<v-textarea row-height=15  auto-grow background-color="blue lighten-5" prepend-icon="mdi-pencil" v-model="points" outlined label="Points: add  ,  [comma] to separate, [Example: Point1,Point2,Point3]"></v-textarea>
					</v-col>
					<v-col cols=4>
						<v-text-field background-color="blue lighten-5" type="number" prepend-icon="mdi-sack-percent" v-model="stock" outlined label="Stock Count"></v-text-field>

						<!-- Image Gallary -->
						<v-dialog v-model="dialog" hide-overlay persistent width="500">
							<v-card color="primary" dark >
							<v-card-text>
								Please stand by
								<v-progress-linear indeterminate color="white" class="mb-0">
									
								</v-progress-linear>
							</v-card-text>
						</v-card>
					</v-dialog>

				</v-col>
				<v-col cols=4  class=" d-flex">
					<v-btn outlined tile @click="simages=!simages">
						<span v-if="selectedimg.length < 1">Select Image</span>
						<span v-if="selectedimg.length >= 1">
						{{selectedimg.length}} images selected</span>
					</v-btn>

				</v-col>
			</v-row>
			<v-row>
				<v-col cols=6>
					<v-btn  tile outlined block class="black--text" @click="addproduct"><v-icon left>mdi-check</v-icon>Save</v-btn>
				</v-col>	
			</v-row>
		</v-form>
		<!-- DIALOGS -->
		<v-dialog v-model="simages" persistent width="1000">
			<v-card>
				<v-card-title fixed>Select your Images. {{selectedimg.length}} Selected
				<v-spacer></v-spacer>
				 <v-btn class="px-6" text outlined tile @click="simages = !simages">Done</v-btn>
				</v-card-title>				
				<v-container>
					<v-row  dense wrap>
						<v-col v-for="image in allimages" :key="image._id" cols=3>
							<v-img		
							height="180"
							width="250"
							:src="image['mediaurl']"	
							></v-img>
							<v-checkbox label="Select Image" 
							v-model="selectedimg" :value="image['mediaurl']">
						</v-checkbox>
					</v-col>
				</v-row>	
			</v-container>
			
		</v-card>
	</v-dialog>

	<v-dialog width="500"  v-model="error" >
		<v-card>
			<v-card-title>Product Creation Failed</v-card-title>
		</v-card>
	</v-dialog>
</v-container>
</div>
</template>

<script type="text/javascript">
	import TopBar from "~/components/basics/topbar"
	export default{
		name:"addpoduct",
		components:{TopBar},
		data(){
			return{
				productname:'Product ',
				productprice:'',
				desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur',
				stock:0,
				selectedimg:[],

				simages:false,
				dialog:false,
				error:false,

			}
		},
		computed:{
			allimages(){
				return this.$store.getters["products/getimages"]
			}
		},
		methods:{
			addproduct: async function () {
				this.dialog = true
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				let data = await this.$axios
				.$post("https://wiredapi.herokuapp.com/product/addproduct",
				{
					"productname": this.productname,
					"productprice": this.productprice,
					"description": this.desc,
					"tax":10,
					"stock": this.stock,
					"media":this.selectedimg
				})
				console.log(data)
				if(data['status'] == "success"){
					console.log('Ok')
					this.$store.commit("products/insertnew",data["data"])
					this.$router.push("/products")
				}

				else{
					console.log(data['result'])
					this.dialog = false
					this.error = true
				}
			}
		}
	}
</script>