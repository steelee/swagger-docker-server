function feedback_form(name,target){
	console.log(name);
	$("#dialog").data("api_name", name);
	$("#dialog").dialog("open");
	$("#dialog").load("/views/feedback_form.htm");
}
