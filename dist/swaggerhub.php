<?php include "header.htm"?>
<div class="col-sm-3 col-md-3 sidebar" id="swagger-ui-container">
   <h4>SwaggerHub APIs</h4>
	<script>
	makeCorsRequest(function(val){
	console.log(val['apis']);
        for (var count = 0; count < Object.keys(val['apis']).length; count ++){
		$("#swaggerhub-list").append('<div class="list-group-item">' + val['apis'][count]["name"] + '</div>');	
	}
	});
	</script>
   <ul class="nav nav-sidebar" id="swaggerhub-list">
   </ul>
</div>

<div class="col-sm-9 col-sm-offset-4 col-md-9 col-md-offset-3 main swagger-ui-wrap">
</div>
<?php include "footer.htm"?>
