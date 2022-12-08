const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    location: String,
    description: String,
    image: String,
    beenBefore: Boolean,
});

const Travels = mongoose.model('Travel', travelSchema);

module.exports = Travels;
