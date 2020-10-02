	<template>
	<div>
		<TopBar/>
		<v-container>
			<v-row>
				<v-col class="px-6" cols="6">
					<v-file-input hide-details @change="previewimage" v-model="file" accept="image/*" label="Choose a image.." chips show-size solo>					 	
					</v-file-input>
				</v-col>
				<v-col cols="6" class="my-auto">
					<v-btn @click="uploadimage" tile outlined>Upload </v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="px-6" cols="12">
					<p class="text-center">Image Preview</p>
					<div style="overflow-x: auto;" class="mx-auto text-center" 
					v-if="file" id="preview">
					<img id="image" src="" aspect-ratio="2">
				</div>
			</v-col>
		</v-row>

		<v-row wrap>
			<v-col  v-if="this.allimages.length <= 0" cols="8" class="mx-auto">
				Getting Your Images...
				<v-progress-linear
				color="light-green darken-4"
				indeterminate
				height="10"
				striped
				></v-progress-linear>
			</v-col>
			<v-col 
			v-for="(image,key) in allimages" v-if="allimages.length >1" :key="key" cols="3">
				<v-img style="border:2px solid black;" lazy-src aspect-ratio="1.77" :src="image.mediaurl"></v-img>
				<!-- <p>{{image}}</p> -->

				<a target="_blank" :href="image.mediaurl">
				<v-btn icon>
					<v-icon color="blue">mdi-fullscreen</v-icon>
				</v-btn>
				</a>
				
				<v-btn @click="removeprompt(image._id)" icon><v-icon color="red">mdi-delete</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</v-container>


	<v-overlay :value="overlay">
		<v-progress-circular indeterminate size="64"></v-progress-circular>
	</v-overlay>	

	<v-dialog v-model="dialog" hide-overlay persistent width="500">
		<v-card dark>
			<v-card-text class="pa-6">
				{{dialogtext}}
				<v-progress-linear indeterminate color="white" class="mb-0 pa-1"></v-progress-linear>
			</v-card-text>
		</v-card>
	</v-dialog>

	<v-dialog v-model="prompt"  max-width="400">
		<v-card>
			<v-card-title color="red">Are you sure want to remove?</v-card-title>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text tile @click="removeimage(productid)">Yes</v-btn>
				<v-btn text tile @click="prompt = !prompt">No</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>	

	<v-snackbar v-model="alert" multi-line top :timeout="timeout">
		{{alerttext}}

		<template v-slot:action="{ attrs }">
			<v-btn color="pink"  text v-bind="attrs" @click="alert = false">
				Close
			</v-btn>
		</template>
	</v-snackbar>


</div>
</template>

<script type="text/javascript">
	import TopBar from "~/components/basics/topbar"
	import imageCompression from 'browser-image-compression';
	const options = { 
		maxSizeMB: 1,         
		useWebWorker: true,      
		fileType: 'image/jpeg',
		maxIteration: 20        
	}
	export default{
		name:"ImageGallary",
		data(){
			return{
				file:null,
				overlay:false,
				dialog:false,
				alert:false,
				prompt:false,
				productid:"",
				alerttext:"",
				timeout:3000,
				notifytext:["Image Upload Success","Image Deleted"],
				dialogtext:"",
				dialogs:["Uploading a Image ...",
				"removing a image",
				],
			}
		},
		computed: {
			allimages(){
				return this.$store.getters["products/getimages"]
			}
		},
		methods:{
			previewimage:function () {
				console.log(this.file)
				this.overlay = !this.overlay

				imageCompression(this.file, { 
					maxSizeMB: 0.5,         
					useWebWorker: true,      
					fileType: 'image/jpeg',
					maxIteration: 20        
				})
				.then(data=>{
					const reader = new FileReader()
					reader.addEventListener("load", ()=>{
						localStorage.removeItem("image")
						localStorage.setItem('image',reader.result)
						document.getElementById('image').src=reader.result
					},false);
					reader.readAsDataURL(data);
					this.overlay = false
				})
				.catch(error=>{
					// alert('Image Compression Failed')
					console.log(error)
					this.overlay = false
				})

			},
			uploadimage: async function(){
				try{
					if(this.file.type.split("/")[0] =="image"){
						this.dialogtext = this.dialogs[0]
						this.dialog = !this.dialog
						let token = document.cookie.split(";")[0].split("=")[1]
						this.$axios.setHeader('Authorization', 'Bearer '+token)
						let data = await this.$axios.$post("https://wiredapi.herokuapp.com/images/addimage",{
							"imagedata":localStorage.getItem("image")
						}
						)
						console.log(data)
						if(data["status"] === "success"){
							this.$store.commit("products/insertnewimg",data.data)
							this.dialog = false
							this.alerttext = this.notifytext[0]
							this.alert = true
							this.file = null
						}
					}
					else{
						throw new Error()
					}
					
				}
				catch{
					console.log("Invalid File")
					alert("Failed")
				}
				

			},
			removeprompt: function(e){
				this.prompt = !this.prompt
				this.productid = e
			},
			removeimage: async function(id){
				this.prompt = !this.prompt
				this.dialogtext = this.dialogs[1]
				this.dialog = !this.dialog
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				let status = await this.$axios.$delete("https://wiredapi.herokuapp.com/images/delete/"+id)
				if(status["status"] === "success"){
					this.$store.commit("products/removeimg",id)
					this.dialog = !this.dialog
					console.log('done')
					this.alerttext = this.notifytext[1]
					this.alert = !this.alert
					this.productid = ""


				}
				else{
					console.log(status)
				}
			}
		},
		components:{TopBar},

		// async mounted(){
		// 	let token = document.cookie.split(";")[0].split("=")[1]
		// 	this.$axios.setHeader('Authorization', 'Bearer '+token)
		// 	let allimages = await this.$axios.$get("https://wiredapi.herokuapp.com/images/storemedia")
		// 	console.log(allimages)
		// 	if(allimages["status"] == "success"){
		// 		this.allimages = allimages["data"]
		// 	}
		// }
	}
</script>

<style>
</style>