const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
    start: String,
    end: String,
    title: String,
    people: Number
})

const Event = mongoose.model('Event', EventSchema)

module.exports = Event