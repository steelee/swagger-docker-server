function api_feedback(target){
    document.getElementById("swagger-ui-container").innerHTML = "";
     $.ajax({
        data: {
            'cmd': 'rating'
        },
        url: "api/feedback.php",
        global: false,
        type: "POST",
        cache: false,
        dataType: "json",
        success: function(response) {
    		document.getElementById("swagger-ui-container").innerHTML = "";
        }
    });
}
