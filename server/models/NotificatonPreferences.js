// models/NotificationPreferences.js
module.exports = (sequelize, DataTypes) => {
  const NotificationPreferences = sequelize.define('NotificationPreferences', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    email_updates: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    sms_alerts: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    browser_push: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    promotional_content: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    app_progress_updates: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fee_payment_notifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    maintenance_alerts: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    weekly_summary_email: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  NotificationPreferences.associate = (models) => {
    if (models.User) {
      NotificationPreferences.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  };

  return NotificationPreferences;
};
