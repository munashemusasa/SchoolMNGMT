
var labels1= []
var labels3= []
var labels4= []
var labels5= []
var class1,sub, class2,sub2, class3, sub3,code1,code2,code3

let colors1 = ['#49A9EA', '#36CAAB'];



$.ajax({
   
    dataType: 'json',
    type: 'POST',
    url: "./PassChartT2",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels1.push(data[i].firstTerm)
        labels1.push(data[i].firstAvgMark)
        labels1.push(data[i].secondTerm)
        labels1.push(data[i].secondAvgMark)
        labels1.push(data[i].thirdTerm)
        labels1.push(data[i].thirdAvgMark)
        labels1.push(data[i].thirdAvgMark)
  code1 = data[i].subjectCode
         sub = data[i].subject
   
     }

     let labels2 =  ['1st Term PassRate', 'AvgMark', '2nd Term PassRate','Avg Mark', '3rd Term PassRate', 'Avg Mark'];
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
            text:code1 +" "+ sub +" " + "Class Test Pass Rate (%)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:10
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
    url: "./PassChartX1",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels4.push(data[i].firstTerm)
        labels4.push(data[i].firstAvgMark)
        labels4.push(data[i].secondTerm)
        labels4.push(data[i].secondAvgMark)
        labels4.push(data[i].thirdTerm)
        labels4.push(data[i].thirdAvgMark)
        labels4.push(data[i].thirdAvgMark)
        code2 = data[i].subjectCode
         sub2 = data[i].subject
   
     }

     let labels2 =  ['1st Term PassRate', 'AvgMark', '2nd Term PassRate','Avg Mark', '3rd Term PassRate', 'Avg Mark'];
let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#FFA07A','#FFFF00'];

//contractQty

     let myChart1 = document.getElementById("myChart2").getContext('2d');

let chart2 = new Chart(myChart2, {
    type: 'bar',
    data: {
        labels:  labels2,
        datasets: [ {
            data: labels4,
            backgroundColor: colors2
        }],
        stepSize: 1,
    },
    options: {
        title: {
            text:code2+" "+  sub2 +" " + "Class Test Pass Rate (%)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:10
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
    url: "./PassChartX2",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        labels5.push(data[i].firstTerm)
        labels5.push(data[i].firstAvgMark)
        labels5.push(data[i].secondTerm)
        labels5.push(data[i].secondAvgMark)
        labels5.push(data[i].thirdTerm)
        labels5.push(data[i].thirdAvgMark)
        labels5.push(data[i].thirdAvgMark)
        code3 = data[i].subjectCode
         sub3 = data[i].subject
   
     }

     let labels2 =  ['1st Term PassRate', 'AvgMark', '2nd Term PassRate','Avg Mark', '3rd Term PassRate', 'Avg Mark'];
let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#FFA07A','#FFFF00'];

//contractQty

     let myChart1 = document.getElementById("myChart2").getContext('2d');

let chart2 = new Chart(myChart2, {
    type: 'bar',
    data: {
        labels:  labels2,
        datasets: [ {
            data: labels5,
            backgroundColor: colors2
        }],
        stepSize: 1,
    },
    options: {
        title: {
            text:code3  +" "+  sub3 +" " + "Class Test Pass Rate (%)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:10
              }
            }]
        }
    }
});


    }
   
});
