/**
* Get Distance between 2 different addresses.
* @param start_address Address as string Ex. "300 N LaSalles St, Chicago, IL"
* @param end_address Address as string Ex. "900 N LaSalles St, Chicago, IL"
* @param return_type Return type as string Ex. "miles" or "kilometers" or "minutes" or "hours"
* @customfunction
*/

function GOOGLEMAPS(start_address,end_address,return_type) {

  // https://www.chicagocomputerclasses.com/
  // Nov 2017
  // improvements needed
  
  var mapObj = Maps.newDirectionFinder();
  mapObj.setOrigin(start_address);
  mapObj.setDestination(end_address);
  var directions = mapObj.getDirections();
  
  var getTheLeg = directions["routes"][0]["legs"][0];
  
  var meters = getTheLeg["distance"]["value"];
  
  switch(return_type){
    case "miles":
      return meters * 0.000621371;
      break;
    case "minutes":
        // get duration in seconds
        var duration = getTheLeg["duration"]["value"];
        //convert to minutes and return
        return duration / 60;
      break;
    case "hours":
        // get duration in seconds
        var duration = getTheLeg["duration"]["value"];
        //convert to hours and return
        return duration / 60 / 60;
      break;      
    case "kilometers":
      return meters / 1000;
      break;
    default:
      return "Error: Wrong Unit Type";
   }
  
}

//other example here 

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Geolocation and Google Maps API</title>
<script src="http://maps.google.com/maps/api/js?sensor=true"></script>
<script>
function writeAddressName(latLng) {
var geocoder = new google.maps.Geocoder();
geocoder.geocode({
"location": latLng
},
function(results, status) {
if (status == google.maps.GeocoderStatus.OK)
document.getElementById("address").innerHTML = results[0].formatted_address;
else
document.getElementById("error").innerHTML += "Unable to retrieve your address" + "<br />";
});
}

function geolocationSuccess(position) {
var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
// Write the formatted address
writeAddressName(userLatLng);

var myOptions = {
zoom : 16,
center : userLatLng,
mapTypeId : google.maps.MapTypeId.ROADMAP
};
// Draw the map
var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
// Place the marker
new google.maps.Marker({
map: mapObject,
position: userLatLng
});
// Draw a circle around the user position to have an idea of the current localization accuracy
var circle = new google.maps.Circle({
center: userLatLng,
radius: position.coords.accuracy,
map: mapObject,
fillColor: '#0000FF',
fillOpacity: 0.5,
strokeColor: '#0000FF',
strokeOpacity: 1.0
});
mapObject.fitBounds(circle.getBounds());
}

function geolocationError(positionError) {
document.getElementById("error").innerHTML += "Error: " + positionError.message + "<br />";
}

function geolocateUser() {
// If the browser supports the Geolocation API
if (navigator.geolocation)
{
var positionOptions = {
enableHighAccuracy: true,
timeout: 10 * 1000 // 10 seconds
};
navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
}
else
document.getElementById("error").innerHTML += "Your browser doesn't support the Geolocation API";
}

window.onload = geolocateUser;
</script>
<style type="text/css">
#map {
width: 500px;
height: 500px;
}
</style>
</head>
<body>
<h1>Basic example</h1>
<div id="map"></div>
<p><b>Address</b>: <span id="address"></span></p>
<p id="error"></p>
</body>
</html>