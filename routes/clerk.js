require('dotenv').config();

var express = require('express');
var router = express.Router();
const User =require('../models/user')
const Class1 =require('../models/class');
const Subject =require('../models/subject');
const Fees =require('../models/fees');
const Grade =require('../models/grade');
const Dept =require('../models/dept');
const Test =require('../models/classTest');
const Lesson =require('../models/lesson');
const Exam =require('../models/exam');
const Income =require('../models/incomeX');
const TestX =require('../models/classTestX');
const Stats =require('../models/stats');
const Gender =require('../models/gender');
const Pass =require('../models/passRate');
const PassX =require('../models/passRateX');
const Expenses = require('../models/expenses')
const FeesUpdate =require('../models/feesUpdate');
const StudentSub =require('../models/studentSubject');
const TeacherSub =require('../models/teacherSubject');
var Quiz = require('../models/quiz');
const stripe = require('stripe')('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');
const keys = require('../config1/keys')
var mongoose = require('mongoose')
var passport = require('passport')
var xlsx = require('xlsx')
var multer = require('multer')
const fs = require('fs')
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport')
var moment = require('moment')
var bcrypt = require('bcrypt-nodejs');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})



var upload = multer({
    storage:storage
})




router.get('/dashInc',isLoggedIn,function(req,res){
  var term = req.user.term
  var m = moment()
  var year = m.format('YYYY')
  var fees
  var arr1=[]
  var number1
  var totalStudents, students, passRate


  Income.find({year:year},function(err,docs){

    Fees.find({term:term,year:year},function(err,hods){


    

    if(docs.length == 0 ){

      

      var inc = Income();
            inc.firstTermIncome = 0;
            inc.firstTermExpense = 0;
            inc.secondTermIncome = 0;
            inc.secondTermExpense = 0
            inc.thirdTermIncome = 0
            inc.thirdTermExpense = 0
            inc.year = year

            inc.save()
    .then(incX =>{

      res.redirect('/clerk/dashExp')

    })

    }
    else
    Income.find({year:year},function(err,docs){

      var id3 = docs[0]._id
    Fees.find({term:term,year:year},function(err,hods){

      for(var q = 0;q<hods.length; q++){
          
        arr1.push(hods[q].amount)
          }
          //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
           number1=0;
          for(var z in arr1) { number1 += arr1[z]; }


          
      if(term == 1){

  
        Income.findByIdAndUpdate(id3,{$set:{firstTermIncome:number1}},function(err,kocs){
     
        
        })
      }else if(term == 2){
      
        Income.findByIdAndUpdate(id3,{$set:{secondTermIncome:number1}},function(err,kocs){
      
            
            })
          }else{
            Income.findByIdAndUpdate(id3,{$set:{thirdTermIncome:number1}},function(err,kocs){
            
                
                })
          }



          res.redirect('/clerk/dashExp')


    })
  })





  })


})



})




router.get('/dashExp',isLoggedIn,function(req,res){

  let arrX = []
  let totalX
  var term = req.user.term
  var m = moment()
  var year = m.format('YYYY')
  var fees
  var arr1=[]
  var number1

  Expenses.find({term:term,year:year},function(err,hods){

    if(hods.length == 0){

      res.redirect('/clerk/dash')
    }
else
Income.find({year:year},function(err,docs){
  var incX = docs[0]._id
  Expenses.find({term:term,year:year},function(err,pods){
  
  
for(var q = 0;q<pods.length; q++){
          
  arrX.push(pods[q].amount)
  }
  //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
   totalX=0;
  for(var z in arrX) { totalX += arrX[z]; }
  
  
  if(term == 1){
  
  
  Income.findByIdAndUpdate(incX,{$set:{firstTermExpense:totalX}},function(err,kocs){

  
  })
  }else if(term == 2){
  
  Income.findByIdAndUpdate(incX,{$set:{secondTermExpense:totalX}},function(err,kocs){

    
    })
  }else{
    Income.findByIdAndUpdate(incX,{$set:{thirdTermExpense:totalX}},function(err,kocs){
      
        
        })
      
  }
  res.redirect('/clerk/dash')
})
})
  })


})


