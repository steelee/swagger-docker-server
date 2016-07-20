<?php include "header.htm";?>
<div class="container" style="padding-top:50px">
    <div class="row">
        <div class="col-md-9">
          <h2>Group Management</h2>
          <p>Create new groups, or delete or update existing groups</p>
	  <script>
	  $(document).ready(function(){
	  	$.ajax({
		url: "api/populate.php",
		global: false,
		type: "POST",
		cache: false,
		dataType: "json",
		data: {'cmd':'group'},
		success: function(response){
		for(var k in response){
			console.log(k,response[k]);
			$('.table').find('tbody').append($('<tr>')).append($(('<td>'+response[k]["api_group"]+'</td></tr>')));
		}
	}  
	});
	});
          </script>
	  <table class="table table-condensed table-hover" id='group'>
    <thead>
      <tr>
        <th>Group Name</th>
        <th>Expand</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Mary</td>
	<td>
	<div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">2 API(s)
  <span class="caret"></span></button>
  <ul class="dropdown-menu">
    <li><a href="#">HTML</a></li>
    <li><a href="#">CSS</a></li>
    <li><a href="#">JavaScript</a></li>
</td>
  </ul>
</div>
      </tr>
      <tr>
        <td>July</td>
        <td>
	<div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">4 API(s)
  <span class="caret"></span></button>
  <ul class="dropdown-menu">
    <li><a href="#">HTML</a></li>
    <li><a href="#">CSS</a></li>
    <li><a href="#">JavaScript</a></li>
  </ul>
</div>

	</td>
      </tr>
    </tbody>
  </table>
          <hr class="col-md-12">
          
          <h2>Time Zone Defaults</h2>
          <p>All of the settings for time zone and daylight savings.
          </p><hr class="col-md-12">
                 
          <h2>Diagnostics</h2>
          <p>Run various diagnostics.</p>
           <button class="btn" contenteditable="false">Run Network Diagnostic</button>
        </div>
        <div class="span9"></div>
    </div>
</div>
<?php include "footer.htm";?>
