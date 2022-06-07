const router = require('express').Router();
const { Tweet } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const tweetData = await Tweet.findAll({
      order: [['date_created', 'DESC']],
    });

    res.status(200).json(tweetData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newTweet = await Tweet.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTweet);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // sending the data to the Model so that one blog can be updated with new data in the database.
  try {
    const tweetData = await Tweet.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!tweetData) {
      res.status(404).json({ message: 'No tweet with this id' });
      return;
    }
    // The updated data (blogData) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(tweetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const tweetData = await Tweet.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!tweetData) {
      res.status(404).json({ message: 'No tweet found with this id!' });
      return;
    }

    res.status(200).json(tweetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
