<template>
	<div>
		<TopBar/>
		<v-container class="pa-10">
			<h1 class="text-center">Add a New Product</h1>
			<v-form>
				<v-row>
					<v-col cols="9">
						<v-text-field background-color="blue lighten-5" prepend-icon="mdi-note" v-model="productname" solo label="Product Name"></v-text-field>
					</v-col>
					<v-col cols="3">
						<v-text-field background-color="blue lighten-5" type="number" prepend-icon="mdi-cash-multiple" v-model="productprice" solo label="Product Price"></v-text-field>
					</v-col>

				</v-row>
				<v-row>
					<v-col cols=12>
						<v-textarea row-height=25  auto-grow background-color="blue lighten-5" prepend-icon="mdi-format-align-left" v-model="desc" solo label="Product Description"></v-textarea>
					</v-col>
					<v-col cols=4>
						<v-text-field background-color="blue lighten-5" type="number" prepend-icon="mdi-sack-percent" v-model="stock" solo label="Stock Count"></v-text-field>

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
						<span v-if="selectedimg.length >= 1">{{selectedimg.length}} images selected</span>
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
				<v-card-title>Select your Images</v-card-title>
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
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text tile @click="simages = !simages">Done</v-btn>
			</v-card-actions>
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
				desc:'Product Description',
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