const express = require('express');
const router = express.Router();
const chat = require('../controller/chat');

router.get('/chatDetails',chat.getChatDetails);
router.post('/message',chat.message);
router.post('/createChat',chat.createChat);
router.post('/chatMessages',chat.getChatMessages);

module.exports = router;