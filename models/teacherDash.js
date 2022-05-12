const mongoose = require('mongoose');


var tdashSchema = new mongoose.Schema({


teacherId:{type:String, required:true},
subjects:{type:String, required:true},
class1:{type:String, required:true},
dept:{type:Number, required:true},




})

module.exports = mongoose.model('TDash', tdashSchema);