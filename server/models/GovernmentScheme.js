// models/GovernmentScheme.js
module.exports = (sequelize, DataTypes) => {
  const GovernmentScheme = sequelize.define('GovernmentScheme', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    eligibility_criteria: DataTypes.TEXT,
    benefits: DataTypes.TEXT,
    department: DataTypes.STRING,
    application_link: DataTypes.STRING,
  });

  GovernmentScheme.associate = (models) => {
    GovernmentScheme.hasMany(models.SchemeApplication, {
      foreignKey: 'scheme_id',
      onDelete: 'CASCADE',
    });
  };

  return GovernmentScheme;
};
