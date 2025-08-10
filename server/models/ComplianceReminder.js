// models/ComplianceReminder.js
module.exports = (sequelize, DataTypes) => {
  const ComplianceReminder = sequelize.define('ComplianceReminder', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    business_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING, // e.g., GST Return, TDS Filing
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    completion_date: DataTypes.DATE,
    notes: DataTypes.TEXT,
  });

  ComplianceReminder.associate = (models) => {
    if (models.Business) {
      ComplianceReminder.belongsTo(models.Business, {
        foreignKey: 'business_id',
        onDelete: 'CASCADE',
      });
    }
  };

  return ComplianceReminder;
};
