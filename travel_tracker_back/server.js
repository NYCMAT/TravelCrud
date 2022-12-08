const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Travels = require('./models/travels.js');
//============================================
//============================================
app.use(express.json());
app.use(cors());
//=====================================
//============= routes ================
//main route
app.post('/travels', (req, res) => {
    Travels.create(req.body, (err, createdTravel) => {
        res.json(createdTravel)
    });
});

//index route
app.get('/travels', (req, res) => {
    Travels.find({}, (err, foundTravels) => {
        res.json(foundTravels)
    });
});

//delete route
app.delete('/travels/:id', (req, res) => {
    Travels.findByIdAndRemove(req.params.id, (err, deletedTravel) => {
        res.json(deletedTravel)
    });
});

//update route
app.put('/travels/:id', (req, res) => {
    Travels.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTravel) => {
        res.json(updatedTravel);
    });
});

//============================================
//======== listening ports ====================
mongoose.connect('mongodb://localhost:27017/travels')
mongoose.connection.once('open', () => {
    console.log('connected to mongod...');
});

app.listen(3000, () => {
    console.log('listening...');
});
