// models/LicenseApplication.js
module.exports = (sequelize, DataTypes) => {
  const LicenseApplication = sequelize.define('LicenseApplication', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    business_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    license_type: DataTypes.STRING, // generalized license type name
    status: DataTypes.STRING, // pending/approved/rejected
    application_date: DataTypes.DATE,
    approval_date: DataTypes.DATE,
    comments: DataTypes.TEXT,
    document_url: DataTypes.STRING,
    tracking_number: DataTypes.STRING,
  });

  LicenseApplication.associate = (models) => {
    LicenseApplication.belongsTo(models.Business, {
      foreignKey: 'business_id',
    });
  };

  return LicenseApplication;
};
