const router = require('express').Router()
const Event = require('../Models/Event')

router.post('/create-event', async (req,res) => {
    const event = Event(req.body)
    await event.save()
    res.sendStatus(201)
})

router.delete('/delete-event', async (req, res) => {
    await Event.findById(req.body._id).deleteOne();
})

router.get('/get-events', async (req, res) => {
    const events = await Event.find().lean();
    res.send(events)
})

module.exports = router