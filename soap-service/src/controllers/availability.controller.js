import axios from 'axios';
import moment from 'moment';
import { Availability } from '../models/availability.js';
import { sequelize as db } from '../utils/database.js';

export const checkAvailability = async (args) => {
  const { startDate, endDate, roomType } = args;

  const dbRooms = await Availability.findAll({
    where: {
      room_type: roomType,
      available_date: {
        [db.Sequelize.Op.between]: [startDate, endDate],
      },
    },
  });

  const externalServiceURL = 'http://microservicio:4000/rooms';
  const { data: externalRooms } = await axios.get(externalServiceURL);

  for (const externalRoom of externalRooms) {
    const { room_id, room_status } = externalRoom;

    if (externalRoom.room_type !== roomType) {
      continue;
    }

    const dbRoom = dbRooms.find((room) => room.room_id === room_id);

    if (dbRoom) {
      await Availability.update(
        { status: room_status === 'available' ? 'available' : 'not-available' },
        {
          where: {
            room_id,
            available_date: {
              [db.Sequelize.Op.between]: [startDate, endDate],
            },
          },
        }
      );
    } else {
      const dates = getDatesInRange(startDate, endDate);
      const newRecords = dates.map((date) => ({
        room_id,
        room_type: roomType,
        available_date: date,
        status: room_status === 'available' ? 'available' : 'not-available',
      }));

      await Availability.bulkCreate(newRecords);
    }
  }

  const availableRooms = await Availability.findAll({
    where: {
      room_type: roomType,
      available_date: {
        [db.Sequelize.Op.between]: [startDate, endDate],
      },
      status: 'available',
    },
  });

  const roomList = availableRooms.map(room => ({
    room_id: room.room_id,
    available_date: room.available_date.toISOString(),
  }));

  return { availableRooms: roomList };
};

const getDatesInRange = (start, end) => {
  const dates = [];
  let current = moment(start);
  const last = moment(end);

  while (current <= last) {
    dates.push(current.format('YYYY-MM-DD'));
    current = current.add(1, 'days');
  }

  return dates;
};
