'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EquipmentDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EquipmentDetail.init({
    equipment_id: DataTypes.INTEGER,
    vibration_id: DataTypes.INTEGER,
    OB: DataTypes.DECIMAL,
    OBV: DataTypes.DECIMAL,
    OBH: DataTypes.DECIMAL,
    IB: DataTypes.DECIMAL,
    IBV: DataTypes.DECIMAL,
    IBH: DataTypes.DECIMAL,
    A: DataTypes.DECIMAL,
    max: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'EquipmentDetail',
  });
  return EquipmentDetail;
};