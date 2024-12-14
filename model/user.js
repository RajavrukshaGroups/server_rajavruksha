const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    },
    designation:{
        type:String,
    },
    email: {
        type: String,
    },
    file: {
        url: String,
        filename: String,
    },
    contact_no: {
        type: Number,
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;