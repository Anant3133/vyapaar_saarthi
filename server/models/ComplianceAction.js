// models/ComplianceAction.js
module.exports = (sequelize, DataTypes) => {
  const ComplianceAction = sequelize.define('ComplianceAction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    compliance_reminder_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    action_type: {
      type: DataTypes.STRING,
      allowNull: false,
    }, // e.g., "Warning Issued", "Fine Imposed", "Inspection Done"
    notes: DataTypes.TEXT,
    action_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    responsible_employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  ComplianceAction.associate = (models) => {
    ComplianceAction.belongsTo(models.ComplianceReminder, {
      foreignKey: 'compliance_reminder_id',
      onDelete: 'CASCADE',
    });
    ComplianceAction.belongsTo(models.GovernmentEmployee, {
      foreignKey: 'responsible_employee_id',
    });
  };

  return ComplianceAction;
};
