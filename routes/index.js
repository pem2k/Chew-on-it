const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const businessRoutes = require('./business-routes.js');
const reviewRoutes = require('./review-routes');

router.use('/categories', userRoutes);
router.use('/products', businessRoutes);
router.use('/tags', reviewRoutes);

module.exports = router;
