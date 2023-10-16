import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Users = sequelize.define(
  'users',
  {
    id: {
      field: 'id',
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      field: 'password',
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    lastLoginDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    status: {
      field: 'status',
      type: DataTypes.STRING(32),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    underscored: true,
    sequelize,
  }
);

export default Users;
