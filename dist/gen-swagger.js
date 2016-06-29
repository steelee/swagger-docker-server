function gen_swagger(dist_id) {
  console.log(dist_id);
  document.getElementById("swagger-ui-container").innerHTML = "";
  window.swaggerUi = new SwaggerUi({
    url:dist_id ,
    dom_id: "swagger-ui-container",
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
    onComplete: function(swaggerApi, swaggerUi){
      if(typeof initOAuth == "function") {
        initOAuth({
          clientId: "your-client-id",
          clientSecret: "your-client-secret-if-required",
          realm: "your-realms",
          appName: "your-app-name",
          scopeSeparator: ",",
          additionalQueryStringParams: {}
        });
      }
      if(window.SwaggerTranslator) {
        window.SwaggerTranslator.translate();
      }
    },
    onFailure: function(data) {
      log("Unable to Load SwaggerUI");
    },
    docExpansion: "none",
    jsonEditor: false,
    defaultModelRendering: 'schema',
    showRequestHeaders: false
  });
  window.swaggerUi.load();
}

$(document).ready(function(){
   $.ajax({
    url: "api/populate.php",
    global: false,
    type: "POST",
    cache: false,
    dataType: "json",
    success: function(response){
      populate(response);
    }
  });
});

function populate(symbols) {
    for (var count in symbols){
      if (symbols.hasOwnProperty(count)){
        console.log(symbols[count]["url"]);
      	var inputElement = document.createElement('input');
      	inputElement.setAttribute("id",symbols[count]["url"]);
      	inputElement.setAttribute("value",symbols[count]["name"]);
      	inputElement.innerHTML = symbols[count]["url"];
      	var locationElement = document.getElementById('menu-bar');
      	inputElement.type = "button";
      	inputElement.addEventListener('click', function(){
        	gen_swagger(this.id);
      	});
      	locationElement.appendChild(inputElement);
    }
  }
}
