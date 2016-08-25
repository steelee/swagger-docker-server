function collect_metrics(target_url){
	document.getElementById("swagger-ui-container").innerHTML = "";
	if (target_url.indexOf("apigee") == -1) {
		$("#swagger-ui-container").append('<div class="alert alert-warning"><strong>Failure</strong> Not an Apigee API, no analytics available</div>');
	}else{
		var key = "Basic " + getCookie("apigee_key");
		var target = getCookie("apigee_url");
		makeCorsRequest(target, key, function(val) {
				console.log(val);
				var results = val["environments"][0]["dimensions"];
				for (var count = 0; count < results.length; count++){
					var current = results[count]["name"].toUpperCase()
					var url = target_url.toUpperCase();
					if(url.indexOf(current) !== -1){
						$("#swagger-ui-container").append(JSON.stringify(results[count]));
					}
				}
				});

	}
}
