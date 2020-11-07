'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class week_code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  week_code.init({
    week_one: DataTypes.STRING,
    week_two: DataTypes.STRING,
    week_three: DataTypes.STRING,
    last_week: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'week_code',
  });
  return week_code;
};