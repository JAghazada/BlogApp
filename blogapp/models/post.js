'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post.belongsTo(models.Author)
    }
  };
  post.init({
    title:{ 
      type:DataTypes.STRING(13),
      allowNull:false,
      validate:{
        is:/^.{1,160}$/i
      }
  },
  content:{
    type:DataTypes.STRING(120),
    allowNull:false,
    validate:{
      is:/^.{1,}$/i
    }
  },
  category :{
    type:DataTypes.STRING(112),
    defaultValue : 'Personal'
  }


}, {
    sequelize,
    modelName: 'post',
    freezeTableName:true
  });
  return post;
};