
var labels1 = []
var label2 =[]
var label3 = []
var label4=[]
var label5 = []
var label6 = []
let data1 = [0, 0];
let colors1 = ['#49A9EA', '#36CAAB'];




$.ajax({
   
    dataType: 'json',
    type: 'POST',
    url: "./bookChart3",
    success: function(data) {
    console.log(data)
     for (var i = 0;i<data.length;i++){
        label6.push(data[i].books)
        label6.push(data[i].allocated)
        label6.push(data[i].remaining)
        label6.push(data[i].pending)
    
   
     }

     let labelsX =  ['Total Number of Books', 'Total Number of Books Loaned', 'Total Number of Books Remaining', 'Books Pending Collection'];
let data4 =label6 /*[0,202, 8, 0,107,45];*/
let data9 =  label4 /*[0, 6187.3800008, 375.44, 1357.3799993,1794.820001 ,850]*/
let colors3 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#FFA07A','#FFFF00'];

console.log('data4',data4)

     let myChart = document.getElementById("myChart").getContext('2d');

let chart = new Chart(myChart, {
    type: 'bar',
    data: {
        labels:  labelsX,
        datasets: [ {
            data: data4,
            backgroundColor: colors3
        }]
    },
    options: {
        title: {
            text: "Book Stats (Teacher)",
            display: true
        },
        legend: {
          display: false
        },
        scales:{
            yAxes:[{
              ticks:{
                  stepSize:1
              }
            }]
        }
    }
});

    }
   
});








