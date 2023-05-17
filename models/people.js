const mongoose = require("mongoose")
const Schema = mongoose.Schema

const peopleSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    }
})

const people = mongoose.model("people", peopleSchema)
module.exports = people