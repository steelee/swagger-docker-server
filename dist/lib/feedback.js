function api_feedback(target){
    document.getElementById("swagger-ui-container").innerHTML = "";
     $.ajax({
        data: {
            'cmd': 'rating',
	    'api' : target
        },
        url: "api/feedback.php",
        global: false,
        type: "POST",
        cache: false,
        dataType: "json",
        success: function(response) {
    		document.getElementById("swagger-ui-container").innerHTML = "";
		var formElement = '<form class="form-horizontal"> <div class="form-group"> <label class="control-label col-md-12 title" for="title" style="padding-top:4vh; padding-bottom: 4vh"><h1 align="center">' + target + ' feedback form</h1></label> </div> <div class="form-group"> <label class="control-label col-md-2" for="name">Name:</label> <div class="col-md-9"> <input type="name" class="form-control" id="name" placeholder="Please enter your name."> </input> </div> </div> <div class="form-group"> <label class="control-label col-md-2" for="email">Email:</label> <div class="col-md-9"> <input type="email" required class="form-control" id="email" placeholder="Please enter your email address."> </input> </div> </div> <div class="form-group"> <label class="control-label col-md-2" for="comments">Comments:</label> <div class="col-md-9"> <textarea class="form-control" rows="10" id="comments" placeholder="Please enter your comments."></textarea> </div> </div> <div class="form-group"> <label class="control-label col-sm-2" for="rating" style="padding-top: 1.3vh">Please rate this API <br/>(click the stars):</label> <div class="col-md-9"> <div class="stars"> <form action=""> <input class="star star-5" id="star-5" type="radio" name="star"/> <label class="star star-5" for="star-5"></label> <input class="star star-4" id="star-4" type="radio" name="star"/> <label class="star star-4" for="star-4"></label> <input class="star star-3" id="star-3" type="radio" name="star"/> <label class="star star-3" for="star-3"></label> <input class="star star-2" id="star-2" type="radio" name="star"/> <label class="star star-2" for="star-2"></label> <input class="star star-1" id="star-1" type="radio" name="star"/> <label class="star star-1" for="star-1"></label> Current Rating: ' + response[0]['rating'] + '</form> </div> </div> </div> <div class="form-group"> <div class="col-md-offset-2 col-md-9"> <button type="submit" class="btn btn-success" style="margin-bottom: 5vh">Submit a Review</button> </div> </div> </form>';
    		document.getElementById("swagger-ui-container").innerHTML = formElement;
		console.log(response);
        }
    });
}
