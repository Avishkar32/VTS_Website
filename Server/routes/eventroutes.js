const express = require('express');
const eventcontroller = require('./../controllers/eventcontroller');



const router = express.Router();



router
    .route('/')
    .post(eventcontroller.createEvent)
    .get(eventcontroller.getAllEvents)

router
    .route('/:id')
    .get(eventcontroller.getEventById)

module.exports = router;