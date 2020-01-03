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
// mutations
const mutations = {
    getLocations(state, data) {
        state.locations = data;
        //console.log(data);
    },
    getAreas(state, data) {
        state.areas = data;
        //console.log(data);
    },
    getTypes(state, data) {
        state.types = data;
        //console.log(data);
    }
};

// actions
const actions = {
    getLocations({commit}) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'categlocation').then((response) => {
            commit('getLocations', response.data);
        });
    },
    getAreas({commit}) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'categarea').then((response) => {
            commit('getAreas', response.data);
        });
    },
    getTypes({commit}) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'categtype').then((response) => {
            commit('getTypes', response.data);
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