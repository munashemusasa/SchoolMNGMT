const mongoose = require('mongoose');


var subjectSchema = new mongoose.Schema({


name:{type:String, required:true},
grade:{type:Number, required:true},
dept:{type:String, required:true},
code:{type:String, required:true}





})

module.exports = mongoose.model('Subject', subjectSchema);