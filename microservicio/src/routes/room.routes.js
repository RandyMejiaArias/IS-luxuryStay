import Router from 'express';

const router = new Router();

import * as roomController from '../controllers/room.controller.js';

router.get('/', roomController.getRooms);
router.post('/', roomController.createRoom);
router.patch('/:room_id', roomController.updateRoom);

export default router;