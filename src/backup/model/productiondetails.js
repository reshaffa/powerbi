'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productiondetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  productiondetails.init({
    production_id: DataTypes.INTEGER,
    amper_rpm: DataTypes.INTEGER,
    such_press: DataTypes.INTEGER,
    disch_press: DataTypes.INTEGER,
    flow: DataTypes.INTEGER,
    oil_level: DataTypes.STRING,
    seal_leakage: DataTypes.INTEGER,
    ob_drv: DataTypes.INTEGER,
    ib_drv: DataTypes.INTEGER,
    wending_body: DataTypes.INTEGER,
    ib_drvn: DataTypes.INTEGER,
    ob_drvn: DataTypes.INTEGER,
    ib_gb: DataTypes.INTEGER,
    ob_gb: DataTypes.INTEGER,
    max_driver: DataTypes.INTEGER,
    max_driven: DataTypes.INTEGER,
    max_gearbox: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'productiondetails',
  });
  return productiondetails;
};