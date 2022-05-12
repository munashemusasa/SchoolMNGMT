require('dotenv').config();

var express = require('express');
var router = express.Router();
const User =require('../models/user')
const Class1 =require('../models/class');
const Subject =require('../models/subject');
const Fees =require('../models/fees');
const Grade =require('../models/grade');
const Test =require('../models/classTest');
const Lesson =require('../models/lesson');
const Poll = require('../models/poll');
const { Paynow } = require("paynow");
const Exam =require('../models/exam');
const TestX =require('../models/classTestX');
const StudentExamRate =require('../models/stdPassRate');
const StudentClassRate =require('../models/stdPassRateX');
const Expenses = require('../models/expenses')
const FeesUpdate =require('../models/feesUpdate');
const StudentSub =require('../models/studentSubject');
//const stripe = require('stripe')('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');
const stripe = require('stripe')(' sk_test_IbxDt5lsOreFtqzmDUFocXIp0051Hd5Jol');
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

//student Dashboard
/*
router.get('/',isLoggedIn,function(req,res){
  var studentId = req.user.uid
  var m = moment()
  var year = m.format('YYYY')
  var term = req.user.term
  var class1 = req.user.class1
    StudentExamRate.find({studentId:studentId},function(err,lods){
    
  if(lods.length == 0){
  
        var pass =StudentExamRate();
        pass.firstTerm = 0;
        pass.firstAvgMark = 0
        pass.secondTerm= 0;
        pass.secondAvgMark = 0
        pass.thirdTerm = 0
        pass.thirdAvgMark=0;
        pass.studentId = studentId;
        pass.class1 = class1
        pass.term = term
        pass.type = 'Final Exam';
        pass.year = year
  
        pass.save()
        .then(pass =>{

         
        })



      }

        res.redirect('/student/passRate')
  
  
      
     
    })
  })
  */



