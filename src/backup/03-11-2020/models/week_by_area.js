'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class week_by_area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  week_by_area.init({
    week_code: DataTypes.STRING,
    area_id: DataTypes.INTEGER,
    total_normal: DataTypes.INTEGER,
    total_alert: DataTypes.INTEGER,
    total_danger: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'week_by_area',
  });
  return week_by_area;
};