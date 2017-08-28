"use strict";

var dom = {
  id: function(id) {
    return document.getElementById(id);
  }
};

var ajaxFunction = function (object) {
  var problemMessage = function (message) {
    console.error(message);
  };
  if (!Array.isArray(object) && typeof object == "object") {
    object.method = object.method || "GET"; // Default Value for method
    object.type = object.type || "text"; // Default Value for type
    if(!object.url) { // Check URL
      delete object.url;
      problemMessage("'url:' is required in the ajaxFunction().");
    }
    if(typeof object.callback !== 'function') { // Check Function
      problemMessage("'callback:' is required in the ajaxFunction().");
    }
    if(object.url && typeof object.callback == 'function') { // Check url and function
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          object.callback(this.response);
        }
      };
      request.open(object.method, object.url);
      request.responseType = object.type;
      request.send();
    }
  } else {
    problemMessage("{} is required in the ajaxFunction().");
  }
}

var weatherApp = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var requestUrl = "https://fcc-weather-api.glitch.me/api/current?lat=" +
      position.coords.latitude + "&lon=" + position.coords.longitude;
      ajaxFunction({
        method: "GET",
        type: "json",
        url: requestUrl,
        callback: function (response) {
          dom.id("city_country").textContent = response.name + ', ' + response.sys.country;
          dom.id("weather_main").textContent = response.weather[0].main;
          dom.id("weather_icon").src = response.weather[0].icon;
          dom.id("weather_icon").alt = response.weather[0].description;
          dom.id("weather_temp").classList.add("button");
          dom.id("celsius").textContent = parseInt(response.main.temp) + ' C';
          dom.id("fahrenheit").textContent = parseInt((response.main.temp * 9 / 5 + 32)) + ' F';
        }
      });
    });
  }
};

window.onload = function () {
  weatherApp();
  dom.id("weather_temp").onclick = function () {
    dom.id("fahrenheit").classList.toggle("show");
    dom.id("celsius").classList.toggle("hide");
  };
}