router.get('/passRate',isLoggedIn,function(req,res){
  let totalexams, examsPassed, passRate;
  let numberOfMarks, totalMarks, avgMark;
  var m = moment()
  var year = m.format('YYYY')
  var term = req.user.term
  var uid = req.user.uid
  var fullname = req.user.fullname;
  var studentId = req.user.uid
  var clas6 = req.user.class1
   var m = moment()
   var year = m.format('YYYY')
   var marks, marks2
   var arr1=[]
   var number1
console.log(studentId, 'studentId')
    
   StudentExamRate.find({year:year, studentId:studentId, class1:clas6},function(err,docs){
 
     if(docs.length == 0){
 
       TestX.find({term:term,year:year,uid:studentId, type:'Final Exam' },function(err,hods){
 
         TestX.find({term:term,year:year,uid:studentId, result:'pass', type:'Final Exam'},function(err,lods){
       /*  if(hods.length >=1){*/
 
 
          totalexams = hods.length;
          examsPassed = lods.length
          passRate = examsPassed / totalexams * 100
          numberOfMarks = hods.length;
          console.log('numberOfMarks',numberOfMarks)

          for(var q = 0;q<hods.length; q++){
  
            arr1.push(hods[q].mark)
              }
              //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
               totalMarks=0;
              for(var z in arr1) { totalMarks += arr1[z]; }
 
              avgMark = totalMarks / numberOfMarks
             
             var pass =StudentExamRate();
             pass.firstTerm = 0;
             pass.firstAvgMark = 0
             pass.secondTerm= 0;
             pass.secondAvgMark = 0
             pass.thirdTerm = 0
             pass.thirdAvgMark=0;
             pass.studentId = studentId;
             pass.class1 = clas6
             pass.term = term
             pass.type = 'Final Exam';
             pass.year = year
 
             pass.save()
     .then(pas =>{
       id3 = pas._id;
 
       if(term == 1){
 
   
         StudentExamRate.findByIdAndUpdate(id3,{$set:{firstTerm:passRate, firstAvgMark:avgMark}},function(err,kocs){
      
         
         })
       }else if(term == 2){
       
         StudentExamRate.findByIdAndUpdate(id3,{$set:{secondTerm:passRate,secondAvgMark:avgMark}},function(err,kocs){
       
             
             })
           }else{
             StudentExamRate.findByIdAndUpdate(id3,{$set:{thirdTerm:passRate,thirdAvgMark}},function(err,kocs){
             
                 
                 })
              }
 
               })
              /* }*/
               
               })
               
             })
           }
           else
 
         var  idX  = docs[0]._id
 
         TestX.find({term:term,year:year,uid:studentId, type:"Final Exam",class1:clas6},function(err,shods){
 
          TestX.find({term:term,year:year, result:'pass',uid:studentId,type:"Final Exam",class1:clas6},function(err,slods){
        /*  if(shods.length >=1){*/
console.log(shods)
console.log(slods)
  
           totalexams = shods.length;
           examsPassed = slods.length
           passRate = examsPassed / totalexams * 100
           numberOfMarks = shods.length;
 
           for(var q = 0;q<shods.length; q++){
   
             arr1.push(shods[q].mark)
               }
               //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
                totalMarks=0;
               for(var z in arr1) { totalMarks += arr1[z]; }
  
               avgMark = totalMarks / numberOfMarks
 console.log(totalMarks, numberOfMarks, examsPassed, passRate, avgMark, idX)
              if(term == 1){
 
   
               StudentExamRate.findByIdAndUpdate(idX,{$set:{firstTerm:passRate,firstAvgMark:avgMark}},function(err,kocs){
            
               
               })
             }else if(term == 2){
             
               StudentExamRate.findByIdAndUpdate(idX,{$set:{secondTerm:passRate, secondAvgMark:avgMark}},function(err,kocs){
             
                   
                   })
                 }else{
                   StudentExamRate.findByIdAndUpdate(idX,{$set:{thirdTerm:passRate, thirdAvgMark:avgMark}},function(err,kocs){
                   
                       
                       })
                     }
   
            /* }*/
     
    
           })
           
        
         })    
         res.redirect('/student/passRateX')
       
 
         })
   
    
        
        
      
  
         
         
 
   })

  

   
