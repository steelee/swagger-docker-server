var SwaggerWindow = function(target_URL, name) {

    return {
        target_URL: target_URL,
        name: name,
        gen_swagger: function(target_URL) {
            $("#supplement").empty();
            $("#owners-box").empty();
            if ($("#dialog").dialog("isOpen")) {
                $("#dialog").dialog("close");
            }
            if (target_URL == "add_api") {
                this.add_window(target_URL);
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
		our_class = this;
                $.ajax({
                    data: {
                        'cmd': 'metadata',
                        'api': this.name
                    },
                    url: "api/populate.php",
                    global: false,
                    type: "POST",
                    cache: false,
                    dataType: "json",
                    success: function(response) {
                        $.each(response, function(index) {
                            if (response[index].api_group != "No_Group") {	
			        console.log(response[index]);
			    }
			});
			var rating = Math.round(response[1]["rating"] / response[2]['rating']);
                        $("#owners-box").append('<div class="panel panel-primary"><div class="panel-heading">Asset Information</div><div class="panel-body"><b>Status: ' + response[0]["status"] + '<br>Asset Owner: ' + response[0]['owner'] + '<br>Technical Owner: Aaron Shaver </div></div>');
                        $("#owners-box").append('<div class="panel panel-default"> <div class="panel-heading">Statistics</div> <div class="panel-body"><button type="button" id="button-stats" data="' + window.swaggerUi.api['host'] + '" class="btn btn-info">Average Response time: 35ms</button><button type="button-error" id="' + window.swaggerUi.api['url'] + '" class="btn btn-info">Average Error count: 12 errors per day</button><button type="button" id="button-rating" class="btn btn-info"> Rating: ' + "★".repeat(rating) + "☆".repeat(5 - rating) + ' ( ' + response[2]['rating'] + ' ratings)</button> </div>');
                        $('#button-rating').data('key', response);
                        $("#button-stats").on("click", function() {
                            collect_metrics($(this).attr("data"));
                        });
                        $("#button-rating").on("click", function() {
                            feedback_form(our_class.name,$(this).data('key'));
                        });
			$.getScript("/config.js",function() {
			    $("dialog").dialog ( {
				autoOpen: false,
				modal: true,
				show: "blind",
				hide: "blind",
				width: 750
			    });
			});
                        $("#owners-box").append('<div><a target="_blank" href=" ' + config.discusspage + '"><button type="button" id="button-discuss" class="btn btn-success" style="margin-bottom: 20px"><span class="glyphicon glyphicon-comment"></span> Discuss this API</button></a></div>');
                    }
                });

            }
        },

        gen_owner: function(target) {
            console.log(target);
        },

        add_window: function(form_name) {
            try {
                document.getElementById("swagger-ui-container").innerHTML = "";
                $("#swagger-ui-container").load("/views/addapi.htm");
            } catch (err) {
                $(".container").empty()
                $(".container").load("/views/addapi.htm");
            }
        }
    };
};
