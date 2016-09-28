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

$('#swagger-ui-container').bind('DOMSubtreeModified', function() {
    if (getParameterByName('api')) {
        $('#button-stats').attr('data', window.swaggerUi.api['host']);
    }
});

$(document).ready(function() {
    $.getScript("/config.js", function() {
        $("#dialog").dialog({
            autoOpen: false,
            modal: true,
            show: "blind",
            hide: "blind",
            "width": 750,
        });
	$("#top-menu").append('<li><a target="_blank" href="'+ config.learnpage  +'"><span class="glyphicon glyphicon-book"></span> API University</a></li>');
        var target_API = getParameterByName('api');
        $("#search").keyup(function() {
            var filter = $(this).val(); // get the value of the input, which we filter on
            if (filter) {
                $("#listprime li ul").find("div:not(:contains(" + filter + "))").slideUp("fast");
                $("#listprime li ul").find("div:contains(" + filter + ")").slideDown("fast");
            } else {
                $("#listprime").find("div").slideDown();
            }
        });
        $.ajax({
            data: {
                'cmd': 'unique_group'
            },
            url: "/api/populate.php",
            global: false,
            type: "POST",
            cache: false,
            dataType: "json",
            success: function(response) {
                $.each(response, function(index) {
                    if (response[index].api_group != "No_Group") {
                        $("#listprime").prepend('<li class="data-dropdown"><ul class="nav nav-pills nav-stacked collapse in" id="' + response[index].api_group + '"><li data-toggle="collapse" data-parent="#' + response[index].api_group + '" href="#' + response[index].api_group + '_target"><a class="nav-sub-container">' + response[index].api_group + ' <div class="caret-container"><span class="caret arrow"></span></div></a></li><ul class="nav nav-pills nav-stacked collapse " id="' + response[index].api_group + '_target"></ul></ul>');
                    }
                });
                $("#menu_bar").append('<h3>Unassigned</h3><ul class="nav nav-pills nav-stacked" id="no_domain"></ul><button type="button" class="btn btn-secondary"><span class="glyphicon glyphicon-plus"></span> Add Domain</button>');
                $.ajax({
                    url: config.tags,
                    global: false,
		    username: config.github,
                    type: "GET",
                    cache: false,
                    dataType: "json",
                    success: function(git) {
                        for (var key in git) {
                            if (git.hasOwnProperty(key)) {
                                if (git[key]["name"].indexOf(config.env) != -1) {
                                    var curr_key = git[key];
                                    break;
                                }
                            }
                        }
                        $.ajax({
                            url: curr_key["commit"].url,
                            global: false,
			    username: config.github,
                            type: "GET",
                            cache: false,
                            dataType: "json",
                            success: function(tag) {
                                $("#menu_bar").append('<div style="position:absolute;bottom:5%"><h3>' + config.env.toUpperCase() + '</h3><a target="_blank" href="' + tag.html_url + '">' + curr_key["name"] + '</a></div>');
                            }

                        });
                    }
                });
                $.ajax({
                    data: {
                        'cmd': 'group'
                    },
                    url: "/api/populate.php",
                    global: false,
                    type: "POST",
                    cache: false,
                    dataType: "json",
                    success: function(response) {
                        $.each(response, function(index) {
                            if (response[index].api_group != "No_Group") {
                                $("ul#" + response[index].api_group + " ul").append('<div class="list-group-item" id="' + response[index].url + '">' + response[index].name + '</div>');
                            } else {
                                $("#no_domain").append('<div class="list-group-item" id="' + response[index].url + '">' + response[index].name + '</div>');
                            }
                        });
                        $("ul#listprime li ul ul div, #no_domain div").on("click", function() {
                            var newURL = updateURLParameter(window.location.href, 'api', ($(this).text()));
                            window.history.replaceState({}, 'title', newURL);
                            var url = SwaggerWindow($(this).attr('id'), $(this).text());
                            url.gen_swagger(url.target_URL);
                            $("li").removeClass("active");
                            $("div").removeClass("active");
                            $(this).addClass("active");
                        });

                        if (target_API != null) {
                            $('ul#listprime li ul div:contains("' + target_API + '")').trigger("click");
                            $('#no_domain div:contains("' + target_API + '")').trigger("click");
                        } else {
                            $("#swagger-ui-container").load("views/graphs.htm");
                        }
                    }
                });

            }
        });
        $("#add_api").on("click", function() {
            var url = SwaggerWindow($(this).attr('id'), null);
            url.gen_swagger(url.target_URL);
        });

    });
});
