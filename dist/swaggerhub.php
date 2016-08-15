<?php include "header.htm"?>
<script src="lib/cookies.js"></script>

<div class="col-sm-3 col-md-3 sidebar" id="swagger-ui-container">
   <h4>SwaggerHub APIs</h4>
   <ul class="nav nav-sidebar" id="listprime">
       <li><button type="button" onclick="loadXMLDoc('consumer-identifier/0.0.0')">consumer-identifier ver. 0.0.0</button></li>
       <li><button type="button" onclick="loadXMLDoc('consumerexperience/1.0.0')">consumerexperience ver. 1.0.0</button></li>
       <li><button type="button" onclick="loadXMLDoc('cps/1.0.0')">cps ver. 1.0.0</button></li>
       <li><button type="button" onclick="loadXMLDoc()">Change Content</button></li>
       <li><button type="button" onclick="loadXMLDoc()">Change Content</button></li>
       <li><button type="button" onclick="loadXMLDoc()">Change Content</button></li>
       <li><button type="button" onclick="loadXMLDoc()">Change Content</button></li>
       <li><button type="button" onclick="loadXMLDoc()">Change Content</button></li>
       <li><button type="button" onclick="loadXMLDoc()">Change Content</button></li>
       <li><button type="button" onclick="loadXMLDoc()">Change Content</button></li>
   </ul>
</div>

<div class="col-sm-9 col-sm-offset-4 col-md-9 col-md-offset-3 main swagger-ui-wrap">

<p id="url">url</p>
<p id="readystate">readystate</p>
<p id="status">status</p>
<p id="response">response</p>

<script>
function loadXMLDoc(api_ver) {
  var swagger_url = "https://swaggerhub.com/api/swagger-hub/registry-api/1.0.14/apis/cambia/" + api_ver
 
  document.getElementById("url").innerHTML = swagger_url;
  var xmlhttps;
  if (window.XMLHttpRequest) {
    xmlhttps = new XMLHttpRequest();
  } else {
    // code for older browsers
    xmlhttps = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttps.onreadystatechange = function() {
    var readyState = xmlhttps.readyState.toString();
    var status = xmlhttps.status.toString();
    document.getElementById("readystate").innerHTML = readyState;
    document.getElementById("status").innerHTML = status;
    if (xmlhttps.readyState == 4 && xmlhttps.status == 200) {
      document.getElementById("response").innerHTML =
      xmlhttps.responseText;
    }
  };
  xmlhttps.open("GET", swagger_url, true);
  xmlhttps.setRequestHeader("Access-Control-Allow-Origin", "*");
  xmlhttps.setRequestHeader("Content-type", "application/json");
  xmlhttps.setRequestHeader("Authorization", "Basic cHpLWE9kN3JnZUNycUdVdzBLajFqR2RvZmFGckRuejI6RVNYTnVxNmh5N2JUYk1vMw");
  // xmlhttps.withCredentials = true;
  xmlhttps.send();
}
</script>

<?php include "footer.htm"?>
