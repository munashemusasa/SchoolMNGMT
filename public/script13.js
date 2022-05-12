



var labels1= []
var labels3= []
var labels4= []
var labels5 = []
var labels6 = []


let colors1 = ['#49A9EA', '#36CAAB'];



$.ajax({
   
    dataType: 'json',
    type: 'POST',
    url: "/incomeChart",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels1.push(data[i].firstTermIncome)
        labels1.push(data[i].firstTermExpense)
        labels1.push(data[i].secondTermIncome)
        labels1.push(data[i].secondTermExpense)
        labels1.push(data[i].thirdTermIncome)
        labels1.push(data[i].thirdTermExpense)
       
   
     }

     let labels2 =  ['1st Term Income', 'Expenses', '2nd Term Income', 'Expenses', '3rd Term Income', 'Expenses'];
let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#FFA07A','#FFFF00'];

//contractQty

     let myChart = document.getElementById("myChart").getContext('2d');

let chart1 = new Chart(myChart, {
    type: 'bar',
    data: {
        labels:  labels2,
        datasets: [ {
            data: labels1,
            backgroundColor: colors2
        }],
        stepSize: 1,
    },
    options: {
        title: {
            text: "Income & Expenses ($)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:1000
              }
            }]
        }
    }
});





    
    }
   
});




$.ajax({
   
    dataType: 'json',
    type: 'POST',
    url: "/passChart",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels4.push(data[i].firstTerm)

        labels4.push(data[i].secondTerm)
     
        labels4.push(data[i].thirdTerm)
       
       
   
     }

     let labels3 =  ['1st Term ',  '2nd Term', '3rd Term '];
let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#FFA07A','#FFFF00'];

//contractQty

     let myChart1 = document.getElementById("myChart2").getContext('2d');

let chart2 = new Chart(myChart2, {
    type: 'bar',
    data: {
        labels:  labels3,
        datasets: [ {
            data: labels4,
            backgroundColor: colors2
        }],
        stepSize: 1,
    },
    options: {
        title: {
            text: "Pass Rate - Final Exams (%)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:5
              }
            }]
        }
    }
});





    
    }
   
});





$.ajax({
   
    dataType: 'json',
    type: 'POST',
    url: "/passChartX",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels6.push(data[i].firstTerm)

        labels6.push(data[i].secondTerm)
     
        labels6.push(data[i].thirdTerm)
       
       
   
     }

     let labels3 =  ['1st Term ',  '2nd Term', '3rd Term '];
let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#FFA07A','#FFFF00'];

//contractQty

     let myChart4 = document.getElementById("myChart4").getContext('2d');

let chart4 = new Chart(myChart4, {
    type: 'bar',
    data: {
        labels:  labels3,
        datasets: [ {
            data: labels6,
            backgroundColor: colors2
        }],
        stepSize: 1,
    },
    options: {
        title: {
            text: "Pass Rate - Class Test (%)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:5
              }
            }]
        }
    }
});





    
    }
   
});














$.ajax({
   
    dataType: 'json',
    type: 'POST',
    url: "/genChart",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels5.push(data[i].male)

        labels5.push(data[i].female)
 
       
   
     }


let myDoughnutChart = document.getElementById("myChart3").getContext('2d');

let chart3 = new Chart(myDoughnutChart, {
    type: 'doughnut',
    data: {

        labels: ['Male', 'Female'],
        datasets: [ {
            data: labels5,
            backgroundColor: ['#49A9EA', '#36CAAB','#34495E', '#B370CF','#FFA07A','#FFFF00']
        }]
    },
    options: {
        title: {
            text: "Students Gender Stats",
            display: true
        }
    }
});


    }
    })






