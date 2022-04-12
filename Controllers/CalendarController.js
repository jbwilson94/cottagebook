const router = require('express').Router();
const Event = require('../Models/Event');
const User = require('../Models/User');

router.post('/create-event', async (req,res) => {
    const event = Event(req.body);
    await event.save();
    res.sendStatus(201);
})

router.delete('/delete-event', async (req, res) => {
    await Event.findById(req.body._id).deleteOne();
})

router.get('/get-events', async (req, res) => {
    const events = await Event.find().lean();
    res.send(events);
})

router.patch('/update-events', async (req, res) => {
    const { username, name } = req.body;
    await Event.updateMany({ booker: username }, { title: name});
})

module.exports = router;