router.get('/passRateX',isLoggedIn,function(req,res){
  let totalexams, examsPassed, passRate;
  let numberOfMarks, totalMarks, avgMark;
  var m = moment()
  var year = m.format('YYYY')
  var term = req.user.term
  var uid = req.user.uid
  var fullname = req.user.fullname;
  var studentId = req.user.uid
  var clas6 = req.user.class1
   var m = moment()
   var year = m.format('YYYY')
   var marks, marks2
   var arr1=[]
   var number1





    
   StudentClassRate.find({year:year, studentId:studentId, class1:clas6},function(err,docs){
 
     if(docs.length == 0){
 
       TestX.find({term:term,year:year,uid:studentId, type:'Class Test', class1:clas6},function(err,hods){
 
         TestX.find({term:term,year:year,uid:studentId, result:'pass', type:'Class Test'},function(err,lods){
       /*  if(hods.length >=1){*/
 
 
          totalexams = hods.length;
          examsPassed = lods.length
          passRate = examsPassed / totalexams * 100
          numberOfMarks = hods.length;
          console.log('numberOfMarks',numberOfMarks)

          for(var q = 0;q<hods.length; q++){
  
            arr1.push(hods[q].mark)
              }
              //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
               totalMarks=0;
              for(var z in arr1) { totalMarks += arr1[z]; }
 
              avgMark = totalMarks / numberOfMarks
             
             var pass =StudentClassRate();
             pass.firstTerm = 0;
             pass.firstAvgMark = 0
             pass.secondTerm= 0;
             pass.secondAvgMark = 0
             pass.thirdTerm = 0
             pass.thirdAvgMark=0;
             pass.studentId = studentId;
             pass.class1 = clas6
             pass.term = term
             pass.type = 'Class Test';
             pass.year = year
 
             pass.save()
     .then(pas =>{
       id3 = pas._id;
 
       if(term == 1){
 
   
        StudentClassRate.findByIdAndUpdate(id3,{$set:{firstTerm:passRate, firstAvgMark:avgMark}},function(err,kocs){
      
         
         })
       }else if(term == 2){
       
        StudentClassRate.findByIdAndUpdate(id3,{$set:{secondTerm:passRate,secondAvgMark:avgMark}},function(err,kocs){
       
             
             })
           }else{
            StudentClassRate.findByIdAndUpdate(id3,{$set:{thirdTerm:passRate,thirdAvgMark}},function(err,kocs){
             
                 
                 })
               }
 
               })
              /* }*/
               
               })
               
             })
           }
           else
 
         var  idX  = docs[0]._id
 
         TestX.find({term:term,year:year,uid:studentId, type:"Class Test",class1:clas6, },function(err,hods){
 
          TestX.find({term:term,year:year, result:'pass',uid:studentId, type:"Class Test",class1:clas6},function(err,lods){
         /* if(hods.length >=1){*/
  
  
           totalexams = hods.length;
           examsPassed = lods.length
           passRate = examsPassed / totalexams * 100
           numberOfMarks = hods.length;
 
           for(var q = 0;q<hods.length; q++){
   
             arr1.push(hods[q].mark)
               }
               //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
                totalMarks=0;
               for(var z in arr1) { totalMarks += arr1[z]; }
  
               avgMark = totalMarks / numberOfMarks
 
              if(term == 1){
 
   
                StudentClassRate.findByIdAndUpdate(idX,{$set:{firstTerm:passRate,firstAvgMark:avgMark}},function(err,kocs){
            
               
               })
             }else if(term == 2){
             
              StudentClassRate.findByIdAndUpdate(idX,{$set:{secondTerm:passRate, secondAvgMark:avgMark}},function(err,kocs){
             
                   
                   })
                 }else{
                   StudentClassRate.findByIdAndUpdate(idX,{$set:{thirdTerm:passRate, thirdAvgMark:avgMark}},function(err,kocs){
                   
                       
                       })
                     }
   
         /*    }*/
     
    
           })
           
        
         })    
       
         res.redirect('/student/passRateY')
 
         })
   
    
        
        
     
  
         
         
 
   })

  



   router.get('/passRateY',isLoggedIn,function(req,res){
    let totalexams, examsPassed, passRate;
    let numberOfMarks, totalMarks, avgMark;
    var m = moment()
    var year = m.format('YYYY')
    var term = req.user.term
    var uid = req.user.uid
    var fullname = req.user.fullname;
    var studentId = req.user.uid
    var clas6 = req.user.class1
     var m = moment()
     var year = m.format('YYYY')
     var marks, marks2
     var arr1=[]
     var number1
  console.log(studentId, 'studentId')
      
     StudentExamRate.find({year:year, studentId:studentId, class1:clas6},function(err,docs){
   
       if(docs.length == 0){
   
         TestX.find({term:term,year:year,uid:studentId, type:'Final Exam' },function(err,hods){
   
           TestX.find({term:term,year:year,uid:studentId, result:'pass', type:'Final Exam'},function(err,lods){
         /*  if(hods.length >=1){*/
   
   
            totalexams = hods.length;
            examsPassed = lods.length
            passRate = examsPassed / totalexams * 100
            numberOfMarks = hods.length;
            console.log('numberOfMarks',numberOfMarks)
  
            for(var q = 0;q<hods.length; q++){
    
              arr1.push(hods[q].mark)
                }
                //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
                 totalMarks=0;
                for(var z in arr1) { totalMarks += arr1[z]; }
   
                avgMark = totalMarks / numberOfMarks
               
               var pass =StudentExamRate();
               pass.firstTerm = 0;
               pass.firstAvgMark = 0
               pass.secondTerm= 0;
               pass.secondAvgMark = 0
               pass.thirdTerm = 0
               pass.thirdAvgMark=0;
               pass.studentId = studentId;
               pass.class1 = clas6
               pass.term = term
               pass.type = 'Final Exam';
               pass.year = year
   
               pass.save()
       .then(pas =>{
         id3 = pas._id;
   
         if(term == 1){
   
     
           StudentExamRate.findByIdAndUpdate(id3,{$set:{firstTerm:passRate, firstAvgMark:avgMark}},function(err,kocs){
        
           
           })
         }else if(term == 2){
         
           StudentExamRate.findByIdAndUpdate(id3,{$set:{secondTerm:passRate,secondAvgMark:avgMark}},function(err,kocs){
         
               
               })
             }else{
               StudentExamRate.findByIdAndUpdate(id3,{$set:{thirdTerm:passRate,thirdAvgMark}},function(err,kocs){
               
                   
                   })
                }
   
                 })
                /* }*/
                 
                 })
                 
               })
             }
             else
   
           var  idX  = docs[0]._id
   
           TestX.find({term:term,year:year,uid:studentId, type:"Final Exam",class1:clas6},function(err,shods){
   
            TestX.find({term:term,year:year, result:'pass',uid:studentId,type:"Final Exam",class1:clas6},function(err,slods){
          /*  if(shods.length >=1){*/
  console.log(shods)
  console.log(slods)
    
             totalexams = shods.length;
             examsPassed = slods.length
             passRate = examsPassed / totalexams * 100
             numberOfMarks = shods.length;
   
             for(var q = 0;q<shods.length; q++){
     
               arr1.push(shods[q].mark)
                 }
                 //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
                  totalMarks=0;
                 for(var z in arr1) { totalMarks += arr1[z]; }
    
                 avgMark = totalMarks / numberOfMarks
   console.log(totalMarks, numberOfMarks, examsPassed, passRate, avgMark, idX)
                if(term == 1){
   
     
                 StudentExamRate.findByIdAndUpdate(idX,{$set:{firstTerm:passRate,firstAvgMark:avgMark}},function(err,kocs){
              
                 
                 })
               }else if(term == 2){
               
                 StudentExamRate.findByIdAndUpdate(idX,{$set:{secondTerm:passRate, secondAvgMark:avgMark}},function(err,kocs){
               
                     
                     })
                   }else{
                     StudentExamRate.findByIdAndUpdate(idX,{$set:{thirdTerm:passRate, thirdAvgMark:avgMark}},function(err,kocs){
                     
                         
                         })
                       }
     
              /* }*/
       
      
             })
             
          
           })    
           res.redirect('/student/passRateYY')
         
   
           })
     
      
          
          
        
    
           
           
   
     })
  
    
  
     
  router.get('/passRateYY',isLoggedIn,function(req,res){
    let totalexams, examsPassed, passRate;
    let numberOfMarks, totalMarks, avgMark;
    var m = moment()
    var year = m.format('YYYY')
    var term = req.user.term
    var uid = req.user.uid
    var fullname = req.user.fullname;
    var studentId = req.user.uid
    var clas6 = req.user.class1
     var m = moment()
     var year = m.format('YYYY')
     var marks, marks2
     var arr1=[]
     var number1
  
  
  
  
  
      
     StudentClassRate.find({year:year, studentId:studentId, class1:clas6},function(err,docs){
   
       if(docs.length == 0){
   
         TestX.find({term:term,year:year,uid:studentId, type:'Class Test', class1:clas6},function(err,hods){
   
           TestX.find({term:term,year:year,uid:studentId, result:'pass', type:'Class Test'},function(err,lods){
         /*  if(hods.length >=1){*/
   
   
            totalexams = hods.length;
            examsPassed = lods.length
            passRate = examsPassed / totalexams * 100
            numberOfMarks = hods.length;
            console.log('numberOfMarks',numberOfMarks)
  
            for(var q = 0;q<hods.length; q++){
    
              arr1.push(hods[q].mark)
                }
                //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
                 totalMarks=0;
                for(var z in arr1) { totalMarks += arr1[z]; }
   
                avgMark = totalMarks / numberOfMarks
               
               var pass =StudentClassRate();
               pass.firstTerm = 0;
               pass.firstAvgMark = 0
               pass.secondTerm= 0;
               pass.secondAvgMark = 0
               pass.thirdTerm = 0
               pass.thirdAvgMark=0;
               pass.studentId = studentId;
               pass.class1 = clas6
               pass.term = term
               pass.type = 'Class Test';
               pass.year = year
   
               pass.save()
       .then(pas =>{
         id3 = pas._id;
   
         if(term == 1){
   
     
          StudentClassRate.findByIdAndUpdate(id3,{$set:{firstTerm:passRate, firstAvgMark:avgMark}},function(err,kocs){
        
           
           })
         }else if(term == 2){
         
          StudentClassRate.findByIdAndUpdate(id3,{$set:{secondTerm:passRate,secondAvgMark:avgMark}},function(err,kocs){
         
               
               })
             }else{
              StudentClassRate.findByIdAndUpdate(id3,{$set:{thirdTerm:passRate,thirdAvgMark}},function(err,kocs){
               
                   
                   })
                 }
   
                 })
                /* }*/
                 
                 })
                 
               })
             }
             else
   
           var  idX  = docs[0]._id
   
           TestX.find({term:term,year:year,uid:studentId, type:"Class Test",class1:clas6, },function(err,hods){
   
            TestX.find({term:term,year:year, result:'pass',uid:studentId, type:"Class Test",class1:clas6},function(err,lods){
           /* if(hods.length >=1){*/
    
    
             totalexams = hods.length;
             examsPassed = lods.length
             passRate = examsPassed / totalexams * 100
             numberOfMarks = hods.length;
   
             for(var q = 0;q<hods.length; q++){
     
               arr1.push(hods[q].mark)
                 }
                 //adding all incomes from all lots of the same batch number & growerNumber & storing them in variable called total
                  totalMarks=0;
                 for(var z in arr1) { totalMarks += arr1[z]; }
    
                 avgMark = totalMarks / numberOfMarks
   
                if(term == 1){
   
     
                  StudentClassRate.findByIdAndUpdate(idX,{$set:{firstTerm:passRate,firstAvgMark:avgMark}},function(err,kocs){
              
                 
                 })
               }else if(term == 2){
               
                StudentClassRate.findByIdAndUpdate(idX,{$set:{secondTerm:passRate, secondAvgMark:avgMark}},function(err,kocs){
               
                     
                     })
                   }else{
                     StudentClassRate.findByIdAndUpdate(idX,{$set:{thirdTerm:passRate, thirdAvgMark:avgMark}},function(err,kocs){
                     
                         
                         })
                       }
     
           /*    }*/
       
      
             })
             
          
           })    
         
           res.redirect('/student/feesCheck')
   
           })
     
           
   
     })
  



     router.get('/feesCheck',isLoggedIn,function(req,res){
      
      if(req.user.pollUrl === "null"){
        res.redirect('/student/dash')


      }else{

      var pollUrl = req.user.pollUrl;
    
       // Create instance of Paynow class
       let paynow = new Paynow("14628", "0b05a9bd-6779-4a6f-9da7-48e03cb96a67");
      
        paynow.pollTransaction(pollUrl).then(transaction => {
          if(transaction.status === 'paid') {
            // User showed us the doe
            var amount = transaction.amount;
            User.find({uid:uid},function(err,docs){
       
              balance = docs[0].balance;
              newBalance = balance + amount;
    
              if(balance >= 0){
      
                User.findByIdAndUpdate(docs[0]._id,{$set:{balance:newBalance, status:"paid", term:term, year:year,balanceCarriedOver:balance,paymentId:paymentId,pollUrl:"null"}},function(err,docs){
              
              
                
              
                })
            
              }else
              
              User.findByIdAndUpdate(docs[0]._id,{$set:{balance:newBalance, status:"owing", term:term, year:year,balanceCarriedOver:balance,paymentId:paymentId}},function(err,docs){
              
              
                
              
              })
              res.redirect('/student/dash')
            })
          }
      
          })
        }
       
    })








     router.get('/dash',isLoggedIn, function(req,res){
      var sub
      var uid =req.user.uid
      var status = req.user.status
      var class1 = req.user.class1
      StudentSub.find({studentId:uid},(err, docs) => {
        res.render('dashboard/student',{sub:docs.length,status, class1})
        console.log(status)
      })
    })
    
  

