const mongoose = require('mongoose');


var teacherSubSchema = new mongoose.Schema({


teacherName:{type:String, required:true},
teacherId:{type:String, required:true},
subjectCode:{type:String, required:true},
subjectName:{type:String, required:true},
grade:{type:Number, required:true},

dept:{type:String, required:true},






})

module.exports = mongoose.model('TeacherSubject', teacherSubSchema);