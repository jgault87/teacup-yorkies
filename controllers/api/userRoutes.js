const router = require('express').Router();
const { User } = require('../../models');

//populate users from DB
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// choose a random avatar from available avatar array upon signup and create a new user post route used on signup page
router.post('/', async (req, res) => {
  try {
    let availableAvatars = [
      'cat1.jpg',
      'cat2.jpg',
      'cat3.jpg',
      'cat4.jpg',
      'cat5.jpg',
      'cat8.jpg',
      'cat7.jpg',
      'dog1.jpg',
      'dog2.jpg',
      'dog3.jpg',
      'dog4.jpg',
      'dog5.jpg',
      'dog6.jpg',
    ];
    let randomIndex = Math.floor(Math.random() * availableAvatars.length);

    let body = req.body;
    body.avatar_file = availableAvatars[randomIndex];

    const userData = await User.create(body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//login route for existing users
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//logout post route to destroy user session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', async (req, res) => {
  // sending the data to the Model so that one tweet can be updated/edited with new avatar data in the database.
  try {
    const userData = await User.update(
      {
        avatar_file: req.body.avatar_file,
      },
      {
        where: {
          id: req.session.user_id,
        },
      }
    );
    if (!userData) {
      res.status(404).json({ message: 'could not update user avatar' });
      return;
    }
    // The updated data (blogData) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