//Final Exam

     router.post('/studentPassChart',isLoggedIn,function(req,res){
      var m = moment()
      var year = m.format('YYYY')
      var uid = req.user.uid
      var term = req.user.term
            StudentExamRate.find({year:year, term:term, studentId:uid},function(err,docs){
              if(docs == undefined){
                res.redirect('/student/dash')
              }else
          
                 res.send(docs)
             
              
               })
          
          })


  //Class Test
          router.post('/studentPassChart2',isLoggedIn,function(req,res){
            var m = moment()
            var year = m.format('YYYY')
            var uid = req.user.uid
            var term = req.user.term
                  StudentClassRate.find({year:year, term:term,studentId:uid},function(err,docs){
                    if(docs == undefined){
                      res.redirect('/student/dash')
                    }else
                
                       res.send(docs)
                   
                    
                     })
                
                })
      




//role student

router.get('/profile',isLoggedIn,student, function(req,res){
   
  
      res.render('students/student-details',{user:req.user})
    
      
  })


  router.post('/profile',isLoggedIn,upload.single('file'),function(req,res){
 
  
  
    if(!req.file){
     req.session.message = {
       type:'errors',
       message:'Select Picture'
     }     
       res.render('student/student-details', {
            user:req.body, message:req.session.message,pic:req.user.photo,user:req.user 
        }) 
     
    } else
    var imageFile = req.file.filename;
    var id  = req.user._id;
   console.log(imageFile)
   console.log(id)
    User.findByIdAndUpdate(id,{$set:{photo:imageFile}},function(err,data){ 
    
    
      
    
    
    })
   
    res.redirect('/student/profile')
  
       //res.render('uploads/index',{title:'Upload File',records:data, success:success})
  
  
     
  
    
   
  })
  
  
