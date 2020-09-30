export const state = () => ({
	products :[],
	allimages:[]
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

	addimage(state,img){
		console.log('Add Image Executed')
		state.allimages = img
	},
	insertnewimg(state,item){
		state.allimages.push(item)
	},
	removeimg(state,id){
		let item = state.allimages.find(i => i["_id"] === id)
		console.log(item)
		state.allimages.splice(state.allimages.indexOf(item),1)
	}
}

export const getters = {
	getproducts : state =>{
		return state.products
	},
	getimages : state =>{
		return state.allimages
	}
}