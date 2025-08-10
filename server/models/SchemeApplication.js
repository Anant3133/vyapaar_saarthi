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
    status: {
      type: DataTypes.ENUM('applied', 'in_review', 'approved'),
      defaultValue: 'applied',
    },
    application_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    document_url: DataTypes.STRING,
    feedback_notes: DataTypes.TEXT,
  });

  SchemeApplication.associate = (models) => {
    if (models.User) {
      SchemeApplication.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
    if (models.GovernmentScheme) {
      SchemeApplication.belongsTo(models.GovernmentScheme, {
        foreignKey: 'scheme_id',
        onDelete: 'CASCADE',
      });
    }
  };

  return SchemeApplication;
};
