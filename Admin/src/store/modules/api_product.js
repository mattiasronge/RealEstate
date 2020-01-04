import axios from 'axios'
const url = process.env.VUE_APP_BACKEND_URL+"api/productapi";
const delete_img_url = process.env.VUE_APP_BACKEND_URL+"api/delete";
const imageBaseUrl = process.env.VUE_APP_BACKEND_URL+'images/';
//definerar state
const state = {
    products: [],
    product: {
        type:'',
        location:'',
        area:'',
        ref_key:'',
        bathroom:'',
        bedroom:'',
        square:'',
        outside:'',
        images:[]
    }
}

// getters
const getters = {

}
// mutations
const mutations = {
    getProducts(state, posts) {
        state.products = posts  //sätter products
    },
    getProduct(state, post) {
        state.product = post  //set the product, location, area, type
        if (post.location._id) state.product.location = post.location._id;
        if (post.area._id) state.product.area = post.area._id;
        if (post.type._id) state.product.type = post.type._id;
    },
    emptyProduct(state) {  //initialize
        state.product = {
            type:'',
            location:'',
            area:'',
            ref_key:'',
            bathroom:'',
            bedroom:'',
            square:'',
            outside:'',
            images:[],
        };
    },
    addProductImage(state, img) {
        state.product.images.push(imageBaseUrl+img);  // lägger till bilder
    },
    removeProductImage(state, img) {
        state.product.images.splice(state.product.images.indexOf(img), 1); //tar bort en
    }
};

// actions
const actions = {
    getProducts({commit}) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url).then((response) => { // hämtar produkterna från db 
            //console.log(response.data);
            commit('getProducts', response.data);
        });
    },
    getProduct(context, params) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'/'+params.id).then((response) => { // Hämtar en produkt från DB
            context.commit('getProduct', response.data);
        });
    },
    emptyProduct({commit}) {
        commit('emptyProduct');  //empty
    },
    deleteProduct({dispatch}, params) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.delete(url+'/'+params.id).then((response) => { //tar bort en produkt från DB
            dispatch('getProducts', response.data)
        });
    },
    saveProduct({dispatch}, params) {
        // console.log('=== save product ===');
        // console.log(state.product);
        if (params.id && params.id!='')
        {
            //edit product
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            axios.put(url+'/'+params.id, state.product).then((response) => {  //Lägger till en ny
                dispatch('getProducts', response.data)
            });
        } else {
            //för in produkt
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            axios.post(url, state.product).then((response) => {
                dispatch('getProducts', response.data)
            });
        }
    },
    addProductImage({commit}, params) {
        if (params.img && params.img!='')
        {
            commit('addProductImage', params.img);
        }
    },
    removeProductImage({commit}, params) {
        if (params.img && params.img!='')
        {
            let img_file = params.img.replace(/^.*[\\/]/, '');
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            axios.delete(delete_img_url+'/'+img_file, state.product).then((response) => {
                if (response.data.status=="success")
                    commit('removeProductImage', response.data.filename); // tar bort bild
                else
                    commit('removeProductImage', params.img);
            });
        }
    }
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}