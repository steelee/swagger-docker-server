function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function apigee_date_range() {
    var start = new Date();
    var yyyy = start.getFullYear();
    var mm = start.getMonth();
    var dd = start.getDate();
    var past = mm + '/' + dd + '/' + yyyy;

    var end = new Date();
    var yyyy = end.getFullYear();
    var mm = end.getMonth() + 1;
    var dd = end.getDate();
    var current = mm + '/' + dd + '/' + yyyy;

    var timestring = "?select=avg(total_response_time)&timeRange=" + past + "%2000:00~" + current + "%2000:00&timeUnit=day";
    return timestring;
}

$(function() {
    $('#swaggerhub').on("submit", function(e) {
        e.preventDefault();
        createCookie("swaggercookie_url", document.getElementById("url").value, 30);
        createCookie("swaggercookie_key", document.getElementById("key").value, 30);
        $("#submit").remove()
        $("#swaggerhub").append('<div class="alert alert-info"><strong>Updated!</strong></div>');
    });
});

$(function() {
    $('#apigee').on("submit", function(e) {
        e.preventDefault();
        createCookie("apigee_key", document.getElementById("base64").value, 30);
        var dateTime = apigee_date_range();
        createCookie("apigee_url", document.getElementById("target").value + dateTime, 30);
        $("#submit").remove()
        $("#apigee").append('<div class="alert alert-info"><strong>Updated!</strong></div>');
    });
});

$(function() {
    $('#clear').on("click", function(e) {
        eraseCookie("swaggercookie_url");
        eraseCookie("swaggercookie_key");
        eraseCookie("apigee_key");
        eraseCookie("apigee_url");
        location.reload();
    });
});
