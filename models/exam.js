const mongoose = require('mongoose');


var examSchema = new mongoose.Schema({


examType:{type:String, required:true},
subject:{type:String, required:true},
subjectCode:{type:String, required:true},
grade:{type:Number, required:true},
time:{type:String, required:true},
start:{type:String, required:true},
finish:{type:String, required:true},
teacherName:{type:String, required:true},
uid:{type:String, required:true},
date:{type:String, required:true},
room:{type:String, required:true},






})

module.exports = mongoose.model('Exam', examSchema);