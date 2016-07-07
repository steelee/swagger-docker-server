function gen_swagger(dist_id) {
    window.swaggerUi = new SwaggerUi({
        url: dist_id,
        dom_id: "swagger-ui-container",
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        onComplete: function(swaggerApi, swaggerUi) {
            if (typeof initOAuth == "function") {
                initOAuth({
                    clientId: "your-client-id",
                    clientSecret: "your-client-secret-if-required",
                    realm: "your-realms",
                    appName: "your-app-name",
                    scopeSeparator: ",",
                    additionalQueryStringParams: {}
                });
            }
            if (window.SwaggerTranslator) {
                window.SwaggerTranslator.translate();
            }
        },
        onFailure: function(data) {
            log("Unable to Load SwaggerUI");
        },
        docExpansion: "none",
        jsonEditor: false,
        defaultModelRendering: 'schema',
        showRequestHeaders: false
    });
    window.swaggerUi.load();
}


$(document).ready(function() {
    $("#api_selector").submit(function() {
        var url = $("input:first").val();
        var formData = {
            'url': url
        };
        $.ajax({
            url: "api/add.php",
            global: false,
            type: "POST",
            cache: false,
            datatype: "json",
            data: formData,
            success: function(response) {
                console.log(response);
            }
        });
    });
});

$(document).ready(function() {
    $.ajax({
        url: "api/populate.php",
        global: false,
        type: "POST",
        cache: false,
        dataType: "json",
        success: function(response) {
	          $.each(response, function(index) {
                $("#listprime").append('<li id = "' + response[index].url + '"><a href="#">' + response[index].name + '<i class="fa fa-angle-right"></i></a></li>');

            });
            $("ul#listprime li").on("click", function() {
                gen_swagger(($(this).attr('id')));
            });

        }
    });
});

$(document).ready(function() {
    $("#local").click(function() {
        $("#local").slideUp("fast");
        $("#api_selector").slideUp("fast", function() {
            $("#remote").slideDown("fast");
            $("#local_selector").slideDown("fast");
        });
    });
});

$(document).ready(function() {
    $("#remote").click(function() {
        $("#remote").slideUp("fast");
        $("#local_selector").slideUp("fast", function() {
            $("#local").slideDown("fast");
            $("#api_selector").slideDown("fast");
        });
    });
});

$(document).ready(function() {
    var menuSlideout = $('#menu-slideout');
    var menuSlideoutWidth = $('#menu-slideout').width();
    var trainingSlideout = $('#training-slideout');
    var trainingSlideoutWidth = $('#training-slideout').width();
    var communitySlideout = $('#community-slideout');
    var communitySlideoutWidth = $('#community-slideout').width();
    menuSlideout.animate({
        left: "0px"
    }, 1);
    $('#menu-option').on('click', function(event) {
        if (!menuSlideout.hasClass("open")) {
            event.preventDefault();
            trainingSlideout.removeClass("open");
            communitySlideout.removeClass("open");
            menuSlideout.addClass("open");
            menuSlideout.animate({
                left: "0px"
            });
            trainingSlideout.animate({
                left: -trainingSlideoutWidth
            });
            communitySlideout.animate({
                left: -communitySlideoutWidth
            });
        }
    });
    $('#training-option').on('click', function(event) {
        if (!trainingSlideout.hasClass("open")) {
            event.preventDefault();
            menuSlideout.removeClass("open");
            communitySlideout.removeClass("open");
            trainingSlideout.addClass("open");
            trainingSlideout.animate({
                left: "0px"
            });
            menuSlideout.animate({
                left: -menuSlideoutWidth
            });
            communitySlideout.animate({
                left: -communitySlideoutWidth
            });
        }
    });
    $('#community-option').on('click', function(event) {
        if (!communitySlideout.hasClass("open")) {
            event.preventDefault();
            menuSlideout.removeClass("open");
            trainingSlideout.removeClass("open");
            communitySlideout.addClass("open");
            communitySlideout.animate({
                left: "0px"
            });
            menuSlideout.animate({
                left: -menuSlideoutWidth
            });
            trainingSlideout.animate({
                left: -trainingSlideoutWidth
            });
        }
    });
});

