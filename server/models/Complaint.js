// models/Complaint.js
module.exports = (sequelize, DataTypes) => {
  const Complaint = sequelize.define('Complaint', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    business_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['open', 'in_progress', 'resolved', 'closed'],
      defaultValue: 'open',
    },
    assigned_employee_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    resolution_notes: DataTypes.TEXT,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Complaint.associate = (models) => {
    Complaint.belongsTo(models.Business, {
      foreignKey: 'business_id',
      onDelete: 'CASCADE',
    });
    Complaint.belongsTo(models.GovernmentEmployee, {
      foreignKey: 'assigned_employee_id',
    });
  };

  return Complaint;
};
