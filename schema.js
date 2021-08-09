const mongoose = require('mongoose');

const postschema = new mongoose.Schema(
    {
        title: String,
        description: String,
        created_on: { type: Date, default: Date.now },

    }
)

const postmodel = mongoose.model('post', postschema)


const user = new mongoose.Schema({

    email: String,
    created_on: { type: Date, default: Date.now }

})

const user_model = mongoose.model('users', user)
module.exports = { postmodel, user_model };
