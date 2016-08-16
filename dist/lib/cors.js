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
function makeCorsRequest(callback) {
  // This is a sample server that supports CORS.
  var url = getCookie("swaggercookie_url");

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    console.log('CORS not supported');
    return;
  }
  xhr.setRequestHeader('Authorization', getCookie("swaggercookie_key"));
  // Response handlers.
  xhr.onload = function() {
    var text = JSON.parse(xhr.responseText);
    callback(text);
  };

  xhr.onerror = function() {
    console.log('Woops, there was an error making the request.');
  };
  
  xhr.send();
}
