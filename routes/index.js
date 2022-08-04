const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const businessRoutes = require('./business-routes.js');
const reviewRoutes = require('./review-routes');

router.use('/user', userRoutes);
//router.use('/business', businessRoutes);
//router.use('/review', reviewRoutes);

module.exports = router;
