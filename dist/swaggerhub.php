<?php include "header.htm"?>
<div class="col-sm-3 col-md-3 sidebar">
    <h4>SwaggerHub APIs</h4>
    <script>
        values = {};
        makeCorsRequest(getCookie("swaggercookie_url"), getCookie("swaggercookie_key"), function(val) {
            for (var count = 0; count < Object.keys(val['apis']).length; count++) {
                var private_item = val['apis'][count]["properties"].length - 1;
                $("#swaggerhub-list").append('<div class="list-group-item" id = "' + val['apis'][count]["name"] + '_' + val['apis'][count]["properties"][private_item]["value"] + '">' + val['apis'][count]["name"] + '<i class="fa fa-angle-right"></i></div>');
                values[val['apis'][count]["name"]] = JSON.stringify(val['apis'][count]);

            }
            var on_load = function() {
                $("#swaggerhub-list div").on("click", function() {
                    $("div").removeClass("active");
                    $(this).addClass("active");
                    var dataID = $(this).text();
                    gen_swaggerhub(values[dataID]);
                });
            }

            $(document).ready(on_load);
            $(window).bind("page:change", on_load);


        });
    </script>
    <ul class="nav nav-sidebar" id="swaggerhub-list">
    </ul>
</div>


<div class="col-sm-9 col-sm-offset-4 col-md-9 col-md-offset-3 main swagger-ui-wrap">
    <div class="swagger-ui-container" id="swagger-ui-container">
    </div>
</div>
<?php include "footer.htm"?>
