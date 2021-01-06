<template>
	<div class="px-6 mx-6 " >
		<v-row v-for="product in products" :key="product._id" style="border-radius: 5px" class="product my-4">
			<v-col md="2">
				<v-img contain aspect-ratio="1.5" :src="product.media[0].url"></v-img>
			</v-col>
			<v-col  md="5" class="d-flex align-center">
				<h1 class="text-h5">{{product.productname}}</h1>
			</v-col>
			<v-col md="2" class="d-flex align-center">
				<h1 class="text-h5">{{product.productprice}} ₹</h1>
			</v-col>
			<v-col md="3" class="d-flex align-center">
				<v-row>
					<v-btn tile outlined @click="openproduct(product)">View</v-btn>
				</v-row>
				<v-row>
					<v-btn @click="removeprompt(product._id)" tile outlined>Remove</v-btn>
				</v-row>
			</v-col>
		</v-row>

		<!-- Delete confirmation -->
		<v-dialog v-model="prompt" persistent  max-width="400">
					<v-card>
						<v-card-title color="red">Are you sure want to remove?</v-card-title>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn text tile @click="removeaction">Yes</v-btn>
							<v-btn text tile @click="prompt = !prompt">No</v-btn>
						</v-card-actions>
					</v-card>
		</v-dialog>	
		<!-- Product Removing -->
		<v-dialog v-model="remove" hide-overlay persistent color="blue"  width="300" >
		<v-card color="red" dark >
			<v-card-text>
				Product Removing From the Database
				<v-progress-linear indeterminate color="white" class="mb-0"
				></v-progress-linear>
			</v-card-text>
		</v-card>
	</v-dialog>

	<!-- Product View -->
	<v-dialog
		v-if="viewproduct"
      v-model="viewproduct"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    <v-card>
        <v-toolbar dark color="primary" >
          <v-btn icon dark @click="viewproduct = false" >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Product Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text  @click="viewproduct = false" >
              Close
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        	<v-container class="pa-10">
			<h1 class="text-center">Product Information</h1>
			<v-form>
				<v-row>
					<v-col md="9">
						<v-text-field readonly maxlength ="60" counter="60" background-color="blue lighten-5" prepend-icon="mdi-note" v-model="viewproduct.productname" outlined label="Product Name"></v-text-field>
					</v-col>
					<v-col md="3">
						<v-text-field readonly  background-color="blue lighten-5" type="number" prepend-icon="mdi-cash-multiple" v-model="viewproduct.productprice" outlined label="Product Price"></v-text-field>
					</v-col>

				</v-row>
				<v-row>
					<v-col md=2>
						<v-text-field readonly  background-color="blue lighten-5" type="number" prepend-icon="mdi-sack-percent" v-model="viewproduct.stock" outlined label="Stock Count"></v-text-field>
					</v-col>
					<v-col md=3>
						<v-autocomplete  readonly solo background-color="blue lighten-5" prepend-icon="mdi-group" outlined label="Category" :items="categoryitems" v-model="viewproduct.category[0]" @input="categorychange">
							
						</v-autocomplete>
					</v-col>
					<v-col md=7>
						<v-text-field readonly  v-model="viewproduct.shortintro" maxlength = "100" counter="100" background-color="blue lighten-5" prepend-icon="mdi-tag" outlined label="One Line Description"></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col md=12>

						<v-textarea readonly  counter row-height=25 tag="textarea"  auto-grow background-color="blue lighten-5" prepend-icon="mdi-format-align-left" v-model="viewproduct.description" outlined label="Product Description"></v-textarea>

						<!-- <div v-html="$md.render(desc)"></div> -->
					</v-col>
				</v-row>
				<!-- <p>Add Images:  <strong>[ Maximum 3 Images Per Product]</strong></p> -->
				<p>Images:</p>
				<v-row wrap>
					<v-col v-if="viewproduct.media" v-for="(img,index) in viewproduct.media" :key="index" cols="12" md="3">
						<v-card class="pa-3">
							<v-img contain aspect-ratio="1.5"
							:src="img.url"></v-img>
							<v-card-actions>
								<v-btn disabled outlined>View</v-btn>
								<v-spacer></v-spacer>
								<v-btn disabled	 outlined>Delete</v-btn>
							</v-card-actions>
						</v-card>	
					</v-col>
				</v-row>

				<!-- <v-row>
					<v-col cols=6>
						<v-btn  tile outlined block class="black--text" @click="addproduct"><v-icon left>mdi-check</v-icon>Save</v-btn>
					</v-col>	
				</v-row> -->
			</v-form>

			<!-- Image Preview -->
			<!-- <v-dialog v-if="file" v-model="imagepreview" hide-overlay persistent width="800">
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
			</v-dialog> -->

			<!-- Image Upload -->
			<!-- <v-dialog v-model="productonup" hide-overlay persistent width="500">
				<v-card color="green">
					<v-card-text>
						<div class="py-4 white--text text-h6">Product is Uploading...</div>
						<v-progress-linear indeterminate color="white" class="mb-0 pa-1"></v-progress-linear>
					</v-card-text>
				</v-card>
			</v-dialog> -->

			<!-- <v-dialog width="500"  v-model="error" >
				<v-card>
					<v-card-title>Product Creation Failed</v-card-title>
				</v-card>
			</v-dialog> -->

			<!-- OVERLAY -->
			<!-- <v-overlay :value="overlay">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
			</v-overlay> -->

		</v-container>

      </v-card>
</v-dialog>

	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				prompt: false,
				remove: false,
				viewproduct: false,
				argid: '',

				viewproduct : null,
				categoryitems: ['One', 'Two', 'Three'],
				
			}
		},
		computed:{
			products(){
				return this.$store.getters["products/getproducts"]
			}
		},
		methods:{
			openproduct(e){
				console.log(e)
				this.viewproduct = e
			},
			removeprompt(e){
				this.prompt = !this.prompt
				this.argid = e
			},
			async removeaction(){
				this.prompt = !this.prompt
				this.remove = !this.remove
				console.log(this.argid)
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				let data = await this.$axios.$delete("https://wiredapi.herokuapp.com/product/delete/"+this.argid)
				console.log(data)
				if(data['status'] == "success"){
					console.log('Ok')
					this.$store.commit("products/removeproduct",this.argid)
					this.remove = false
					this.argid = ''
				}

				else{
					alert("failed")
					console.log(data)
					this.dialog = false
					this.prompt = !this.prompt
				}
			}
		}
	}
</script>

<style lang="css" scoped>
	.product{
		background-color: #ecf0f1;
		box-shadow: 1px 1px 10px;
	}
</style>