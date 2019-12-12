const userAdminRoutes = require('../api/user/user-admin/user-admin-routes');

function registerRoutes(app) {
    app.use('/api', userAdminRoutes);
}

module.exports = registerRoutes;