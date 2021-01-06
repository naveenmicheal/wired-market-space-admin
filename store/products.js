export const state = () => ({
	products :[],
	categories:[],
	totalorders:'',
	totalprice:'',
})

export const mutations={
	addproduct(state,data){
		console.log('Add product Executed')
		state.products = data
	},
	totalorders(state,data){
		state.totalorders = data
	},
	totalprice(state,data){
		state.totalprice = data
	},

	insertnew(state,item){
		state.products.push(item)
	},
	removeproduct(state,id){
		let item = state.products.find(i => i["_id"] === id)
		console.log(item)
		state.products.splice(state.products.indexOf(item),1)
	},
	addcategories(state,data){
		console.log('Add product Executed')
		state.categories = data
	},
	insertnewcategory(state,item){
		console.log("Insert New Category")
	},
	removecategory(state,item){
		console.log("Remove Category")
	},

}

export const getters = {
	getproducts : state =>{
		return state.products
	},
	getcategory : state =>{
		return state.categories
	},
	getorders : state =>{
		return state.totalorders 
	},
	getprice : state =>{
		return state.totalprice
	}
}