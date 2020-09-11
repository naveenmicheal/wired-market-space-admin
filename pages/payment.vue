<template>
	<div>
		<v-container>
			<v-text-field type="number" solo placeholder="Enter the Amount:" v-model="amount" ></v-text-field>
			<v-btn text tile outlined class="px-6"@click="pay" >Pay {{amount}}</v-btn>
			<p>RESULT: {{result}} </p>
		</v-container>
	</div>

</template>

<script type="text/javascript">
	export default{
		head(){
			return{
				script:[{
					src:"https://checkout.razorpay.com/v1/checkout.js"
				}]
			}
			
		},
		data(){
			return{
				amount: '',
				result:''
			}
		},
		methods:{
			pay: async function(e) {
				let data = await this.$axios.$post(
					"https://wiredapi.herokuapp.com/payment/pay",{
					amount: this.amount
				})
				console.log(data)
				this.result = data
				let options = {
					"key":"rzp_test_IvtMk0lp0Zr2lH",
					"amount":data.amount,
					"currency":data.currency,
					"order_id":data.id,
					"handler": function (response){
						alert(response.razorpay_payment_id);
						alert(response.razorpay_order_id);
						alert(response.razorpay_signature)
					},
					"prefill": {
						"name": "Kara Ak800",
						"email": "kara@example.com",
						"contact": "9987654321"
					}

				}
				var rzp1 = new Razorpay(options);
				rzp1.open();
			}
		}
	}
</script>