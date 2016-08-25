<?php include "header.htm"?>
<div class="container">
<h3>SwaggerHub Configuration</h3>
<p>Current saved data:</p>
<table class="table table-hover">
     <tbody>
       <tr id="swaggerhub_table">
       </tr>
       <tr id="apigee_table">
       </tr>
     </tbody>
   </table>
<script>
$("#info").append('<td> URL: ' + getCookie("swaggercookie_url") + '</td>');
$("#info").append('<td> Key : ' + getCookie("swaggercookie_key") + '</td>');
$("#swaggerhub_table").append('<td> URL: ' + getCookie("swaggercookie_url") + '</td>');
if(getCookie("swaggercookie_key")) {
       $("#swaggerhub_table").append('<td>Swaggerhub key is set</td>');
}else{
       $("#swaggerhub_table").append('<td>Swaggerhub key is not set</td>');
}
$("#apigee_table").append('<td> URL: ' + getCookie("apigee_url") + '</td>');
if(getCookie("apigee_key")) {
       $("#apigee_table").append('<td>Apigee data is set</td>');
}else{
       $("#apigee_table").append('<td>Apigee data is not set</td>');
}
 </script>
 

<button type="button" class="btn btn-primary btn-lg" onclick="toggler('swaggerhub')">Update Swaggerhub Information</button>
<form id="swaggerhub" style="display:none">
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
<hr>
</form>
<button type="button" class="btn btn-primary btn-lg" onclick="toggler('apigee')">Update Apigee Information</button>
<form id="apigee" style="display:none">
<div class="form-group row">
  <label for="example-text-input" class="col-xs-2 col-form-label">Apigee API Target</label>
  <div class="col-xs-10">
    <input class="form-control" type="text" placeholder="https://api.enterprise.apigee.com/v1/o/org/environments/env/stats/apis" required  id="target">
  </div>
</div>
<div class="form-group row">
  <label for="example-text-input" class="col-xs-2 col-form-label">Apigee Credientials</label>
  <div class="col-xs-10">
    <input class="form-control" type="text" placeholder="base64.encode(username:password)" required  id="base64">
  </div>
</div>
 <button type="submit" class="btn btn-default" id="submit" >Submit</button>
</form>
 <hr>
 <h4>Delete existing data:</h4>
 <button type="button" class="btn btn-default" id="clear" >Clear Credientials</button>
</div>

<?php include "footer.htm"?>
