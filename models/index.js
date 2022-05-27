const User = require('./User');
const Tweet = require('./Tweet');
const Comment = require('./Comment');

User.hasMany(Tweet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Tweet.belongsTo(User, {
  foreignKey: 'user_id',
  
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Tweet, {
  foreignKey: 'tweet_id',
  
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Tweet.hasMany(Comment, {
  foreignKey: 'tweet_id',
 
});

module.exports = { User, Tweet, Comment };
