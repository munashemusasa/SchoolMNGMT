const mongoose = require('mongoose');


var feesUpdateSchema = new mongoose.Schema({


date:{type:String, required:true},
startDate:{type:String, required:true},
endDate:{type:String, required:true},
term:{type:Number, required:true},
year:{type:Number, required:true},
fees:{type:Number, required:true},
person:{type:String, required:true}





})

module.exports = mongoose.model('FeesUpdate', feesUpdateSchema);