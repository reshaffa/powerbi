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
    eququipment_id: DataTypes.INTEGER,
    driver_id: DataTypes.INTEGER,
    driven_id: DataTypes.INTEGER,
    dvr_OB: DataTypes.FLOAT,
    dvr_OBV: DataTypes.FLOAT,
    dvr_OBH: DataTypes.FLOAT,
    dvr_IB: DataTypes.FLOAT,
    dvr_IBV: DataTypes.FLOAT,
    dvr_IBH: DataTypes.FLOAT,
    dvr_A: DataTypes.FLOAT,
    dvn_OB: DataTypes.FLOAT,
    dvn_OBV: DataTypes.FLOAT,
    dvn_OBH: DataTypes.FLOAT,
    dvn_IB: DataTypes.FLOAT,
    dvn_IBV: DataTypes.FLOAT,
    dvn_IBH: DataTypes.FLOAT,
    dvn_A: DataTypes.FLOAT,
    dvr_max: DataTypes.FLOAT,
    dvn_max: DataTypes.FLOAT,
    initial_week: DataTypes.STRING,
    last_week: DataTypes.STRING,
    actual_vib: DataTypes.FLOAT,
    last_vib: DataTypes.FLOAT,
    max_level: DataTypes.FLOAT,
    position: DataTypes.STRING,
    status: DataTypes.INTEGER,
    indikasi: DataTypes.STRING,
    remark: DataTypes.STRING,
    saran: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EquipmentDetail',
  });
  return EquipmentDetail;
};