//student registered subjects
  router.get('/subjects',isLoggedIn,student,function(req,res){
    var uid = req.user.uid
    StudentSub.find({studentId:uid},(err, docs) => {
      if (!err) {
          res.render('students/subjects', {
             list:docs,
            
          });
      }
  });


    
  })

  


  //student lesson timetable
router.get('/timetable',isLoggedIn,student, (req, res) => {
    var term = req.user.term
    var class1 = req.user.class1
    var uid = req.user.uid
    var year = req.user.year
    Lesson.find({term:term, class1:class1,  year:year},(err, docs) => {
        if (!err) {
            res.render("lesson/timetable", {
               list:docs,
              
            });
        }
    });
  });


//exam timetable student
router.get('/examList',isLoggedIn, (req, res) => {
 var grade = req.user.grade
    Exam.find({grade:grade},(err, docs) => {
        if (!err) {
            res.render("exam/examList", {
               list:docs,
              
            });
        }
    });
  });


   //student results
   router.get('/results',isLoggedIn,student, (req, res) => {
    var uid= req.user.uid
     TestX.find({uid:uid, type:'Class Test'},(err, docs) => {
         if (!err) {
             res.render("exam/result", {
                list:docs,
               
             });
         }
     });
   });
   

   //student results - final exam
   router.get('/examResults',isLoggedIn,student, (req, res) => {
    var uid= req.user.uid
     TestX.find({uid:uid, type:'Final Exam'},(err, docs) => {
         if (!err) {
             res.render("exam/resultX", {
                list:docs,
               
             });
         }
     });
   });



