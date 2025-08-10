// models/Document.js
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    document_type: {
      type: DataTypes.STRING, // e.g., "License Proof", "PAN Card"
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING, // file storage location
      allowNull: false,
    },
    uploaded_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    business_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    license_application_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });

  Document.associate = (models) => {
    if (models.User) {
      Document.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
    if (models.Business) {
      Document.belongsTo(models.Business, {
        foreignKey: 'business_id',
        onDelete: 'CASCADE',
      });
    }
    if (models.LicenseApplication) {
      Document.belongsTo(models.LicenseApplication, {
        foreignKey: 'license_application_id',
        onDelete: 'CASCADE',
      });
    }
  };

  return Document;
};
