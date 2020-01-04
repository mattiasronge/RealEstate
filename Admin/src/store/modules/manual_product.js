import axios from 'axios'

const url = process.env.VUE_APP_BACKEND_URL+"api/productmanual";
const delete_img_url = process.env.VUE_APP_BACKEND_URL+"api/delete";
const imageBaseUrl = process.env.VUE_APP_BACKEND_URL+'images/';
//define state
const state = {
    products: [],
    product: {
        title:'',
        description:'',
        description_2:'',
        type:'',
        location:'',
        area:'',
        ref_key:'',
        bathroom: 0,
        bedroom: 0,
        square: '',
        outside: 0,
        images:[]
    }
}

// getters
const getters = {

}
/**
 * 
 *  mutations hanterar states.
 *  Dem kallas via actions. All data kommer att bindas via parametrar.
*/
const mutations = {
    getProducts(state, posts) {// Den här mutation ändrar states-products och kallas när man ska lägga till en manuell produkt inne i admin panel 
        state.products = posts
    },
    getProduct(state, post) { // Individuell produkt state 
        state.product = post
        if (post.location._id) state.product.location = post.location._id;
        if (post.area._id) state.product.area = post.area._id;
        if (post.type._id) state.product.type = post.type._id;
    },
    emptyProduct(state) { // initialize
        state.product = {
            type:'',
            location:'',
            area:'',
            ref_key:'',
            bathroom: 0,
            bedroom: 0,
            square:'',
            outside: 0,
            images:[],
        };
    },
    addProductImage(state, img) {  // Lägger till ny bild 
        state.product.images.push(imageBaseUrl+img);
    },
    removeProductImage(state, img) { // Tar bort bild
        state.product.images.splice(state.product.images.indexOf(img), 1);
    }
};

// actions
const actions = {
    getProducts({commit}) {  //Hämtar produkt lista från backend 
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url).then((response) => {
            //console.log(response.data);
            commit('getProducts', response.data);
        });
    },
    getProduct(context, params) { //Hämtar individuell produkt från backend 
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'/'+params.id).then((response) => {
            context.commit('getProduct', response.data);
        });
    },
    emptyProduct({commit}) { // Sätter state som tom  
        commit('emptyProduct');
    },
    deleteProduct({dispatch}, params) { // Tar bort indiviudell produkt 
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.delete(url+'/'+params.id).then((response) => {
            dispatch('getProducts', response.data)
        });
    },
    saveProduct({dispatch}, params) { // Sparar individuell produkt 
        // console.log('=== save product ===');
        // console.log(state.product);
        if (params.id && params.id!='')
        {
            //redigera produkt
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            axios.put(url+'/'+params.id, state.product).then((response) => {
                dispatch('getProducts', response.data)
            });
        } else {
            //lägger till product
            state.product.ref_key = 'M' + state.product.title.charAt(0).toUpperCase() + '_' + new Date().getTime();
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            axios.post(url, state.product).then((response) => {
                dispatch('getProducts', response.data)
            });
        }
    },
    addProductImage({commit}, params) { //Lägger till bilder till state 
        if (params.img && params.img!='')
        {
            commit('addProductImage', params.img);
        }
    },
    removeProductImage({commit}, params) { // Tar bort bilder från state 
        {
            let img_file = params.img.replace(/^.*[\\/]/, '');
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            axios.delete(delete_img_url+'/'+img_file, state.product).then((response) => {
                if (response.data.status=="success")
                    commit('removeProductImage', response.data.filename);
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