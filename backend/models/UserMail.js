const mongoose = require("mongoose");

const userMailSchema = new mongoose.Schema({
    
    email: {
        typre: String,
        required: true
    }
});

module.exports = mongoose.model('UserMail', userMailSchema)