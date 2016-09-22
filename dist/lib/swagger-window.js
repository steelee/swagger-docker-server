var SwaggerWindow = function(target_URL, name) {

    return {
        target_URL: target_URL,
	name: name,
        gen_swagger: function(target_URL) {
            if (target_URL == "add_api") {
                this.add_window(target_URL);
                $("#supplement").empty();
                $("#owners-box").empty();
            } else {
                document.getElementById("add_api_form").className = "hidden";
                window.swaggerUi = new SwaggerUi({
                    url: target_URL,
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
                $("#supplement").empty();
                $("#owners-box").empty();
		$("#owners-box").append('<div class="panel panel-primary"><div class="panel-heading">Asset Information</div><div class="panel-body"><b>Status: Operational<br>Asset Owner: Aaron Shaver<br>Technical Owner: Aaron Shaver </div></div>');
                $("#owners-box").append('<div class="panel panel-default"> <div class="panel-heading">Statistics</div> <div class="panel-body"><button type="button" id="button-stats" class="btn btn-info">Average Response time: 35ms</button><button type="button-error" id="' + window.swaggerUi.api['url']  +'" class="btn btn-info">Average Error count: 12 errors per day</button><button type="button-rating" id="' + window.swaggerUi.api['url']  +'" class="btn btn-info">Rating: ★★★☆☆ (4 ratings)</button> </div>');
                class_def = this;
		$("body #container-fluid").append('<div><ul class="nav nav-pills nav-stacked"> <li>jedan</li> <li>dva</li> <li>tri</li> <li>cetriri</li> <li>pet</li> </ul></div>');
		$(".btn-info").on("click", function() {
                     collect_metrics($(this).attr("data"));
                 });

            }
        },
	
	gen_owner: function(target) {
	    console.log(target);
	},

        add_window: function(form_name) {
	    try {
            document.getElementById("swagger-ui-container").innerHTML = "";
	    $("#swagger-ui-container").load("views/addapi.htm");
	}
	catch(err) {
            $(".container").empty() 
	    $(".container").load("addapi.htm");
        }
	}
    };
};
