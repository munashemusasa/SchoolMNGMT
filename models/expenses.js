const mongoose = require('mongoose');


var expenseSchema = new mongoose.Schema({


description:{type:String, required:true},
amount:{type:Number, required:true},
term:{type:Number, required:true},
type:{type:String, required:true},
date:{type:String, required:true},
voucherNumber:{type:String, required:true},
status:{type:String, required:true},
month:{type:String, required:true},
year:{type:Number, required:true},
payment:{type:String, required:true},




})

module.exports = mongoose.model('Expense', expenseSchema);