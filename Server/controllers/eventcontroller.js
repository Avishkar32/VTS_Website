
const Event = require("../models/eventmodel");

exports.createEvent = async (req, res) =>{
    console.log(req.body);

    try 
    {
        const newevent = await Event.create(req.body);

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

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();  // Fetch all events
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
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);  // Fetch event by ID

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