//role student
//online payments
router.get('/onlinePayment',isLoggedIn,student,function(req,res){
    var id = req.user.feesUpdate
    var fees
    
      FeesUpdate.find({_id:id},function(err,docs){
        try {
        if(!docs){
          throw new SyntaxError('No data')
        }
        fees = docs[0].fees
        res.render('accounts/payment',{fees:fees,stripePublishableKey: keys.stripePublishableKey})
      } catch(e){
        res.send(e.message)
       }
        })
   
  
  })
  
  
  router.post('/onlinePayment',isLoggedIn,student, (req,res)=>{
    var m = moment()
  var uid = req.user.uid;
  var fullname = req.user.fullname;
  var class1 = req.user.class1;
  var date = moment().toString();
  var term = req.user.term;
  var year = m.format('YYYY')
  var month = m.format('MMMM')
  var amount = req.body.amount
  var receiptNumber = 'null'
  var method = 'online';
  var paymentId 
  
 

  


      stripe.charges.create({
        amount:amount * 1000,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "School Fees"
    }, function(err, charge) {
        if (err) {
            //return res.redirect('/checkout');
          console.log(err)
        }else
  
         paymentId = charge.id;
  
       
    console.log('amount',amount)
         
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
         fees.paymentId = paymentId;
         fees.receiptNumber = receiptNumber;
       
       
       
         fees.save()
           .then(fee =>{
             User.find({uid:uid},function(err,docs){
   
               balance = docs[0].balance;
               newBalance = balance + fee.amount;
   
               if(balance >= 0){
       
                 User.findByIdAndUpdate(docs[0]._id,{$set:{balance:newBalance, status:"paid", term:term, year:year,balanceCarriedOver:balance,paymentId:paymentId}},function(err,docs){
               
               
                 
               
                 })
             
               }else
               
               User.findByIdAndUpdate(docs[0]._id,{$set:{balance:newBalance, status:"owing", term:term, year:year,balanceCarriedOver:balance,paymentId:paymentId}},function(err,docs){
               
               
                 
               
               })
               
               
   
   
   
             })
   
         
      
      
    }) 
  })
    res.redirect('/student/feesRecord');
        
  
    
  
  })
  
  
  
  router.get('/feesRecord',isLoggedIn,student, function(req,res){
    res.redirect('/student/feesRecordX')
  })
  
  router.get('/feesRecordX',isLoggedIn,student, function(req,res){
    var id = req.user.paymentId
    var uid = req.user.uid
    var use
    Fees.find({paymentId:id},function(err,docs){
      User.find({uid:uid},function(err,nocs){
      use = nocs[0]
    
      res.render('accounts/pd',{user:docs[0],use:use})
    })
  })
    
  })
  
  //role - student
  //exam timetable
  router.get('/paymentRecord',isLoggedIn,student, (req, res) => {
   var id = req.user.uid
    Fees.find({uid:id},(err, docs) => {
        if (!err) {
            res.render("accounts/list", {
               list:docs,
              
            });
        }
    });
  });
  
  
  

  //role student
