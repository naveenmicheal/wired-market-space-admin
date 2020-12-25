export const state = () => ({
	products :[],
	categories:[]
})

export const mutations={
	addproduct(state,data){
		console.log('Add product Executed')
		state.products = data
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
	}
}