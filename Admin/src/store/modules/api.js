import axios from 'axios'

const url = process.env.VUE_APP_BACKEND_URL+'api/';
//definerar state
const state = {
    isLoading:false,
    country:'',
    provinceArea:'',
    locations: [],
    types: [],
    property_list: [],
    ref_keys: [],
    totalCount:0,
    totalPages:1,
    product: {
        title:'',
        description:'',
        description_2:'',
        type:'',
        location:'',
        area:'',
        ref_key:'',
        bathroom:'',
        bedroom:'',
        square:'',
        outside:'',
        price:0,
        images:[]
    }
}

// getters
const getters = {

}
// mutations
const mutations = {
    getLocations(state, data) {
        state.locations = data; //sätter location 
    },
    getAreas(state, data) {
        state.areas = data;
    },
    getTypes(state, data) {
        state.types = data;  //sätter types
    },
    getLocations_fromAPI(state, data) {
        if (data.LocationData) {
            state.country = data.LocationData.Country;   // sätter land från API 
            state.provinceArea = data.LocationData.ProvinceArea.ProvinceAreaName;  //sätter provinceArea från API  
            state.locations = data.LocationData.ProvinceArea.Locations.Location;  //sätter locationdata från API 
            
        }
    },
    getTypes_fromAPI(state, data) {
        if (data.PropertyTypes) {
            let items = [];
            data.PropertyTypes.PropertyType.forEach(item => {
                items.push({name:item.Type, code:item.OptionValue});
            });
            state.types = items;  //sätter types från API 
        }
        
    },
    getRefKeys(state, data) {
        state.ref_keys = data;  // Sätter ref_keys 
    },
    emptyProduct(state) {  // Sätter tom state
        state.product = {
            title:'',
            description:'',
            description_2:'',
            type:'',
            location:'',
            area:'',
            ref_key:'',
            bathroom:'',
            bedroom:'',
            square:'',
            outside:'',
            price: 0,
            images:[],
        };
    },
    saveProduct(state, data) { 
        state.product = data;  // Binder till produkt
        state.isLoading = false;
    },
    getPropery(state, data) {
        if (data.Property) {
            let item = data.Property;
            let temp = {   // kör parametern
                ref_key: item.Reference,
                title: item.PropertyType.NameType + ' in '+ item.Location + ', ' + item.Area + ', ' + item.Province,
                description: item.Description,
                price: item.Price,
                bedroom: item.Bedrooms,
                bathroom: item.Bathrooms,
                square: item.Built,
                outside: item.GardenPlot,
                // Province: item.Province,
                location: item.Location,
                area: item.Area,
                type: item.PropertyType.TypeId,
                // type: item.PropertyType.Type,
                // Subtype1: item.PropertyType.Adosada,
                // SubtypeId1: item.PropertyType.SubtypeId1,
                // Status: item.Status.system,
                // Pool: item.Pool,
                // Parking: item.Parking,
                // Garden: item.Garden,
                // GardenPlot: item.GardenPlot,
                // BuiltYear: item.BuiltYear,
                // Currency: item.Currency,
                // stars:item.PropertyFeatures.Category.length>5 ? 5:item.PropertyFeatures.Category.length
            };
            if (item.PropertyType.SubtypeId1) {
                temp['type'] = item.PropertyType.SubtypeId1;
            }
            let categories = "<ul>";
            if (item.PropertyFeatures.Category) {
                item.PropertyFeatures.Category.forEach((cate) => {
                    categories = categories+"<li>" + cate.Type+': '+cate.Value.join(', ') + "</li>";
                });
            }
            categories += "</ul>";
            temp['description_2'] = categories;

            let images = [];
            if (item.MainImage)
                images.push(item.MainImage);
            if (item.Pictures) {
                item.Pictures.Picture.forEach((picture) => {
                    images.push(picture['PictureURL']);
                });
            }
            temp['images'] = images;
            state.product = temp;  // Sätter produkter 
        }
        state.isLoading = false;
    },
    getList(state, data) {
        state.totalCount = data.QueryInfo.PropertyCount;
        state.totalPages = Math.ceil(state.totalCount/5);
        if (data.Property) {   
            let items = [];
            data.Property.forEach(item => {
                let temp = {
                    ref_key: item.Reference,
                    title: item.PropertyType.NameType + ' in '+ item.Location + ', ' + item.Area + ', ' + item.Province,
                    Location: item.Location,
                    Area: item.Area,
                    Type: item.PropertyType.Type,
                    Status: item.Status.system,
                    Bedrooms: item.Bedrooms,
                    Bathrooms: item.Bathrooms,
                    Currency: item.Currency,
                    Price: item.Price,
                    Description: item.Description,
                    Built: item.Built,
                    GardenPlot: item.GardenPlot,
                    stars:item.PropertyFeatures.Category.length>5 ? 5:item.PropertyFeatures.Category.length
                };
                let images = [];
                if (item.MainImage)
                    images.push({src: item.MainImage});
                if (item.Pictures) {
                    item.Pictures.Picture.forEach((picture) => {
                        images.push({src: picture['PictureURL']});
                    });
                }
                temp['images'] = images;
                items.push(temp);
            });
            state.property_list = items; //Sätter property_list 
        }
        state.isLoading = false;
    }
};

