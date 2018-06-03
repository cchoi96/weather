var celsius = false;
var weather;

function changeTemp (Cel, c) {
  if (c) return Math.round(Cel * (9/5) + 32) + " F";
  return Math.round(Cel) + " C";
}

function render (weather, celsius) {
  var currentLocation = weather.name;
  var currentWeather = weather.weather[0].description;
  var currentTemp = changeTemp(weather.main.temp, celsius);
  var high = changeTemp(weather.main.temp_max, celsius);
  var low = changeTemp(weather.main.temp_min, celsius);
  var icon = weather.weather[0].icon
  //var iconSrc = "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399" + icon + ".png";
  //var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
        
  $("#currentLocation").html(currentLocation);
  $("#currentWeather").html(currentWeather);
  $("#currentTemp").html(currentTemp);
  $("#high-low").html(high + " / " + low);
  $("#currentTemp").prepend('<img src="' + icon + '">');
}

$(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, function(apiData) {
        render(apiData, celsius);
        $("#toggle").click(function () {
          celsius = !celsius;
          render(apiData, celsius);
        });
      });
    });
  }
});