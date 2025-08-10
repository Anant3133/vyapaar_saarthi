// models/ApplicationReview.js
module.exports = (sequelize, DataTypes) => {
  const ApplicationReview = sequelize.define('ApplicationReview', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    application_type: {  // "license" or "scheme"
      type: DataTypes.ENUM,
      values: ['license', 'scheme'],
      allowNull: false,
    },
    application_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reviewer_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'approved', 'rejected'],
      defaultValue: 'pending',
    },
    comments: DataTypes.TEXT,
    reviewed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  ApplicationReview.associate = (models) => {
    ApplicationReview.belongsTo(models.GovernmentEmployee, {
      foreignKey: 'reviewer_id',
    });
    // Associations with LicenseApplication or SchemeApplication will be handled manually via application_type and application_id keys
  };

  return ApplicationReview;
};
