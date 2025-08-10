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
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pin_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      phone_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ['business_owner', 'gov_employee'],
        allowNull: false,
        defaultValue: 'business_owner',
      },
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
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      underscored: true,
    }
  );

  User.associate = (models) => {
    if (models.Business) {
      User.hasMany(models.Business, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
    if (models.NotificationPreferences) {
      User.hasOne(models.NotificationPreferences, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
    if (models.SchemeApplication) {
      User.hasMany(models.SchemeApplication, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
    if (models.ActivityLog) {
      User.hasMany(models.ActivityLog, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
    if (models.UserSession) {
      User.hasMany(models.UserSession, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  };

  return User;
};
