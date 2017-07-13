var latitude;
var longitude;
var temp;
var state;
var city;
var weather;


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

/********Get Data********/
$(document).ready(function() {
//get geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(latitude, longitude);
      //feed into Dark Sky
      $.getJSON('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + env.darkSkyAPIKey + '/' + latitude + ',' + longitude + '?exclude=minutely,hourly,daily,alerts,flags',
        function darkSky(result){
          var jsonStringDark = JSON.stringify(result);
          jsonStringDark = JSON.parse(jsonStringDark);
          console.log(jsonStringDark);
        });
    //feed into Google Maps API to find city/state
      $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key='+env.googleApiKey,
        function geoCode(result){
          var jsonStringGeocode = JSON.stringify(result);
          //jsonStringGeocode = JSON.parse(jsonStringGeocode);
          console.log(jsonStringGeocode);
        });
      });
 }

 //read Dark Sky 'currently' 'icon'





});



//read Dark Sky 'currently' 'icon'

//toggle between C and F

/********Modify UI********/

//change place name

//change temperature

//toggle between F and C

//change icon
