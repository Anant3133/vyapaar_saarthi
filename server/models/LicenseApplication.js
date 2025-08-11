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
      allowNull: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    license_type: {
      type: DataTypes.STRING,
      allowNull: false,
    }, // generalized license type name
    license_category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    license_duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    applicant_name: DataTypes.STRING,
    applicant_email: DataTypes.STRING,
    applicant_phone: DataTypes.STRING,
    designation: DataTypes.STRING,
    business_address: DataTypes.TEXT,
    pincode: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    business_description: DataTypes.TEXT,
    expected_employees: DataTypes.INTEGER,
    investment_amount: DataTypes.DECIMAL,
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
    priority: {
      type: DataTypes.ENUM('high', 'medium', 'low'),
      defaultValue: 'low',
    },
    assigned_officer: DataTypes.STRING,
    department: DataTypes.STRING,
    processing_time: DataTypes.STRING,
    fees: DataTypes.STRING,
    document_url: DataTypes.STRING,
    tracking_number: DataTypes.STRING,
    application_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  });

  LicenseApplication.associate = (models) => {
    if (models.Business) {
      LicenseApplication.belongsTo(models.Business, {
        foreignKey: 'business_id',
        onDelete: 'CASCADE',
      });
    }
    if (models.User) {
      LicenseApplication.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
      });
    }
  };

  return LicenseApplication;
};
