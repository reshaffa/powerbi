'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VibrationLimit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  VibrationLimit.init({
    tag_no: DataTypes.STRING,
    equipment_type: DataTypes.INTEGER,
    alert: DataTypes.FLOAT,
    danger: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'VibrationLimit',
  });
  return VibrationLimit;
};