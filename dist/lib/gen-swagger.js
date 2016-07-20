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
            $("#listprime").find("a:not(:contains(" + filter + "))").parent().slideUp("fast");
            $("#listprime").find("a:contains(" + filter + ")").parent().slideDown("fast");
        } else {
            $("#listprime").find("li").slideDown();
        }
    });
    $.ajax({
	data: {
		'cmd':'list'
	},
        url: "api/populate.php",
        global: false,
        type: "POST",
        cache: false,
        dataType: "json",
        success: function(response) {
            $("#listprime").append('<li id = "add_api"><a href="#"><b>+</b> Add API<i class="fa fa-angle-right"></i></a></li>');
            $.each(response, function(index) {
                $("#listprime").append('<li id = "' + response[index].url + '"><a href="#">' + response[index].name + '<i class="fa fa-angle-right"></i></a></li>');

            });
            $("ul#listprime li").on("click", function() {
                gen_swagger(($(this).attr('id')));
                $("li").removeClass("active");
                $(this).addClass("active");
            });

        }
    });
    $('#create_group_url').on("click", function(){ 
	$('#add_group_url').removeClass("hidden");
    });
    $('#create_group_file').on("click", function(){ 
	$('#add_group_file').removeClass("hidden");
    });
});
