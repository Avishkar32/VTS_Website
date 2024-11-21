
const Participant = require("../models/participantmodel");
const Event = require("../models/eventmodel");

exports.createParticipant = async (req, res) =>{
    console.log(req.body);

    try 
    {
        const newevent = await Participant.create(req.body);

        res.status(201).json({
            status:'success',
            data:{
                event:newevent,
            }
        });
    }
    catch(err)
    {
        res.status(400).json({
            status:'fail',
            message:err
        });
    };

}

exports.getallParticipant = async (req, res) => {
    try {
        const events = await Participant.find();  // Fetch all events
        res.status(200).json({
            status: 'success',
            results: events.length,
            data: {
                events: events,
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

// View a Single Event by ID
exports.getParticipantById = async (req, res) => {
    try {
        const event = await Participant.findById(req.params.id);  // Fetch event by ID

        if (!event) {
            return res.status(404).json({
                status: 'fail',
                message: 'Event not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                event: event,
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.registerParticipantForEvent = async (req, res) => {
    

    try {

        const {participantId, eventId}=req.params;

        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the participant exists
        const participant = await Participant.findById(participantId);
        if (!participant) {
            return res.status(404).json({ message: 'Participant not found' });
        }

        // Check if the participant is already registered for the event
        if (event.particpantsRegistered.includes(participantId)) {
            return res.status(400).json({ message: 'Participant already registered for this event' });
        }

        // Add the participant to the event's participants array
        event.particpantsRegistered.push(participantId);
        await event.save();

        // Add the event to the participant's eventsRegistered array
        participant.eventsRegistered.push(eventId);
        await participant.save();

        res.status(200).json({
            message: 'Participant successfully registered for the event',
            event,
            participant,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};