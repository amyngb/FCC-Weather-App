var latitude;
var longitude;
var temp;
var state;
var city;
var weather;
var darkSkyData;
var geoCodeData;
var degreesF;
var degreesC;
var htmlMeasure;






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


//Access DarkSky and Google Geocode APIs
function getWeather (latitude, longitude) {
  $.getJSON('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + env.darkSkyAPIKey +
'/' + latitude + ',' + longitude + '?exclude=minutely,hourly,daily,alerts,flags',
  function (response){
    //call functions to update UI
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


//Find Location data in Google Geocode API
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
      //call function to update UI
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

      //feed into Dark Sky to find local weather
      getWeather (latitude, longitude);

      //feed into Google Maps API to find city/state
      getLocation(latitude, longitude);
    });
  };
 })


function toggleTemp() {
  console.log(degreesC);

    if (htmlMeasure == '&#8457') {
      htmlMeasure = '&#8451';
      $('#temp').html(degreesC + ' ' + htmlMeasure);
    }
    else if (htmlMeasure == '&#8451') {
      htmlMeasure = '&#8457';
      $('#temp').html(degreesF + ' ' + htmlMeasure);
    }

  }




/********Modify UI********/

//change place name
function changePlaceName(city, state){
  $('#locality').html(city + ', ' + state);
}


//change temperature
function changeTemp(stuff){
  degreesF = parseInt(stuff.currently.temperature.toFixed(0));
  htmlMeasure = '&#8457';
  degreesC = Math.round(degreesF * (5/9) - 32);
  $('#temp').html(degreesF + ' ' + htmlMeasure);

}

//click between F and C
  $('#temp').on('click', function() {
    toggleTemp();
  });

//change weather icon
function changeIcon(stuff){
  var skycons = new Skycons();
  skycons.add('weather_icon', stuff.currently.icon.toString());
  skycons.play();
}
