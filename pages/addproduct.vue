<template>
	<div>
		<TopBar/>
		<v-container class="pa-10">
			<h1 class="text-center">Add a New Product</h1>
			<v-form>
				<v-row>
					<v-col cols="9">
						<v-text-field maxlength = "60" counter="60" background-color="blue lighten-5" prepend-icon="mdi-note" v-model="productname" outlined label="Product Name"></v-text-field>
					</v-col>
					<v-col cols="3">
						<v-text-field background-color="blue lighten-5" type="number" prepend-icon="mdi-cash-multiple" v-model="productprice" outlined label="Product Price"></v-text-field>
					</v-col>

				</v-row>
				<v-row>
					<v-col cols=2>
						<v-text-field background-color="blue lighten-5" type="number" prepend-icon="mdi-sack-percent" v-model="stock" outlined label="Stock Count"></v-text-field>
					</v-col>
					<v-col cols=3>
						<v-autocomplete solo background-color="blue lighten-5" prepend-icon="mdi-group" outlined label="Category" :items="categoryitems" v-model="category" @input="categorychange">
							
						</v-autocomplete>
					</v-col>
					<v-col cols=7>
						<v-text-field v-model="shortintro" maxlength = "100" counter="100" background-color="blue lighten-5" prepend-icon="mdi-tag" outlined label="One Line Description"></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols=12>

						<v-textarea counter row-height=25 tag="textarea"  auto-grow background-color="blue lighten-5" prepend-icon="mdi-format-align-left" v-model="description" outlined label="Product Description"></v-textarea>

						<!-- <div v-html="$md.render(desc)"></div> -->
					</v-col>
				</v-row>
				<p>Add Images:  <strong>[ Maximum 3 Images Per Product]</strong></p>
				<v-row v-if="images.length < 3" wrap>
					<v-col cols="12" md="3">						
						<label for="upload">
							<div style="background-color: lightgrey; height: 150px;"  >
								<v-icon  x-large id="icon">mdi-plus</v-icon>	
							</div>
							<v-file-input @change="parseimg" v-model="file" hide-details id="upload" accept="image/*" style="display: none;">	
							</v-file-input>
						</label>
					</v-col>
				</v-row>

				<v-row wrap>
					<v-col v-if="images" v-for="(img,index) in images" :key="index" cols="12" md="3">
						<v-card class="pa-3">
							<v-img contain aspect-ratio="1.5"
							:src="img"></v-img>
							<v-card-actions>
								<v-btn outlined>View</v-btn>
								<v-spacer></v-spacer>
								<v-btn @click="removeimg(img)" outlined>Delete</v-btn>
							</v-card-actions>
						</v-card>	
					</v-col>
				</v-row>

				<v-row>
					<v-col cols=6>
						<v-btn  tile outlined block class="black--text" @click="addproduct"><v-icon left>mdi-check</v-icon>Save</v-btn>
					</v-col>	
				</v-row>
			</v-form>

			<!-- Image Preview -->
			<v-dialog v-if="file" v-model="imagepreview" hide-overlay persistent width="800">
				<v-card class="py-6 px-2">
					<v-img contain height="400" :src="parsedimg"></v-img>
					<v-card-actions>
						<v-btn outlined @click="selectimg">
							Ok
						</v-btn>
						<v-btn outlined @click="clearimg">
							Cancel
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<!-- Image Upload -->
			<v-dialog v-model="productonup" hide-overlay persistent width="500">
				<v-card color="green">
					<v-card-text>
						<div class="py-4 white--text text-h6">Product is Uploading...</div>
						<v-progress-linear indeterminate color="white" class="mb-0 pa-1"></v-progress-linear>
					</v-card-text>
				</v-card>
			</v-dialog>

			<v-dialog width="500"  v-model="error" >
				<v-card>
					<v-card-title>Product Creation Failed</v-card-title>
				</v-card>
			</v-dialog>

			<!-- OVERLAY -->
			<v-overlay :value="overlay">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
			</v-overlay>

		</v-container>
	</div>
</template>

<script type="text/javascript">
	import TopBar from "~/components/basics/topbar"
	import AddCategory from "~/components/dialogs/addnewcategory"

	import imageCompression from 'browser-image-compression';

	// import md from "@nuxtjs/markdownit"
	export default{
		name:"addpoduct",
		components:{TopBar,AddCategory},
		data(){
			return{
				productname:'Product Name ',
				productprice:58,
				shortintro : "This is a Single Line Intro",	
				description:'This is a Long Description about the product',
				stock:1,
				category:'Two',
				images:[],

				categoryitems: ['One', 'Two', 'Three'],
				simages:false,
				dialog:false,
				error:false,
				file : null,
				overlay : false,
				imagepreview: false,
				parsedimg:'',
				productonup: false,

				rules: [v => v.length <= 25 || 'Max 25 characters'],
			}
		},
		computed:{

		},
		methods:{
			addproduct: async function () {
				this.dialog = true
				this.productonup = !this.productonup
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				let data = await this.$axios
				.$post("https://wiredapi.herokuapp.com/product/addproduct",
				{
					"productname": this.productname,
					"productprice": this.productprice,
					"category": this.category,
					"shortintro": this.shortintro,
					"description": this.description,
					"stock": this.stock,
					"media":this.images
				})
				console.log(data)
				if(data['status'] == "success"){
					this.productonup = !this.productonup
					console.log('Ok')
					this.$store.commit("products/insertnew",data["data"])
					this.$router.push("/products")
				}

				else{
					console.log(data['result'])
					this.productonup = !this.productonup
					this.dialog = false
					this.error = true
				}
			},
			categorychange: function(){
				return ;
			},
			parseimg(){
				try{
					console.log(this.file)
					this.overlay = !this.overlay
					imageCompression(this.file, { 
						maxSizeMB: 0.5,         
						useWebWorker: true,      
						fileType: 'image/jpeg',
						maxIteration: 20        
					}).then(compressedimg =>{
						this.overlay = !this.overlay
						console.log(compressedimg)
						imageCompression.getDataUrlFromFile(compressedimg).then(data =>{
							localStorage.removeItem("image")
							localStorage.setItem('image',data)
							this.imagepreview = !this.imagepreview
							this.parsedimg = data
						})

					})
				}
				catch{
					console.log("FAILED")
				}
				


			},
			clearimg(){
				this.file = null
				this.imagepreview = !this.imagepreview
			},
			selectimg(){
				this.images.push(this.parsedimg)
				this.imagepreview = !this.imagepreview
			},
			async uploadimage(){
				this.imageonup = !this.imageonup
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				let data = await this.$axios.$post("https://wiredapi.herokuapp.com/images/addimage",{
					"imagedata":localStorage.getItem("image")
				}
				)
				if(data["status"] == "success"){
					this.images.push(data["data"]["mediaurl"])
					this.imageonup = !this.imageonup
					this.imagepreview = !this.imagepreview
				}
				else{
					this.imageonup = !this.imageonup
					this.imagepreview = !this.imagepreview
					console.log(data)
					alert("Image Upload Failed")
				}
			},
			removeimg(e){
				console.log(e)
			}
		},
		
		// mounted(){
		// 	var easyMDE = new EasyMDE();
		// 	console.log(easyMDE)
		// }
	}
</script>

<style lang="css" scoped>
#icon{
	display: flex; align-items: center; justify-content: center; height: 100%
}
#icon:hover{
	background-color: white
}
</style>	