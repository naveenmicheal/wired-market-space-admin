<template>
	<div >
		<v-navigation-drawer app  class="purple darken-4 " dark permanent>
	
			<div id="logo" class="d-flex justify-center">
				<div class="pa-5">
					<v-img width="150px" src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/326/3451207326_0bea6f38-773d-4892-82fc-eaea905c5709.png?cb=1596441241"></v-img>
				</div>
			</div>
			
		<v-list>
			<v-list-item  v-for="(item,i) in list" :key=i nuxt :to="item.path">
				<v-list-item-icon>
					<v-icon>{{item.icon}}</v-icon>							
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>{{item.name}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				list:[
				{"name":"Dashboard","icon":"mdi-view-dashboard","path":"/dashboard"},
				{"name":"Products","icon":"mdi-view-carousel","path":"/products"},
				{"name":"Add Product","icon":"mdi-store","path":"/addproduct"},
				// {"name":"Collections","icon":"mdi-dns","path":"/collection"},
				{"name":"Orders","icon":"mdi-swap-horizontal","path":"/orders"},
				{"name":"Videos","icon":"mdi-dns","path":"/videos"},
				],
			}
		}
	}
</script>