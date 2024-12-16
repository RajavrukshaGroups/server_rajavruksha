const mongoose = require('mongoose');
const initData = require("./data");
const user = require('../model/user');
const User = require('../model/user');

const mongo_URL = 'mongodb://127.0.0.1:27017/Rajavruksha'
main().then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log(err)
})

async function main() {
    await mongoose.connect(mongo_URL)
}

const initialiseData = async () => {
    await User.insertMany(initData.data)
    console.log('success')
}


