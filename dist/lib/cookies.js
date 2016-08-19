function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

$(function() {
  $('#swaggerhub').on("submit",function(e) {
    e.preventDefault();
    createCookie("swaggercookie_url",document.getElementById("url").value,30);
    createCookie("swaggercookie_key",document.getElementById("key").value,30);
    $("#submit").remove()
    $("#swaggerhub").append('<div class="alert alert-info"><strong>Updated!</strong></div>');
  });
});

$(function() {
  $('#clear').on("click", function(e) {
   e.preventDefault();
   eraseCookie("swaggercookie_url");
   eraseCookie("swaggercookie_key");
   $("#clear").remove()
   $("#swaggerhub").append('<div class="alert alert-info"><strong>Cleared!</strong></div>');
  });
});
