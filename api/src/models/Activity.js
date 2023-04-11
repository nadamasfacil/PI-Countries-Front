const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('activity', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5'],
      defaultValue: '1',
    },
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    seasson: {
      type: DataTypes.ENUM,
      values: ['Summer', 'Autumn', 'Winter', 'Spring'],
      defaultValue: 'Summer',
    },
    arrayCountries: {
      type: DataTypes.ARRAY( DataTypes.STRING ),
      defaultValue: [],
    },
  })
};
