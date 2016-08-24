function collect_metrics(target_url){
	document.getElementById("swagger-ui-container").innerHTML = "";
	if (target_url.indexOf("apigee") == -1) {
		$("#swagger-ui-container").append('<div class="alert alert-warning"><strong>Failure</strong> Not an Apigee API, no analytics available</div>');
	}else{
	console.log(target_url);
	}
}
