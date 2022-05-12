const mongoose = require('mongoose');


var statSchema = new mongoose.Schema({


students:{type:Number, required:true},
teachers:{type:Number, required:true},
paid:{type:Number, required:true},
unpaid:{type:Number, required:true},
depts:{type:Number, required:true},
class1:{type:Number, required:true}






})

module.exports = mongoose.model('Stats', statSchema);