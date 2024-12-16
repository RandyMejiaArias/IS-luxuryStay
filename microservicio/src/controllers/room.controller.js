import { Room } from '../models/rooms.js';

export const createRoom = async (req, res) => {
  try {
    const { room_number, room_type } = req.body;

    const foundRoom = await Room.findOne({
      where: {
        room_number
      }
    });

    if (foundRoom) {
      return res.status(400).json({
        message: 'Room already exists'
      });
    }

    const newRoom = await Room.create({
      room_number,
      room_type,
      room_status: 'available'
    }, {
      fields: ['room_number', 'room_type', 'room_status']
    });

    return res.status(201).json({
      message: 'Room created successfully',
      data: newRoom
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const updateRoom = async (req, res) => {
  try {
    const { room_id } = req.params;
    const { room_status } = req.body;
    const updatedRoom = await Room.update({
      room_status
    }, {
      where: {
        room_id
      }
    });
    return res.status(200).json({
      message: 'Room updated successfully',
      data: updatedRoom
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}