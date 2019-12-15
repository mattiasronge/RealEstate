const ProductApiModel = require('../../../model/product-api-model');
const ProductManualModel = require('../../../model/product-manual-model');
// const CategAreaModel = require('../../../model/categ-area-model');
// const CategLocationModel = require('../../../model/categ-location-model');
// const CategTypeModel = require('../../../model/categ-type-model');
const ApiService = require('../../../service/api-service');

const numPerPage = 10;
const sortParam = 'created_at';
/**
 *  Filtrering 
 */
const ProductApiController = {
    /**
     * Hämtar produkterna från produktdatabasen, t.ex. api och manuell produkt baserat på filtrering. Detta är den interna funktionen, så den används i indexfunktionen
     * Param: searchFilters, sortby, begränsning, belopp
     */
    getListFromProducts(searchFilters={}, sortBy={}, limitCounts=numPerPage, skipCounts=0, callback){
        ProductApiModel.find(searchFilters)
        .sort(sortBy)
        .limit(limitCounts)
        .skip(skipCounts)
        .populate('location')
        .populate('area')
        .populate('type')
        .exec((err, products) => {
            if(err){
                callback(null);
            }
            let results = products;
            // Hittar ProductManualModel
            ProductManualModel.find(searchFilters)
            .sort(sortBy)
            .limit(limitCounts)
            .skip(skipCounts)
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
                results = this.concatCustomizeBySortCreatedAtAndLength(results, products, limitCounts);
                callback(results);
            });
        });
    },
    /**
    * För närvarande finns det två produkt db. En är api och en är manuellt. om administratören söker efter produkterna kommer resultatet från två tabeller. Denna funktion kommer att fortsättas för den. Det är också intern funktion
     */
    concatCustomizeBySortCreatedAtAndLength(a, b, l){
        let r = [], i = 0, j = 0, s = sortParam;
        // console.log(a, b, r);
        while(i < a.length && j < b.length){
            if(a[i][s] >= b[j][s]){
                r.push(a[i]);
                i ++;
            }
            else{
                r.push(b[j]);
                j ++;
            }
        }
        if(a.length <= i){
            r = r.concat(b);
        }
        else if(b.length <= j){
            r = r.concat(a);
        }
        r = r.filter((v, i) => i < l);
        return r;
    },

    /**
    * Hämtar produkterna baserat på parametern. Detta använder de interna funktionerna som getListFromProducts.
     *     */
    index(req, res){
        // console.log(req.query);
        let start = 0, filters = {};
        if(req.query.page > 1) start = (req.query.page - 1) * numPerPage;
        if(req.query.area) filters['area'] = req.query.area;
        if(req.query.location) filters['location'] = req.query.location;
        if(req.query.type) filters['type'] = req.query.type;
        ProductApiController.getListFromProducts(filters, {sortParam : -1}, numPerPage, start, function(result){
            if(result && result.length > 0) res.status(200).json(result);
            else res.status(500).send();
        });
    },
    /**
     * Får de enskilda produkterna baserade på parametern.
     */
    show(req, res){
        ProductApiController.getListFromProducts({
            ref_key : req.params.ref_key
        }, {}, 1, 0, function(result){
            if(result && result.length > 0){
                res.status(200).json(result[0]);
            }
            else{
                res.status(500).send();
            }
        });
    }
};


module.exports = ProductApiController;