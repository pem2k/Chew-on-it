const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const businessRoutes = require('./business-routes.js');
const postingRoutes = require('./posting-routes');

router.use('/categories', userRoutes);
router.use('/products', businessRoutes);
router.use('/tags', postingRoutes);

module.exports = router;
