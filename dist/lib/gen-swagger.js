/**
 * Contains helper functions for the entire page and various jQuery triggers
 * gen_swagger(target_url) renders the swagger-ui given a remote or local path
 * add_window(form_name) adds the specified form (by ID) to the main container
 * jQuery functionality to implement search bar and window functionality
 */
function gen_swagger(target_url) {
    if (target_url == "add_api" || target_url == "add_auth") {
        add_window(target_url);
    } else {
        document.getElementById("add_api_form").className = "hidden";
        window.swaggerUi = new SwaggerUi({
            url: target_url,
            dom_id: "swagger-ui-container",
            supportHeaderParams: true,
            supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch', 'options'],
            onComplete: function(swaggerApi, swaggerUi) {
                if (window.SwaggerTranslator) {
                    window.SwaggerTranslator.translate();
                }
            },
            onFailure: function(data) {
                console.log("Unable to Load SwaggerUI");
            },
            docExpansion: "none",
            jsonEditor: false,
            defaultModelRendering: 'schema',
            showRequestHeaders: true
        });
        window.swaggerUi.load();
    }
}

function add_window(form_name) {
    document.getElementById("swagger-ui-container").innerHTML = "";
    var forms = $('label[id*="_form"]');
    forms.innerHTML = "";
    document.getElementById(form_name.concat("_form")).className = "visible";
}

$(document).ready(function() {
    $("#search").keyup(function() {
        var filter = $(this).val(); // get the value of the input, which we filter on
        if (filter) {
            console.log(filter);
            $("#listprime div").find("div:not(:contains(" + filter + "))").slideUp("fast");
            $("#listprime div").find("div:contains(" + filter + ")").slideDown("fast");
        } else {
            $("#listprime").find("div").slideDown();
        }
    });
    $.ajax({
        data: {
            'cmd': 'unique_group'
        },
        url: "api/populate.php",
        global: false,
        type: "POST",
        cache: false,
        dataType: "json",
        success: function(response) {
            $.each(response, function(index) {
                $("#listprime").prepend('<div class = "btn list-group-item" id = "' + response[index].api_group + '">' + response[index].api_group + '</div>');

            });
        }
    });
    $("#menu_bar").prepend('<div id = "add_api" class="list-group"><a href="#"><b>+</b> Add API<i class="fa fa-angle-right"></i></a></div>');
    $("div#add_api").on("click", function() {
        gen_swagger(($(this).attr('id')));
        $("li").removeClass("active");
        $("div").removeClass("active");
    });

    $.ajax({
        data: {
            'cmd': 'group'
        },
        url: "api/populate.php",
        global: false,
        type: "POST",
        cache: false,
        dataType: "json",
        success: function(response) {
            $.each(response, function(index) {
                $("div#" + response[index].api_group).append('<div class="list-group-item" id = "' + response[index].url + '">' + response[index].name + '<i class="fa fa-angle-right"></i></div>');

            });
            $("ul#listprime div div").on("click", function() {
                gen_swagger(($(this).attr('id')));
                $("li").removeClass("active");
                $("div").removeClass("active");
                $(this).addClass("active");
            });

        }
    });

    $("#swaggerhub-list div").on("click", function(){
        console.log("OK");
    });
    $('#create_group_url').on("click", function() {
        $('#add_group_url').removeClass("hidden");
    });
    $('#create_group_file').on("click", function() {
        $('#add_group_file').removeClass("hidden");
    });
});
