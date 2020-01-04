const ProductApiModel = require('../../../model/product-api-model');
const ProductManualModel = require('../../../model/product-manual-model');
// const CategAreaModel = require('../../../model/categ-area-model');
// const CategLocationModel = require('../../../model/categ-location-model');
const CategTypeModel = require('../../../model/categ-type-model');
const ApiService = require('../../../service/api-service');

const numPerPage = 10;
const sortParam = 'created_at';
/**
 * Role: Filtering feature
 */
const ProductApiController = {
    /**
     * Hämtar produkterna från produktdatabasen, t.ex. api och manuell produkt baserat på filtrering. Detta är den interna funktionen, så den används i indexfunktionen
     * Param: searchFilters, sortby, begränsning, belopp
     */
    getListFromProducts(searchFilters={}, sortBy={}, limitCounts=numPerPage, skipCounts=0, callback){
        ProductApiModel.find(searchFilters)
        .sort(sortBy)
        // .limit(limitCounts)
        // .skip(skipCounts)
        .populate('location')
        .populate('area')
        .populate('type')
        .exec((err, products) => {
            if(err){
                callback(null);
            }
            let results = products;
            // Find ProductManualModel
            ProductManualModel.find(searchFilters)
            .sort(sortBy)
            // .limit(limitCounts)
            // .skip(skipCounts)
            .populate('location')
            .populate('area')
            .populate('type')
            .exec((err, products) => {
                if(err){
                    callback(null);
                }
                // results = results.concat(products);
                if(!results) results = [];
                if(!products) products = [];
                let totalCount = results.length + products.length;
                results = this.concatCustomizeBySortCreatedAtAndLength(results, products, limitCounts, skipCounts);
                callback({data: results, total: totalCount});
            });
        });
    },
    /**
    * För närvarande finns det två produkt db. En är api och en är manuellt. om administratören söker efter produkterna kommer resultatet från två tabeller. Denna funktion kommer att fortsättas för den. Det är också intern funktion
	   
										  
	   
     */
    concatCustomizeBySortCreatedAtAndLength(a, b, l, k){
        let r = [], i = 0, j = 0, s = sortParam;
        // console.log(a, b, r);
        while(i < a.length && j < b.length){
            if(a[i][s] >= b[j][s]){
                r.push(a[i]);
                i ++;
            }
            else{
                r.push(b[i]);
                j ++;
            }
        }
        if(a.length <= i){
            r = r.concat(b);
        }
        else if(b.length <= j){
            r = r.concat(a);
        }
        r = r.filter((v, i) => i < (l + k) && i >= k);
        return r;
    },

    getFiltersFromType(searchFilters, sortBy, limitCounts, skipCounts, callback){
        // console.log(searchFilters);
        if(searchFilters['type']){
            CategTypeModel.find({ 
                    $or:[ 
                        {_id:searchFilters['type']}, 
                        {parent_id:searchFilters['type']}
                    ]
                }, (err, types) => {
                    // console.log(err, types);
                    if(err){
                        callback(null);
                    }
					if(types && types.length > 0){
						searchFilters['type'] = { $in : types.map(tt => tt._id) };
					}
					else{
						searchFilters['type'] = {};
					}
                    ProductApiController.getListFromProducts(searchFilters, sortBy, limitCounts, skipCounts, callback);
                });
        }
        else{
            ProductApiController.getListFromProducts(searchFilters, sortBy, limitCounts, skipCounts, callback);
        }
    },

   /**
    * Hämtar produkterna baserat på parametern. Detta använder de interna funktionerna som getListFromProducts.
     *     */
    index(req, res){
        // console.log(req.query);
        let start = 0, 
            filters = {
                //'api_id' : 0
            };
        if(req.query.page > 1 && req.query.page != 'undefined') start = (req.query.page - 1) * numPerPage;
        if(req.query.ref_key && req.query.ref_key != 'undefined') filters['ref_key'] = req.query.ref_key;
        if(req.query.location && req.query.location != 'undefined') filters['location'] = req.query.location;
        if(req.query.area && req.query.area != 'undefined') filters['area'] = req.query.area;
        if(req.query.type && req.query.type != 'undefined') filters['type'] = req.query.type;
        if(req.query.bedroom && req.query.bedroom != 'undefined') filters['bedroom'] = req.query.bedroom;
        if(req.query.from_price && req.query.to_price && req.query.from_price != 'undefined' && req.query.to_price != 'undefined'){
            filters['price'] = { $gte: req.query.from_price, $lte: req.query.to_price };
        }
        ProductApiController.getFiltersFromType(filters, {sortParam : -1}, numPerPage, start, function(result) {
            if(result && result.total > 0) res.status(200).json(result);
            else res.send();
        });
    }
};


module.exports = ProductApiController;