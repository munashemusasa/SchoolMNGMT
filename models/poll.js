const { now } = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    pollUrl:{type:String, required:true},
    studentId:{type:String, required:true},
    date:{type:Date, default:Date.now},
    fullname:{type:String, required:true},
  
  
});

module.exports = mongoose.model('Poll', schema);