const mongoose = require('mongoose');


var studentSubSchema = new mongoose.Schema({


studentName:{type:String, required:true},
studentId:{type:String, required:true},
subjectCode:{type:String, required:true},
subjectName:{type:String, required:true},
dept:{type:String, required:true},
studentClass:{type:String, required:true}





})

module.exports = mongoose.model('StudentSubject', studentSubSchema);