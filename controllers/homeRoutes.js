const router = require('express').Router();
const { Tweet, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data sorting by DESC ID which will sort newest toward top
    const tweetData = await Tweet.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name', 'avatar_file'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'user_id',
            'Tweet_id',
            'comment_text',
            'date_created',
          ],
          include: {
            model: User,
            attributes: ['name', 'avatar_file'],
          },
        },
      ],
    });

    // Serialize data so the template can read it
    const tweets = tweetData.map((tweet) => tweet.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      tweets,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//click on individual blog page need to add comment functionality
router.get('/tweet/:id', async (req, res) => {
  try {
    const tweetData = await Tweet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,

          include: [User],
        },
      ],
    });

    const tweet = tweetData.get({ plain: true });

    res.render('tweet', {
      ...tweet,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Tweet }],
    });

    const allTweetData = await Tweet.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name', 'avatar_file'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'user_id',
            'Tweet_id',
            'comment_text',
            'date_created',
          ],
          include: {
            model: User,
            attributes: ['name', 'avatar_file'],
          },
        },
      ],
    });

    // Serialize data so the template can read it
    const tweets = allTweetData.map((tweet) => tweet.get({ plain: true }));

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      user,
      tweets,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const tweetData = await Tweet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const tweet = tweetData.get({ plain: true });
    res.render('tweetinfo', {
      ...tweet,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
