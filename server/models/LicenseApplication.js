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
    license_type: {
      type: DataTypes.STRING,
      allowNull: false,
    }, // generalized license type name
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    application_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    approval_date: DataTypes.DATE,
    comments: DataTypes.TEXT,
    document_url: DataTypes.STRING,
    tracking_number: DataTypes.STRING,
  });

  LicenseApplication.associate = (models) => {
    if (models.Business) {
      LicenseApplication.belongsTo(models.Business, {
        foreignKey: 'business_id',
        onDelete: 'CASCADE',
      });
    }
  };

  return LicenseApplication;
};
