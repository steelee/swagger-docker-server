var SwaggerWindow = function(target_URL) {

    return {
        target_URL: target_URL,
        gen_swagger: function(target_URL) {
            if (target_URL == "add_api" || target_URL == "add_auth") {
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
                console.log("Class Executed!");
                $("#options-menu").empty();
                $("#options-menu").append('<div class = "btn-group"><button type = "button" data = "" id = "overview" class = "btn btn-default active">Overview</button><button type = "button" data = "" id = "performance" class = "btn btn-default">Performance</button><button type = "button" id = "feedback" data = "" class = "btn btn-default">Feedback</button></div>');
                class_def = this;
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
                    class_def.gen_swagger($(this).attr("data"));
                });
                $("#feedback").on("click", function() {
                    $("#overview").removeClass("active");
                    $("#performance").removeClass("active");
                    api_feedback(document.getElementsByClassName("active")[0].innerHTML);
                    $($(this)).addClass("active");
                });

            }
        },

        add_window: function(form_name) {
            document.getElementById("swagger-ui-container").innerHTML = "";
            var forms = $('label[id*="_form"]');
            forms.innerHTML = "";
            document.getElementById(form_name.concat("_form")).className = "visible";
        }
    };
};
