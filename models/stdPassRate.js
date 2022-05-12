const mongoose = require('mongoose');


var stdSchema = new mongoose.Schema({


firstTerm:{type:Number, required:true},
firstAvgMark:{type:Number, required:true},
secondTerm:{type:Number, required:true},
secondAvgMark:{type:Number, required:true},
thirdTerm:{type:Number, required:true},
thirdAvgMark:{type:Number, required:true},
studentId:{type:String, required:true},
class1:{type:String, required:true},
type:{type:String, required:true},
term:{type:Number, required:true},
year:{type:Number, required:true}



})

module.exports = mongoose.model('stdPass', stdSchema);