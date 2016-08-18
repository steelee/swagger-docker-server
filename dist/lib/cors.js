// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(url, key, callback) {
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    console.log('CORS not supported');
    return;
  }
  xhr.setRequestHeader('Authorization', key);
  xhr.setRequestHeader('Accept', "application/json");
  // Response handlers.
  xhr.onload = function() {
    try {
    	var text = JSON.parse(xhr.responseText);
    }catch(e){
	$.ajax({
		url: "api/create.php",
		global: "false",
		type: "POST",
		cache: "false",
		data: {"data" : xhr.responseText},
		success: function(response){
			callback(response);
		}
	});
    }
    callback(text);
  };

  xhr.onerror = function() {
    console.log('Woops, there was an error making the request.');
  };
  
  xhr.send();
}
