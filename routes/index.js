const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const businessRoutes = require('./business-routes.js');
const reviewRoutes = require('./posting-routes');
const msgRoutes = require('./message-routes')


router.use('/user', userRoutes);
router.use('/business', businessRoutes);
router.use('/review', reviewRoutes);
router.use('/messages', msgRoutes);

module.exports = router;
