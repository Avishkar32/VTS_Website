require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// Routes
// const exampleRoutes = require('./routes/exampleRoutes');
// app.use('/api/example', exampleRoutes);

const eventroutes = require("./routes/eventroutes");
const participantroutes = require("./routes/participantroute")

app.use('/api/events',eventroutes);
app.use('/api/participant',participantroutes)

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
