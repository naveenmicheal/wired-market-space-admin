<template>
	<div>
		<TopBar/>
		<v-container>
			<v-row>
				<v-col id="filter" cols="3" justify="center" align="center">
					
					<!-- <v-btn-toggle tile dense color="deep-purple accent-3" group>
						<v-btn text disabled tile>Filter By:</v-btn>
						<v-btn dense>
							Last 7 Days
						</v-btn>

						<v-btn dense>
							Last 30 Days
						</v-btn>
						<v-btn dense>
							All Time
						</v-btn>
						<v-select				 
						:items="['New','Acknowledged','Packed','Shipped','Delivered']"
						label="Filter By"
						solo 
						hide-details
						dense
						></v-select>
					</v-btn-toggle> -->
				</v-col>
				<!-- <v-col cols="12">
					<span>Orders beetween: <b>Jan 2021 to March 2021</b></span>
					<v-btn tile outlined>Select date</v-btn>
				</v-col> -->
				
				
			</v-row>
			<v-row >
				<v-col cols="12">
						<v-expansion-panels

						multiple 
						popout 
						focusable 
						tile hover
						>
						<v-expansion-panel  class="elevation-7 pa-2 mb-2"  v-for="item in products" :key="item.orderid">
							<v-expansion-panel-header >
								<p><strong>Order ID:</strong>{{item.orderid}}</p>
								<p><strong>Date: </strong>{{item.date.split(" ").slice(0,3).join(" ")}}</p>
								<p><strong>Total Amount: </strong>{{item.totalprice}} ₹</p>
								<p><strong>Status:</strong> {{item.orderstatus}}</p>
							</v-expansion-panel-header>
							<v-expansion-panel-content>
								<v-row>
									<v-col cols="6">
										<h3>Customer: </h3>
										<p><strong>Name:</strong>{{item.customername}}</p>
										<p><strong>Email:</strong>{{item.customeremail}}</p>
										<p><strong>Phone:</strong>{{item.contact}}</p>
									</v-col>
									<v-col cols="6">
										<h3>Delivery to</h3>
										<p><strong>HouseAddress:</strong> {{item.address.houseaddress}}</p>
										<p><strong>Location:</strong> {{item.address.location}}</p>
										<p><strong>Town:</strong> {{item.address.town}}</p>
										<p><strong>City:</strong> {{item.address.location}}</p>
										<p><strong>State:</strong> {{item.address.state}}</p>
										<p><strong>Pincode:</strong> {{item.address.pincode}}</p>

									</v-col>
								</v-row>
								<v-row>
									<v-col cols="8">
										<v-data-table
										:headers="headers"
										:items="item.checkoutitems"
										class="elevation-6"
										dense
										:items-per-page="1000"
										hide-default-footer
										></v-data-table>
									</v-col>
									<v-col cols="4">
										<h3 class="text-align my-3">Status: 
											<span style="color: blue">
												{{item.orderstatus}}
											</span></h3>
											<v-select
											v-model="selectedstatus"
											:items="status"
											label="Choose status"

											solo>
										</v-select>
										<v-btn @click="updateorder(item.orderid)" tile  block class="white--text" color="blue">Update</v-btn>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12">
										<v-btn outlined tile color="green">Print</v-btn>
										<v-btn outlined disabled tile color="red">Delete</v-btn>
									</v-col>

								</v-row>

							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>


					<v-overlay :value="overlay">
						<v-progress-circular indeterminate size="64"></v-progress-circular>
					</v-overlay>

				</v-col>
		</v-row>
	</v-container>
</div>
</template>

<script type="text/javascript">
	import TopBar from "~/components/basics/topbar"
	export default{
		data(){
			return{
				products : [],
				status:["Acknowledged","Packed","Shipped","Delivered"],
				selectedstatus:"",
				overlay:true,
				headers: [,
				{text:"Product Id",value:'id'},
				{text:"Product Name",value:'productname'},
				{text:"Price",value:'price'},
				{text:"Quantity",value:'quantity'},
				{text:"Total Price",value:'totalprice'}
				],
			}
		},
		components:{TopBar},
		methods:{
			fetchorders(){
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				this.$axios.$get("https://wiredapi.herokuapp.com/orders/getsucess").then(data=>{
					console.log(data)
					this.products = data.data.reverse()
					this.overlay = false
				}).catch(err=>{
					console.log(err)
				})
			},
			updateorder(e){
				console.log(e)
				if(this.selectedstatus != ""){
					this.overlay = true
					let token = document.cookie.split(";")[0].split("=")[1]
					this.$axios.setHeader('Authorization', 'Bearer '+token)
					this.$axios.$post("https://wiredapi.herokuapp.com/orders/updateorderstatus",{
						"orderid":e,
						"orderstatus":this.selectedstatus
					}
					).then(data=>{
						console.log(data)
						this.fetchorders()
					}).catch(err=>{
						console.log(err)
					})
				}
				
			}
			
		},
		async mounted(){
			this.fetchorders()
			
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