const express = require('express');
const roomController = require('../controller/room.controller');
const router = express.Router();

router.post('/create', roomController.createRoom);
router.get('/', roomController.getRooms);

module.exports = router;