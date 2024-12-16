import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database.js";

export const Reservation = sequelize.define('reservation', {
  reservation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  room_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'reservations',
  timestamps: false,
  freezeTableName: true
});