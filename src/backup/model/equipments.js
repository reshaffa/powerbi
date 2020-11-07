'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Equipments.init({
    tag_no: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    area_id: DataTypes.INTEGER,
    indikasi: DataTypes.STRING,
    remark: DataTypes.STRING,
    saran: DataTypes.STRING,
    initial_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Equipments',
  });
  return Equipments;
};