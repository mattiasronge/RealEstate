const axios = require('axios');
const ApiConfigModel = require('../model/api-config-model');

/**
 * Hanterar api-listorna från https://www.resales-online.com/.
 * Använder Axios för att skicka asynchronous HTTP-begäran till REST och utför CRUD.
			
																										
 */
const ApiService = {

    /**
     * Role: Hämtar api keys
     * 
     * @param {*} callback 
     * callback är funktionen.
     * I denna del kommer funktionen från parametern att kallas efter att ha fått api-namnet från databasen*/
    getApiKeys(callback){
        if(!process.env.API_NAME){
            callback(null);
        }
        
        ApiConfigModel.findOne({
            api_name : process.env.API_NAME
        }, (err, apiKey) => {
            if(err){
                callback(null);
            }
            callback(apiKey);
        });
    },
    /**
     * Hämtar apiURL
     * @param {*} callback 
     * Om apikey inte finns, returnera null. Och om det finns api-keys, så kallas nedanstående apiUrl med hjälp av api-keys*/
    getApiUrl(params, callback){
        this.getApiKeys(apiKey => {
            if(!apiKey){
                callback(null);
            }
            const apiFunction = params['url'];
            params['p1'] = apiKey.api_id;
            params['p2'] = apiKey.api_key;
            var str = "";
            for (var key in params) {
                if (key == 'url') continue;
                if (str != "") {
                    str += "&";
                }
                str += key + "=" + encodeURIComponent(params[key]);
            }
            const apiUrl = `${process.env.API_BASE_URL}/${apiKey.api_version}/${apiFunction}?${str}`;
            console.log(apiUrl);
            callback(apiUrl);
        });
    },
    /**
     * Hämtar apiData
     * @param {*} callback 
    * Efter att ha hämtat apiUrl så skaffar vi data från denna apiUrl med hjälp av axios-paketet. Resultatet returneras via callback function.*/
    getApiData(callback){
        this.getApiUrl({
            url : 'SearchProperties',
            p_agency_filterid : '1',
            P_sandbox : 'true'
        }, apiUrl => {
            if(!apiUrl){
                callback(null);
            }
            axios.get(apiUrl)
                .then(response => {
                    callback(response.data);
                })
                .catch(error => {
                    callback(error);
                });
        });
    },
    getApiDataWithParams(params, callback){
        this.getApiUrl(params, apiUrl => {
            if(!apiUrl){
                callback(null);
            }
            axios.get(apiUrl)
                .then(response => {
                    callback(response.data);
                })
                .catch(error => {
                    callback(error);
                });
        });
    }
};

module.exports = ApiService;