const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    surname:{type:String, required:true},
    role:{type:String,required:true},
    role1:{type:String},
    gender:{type:String,required:true},
    fullname:{type:String,required:true},
    dob:{type:String,required:true},
    grade:{type:Number, required:true},
    uid:{type:String, required:true},
    class1:{type:String, required:true},
    classLength:{type:Number, required:true},
    classNo:{type:Number, required:true},
    studentNum:{type:Number, required:true},
    uidNum:{type:Number, required:true},
    studentId:{type:String, required:true},
    teacherName:{type:String, required:true},
    teacherId:{type:String, required:true},
    examDate:{type:String, required:true},
    feeStatus:{type:String, required:true},
    feesUpdate:{type:String, required:true},
    year:{type:Number, required:true},
    balance:{type:Number, required:true},
    balanceCarriedOver:{type:Number, required:true},
    status:{type:String, required:true},
    paymentId:{type:String, required:true},
    term:{type:Number, required:true},
    mobile:{type:String, required:true},
    prefix:{type:String, required:true},
    amount:{type:Number, required:true},
    receiptNumber:{type:Number, required:true},
    photo:{type:String, required:true},
    level:{type:String, required:true},
    type:{type:String, required:true},
    address:{type:String, required:true},
    dept:{type:String, required:true},
    subject:{type:Number, required:true},
    pollUrl:{type:String, required:true},
    subjectCode:{type:String, required:true},
    subjects:{type:String, required:true},
    password:{type:String,required:true},
   
});

// Custom validation for email
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);  
  };
  
  userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);  
  };

module.exports = mongoose.model('User', userSchema);