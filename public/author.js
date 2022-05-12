
var title = document.getElementById("title").value


$.ajax({
    dataType: 'json',
    data: {
        title: title,
        
    },
    type: 'POST',
    url: "./author1",
    success: function(data) {

     $("#author").val(data.author)
   

    }
   
});