router.get('/dash',isLoggedIn,clerk,function(req,res){
  var students, teachers, paid, unpaid, depts, class1
User.find({role:'student'},function(err,docs){
  students = docs.length
  
User.find({role:'teacher'},function(err,nocs){
  teachers = nocs.length;
  User.find({role:'student',status:'paid'},function(err,jocs){
 paid = jocs.length;

 User.find({role:'student',status:'owing'},function(err,klocs){
   unpaid = klocs.length

   
   Dept.find({},function(err,jocs){
    depts = jocs.length;
   
    Class1.find({},function(err,klocs){
      class1 = klocs.length


   Stats.find({},function(err,docs){

if(docs == 0){


var stat = new Stats();
stat.students = students;
stat.teachers = teachers
stat.paid = paid;
stat.unpaid = unpaid
stat.depts = depts
stat.class1 = class1

stat.save()
.then(sta =>{

  res.render('dashboard/clerk',{student:students, teachers:teachers,paid:paid, unpaid:unpaid})

})
}
else
Stats.find({},function(err,docs){
var id = docs[0]._id

Stats.findByIdAndUpdate(id,{$set:{students:students, teachers:teachers,paid:paid, unpaid:unpaid,class1:class1, depts:depts}})


res.render('dashboard/clerk',{students:students, teachers:teachers,paid:paid, unpaid:unpaid})
})

})

  
    })
  })
   
 })


  })
})

})
    
})



      
    //role admin
    //new term fees update
    router.get('/feesUpdate',isLoggedIn,clerk, function(req,res){
      var id = req.user.feesUpdate;
      var m = moment()
      var day = moment().toString()
      var days, endDate;
      var user = req.user.feesUpdate
      if(user == 'null'){
      
  
      
          res.render('clerk/feesUpdate')
  
      }
      else
      
  
      
      FeesUpdate.find({_id:id},function(err,docs){
        let readonly
        try{
          
      
      if(!docs){
        throw new SyntaxError('No data')
      }
      
        endDate = moment(docs[0].endDate);
        //moment(endDate)
        days = endDate.diff(m,'days')
      console.log(days,'days')
        if(days >  0){
      readonly = 'readonly'
      title = days + '' + ' '+ 'days left until you can add new term'
          res.render('clerk/feesUpdate2',{readonly:readonly,day:day, title:title})
      
        }else
      
        readonly = " ";
        console.log(readonly)
      title = ' Update '
          res.render('clerk/feesUpdate',{readonly:readonly,day:day,title:title})
        
        }catch(e){
          res.send(e.message)
         }
      
      
      })
      
      
        })
        
        router.post('/feesUpdate',isLoggedIn,clerk,  function(req,res){
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;
        var balanceX, status, term, year, balanceCarriedOver, balance
        var id = req.user._id
        var m = moment()
        var date = moment().toString()
        term = req.body.term
        year = m.format('YYYY')
        var feeX = req.body.fees
        
       
        
        b =moment(startDate).valueOf()
        bs = moment(b).toString()
        console.log('startDate',b)
        f = moment(endDate).valueOf()
        fstr = moment(f)
        console.log('fstr',fstr)
        console.log('endDate',f)
       //var days = f.diff(b,"days")
       var days = m.diff(bs,'days')
       
         
       console.log(days,'days')
       req.check('startDate','Enter Start of Term').notEmpty();
       req.check('endDate','Enter End of Term').notEmpty();
       req.check('fees','Enter Fees').notEmpty().isNumeric();
       req.check('term','Enter Term').notEmpty();
      
       var errors = req.validationErrors();
       if (errors) {
      
         req.session.errors = errors;
         req.session.success = false;
         res.render('students/feesUpdate',{errors:req.session.errors})
      
       
      }
      
        var fees = new FeesUpdate();
          
        fees.date = date;
        fees.startDate = startDate;
        fees.endDate = endDate;
        fees.fees= req.body.fees;
        fees.term = term;
        fees.year = year
      
        fees.person = req.user.fullname
      
      
        fees.save()
          .then(fee =>{
         var adminBal = 0 - fee.fees
            User.findByIdAndUpdate(id,{$set:{feesUpdate:fee._id,term:term,balance:adminBal}},function(err,docs){
      
      
            })
      
      
        User.find({role:"student"},function(err,nocs){
        
        for(var i  = 0; i< nocs.length; i++){
        balanceX = nocs[i].balance 
        balance = balanceX - feeX
        balanceCarriedOver = nocs[i].balance
      
        console.log('balance',balance)
        console.log('balanceX', balanceX)
        console.log('fees',feeX)
      
        if(balance > 0){
          
          User.findByIdAndUpdate(nocs[i]._id,{$set:{balance:balance, status:"paid", term:term, year:year,balanceCarriedOver:balanceCarriedOver,feesUpdate:fee._id,}},function(err,docs){
        
        
          
        
          })
      
        }else
        
        User.findByIdAndUpdate(nocs[i]._id,{$set:{balance:balance, status:"owing", term:term, year:year,balanceCarriedOver:balanceCarriedOver,feesUpdate:fee._id,}},function(err,docs){
        
        
          
        
        })
        
        }
        res.redirect('/clerk/feesUpdate')
        })
      })
        
        })
      











