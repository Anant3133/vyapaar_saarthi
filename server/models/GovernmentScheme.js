// models/GovernmentScheme.js
module.exports = (sequelize, DataTypes) => {
  const GovernmentScheme = sequelize.define('GovernmentScheme', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    eligibility_criteria: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    benefits: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    application_link: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
      allowNull: true,
    },
  });

  GovernmentScheme.associate = (models) => {
    GovernmentScheme.hasMany(models.SchemeApplication, {
      foreignKey: 'scheme_id',
      onDelete: 'CASCADE',
    });
  };

  return GovernmentScheme;
};
