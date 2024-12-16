import Router from 'express';

const router = new Router();

import * as reservationController from '../controllers/reservations.controller.js';

router.get('/:reservationId', reservationController.getReservationById);

router.post('/', reservationController.createReservation);

router.delete('/:reservationId', reservationController.cancelReservation);

export default router;