//online payments
router.get('/payNow',isLoggedIn,student,function(req,res){
  var id = req.user.feesUpdate
  var fees
  
    FeesUpdate.find({_id:id},function(err,docs){
      try {
      if(!docs){
        throw new SyntaxError('No data')
      }
      fees = docs[0].fees
      res.render('accounts/paymentX',{fees:fees,stripePublishableKey: keys.stripePublishableKey})
    } catch(e){
      res.send(e.message)
     }
      })
 

})



router.post('/payNow',isLoggedIn,function(req,res){


  const { Paynow } = require("paynow");
  // Create instance of Paynow class
  let paynow = new Paynow("14628", "0b05a9bd-6779-4a6f-9da7-48e03cb96a67");
      var m = moment()
      var uid = req.user.uid;
      var fullname = req.user.fullname;
      var class1 = req.user.class1;
      var date = moment().toString();
      var term = req.user.term;
      var year = m.format('YYYY')
      var month = m.format('MMMM')
      var amount = req.body.amount
      var receiptNumber = 'null'
      var method = 'paynow';
      var paymentId, id = req.user._id;


      let payment = paynow.createPayment("Invoice 35");


// Add items to the payment list passing in the name of the item and it's price
payment.add("fees", amount);
// Send off the payment to Paynow
paynow.send(payment).then( (response) => {

    if(response.success) {
        // Get the link to redirect the user to, then use it as you see fit
        let link = response.redirectUrl;

        // Save poll url, maybe (recommended)?
        let pollUrl = response.pollUrl;

        var poll = new Poll();
 
        poll.pollUrl = pollUrl;
        poll.studentId = uid;
        poll.fullname = fullname;
        poll.date = date;
        poll.save()
           .then(poll =>{
           
            User.findByIdAndUpdate(id,{$set:{pollUrl:pollUrl}},function(err,docs){
               
               
                 
               
            })
        



              res.redirect(link)
           })
           

    }else{
      console.log("transaction failed")
    }
  })
      
})



