import { DataTypes} from 'sequelize';
import { sequelize } from '../utils/database.js';

export const Room = sequelize.define('rooms', {
  room_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  room_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  room_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  room_status: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'rooms',
  timestamps: false, 
  freezeTableName: true
});