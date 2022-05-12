const mongoose = require('mongoose');


var gradeSchema = new mongoose.Schema({


symbol:{type:String, required:true},
from:{type:Number, required:true},
to:{type:Number, required:true},
comments:{type:String, required:true},




})

module.exports = mongoose.model('Grade', gradeSchema);