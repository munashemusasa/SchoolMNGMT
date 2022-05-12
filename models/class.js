const mongoose = require('mongoose');


var classSchema = new mongoose.Schema({


class1:{type:String, required:true},
numberOfStudents:{type:Number, required:true},
grade:{type:Number, required:true},
level:{type:String, required:true},
paid:{type:Number, required:true},
unpaid:{type:Number, required:true},
companyId:{type:String, required:true}





})

module.exports = mongoose.model('Class', classSchema);