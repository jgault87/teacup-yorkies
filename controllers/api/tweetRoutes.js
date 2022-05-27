const router = require('express').Router();
const { Tweet } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Tweet.findAll({
      order: [['date_created', 'DESC']],
    });

    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // sending the data to the Model so that one blog can be updated with new data in the database.
  try {
    const blogData = await Blog.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!blogData) {
      res.status(404).json({ message: 'No blog with this id' });
      return;
    }
    // The updated data (blogData) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
