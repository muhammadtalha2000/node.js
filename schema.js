const mongoose = require('mongoose');

const postschema = new mongoose.Schema(
    {
        fname: String,
        lname: String,
        created_on: { type: Date, default: Date.now },

    }
)

const postmodel = mongoose.model('post', postschema)

module.exports = postmodel;