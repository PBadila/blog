'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Journal.hasMany(models.Comment, {
        foreignKey: 'blogID',
      });
    }
  }
  Journal.init({
    title: DataTypes.STRING,
    entry: DataTypes.TEXT,
    link: DataTypes.STRING,
    topic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Journal',
  });
  return Journal;
};