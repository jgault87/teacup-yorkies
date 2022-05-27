const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tweetRoutes = require('./tweetRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/tweets', tweetRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
