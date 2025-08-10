// models/UserSession.js
module.exports = (sequelize, DataTypes) => {
  const UserSession = sequelize.define('UserSession', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    login_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    last_activity_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  UserSession.associate = (models) => {
    if (models.User) {
      UserSession.belongsTo(models.User, { 
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  };

  return UserSession;
};