router.get('/status',isLoggedIn,function(req,res){

  
  // Create instance of Paynow class
  let paynow = new Paynow("14628", "0b05a9bd-6779-4a6f-9da7-48e03cb96a67");
 let pollUrl="https://www.paynow.co.zw/Interface/CheckPayment/?guid=e03fd2d2-c990-4f46-a458-a3a7f94f2635";

  let status = paynow.pollTransaction(pollUrl)

  paynow.pollTransaction(pollUrl).then(transaction => {
  console.log(transaction.status)

    })


})
/*
  router.post('/payNow',isLoggedIn,function(req,res){
    const { Paynow } = require("paynow");
// Create instance of Paynow class
let paynow = new Paynow("14628", "0b05a9bd-6779-4a6f-9da7-48e03cb96a67");
    var m = moment()
    var uid = req.user.uid;
    var fullname = req.user.fullname;
    var class1 = req.user.class1;
    var date = moment().toString();
    var term = req.user.term;
    var year = m.format('YYYY')
    var month = m.format('MMMM')
    var amount = req.body.amount
    var receiptNumber = 'null'
    var method = 'paynow';
    var paymentId 
    
// Create a new payment
let payment = paynow.createPayment("Invoice 35");

// Add items to the payment list passing in the name of the item and it's price
payment.add("fees", amount);


// Send off the payment to Paynow
paynow.send(payment).then( (response) => {

    // Check if request was successful
    if(response.success) {
        // Get the link to redirect the user to, then use it as you see fit
        let link = response.redirectUrl;

        res.redirect(link)

        // Save poll url, maybe (recommended)?
        let pollUrl = response.pollUrl;
        paymentId = pollUrl;

        let status = paynow.pollTransaction(pollUrl)

if(status.paid === 'Paid'){
  
       
        console.log('amount',amount)
             
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
             fees.paymentId = paymentId;
             fees.receiptNumber = receiptNumber;
           
           
         fees.save()
         .then(fee =>{
           User.find({uid:uid},function(err,docs){
 
             balance = docs[0].balance;
             newBalance = balance + fee.amount;
 
             if(balance >= 0){
     
               User.findByIdAndUpdate(docs[0]._id,{$set:{balance:newBalance, status:"paid", term:term, year:year,balanceCarriedOver:balance,paymentId:paymentId}},function(err,docs){
             
             
               
             
               })
           
             }else
             
             User.findByIdAndUpdate(docs[0]._id,{$set:{balance:newBalance, status:"owing", term:term, year:year,balanceCarriedOver:balance,paymentId:paymentId}},function(err,docs){
             
             
               
             
             })
             
            })

          })

     
    
           
    }
  }else{
    console.log('zvafa')
  }

});





  })
  


*/




module.exports = router;



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.redirect('/')
    }
  }
  
  
  
  
  
  function student(req,res,next){
    if(req.user.role == 'student'){
      return next()
    }
    res.render('errors/access')
    }  

