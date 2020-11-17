<template>
	<div>
		<v-container>
				<v-toolbar dense class="elevation-0">
						<v-toolbar-title style="overflow-x: auto;">
							Wired Market Space
						</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn-toggle tile dense color="deep-purple accent-3" group>
						<v-btn dense>
							Last 1 Day
						</v-btn>
						<v-btn dense>
							Last 7 Days
						</v-btn>

						<v-btn dense>
							Last 30 Days
						</v-btn>

						<v-btn dense>
							All Time
						</v-btn>
					</v-btn-toggle>
				</v-toolbar>
		<v-row>
			<v-col v-for="(card,key) in carddata" :key=key cols=4>
				<v-card :color="card.color" class="elevation-15 pa-4" tile dark >

					<h2 class="text-center" >{{card.cardname}}</h2>
					<h3 class="text-center">{{card.count}}<v-icon right large>{{card.icon}}</v-icon></h3>
					<v-icon large right>mdi-finance</v-icon>

				</v-card>
			</v-col>
		</v-row>
<!-- 			<v-row>
				<h1 class="px-6">Trends </h1>
				<v-col cols=12>
					<v-sparkline
					
					:value="value"
					:labels = "labels"
					:padding="padding"
					:line-width="width"
					:stroke-linecap="lineCap"
				
					:fill="fill"
					:type="type"
					:auto-line-width="autoLineWidth"
					auto-draw
					></v-sparkline>
				</v-col>
			</v-row> -->
		</v-container>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				width: 1,
				radius: 10,
				padding: 2,
				lineCap: 'round',
				labels:[""],
				value: [0, 2, 5, 9, 5, 0, 3, 5, 0, 0, 1, 8, 2, 9, 0, 1, 8, 2, 9,0,4,6,3,9,5,3,5,6,1, 3, 5, 0, 0, 1, 8, 2, 9, 7],
				

				fill: false,
				type: 'trend',
				autoLineWidth: false,
				carddata:[
				{
					cardname:"Total Orders",
					icon:"mdi-briefcase-check",
					count:134,
					color:"pink darken-3"
				},
				{
					cardname:"Total Income",
					icon:"	",
					count:"134$",
					color:"light-blue darken-4"
				},
				{
					cardname:"Total Products",
					icon:"mdi-tag-multiple",
					count:"16",
					color:"blue-grey darken-4"
				},
				],
			}
		}
	}
</script>

<style scoped>
h3.text-center{
	font-size: 30px;
}
</style>