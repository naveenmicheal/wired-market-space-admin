<template>
	<div>
		<TopBar/>
		<v-container>
			<v-row>
				<v-col id="filter" cols="8" justify="center" align="center">
					
					<v-btn-toggle tile dense color="deep-purple accent-3" group>
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
					</v-btn-toggle>
				</v-col>
				<v-col cols="4">
					<v-btn tile >Advanced Search Section</v-btn>
				</v-col>
				
				
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-expansion-panels  multiple popout focusable tile hover>
						<v-expansion-panel class="elevation-7 pa-2 mb-2" v-for="c in 5" :key="c">
							<v-expansion-panel-header>
								<p><strong>Invoice ID:</strong> IJGH75JG85747</p>
								<p><strong>Date: </strong>28 Feb 2020</p>
								<p><strong>Total Amount: </strong>6478rs</p>
								<p><strong>Status:</strong>Ordered</p>
							</v-expansion-panel-header>
							<v-expansion-panel-content>
								<v-row>
									<v-col cols="6">
										<h3>Customer: </h3>
										<p><strong>Name:</strong> Example Customer Name</p>
										<p><strong>Email:</strong>testmail@mailserver.com</p>
										<p><strong>Phone:</strong>9987654321</p>
									</v-col>
									<v-col cols="6">
										<h3>Delivery to</h3>
										<p><strong>Name:</strong> Example Customer Name</p>
										<p><strong>Email:</strong>testmail@mailserver.com</p>
										<p><strong>Phone:</strong>9987654321</p>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="8">
										<v-data-table
										:headers="headers"
										:items="items"
										class="elevation-6"
										dense
										:items-per-page="1000"
										hide-default-footer
										></v-data-table>
									</v-col>
									<v-col cols="4">
										<h3 class="text-align">STATUS</h3>
										<v-select
										:items="status"
										label="Standard"

										solo>
									</v-select>
									<v-btn  tile  block class="white--text" color="blue">Update</v-btn>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-btn outlined tile color="green">Print</v-btn>
									<v-btn outlined tile color="red">Delete</v-btn>
								</v-col>

							</v-row>

						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
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
				Hello : "World",
				status:["Acknowledged","Packed","Shipped","Delivered"],
				headers: [,
				{text:"Product Id",value:'productid'},
				{text:"Product Name",value:'productname'},
				{text:"Price",value:'productprice'},
				{text:"Quantity",value:'quantity'},
				{text:"Total Price",value:'totalprice'}
				],
				items:[
				{	
					productid:"HY06GEHI",
					productname:"Test Product A",
					productprice:737,
					quantity:1,
					totalprice:737
				},
				{
					productid:"HY06GEHI",
					productname:"Test Product B",
					productprice:837,
					quantity:1,
					totalprice:837
				},
				{
					productid:"HY06GEHI",
					productname:"Test Product C",
					productprice:100,
					quantity:2,
					totalprice:200
				}
				]
			}
		},
		components:{TopBar},
		methods:{
			
		},
		async mounted(){

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