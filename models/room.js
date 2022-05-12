const mongoose = require('mongoose');


var roomSchema = new mongoose.Schema({


name:{type:String, required:true}

})

module.exports = mongoose.model('Room', roomSchema);