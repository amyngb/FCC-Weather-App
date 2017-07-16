var latitude;
var longitude;
var temp;
var state;
var city;
var weather;
var darkSkyData;
var geoCodeData;


/********Protect API keys********/
//SET ENV Variable so it exists even if a person doesn't include their credentials.

var env = {
    googleApiKey:'',
    darkSkyAPIKey:'',
};
// NOW  Import variables if present (from env.js)
if(window.__env) {
  Object.assign(env, window.__env);
}

function getWeather (latitude, longitude) {
  $.getJSON('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + env.darkSkyAPIKey +
'/' + latitude + ',' + longitude + '?exclude=minutely,hourly,daily,alerts,flags',
  function (response){
    changeTemp(response);
    console.log(response);
  });
}

function getLocation(latitude, longitude) {
  $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key='+env.googleApiKey,
    function (response){
      //do something
      console.log(response);
    });
}


/********Get Data********/
$(document).ready(function() {
//get geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(latitude, longitude);
      //feed into Dark Sky
      getWeather (latitude, longitude);

      //feed into Google Maps API to find city/state
      getLocation(latitude, longitude);
    });
  };
 })



//read Dark Sky 'currently' 'icon'

//toggle between C and F

/********Modify UI********/

//change place name
function changePlaceName(){
  //do stuff
}
//change temperature
function changeTemp(stuff){
  $('#temp').html(stuff.currently.temperature);
}
//toggle between F and C

//change icon
function changeIcon(stuff){
  $('#weather_icon').addClass 
}

//code bits
/*darkSkyData = $.getJSON('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + env.darkSkyAPIKey +
'/' + latitude + ',' + longitude + '?exclude=minutely,hourly,daily,alerts,flags');

geoCodeData = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key='+env.googleApiKey); */