//role admin
//capturing school fees
router.get('/addFees',isLoggedIn,clerk, function(req,res){
  var day = moment().toString()
  res.render('students/addFees',{day:day})
})





router.post('/incomeChart',isLoggedIn,function(req,res){
    var m = moment()
    var year = m.format('YYYY')
    var term = req.user.term
          Income.find({year:year, term:term},function(err,docs){
            if(docs == undefined){
              res.redirect('/clerk/dash')
            }else
        
               res.send(docs)
           
            
             })
        
        })



router.post('/addFees',isLoggedIn,clerk, function(req,res){
var m = moment()
var xId = req.user._id;
var uid = req.body.uid;
var fullname = req.body.fullname;
var class1 = req.body.class1;
var date = moment().toString();
var term = req.body.term;
var amount = req.body.amount;
var year = m.format('YYYY')
var month = m.format('MMMM')
var receiptNumber = req.body.receiptNumber;
var method = 'manual'
var day = moment().toString()

  req.check('uid','Enter Student ID').notEmpty();
  req.check('fullname','Enter Student Name').notEmpty();
  req.check('date','Enter Date').notEmpty();
  req.check('term','Enter Term').notEmpty();
  req.check('amount','Enter Fees Amount').notEmpty();
  req.check('receiptNumber','Enter Receipt Number').notEmpty();
  

  var errors = req.validationErrors();
     
  if (errors) {
    
    req.session.errors = errors;
    req.session.success = false
    res.render('students/addFees',{errors:req.session.errors})
  }
else
{
  User.findOne({'uid':uid})
  .then(user=>{
    if(user){


      var fees = new Fees();
    
      fees.date = date;
      fees.uid = uid;
      fees.class1 = class1;
      fees.fullname = fullname;
      fees.amount= amount;
      fees.term = term;
      fees.year = year;
      fees.month = month;
      fees.method = method;
      fees.paymentId = 'null'
      fees.receiptNumber = receiptNumber;
    
    
    
      fees.save()
        .then(fee =>{
          User.find({uid:uid},function(err,docs){

           User.findByIdAndUpdate(xId,{$set:{studentId:uid,amount:amount,receiptNumber:receiptNumber}},function(err,gocs){




            balance = docs[0].balance;
            newBalance = balance + fees.amount;

            if(newBalance >= 0){
    
              User.findByIdAndUpdate(docs[0]._id,{$set:{balance:newBalance, status:"paid", term:term, year:year,balanceCarriedOver:balance}},function(err,docs){
            
        
              
            
              })
          
            }else
            
            User.findByIdAndUpdate(docs[0]._id,{$set:{balance:newBalance, status:"owing", term:term, year:year,balanceCarriedOver:balance}},function(err,docs){
            
            
              
            
            })
            
            



          })

        })

        })



    }
    
  res.redirect('/clerk/print')
})
}
 
})



