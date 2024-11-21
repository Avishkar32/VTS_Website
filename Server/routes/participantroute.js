const express = require('express');
const participantcontroller = require('./../controllers/participantcontroller');



const router = express.Router();



router
    .route('/')
    .post(participantcontroller.createParticipant)
    .get(participantcontroller.getallParticipant)

router
    .route('/:id')
    .get(participantcontroller.getParticipantById)

router
    .route('/register/:participantId/:eventId')
    .post(participantcontroller.registerParticipantForEvent)

module.exports = router;