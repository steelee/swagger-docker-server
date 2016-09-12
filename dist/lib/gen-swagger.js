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
    $("#options-menu").empty();
    $("#options-menu").append('<div class = "btn-group"><button type = "button" data = "" id = "overview" class = "btn btn-default active">Overview</button><button type = "button" data = "" id = "performance" class = "btn btn-default">Performance</button><button type = "button" id = "feedback" data = "" class = "btn btn-default">Feedback</button></div>');
    $("#performance").on("click", function() {
        $("#overview").removeClass("active");
        $("#feedback").removeClass("active");
        $($(this)).addClass("active");
        collect_metrics($(this).attr("data"));
    });
    $("#overview").on("click", function() {
        $("#feedback").removeClass("active");
        $("#performance").removeClass("active");
        $($(this)).addClass("active");
        gen_swagger($(this).attr("data"));
    });
    $("#feedback").on("click", function() {
        $("#overview").removeClass("active");
        $("#performance").removeClass("active");
        $($(this)).addClass("active");
        api_feedback($(this).attr("data"));
    });

}

$('#swagger-ui-container').bind('DOMSubtreeModified', function() {
    $('#performance').attr("data", window.swaggerUi.api['host']);
    $('#overview').attr("data", window.swaggerUi.api['url']);
    $('#feedback').attr("data", getParameterByName('api'));
});

function toggler(divId) {
    $("#" + divId).toggle();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function gen_swaggerhub(target_id) {
    data = JSON.parse(target_id);
    target = data["properties"][0]["url"] + "/swagger.yaml";
    makeCorsRequest(target, getCookie("swaggercookie_key"), "swaggerhub", function(val) {
        if (typeof val != "undefined") {
            val = "/api/" + val;
            window.swaggerUi = new SwaggerUi({
                url: val,
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
    });
}

function add_window(form_name) {
    document.getElementById("swagger-ui-container").innerHTML = "";
    var forms = $('label[id*="_form"]');
    forms.innerHTML = "";
    document.getElementById(form_name.concat("_form")).className = "visible";
}

// Code attributed to Stack Overflow user Adil Malik
// https://stackoverflow.com/questions/1090948/change-url-parameters/10997390#10997390

function updateURLParameter(url, param, paramVal) {
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];
        if (TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    } else {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];

        if (TheParams)
            baseURL = TheParams;
    }

    if (TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

$(document).ready(function() {
    var target_API = getParameterByName('api');
    $("#search").keyup(function() {
        var filter = $(this).val(); // get the value of the input, which we filter on
        if (filter) {
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
                $("#listprime").prepend('<li><ul class="nav nav-pills nav-stacked collapse in" id="' + response[index].api_group + '"><li data-toggle="collapse" data-parent="#' + response[index].api_group + '" href="#' + response[index].api_group  +'_target"><a class="nav-sub-container">' + response[index].api_group + ' <div class="caret-container"><span class="caret arrow"></span></div></a></li><ul class="nav nav-pills nav-stacked collapse " id="'+ response[index].api_group  +'_target"></ul></ul>');
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
                $("ul#" + response[index].api_group + " ul").append('<div class="list-group-item" id="' + response[index].url  + '">' + response[index].name + '</div>');

            });
            $("ul#listprime li ul ul div").on("click", function() {
                var newURL = updateURLParameter(window.location.href, 'api', ($(this).text()));
                window.history.replaceState({}, 'title', newURL);
                gen_swagger(($(this).attr('id')));
                $("li").removeClass("active");
                $("div").removeClass("active");
                $(this).addClass("active");
            });

            if (target_API != null) {
                $('ul#listprime li ul div:contains("' + target_API + '")').trigger("click");
            }
        }
    });

    $('#create_group_url').on("click", function() {
        $('#add_group_url').removeClass("hidden");
    });
    $('#create_group_file').on("click", function() {
        $('#add_group_file').removeClass("hidden");
    });
$('#create_group_url_owner').on("click", function() {
          $('#add_group_url_owner').removeClass("hidden");
 	$('#dropdown_owner').removeAttr('required');
 $('#new_owner_name').prop('required',true);
 	$('#new_owner_email').prop('required',true);
      });
      $('#create_group_file_owner').on("click", function() {
          $('#add_group_file_owner').removeClass("hidden");
 	$('#dropdown_owner_file').removeAttr('required');
 	$('#new_owner_name').prop('required',true);
 	$('#new_owner_email').prop('required',true);
      });
});
