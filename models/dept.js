const mongoose = require('mongoose');


var deptSchema = new mongoose.Schema({


name:{type:String, required:true},






})

module.exports = mongoose.model('Dept', deptSchema);