// actions
const actions = {
    getLocations({commit}) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'categlocation').then((response) => {  //send the request to the backend to get the location
            commit('getLocations', response.data);
        });
    },
    getAreas({commit}) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'categarea').then((response) => {// 
            // skicka begäran till backend för att få platsens
            commit('getAreas', response.data);
        });
    },
    getTypes({commit}) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'categtype').then((response) => {//skicka begäran till backend för att få typerna
            commit('getTypes', response.data);
        });
    },
    getLocations_fromAPI({commit}) {
        let params= {
            url: 'SearchLocations',
            p_agency_filterid: '1',
            P_sandbox: 'true',
            P_Lang: '1'
        };
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.post(url+'productapi/getdata', params).then((response) => {
            // få platserna från api
            commit('getLocations_fromAPI', response.data);
        });
    },
    getTypes_fromAPI({commit}) {
        let params= {
            url: 'SearchPropertyTypes',
            p_agency_filterid: '1',
            P_sandbox: 'true',
            P_Lang: '1'
        };
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.post(url+'productapi/getdata', params).then((response) => { 
            // få typerna från 3: e api
            commit('getTypes_fromAPI', response.data);
        });
    },
    getRefKeys({commit}) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(url+'productapi/refkey').then((response) => {  
            // ta  refkeys från tredjeparts api
            commit('getRefKeys', response.data);
        });
    },
    getPropery({commit, dispatch}, p) {
        state.isLoading = true;
        let params= {
            url: 'PropertyDetails',
            p_agency_filterid: '1',
            P_sandbox: 'true',
            P_Lang: '1',
            P_RefId: p.id,
            P_ShowGPSCoords:'TRUE',
            P_showdecree218: 'YES'
        };
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.post(url+'productapi/getdata', params).then((response) => {  
            // få produktinformationen från 3: e api
            commit('getPropery', response.data);
            dispatch('saveProduct', state.product);//sparar produkter
        }).catch(error => {
            state.isLoading = false;
            console.log(error)
        });
    },
    emptyProduct({commit}) {
        commit('emptyProduct');
    },
    saveProduct({commit, dispatch}, product) {
        let isFound = false;
        if (state.types) {
            state.types.forEach(t=>{
                if (t.type_id == product.type) {
                    product.type = t._id;
                    isFound = true;
                }
            });
        }
        if (!isFound) product.type = "5e020c2e67a67f16d4324f95";  //alla
        isFound = false;
        if (state.locations) {
            state.locations.forEach(t=>{
                if (t.title == product.location) {
                    product.location = t._id;
                    isFound = true;
                }
            });
        }
        if (!isFound) product.location = "5dee5b2f2fb4423f1c16a415";  //all
        isFound = false;
        if (state.areas) {
            state.areas.forEach(t=>{
                if (t.title == product.area) {
                    product.area = t._id;
                    isFound = true;
                }
            });
        }
        if (!isFound) product.area = "5dee5bc52fb4423f1c16a418";  //all
        state.isLoading = true;
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.post(url+'productapi', product).then((response) => { //sparar produkter
            commit('saveProduct', response);
            dispatch('getRefKeys');
        }).catch(error => {
            state.isLoading = false;
            console.log(error)
        });
    },
    getList({commit}, p) {
        state.isLoading = true;
        let params= {
            url: 'SearchProperties',
            p_agency_filterid: '1',
            P_sandbox: 'true',
            P_PageSize: 5,
            P_Lang: '1'
        };
        params['P_agency_filterid'] = p.period;
        params['P_Min'] = p.minPrice;
        params['P_Max'] = p.maxPrice;
        if ( p.bedrooms>0 ) {
            params['P_Beds'] = p.bedrooms;
        }
        if ( p.baths>0 ) {
            params['P_Baths'] = p.baths;
        }
        if ( p.types.length>0 ) {
            params['P_PropertyTypes'] = p.types.join(',');
        }
        if ( p.locations.length>0 ) {
            params['P_Location'] = p.locations.join(',');
        }
        if ( p.page>0 ) {
            params['P_PageNo'] = p.page;
        }
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.post(url+'productapi/getdata', params).then((response) => {
            // hämta sökdata från db
            commit('getList', response.data);
        }).catch(error => {
            state.isLoading = false;
            console.log(error)
        });
    },   
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}