<?php include "header.htm"?>
<script src="lib/cookies.js"></script> 
<div class="container">
<h4>SwaggerHub Configuration</h4>
<p>Current saved data:</p>
<ul id="info">
<script>
$("#info").append('<li> URL: ' + getCookie("swaggercookie_url") + '</li>');
$("#info").append('<li> Key : ' + getCookie("swaggercookie_key") + '</li>');
</script>
</ul>
<form id="swaggerhub">
<h5>Update SwaggerHub Information:</h5>
<div class="form-group row">
  <label for="example-url-input" class="col-xs-2 col-form-label">URL</label>
  <div class="col-xs-10">
    <input class="form-control" type="url" placeholder="https://api.swaggerhub.com/apis/{owner}" id="url" required>
  </div>
</div>
<div class="form-group row">
  <label for="example-text-input" class="col-xs-2 col-form-label">API Key</label>
  <div class="col-xs-10">
    <input class="form-control" type="text" placeholder="key" required  id="key">
  </div>
</div>
 <button type="submit" class="btn btn-default" id="submit" >Submit</button>
</form>
</div>

<?php include "footer.htm"?>
