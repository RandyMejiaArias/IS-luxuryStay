import axios from 'axios';
import { Reservation } from "../models/reservation.js";
import { checkSoapAvailability } from '../utils/soapClient.js';


export const getReservationById = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;

    const reservation = await Reservation.findOne({
      where: {
        reservation_id: reservationId
      }
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReservation = async (req, res) => {
  try {
    const { room_number, customer_name, start_date, end_date } = req.body;

    const externalServiceURL = 'http://microservicio:4000/rooms';
    const { data: externalRooms } = await axios.get(externalServiceURL);

    const room = externalRooms.find(room => room.room_number === room_number);

    if (!room) {
      return res.status(400).json({ error: 'Room not found' });
    }

    const availableRooms = await checkSoapAvailability(room.room_type, start_date, end_date);

    if (!availableRooms) {
      return res.status(400).json({ error: 'Rooms are not available' });
    }

    const availableRoom = availableRooms.find(availableRoom => availableRoom.room_id == room.room_id);

    if (!availableRoom) {
      return res.status(400).json({ error: 'Room are not available' });
    }

    const reservation = await Reservation.create({
      room_number,
      customer_name,
      start_date,
      end_date,
      status: 'reserved'
    });

    res.status(201).json(reservation);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export const cancelReservation = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;

    const reservation = await Reservation.findOne({
      where: {
        reservation_id: reservationId
      }
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    await reservation.update({
      status: 'cancelled'
    });

    res.status(200).json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}