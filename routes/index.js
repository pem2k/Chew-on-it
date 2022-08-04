const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const businessRoutes = require('./business-routes.js');
const reviewRoutes = require('./review-routes');
const navRoutes = require('./navigation-routes')

router.use('/user', userRoutes);
router.use('/nav', navRoutes);
//router.use('/business', businessRoutes);
//router.use('/review', reviewRoutes);

module.exports = router;
