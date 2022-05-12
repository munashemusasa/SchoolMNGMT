const mongoose = require('mongoose');


var lessonSchema = new mongoose.Schema({


teacherName:{type:String, required:true},
teacherId:{type:String, required:true},
subjectName:{type:String, required:true},
subjectCode:{type:String, required:true},
class1:{type:String, required:true},
room:{type:String, required:true},
start:{type:String, required:true},
finish:{type:String, required:true},
time:{type:String, required:true},
day:{type:String, required:true},
term:{type:Number, required:true},
year:{type:Number, required:true},
month:{type:String, required:true},







})

module.exports = mongoose.model('Lesson', lessonSchema);