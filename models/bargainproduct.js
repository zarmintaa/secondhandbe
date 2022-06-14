'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bargain_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user, { foreignKey: "user_id", as:"user"});
      this.hasOne(models.produk, {foreignKey: "product_id", as: "produk"})
    }
  }
  bargain_product.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    bargain_price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bargain_product',
  });
  return bargain_product;
};