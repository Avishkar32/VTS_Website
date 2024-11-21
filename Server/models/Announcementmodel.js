const mongoose = require('mongoose');


const announcementSchema = new mongoose.Schema(
    {
        
        content: {
            type: String,
            required: [true, 'Content is required'],
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Announcement', announcementSchema);
