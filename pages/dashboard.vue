<template>	
<div>
	<TopBar />
	<DashCards/>
  <v-row>
    <v-col cols=6>
      <chartorder :data="barChartData" :options="barChartOptions" :height="200" />
    </v-col>
    <v-col cols=6>
      <chattraffic :data="barChartData" :options="barChartOptions" :height="200" />
    </v-col>
  </v-row>
 <h1 class="text-center">Top Selling Products</h1>
  <v-row>
   
  <v-col wrap cols=12 md=4 v-for="item in products" :key="item._id" class="pa-6">
          <v-item-group>
            <v-card class="elevation-7 pa-3" tile>
              <v-img  class="mx-auto primage" contain lazy-src aspect-ratio="1.77"
              :src="item['media'][0].url">
            </v-img>
            <v-card-title style="height: 80px;  overflow-y: auto;" class="d-flex justify-center pt-1">
              {{item.productname}}
            </v-card-title> 
            <p class="text-h5 text-center">{{item.productprice}} ₹</p>
          </v-card>
        </v-item-group>
      </v-col>
  </v-row>
	
</div>		
</div>

</template>


<script>
	import TopBar from "~/components/basics/topbar"
	import DashCards from "~/components/objects/dashcards"
	export default {
		name:"dashboard",
		data () {
		return {

		barChartData: {
        labels: [
          '2019-06',
          '2019-07',
          '2019-08',
          '2019-09',
          '2019-09',
          '2019-10',
          '2019-11',
          '2019-12',
          '2019-13',
          '2019-14',
          '2019-15',
          '2019-16',
        ],
        datasets: [
          {
            label: 'Visits',
            data: [10, 15, 40, 30,35,63,35,28,32,42,23,12],
            backgroundColor: 'green',
            fill:false,
            lineTension:0,
            borderColor:"blue"
          },
        ]
      },
    barChartOptions: {
        responsive: true,

        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Orders',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: 'grey'
        },
        scales: {
          xAxes: [
            {
            	ticks: {
                beginAtZero: false
              },
              gridLines: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ]
        }
			}
		}},
		components:{TopBar,DashCards},
    computed:{
      products(){
        return this.$store.getters["products/getproducts"]

      }
    }
	}
</script>