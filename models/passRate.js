const mongoose = require('mongoose');


var passSchema = new mongoose.Schema({


firstTerm:{type:Number, required:true},

secondTerm:{type:Number, required:true},

thirdTerm:{type:Number, required:true},

year:{type:Number, required:true}






})

module.exports = mongoose.model('Pass', passSchema);