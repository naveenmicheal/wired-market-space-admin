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
			<v-col v-for="(image,key) in allimages" :key="key" cols="3">
				<v-img lazy-src aspect-ratio="1.77" :src="image.mediaurl"></v-img>
				<v-btn icon>
					<v-icon color="blue">mdi-fullscreen</v-icon>
				</v-btn>
				<v-btn @click="removeimage(image._id)" icon><v-icon color="red">mdi-delete</v-icon>
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
				Uploading a Image ...
				<v-progress-linear indeterminate color="white" class="mb-0 pa-1"></v-progress-linear>
			</v-card-text>
		</v-card>
	</v-dialog>

	<v-dialog hide-overlay persistent width="500"  v-model="alert" >
		<v-alert type="success"  prominent border="left" dismissible
		elevation="10" transition="scale-transition"	>
		Image Upload Success <strong></strong> 
	</v-alert>
</v-dialog>
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
				allimages:[],
			}
		},
		computed: {
		},
		methods:{
			previewimage:function () {
				console.log(this.file)
				this.overlay = true

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
				this.dialog = true
				// let imagedata = localStorage.getItem("image")
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				let data = await this.$axios.$post("https://wiredapi.herokuapp.com/images/addimage",{
					"imagedata":localStorage.getItem("image")
				}
				)
				console.log(data)
				if(data["status"] === "success"){
					this.dialog = false
					this.alert = true
				}
			},
			removeimage: async function(id){
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				let status = await this.$axios.$delete("https://wiredapi.herokuapp.com/images/delete/"+id)
				if(status["status"] === "success"){
					console.log('done')
				}
				else{
					console.log(status)
				}
			}
		},
		components:{TopBar},

		async mounted(){
			let token = document.cookie.split(";")[0].split("=")[1]
			this.$axios.setHeader('Authorization', 'Bearer '+token)
			let allimages = await this.$axios.$get("https://wiredapi.herokuapp.com/images/storemedia")
			console.log(allimages)
			if(allimages["status"] == "success"){
				this.allimages = allimages["data"]
			}
		}
	}
</script>

<style>
</style>