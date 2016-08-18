<?php include "header.htm"?>
<div class="col-sm-3 col-md-3 sidebar" id="swagger-ui-container">
   <h4>SwaggerHub APIs</h4>
	<script>
	makeCorsRequest(function(val){
		console.log(val['apis']);
        	for (var count = 0; count < Object.keys(val['apis']).length; count ++){
			$("#swaggerhub-list").append('<div class="list-group-item" id = "' + val['apis'][count]["name"] + '_' + val['apis'][count]["properties"][7]["value"] + '">' + val['apis'][count]["name"] + '<i class="fa fa-angle-right"></i></div>');
		}
	var on_load = function(){
    $("#swaggerhub-list div").on("click", function(){
        $("div").removeClass("active");
        $(this).addClass("active");
        console.log("OK")
    }); 
}

$(document).ready(on_load);
$(window).bind("page:change",on_load);


	});
	</script>
   <ul class="nav nav-sidebar" id="swaggerhub-list">
   </ul>
</div>


<div class="col-sm-9 col-sm-offset-4 col-md-9 col-md-offset-3 main swagger-ui-wrap">
<div class="container">
  <table class="table table-condensed">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr>
    </tbody>
  </table>
</div>
</div>
<?php include "footer.htm"?>
