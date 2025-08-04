// models/SchemeApplication.js
module.exports = (sequelize, DataTypes) => {
  const SchemeApplication = sequelize.define('SchemeApplication', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    scheme_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: DataTypes.STRING, // applied, in_review, approved
    application_date: DataTypes.DATE,
    document_url: DataTypes.STRING,
    feedback_notes: DataTypes.TEXT,
  });

  SchemeApplication.associate = (models) => {
    SchemeApplication.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    SchemeApplication.belongsTo(models.GovernmentScheme, {
      foreignKey: 'scheme_id',
    });
  };

  return SchemeApplication;
};
