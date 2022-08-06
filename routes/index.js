const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const businessRoutes = require('./business-routes.js');
const reviewRoutes = require('./posting-routes');
const msgRoutes = require('./message-routes')


router.use('/users', userRoutes);
router.use('/businesses', businessRoutes);
router.use('/reviews', reviewRoutes);
router.use('/messages', msgRoutes);

module.exports = router;
