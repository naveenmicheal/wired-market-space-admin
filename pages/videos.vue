<template>
	<div>
		<TopBar/>
		<v-container class="pa-6">
			<v-row v-for="item in data" :key="item._id">
				<v-col cols="2">
					<h1>{{item.name}}</h1>
				</v-col>
				<v-col cols="8">
					<v-text-field background-color="blue lighten-5" v-model="item.location" type="text" outlined label="Enter the Value"></v-text-field>
				</v-col>
				<v-col cols="2">
					<v-btn @click="update(item.name)" tile outlined>update</v-btn>
				</v-col>
			</v-row>
			<v-overlay :value="overlay">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
			</v-overlay>
		</v-container>
	</div>
</template>

<script type="text/javascript">
	import TopBar from "~/components/basics/topbar"
	export default{
		data(){
			return{
				overlay:false,
				data:[],
				test:"hello"
			}
		},
		components:{TopBar},
		methods:{
			update(e){
				console.log(e)
				let result = this.data.find(ele => ele.name === e)
				console.log(result.location)
				this.overlay = !this.overlay
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				this.$axios.$post("https://wiredapi.herokuapp.com/videos/update",{
					name:e,
					location:result.location
				}).then(data=>{
					console.log(data)
					this.overlay = !this.overlay
				}).catch(err=>{
					console.log(err)
				})
			},
			
		},
		async mounted(){	
			this.overlay = !this.overlay
			this.$axios.$get("https://wiredapi.herokuapp.com/videos/get").then(data =>{
				if(data.status === "success"){
					console.log(data)
					this.data = data.data
					this.overlay = !this.overlay
				}
			})
			.catch(err =>{
				console.log(err)
			})	
		},
	}
</script>

<style lang="css" scoped>
.v-expansion-panel-header:before{
	background-color: green
}
.v-application p{
	margin-bottom: 0;
}
.v-data-table{
	border-radius: 0
}
thead.v-data-table-header {
	background: gainsboro;
}
#filter{
	overflow-x: auto;
}
</style>