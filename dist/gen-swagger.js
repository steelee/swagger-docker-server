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
            populate(response);
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

function populate(symbols) {
    for (var count in symbols) {
        if (symbols.hasOwnProperty(count)) {
            console.log(symbols[count]["url"]);
            var inputElement = document.createElement('input');
            inputElement.setAttribute("id", symbols[count]["url"]);
            inputElement.setAttribute("value", symbols[count]["name"]);
            inputElement.innerHTML = symbols[count]["url"];
            var locationElement = document.getElementById('menu-bar');
            inputElement.type = "button";
            inputElement.addEventListener('click', function() {
                gen_swagger(this.id);
            });
            locationElement.appendChild(inputElement);
        }
    }
}
