const mongoose = require('mongoose');


var testxSchema = new mongoose.Schema({


uid:{type:String, required:true},
fullname:{type:String, required:true},
grade:{type:Number, required:true},
class1:{type:String, required:true},
date:{type:String, required:true},
month:{type:String, required:true},
year:{type:Number, required:true},
term:{type:Number, required:true},
teacher:{type:String, required:true},
teacherId:{type:String, required:true},
subject:{type:String, required:true},
subjectCode:{type:String, required:true},
mark:{type:Number, required:true},
type:{type:String, required:true},
symbol:{type:String, required:true},
result:{type:String, required:true},
category:{type:String, required:true},


})

module.exports = mongoose.model('TestX', testxSchema);