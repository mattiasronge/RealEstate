/**
 * Hanterar routing.
 */
const userAdminRoutes       = require('../api/user/user-admin/user-admin-routes');
const productRoutes   = require('../api/product/product/product-routes');
const productManualRoutes   = require('../api/product/product-manual/product-manual-routes');
const productApiRoutes      = require('../api/product/product-api/product-api-routes');
const categAreaRoutes       = require('../api/product/categ-area/categ-area-routes');
const categLocationRoutes   = require('../api/product/categ-location/categ-location-routes');
const categTypeRoutes       = require('../api/product/categ-type/categ-type-routes');
const apiConfigRoutes       = require('../api/third/api-config/api-config-routes');

const fileUploadService     = require('../service/fileupload-service');

function registerRoutes(app) {
    app.use('/api', userAdminRoutes);
    app.use('/api', productRoutes);
    app.use('/api', productManualRoutes);
    app.use('/api', productApiRoutes);
    app.use('/api', categAreaRoutes);
    app.use('/api', categLocationRoutes);
    app.use('/api', categTypeRoutes);
    app.use('/api', apiConfigRoutes);
    fileUploadService.addRouter(app, '/api/upload');
    fileUploadService.deleteRouter(app, '/api/delete/:img');
}

module.exports = registerRoutes;