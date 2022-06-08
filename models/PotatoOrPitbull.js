const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PotatoOrPitbull extends Model {}

PotatoOrPitbull.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['potato', 'pitbull'],
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = PotatoOrPitbull;
