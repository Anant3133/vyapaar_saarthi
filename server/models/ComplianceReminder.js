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
    type: DataTypes.STRING, // e.g., GST Return, TDS Filing
    due_date: DataTypes.DATE,
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    completion_date: DataTypes.DATE,
    notes: DataTypes.TEXT,
  });

  ComplianceReminder.associate = (models) => {
    ComplianceReminder.belongsTo(models.Business, {
      foreignKey: 'business_id',
    });
  };

  return ComplianceReminder;
};
