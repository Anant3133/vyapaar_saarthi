// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      full_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phone_number: DataTypes.STRING,
      website: DataTypes.STRING,
      address: DataTypes.TEXT,
      city: DataTypes.STRING,
      pin_code: DataTypes.STRING,
      bio: DataTypes.TEXT,
      profile_picture: DataTypes.STRING, 
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      phone_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password_hash: DataTypes.STRING,
      two_factor_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      two_factor_secret: {
        type: DataTypes.STRING, // encrypted TOTP secret
        allowNull: true,
      },
    },
    {
      modelName: 'User', // explicitly set model name
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Business, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    User.hasOne(models.NotificationPreferences, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.SchemeApplication, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.ActivityLog, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.UserSession, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
