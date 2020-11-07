'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Equipment.init({
    tag_no: DataTypes.STRING,
    equipment_type: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    area_id: DataTypes.INTEGER,
    vibration_id: DataTypes.INTEGER,
    initial_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Equipment',
  });
  return Equipment;
};