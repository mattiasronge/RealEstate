import axios from 'axios'
const url = process.env.VUE_APP_BACKEND_URL+'api/';
const state = {
    locations: [],
    areas: [],
    types: []
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
    getLocations(state, data) {//Den här mutation kallas från action via commit och sätter state-location via parameter 
        state.locations = data;// Binder state-locatioon 
    },
    getAreas(state, data) {// Binder state-area via parameter
        state.areas = data;
    },
    getTypes(state, data) {//Binder state-types via parameter 
        state.types = data;
    }
};

// actions
/**
 *Actions hanterar begäran från backend
 */
const actions = {
    getLocations({commit}) {//Skickar request till backend och får svar, kallar på mutation via 'commit' 
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'categlocation').then((response) => {
            commit('getLocations', response.data); // Kallar på getLocations mutation som innehåller data 
        });
    },
    getAreas({commit}) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'categarea').then((response) => {
            commit('getAreas', response.data);//Kallar på getAreas mutation som innehåller data 
        });
    },
    getTypes({commit}) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'categtype').then((response) => {
            commit('getTypes', response.data);//Kallar på getTypes mutation some innehåller data  
        });
    }    
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}