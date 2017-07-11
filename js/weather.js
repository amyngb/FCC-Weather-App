/********Modify Data********/
var latitude;
var longitude;
var temp;
var state;
var city;
var weather;
var apiKey = '2280c837c13b677ee9b01f581b131cce';

//get geolocation
$(document).ready(function() {

  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(longitude);
    //feed into Dark Sky
    $.getJSON('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude + '?exclude=minutely,hourly,daily,alerts,flags',
    function darkSky(result){
      var jsonString = JSON.stringify(result)
      console.log(jsonString);
    });
   });
  }
});


//

//feed into Google Maps API to find city/state

//read Dark Sky 'currently' 'icon'

//toggle between C and F

/********Modify UI********/

//change place name

//change temperature

//toggle between F and C

//change icon
