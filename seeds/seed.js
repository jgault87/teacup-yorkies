const sequelize = require('../config/connection');
const { User, Tweet, Comment, PotatoOrPitbull } = require('../models');

const userData = require('./userData.json');
const tweetData = require('./tweetData.json');
const commentData = require('./commentData.json');
const pitbullOrPotatoData = require('./potatoOrPitbullData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const tweet of tweetData) {
    await Tweet.create({
      ...tweet,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const pitbullOrPotato of pitbullOrPotatoData) {
    await PotatoOrPitbull.create({
      ...pitbullOrPotato,
    });
  }

  process.exit(0);
};

seedDatabase();
