// models/GovernmentEmployee.js
module.exports = (sequelize, DataTypes) => {
  const GovernmentEmployee = sequelize.define('GovernmentEmployee', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['Admin', 'Reviewer', 'Analyst', 'ComplianceOfficer', 'Support'],
      defaultValue: 'Reviewer',
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  GovernmentEmployee.associate = (models) => {
    GovernmentEmployee.belongsTo(models.Department, {
      foreignKey: 'department_id',
      onDelete: 'SET NULL',
    });

    GovernmentEmployee.hasMany(models.ApplicationReview, {
      foreignKey: 'reviewer_id',
    });

    GovernmentEmployee.hasMany(models.Complaint, {
      foreignKey: 'assigned_employee_id',
    });

    GovernmentEmployee.hasMany(models.ComplianceAction, {
      foreignKey: 'responsible_employee_id',
    });
  };

  return GovernmentEmployee;
};
