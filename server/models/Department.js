// models/Department.js
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    head_employee_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });

  Department.associate = (models) => {
    Department.hasMany(models.GovernmentEmployee, {
      foreignKey: 'department_id',
    });

    // Optional: link to head of department
    Department.belongsTo(models.GovernmentEmployee, {
      foreignKey: 'head_employee_id',
      as: 'head',
    });
  };

  return Department;
};
