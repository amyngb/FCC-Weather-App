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
    changeIcon(response);
    console.log(response);
  });
}

function getLocation(latitude, longitude) {
  $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key='+env.googleApiKey,
    function(response) {
      console.log(response);
      setLocation(response);
  });
}



function setLocation(locationData) {
    if (locationData.status == 'OK') {
      var city = '';
      var state = '';
      var addComps = locationData.results[0].address_components;
      for (var i = 0; i < addComps.length; i++) {
        var types = addComps[i].types;
        for (var j = 0; j < types.length; j++) {
          console.log(types[0]);
          if (types[0] == "locality") {
            var city = addComps[i].long_name;
            //break;
          }
          if (types[0] == 'administrative_area_level_1') {
            var state = addComps[i].short_name;
          //  break;
          }
        }
      }
      changePlaceName(city, state);
    }

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
function changePlaceName(city, state){
  $('#locality').html(city + ', ' + state);
}


//change temperature
function changeTemp(stuff){
  $('#temp').html(stuff.currently.temperature);
}
//toggle between F and C

//change icon
function changeIcon(stuff){
  var skycons = new Skycons();
  skycons.add('weather_icon', stuff.currently.icon.toString());
  skycons.play();
}

//code bits
/*darkSkyData = $.getJSON('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + env.darkSkyAPIKey +
'/' + latitude + ',' + longitude + '?exclude=minutely,hourly,daily,alerts,flags');

geoCodeData = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key='+env.googleApiKey); */
