// models/Business.js
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    business_name: DataTypes.STRING,
    location: DataTypes.STRING, // e.g., "Mumbai, Maharashtra"
    registration_number: DataTypes.STRING,
    business_type: {
      type: DataTypes.ENUM,
      values: [
        'Private Limited',
        'Public Limited',
        'Proprietorship',
        'Partnership',
        'LLP',
      ],
    },
    sector: DataTypes.STRING,
    gstin: DataTypes.STRING,
    incorporation_date: DataTypes.DATE,
  });

  Business.associate = (models) => {
    Business.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Business.hasMany(models.LicenseApplication, {
      foreignKey: 'business_id',
      onDelete: 'CASCADE',
    });
    Business.hasMany(models.ComplianceReminder, {
      foreignKey: 'business_id',
      onDelete: 'CASCADE',
    });
  };

  return Business;
};
