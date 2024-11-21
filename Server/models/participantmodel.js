const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema(
    {
        prn: {
            type: String,
            required: [true, 'PRN is required'],
            unique: true,
            trim: true,
            validate: {
                validator: (value) => /^\d+$/.test(value),
                message: 'PRN must contain numbers only',
            },
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [3, 'Name must be at least 3 characters long'],
            maxlength: [100, 'Name must not exceed 100 characters'],
        },
        mobile: {
            type: String,
            required: [true, 'Mobile number is required'],
            validate: {
                validator: (value) => /^[6-9]\d{9}$/.test(value),
                message: 'Invalid mobile number. It should be a 10-digit number',
            },
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
                message: 'Invalid email address',
            },
        },
        points: {
            type: Number,
            default: 0,
            min: [0, 'Points cannot be negative'],
        },
        eventsRegistered: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event',
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Participant', participantSchema);