router.get('/print',isLoggedIn,function(req,res){
  var uid =req.user.studentId;
  var day = moment().toString();
  var amount = req.user.amount
  User.find({uid:uid},function(err,zocs){

    
       
       res.render('accounts/receipt', {
         date:day,uid:uid,user:zocs[0], clerk:req.user.fullname, amount:amount})
   
  })
})




  //role admin
  //Autocomplete for student details when recording school fees
  router.get('/autocompleteX/',isLoggedIn, function(req, res, next) {
    var name,uid, surname
  var companyId = req.user.companyId
      var regex= new RegExp(req.query["term"],'i');
     
      var uidFilter =User.find({uid:regex, role:"student"},{'uid':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
    
      
      uidFilter.exec(function(err,data){
     
   
    console.log('data',data)
    
    var result=[];
    
    if(!err){
       if(data && data.length && data.length>0){
         data.forEach(user=>{
   
          
       
    
            
           let obj={
             id:user._id,
             label: user.uid
  
         
       
         
           
            
    
             
           };
          
           result.push(obj);
        
       
         });
    
       }
     
       res.jsonp(result);
  
      }
    
    })
   
    });
  
  //role admin
//this route autopopulates info of the title selected from the autompleteX route
    router.post('/autoX',isLoggedIn,function(req,res){
        var uid = req.body.code
    
        
       
        User.find({uid:uid},function(err,docs){
       if(docs == undefined){
         res.redirect('/addFees')
       }else
      
          res.send(docs[0])
        })
      
      
      })
      
    
    
    



      router.get('/feesRecords',isLoggedIn, (req, res) => {
 
        Fees.find({},(err, docs) => {
            if (!err) {
                res.render("clerk/feesRecord", {
                   list:docs,
                  
                });
            }
        });
      });
      























//role admin
//adding expenses
router.get('/expenses',isLoggedIn,clerk, function(req,res){
  var days = moment().toString()
  res.render('accounts/expenses',{days:days})
})


    
  router.post('/expenses',isLoggedIn,clerk, function(req,res){
    var m = moment()
    var n = moment().toString()
    var description = req.body.description;
    var type = req.body.type;
    var amount = req.body.amount;
    var voucherNumber = req.body.voucherNumber;
    var status = req.body.status;
    var term = req.user.term;
    var payment = req.body.payment;
    var year = m.format('YYYY')
    var month = m.format('MMMM')
    var days = moment().toString()
    var voucherNumber = req.body.voucherNumber



    req.check('description','Enter Description').notEmpty();
    req.check('type','Enter Expense Type').notEmpty();
    req.check('amount','Enter Amount').notEmpty();
    req.check('voucherNumber','Enter Voucher #').notEmpty();
    req.check('status','Enter Status').notEmpty();
    req.check('payment','Enter payment method').notEmpty();
  

    var errors = req.validationErrors();
    if (errors) {
   
      req.session.errors = errors;
      req.session.success = false;
      res.render('accounts/expenses',{errors:req.session.errors})
   
    
   }
   else
   Expenses.findOne({'voucherNumber':voucherNumber})
  .then(exp=>{
    if(exp){
      req.session.message = {
        type:'errors',
        message:'Expense already Recorded'
      }     
         res.render('accounts/expenses', {
            message:req.session.message,days:days })
         }
         else

   var expenses = new Expenses();
    
   expenses.date = n;
   expenses.description = description;
   expenses.type = type;
   expenses.amount= amount;
   expenses.term = term;
   expenses.year = year;
   expenses.voucherNumber = voucherNumber;
   expenses.status = status;
   expenses.payment = payment;
   expenses.month = month;
 
 
   expenses.save()
     .then(expense =>{

     
      req.session.message = {
        type:'success',
        message:'Expense Recorded'
      }     
         res.render('accounts/expenses', {
            message:req.session.message,days:days })
     })

 
  })
})
         
   

router.get('/expenseList',isLoggedIn, (req, res) => {
 
  Expenses.find({},(err, docs) => {
      if (!err) {
          res.render("clerk/expenseRecord", {
             list:docs,
            
          });
      }
  });
});

  


router.get('/profile',isLoggedIn,clerk, function(req,res){
   
  
  res.render('clerk/clerk-details',{user:req.user})

  
})

router.post('/profile',isLoggedIn,upload.single('file'),function(req,res){
 
  
  
  if(!req.file){
   req.session.message = {
     type:'errors',
     message:'Select Picture'
   }     
     res.render('clerk/clerk-details', {
          user:req.body, message:req.session.message,pic:req.user.photo,user:req.user 
      }) 
   
  } else
  var imageFile = req.file.filename;
  var id  = req.user._id;
 console.log(imageFile)
 console.log(id)
  User.findByIdAndUpdate(id,{$set:{photo:imageFile}},function(err,data){ 
  
  
    
  
  
  })
 
  res.redirect('/clerk/profile')

     //res.render('uploads/index',{title:'Upload File',records:data, success:success})


   

  
 
})





module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.redirect('/')
    }
  }
  
  
  
  
  
  function clerk(req,res,next){
    if(req.user.role == "clerk"){
      return next()
    }
    res.render('errors/access')
    }  
