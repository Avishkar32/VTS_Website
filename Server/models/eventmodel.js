const mongoose = require('mongoose');

// Validator for valid phone numbers (Indian format as an example, modify as needed)
const phoneValidator = /^[6-9]\d{9}$/;

// Validator for valid times (24-hour format)
const timeValidator = /^([01]\d|2[0-3]):([0-5]\d)$/;

const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Event name is required'],
            trim: true,
            minlength: [3, 'Event name must be at least 3 characters'],
            maxlength: [100, 'Event name must not exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Event description is required'],
            minlength: [10, 'Description must be at least 10 characters long'],
            maxlength: [1000, 'Description must not exceed 1000 characters'],
            trim: true,
        },
        category: {
            type: String,
            enum: {
                values: ['Technical', 'Cultural', 'Sports', 'Other'],
                message: '{VALUE} is not a valid category',
            },
            required: [true, 'Event category is required'],
        },
        date: {
            type: Date,
            required: [true, 'Event date is required'],
            validate: {
                validator: (value) => value > Date.now(),
                message: 'Event date must be in the future',
            },
        },
        startTime: {
            type: String,
            required: [true, 'Start time is required'],
            validate: {
                validator: (value) => timeValidator.test(value),
                message: 'Invalid start time format. Use HH:MM (24-hour format)',
            },
        },
        
        venue: {
            type: String,
            required: [true, 'Event venue is required'],
            minlength: [2, 'Venue must be at least 5 characters long'],
            maxlength: [50, 'Venue must not exceed 200 characters'],
            trim: true,
        },
        registrationFee: {
            type: Number,
            required: [true, 'Registration fee is required'],
            min: [0, 'Registration fee cannot be negative'],
        },
        
        
        coordinator: {
            name: {
                type: String,
                required: [true, 'Coordinator name is required'],
                trim: true,
                minlength: [3, 'Coordinator name must be at least 3 characters long'],
                maxlength: [50, 'Coordinator name must not exceed 50 characters'],
            },
            contact: {
                type: String,
                required: [true, 'Coordinator contact is required'],
                validate: {
                    validator: (value) => phoneValidator.test(value),
                    message: 'Invalid phone number. It should be a 10-digit number',
                },
            },
        },
        poster: {
            type: String,
            default: 'default_poster.jpg', // URL or path for the default poster
            // validate: {
            //     validator: function (value) {
            //         const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\d-]+)*(\.[\w]+)?$/i;
            //         return urlRegex.test(value) || value === 'default_poster.jpg';
            //     },
            //     message: 'Invalid URL for the event poster',
            // },
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        particpantsRegistered: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event',
            },
        ],
    },
    {
        timestamps: true,
    }
);





module.exports = mongoose.model('Event', eventSchema);
