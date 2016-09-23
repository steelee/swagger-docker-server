function collect_metrics(target_url) {
    if (!getCookie("apigee_key")) {
        $("#swagger-ui-container").append('<div class="alert alert-warning"><strong>Failure</strong> No Apigee key set, go to the <a href="/views/options.php">settings page</a> to set one.</div>');

    } else if (target_url.indexOf("apigee") == -1) {
        $("#swagger-ui-container").append('<div class="alert alert-warning"><strong>Failure</strong> Not an Apigee API, no analytics available</div>');
    } else {
	$('#dialog').empty();
 	$("#dialog").dialog("open");
	$('#dialog').prepend($('<img>',{id:'loading',src:'images/load.gif'}))
        var key = "Basic " + getCookie("apigee_key");
        var target = getCookie("apigee_url");
        var options = {
	    colors: "#FF0000",
            axisLabels: {
                show: true
            },
            xaxes: [{
                axisLabel: 'Days',
            }],
            yaxes: [{
                position: 'left',
                axisLabel: 'Response time (milliseconds)',
            }]
        };
        makeCorsRequest(target, key, "apigee", function(val) {
            var results = val["environments"][0]["dimensions"];
            for (var count = 0; count < results.length; count++) {
                var current = results[count]["name"].toUpperCase()
                var url = target_url.toUpperCase();
                if (url.indexOf(current) !== -1) {
                    var set = results[count]["metrics"][1]["values"];
                    var arr = [];
                    for (var subarray = 0; subarray < set.length; subarray++) {
                        var item = [];
                        item[0] = subarray;
                        item[1] = set[subarray]["value"];
                        arr.push(item);
                    }
		    $('#dialog').empty();
                    $("#dialog").append('<div id="graph_container" class="graph_container"></div>');
                    $.plot($("#graph_container"), [arr], options);
                }
            }
        });

    }
}
