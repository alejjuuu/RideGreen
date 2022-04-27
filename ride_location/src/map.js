function getLocation(){
    var returnObject = {};
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(
        (position) => {
        returnObject["lat"] = position.coords.latitude;
        returnObject["lng"] = position.coords.longitude;
        initMap(returnObject.lat,returnObject.lng);
        });
        if(typeof lat ==='undefined' && typeof lng==='undefined'){
            return returnObject['lat'], returnObject['lng']
        }
    }
}

getLocation();

//Labels for the markers by clicking on the screen
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex =0;
let destination=(0,0);
let markers = [];
let userDestination ={};

//random lat and lng 
var njit = (40.742491, -74.178078);
var random2 = {lat:37.186894,lng:-101.252379};

//main google maps API
function initMap(latitude, longitude) {
    // The user location 
    const userLocation = { lat: latitude, lng: longitude };
    //The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
    center: userLocation,
    zoom: 15,
    //mapTypeId: google.maps.mapTypeId.ROADMAP Not needed for now
    });
    // user marker
    var mk1 = new google.maps.Marker({position: userLocation,
    map,
    });
    
    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng, map);
    });

    google.maps.event.addListener( markers, 'click', function ( event ) {
    var latitude = document.getElementById( "maps_latitude" ).value = event.latLng.lat();
    var longitude = document.getElementById( "maps_longitude" ).value = event.latLng.lng();
    userDestination = { lat: latitude, lng: longitude };
    });
    //userDestination = { lat: lat, lng: lng };

    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    //position in the map 
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
    
    });
    //array for markers 
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }
    const icon = {
        url: place.icon,
        size: new google.maps.Size(81, 81),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      destination = markers[0].position;
      //console.log(destination);
      //var location = google.maps.Marker({position:place.geometry.location});
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  //console.log(markers[0].position);

 //--------------------------//directions route here!-------------------------

  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map); // Existing map object displays directions
  // Create route from existing points used for markers
  const route = {
      origin: userLocation,
      destination: random2,
      travelMode: google.maps.TravelMode.DRIVING,
  }

  directionsService.route(route,
    function(response, status) { // anonymous function to capture directions
      if (status !== 'OK') {
        window.alert('Directions request failed due to ' + status);
        return;
      } else {
        directionsRenderer.setDirections(response); // Add route to the map
        var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
        if (!directionsData) {
          window.alert('Directions request failed');
          return;
        }
        else {
          document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
        }
      }
    });
}

//--------------------------//directions route here!-------------------------


function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService
    .route({
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

//function to integate more markers on the map where location is the center lat lng
function addMarker(location, map){
    new google.maps.Marker({
        position:location,//{ lat:latitude, lng:longitude},
        label: labels[labelIndex++ % labels.length],
        map:map,
        draggable:true
    });
}


//From here and below are function that are not used for now

let autocomplete;
function initAutocomplete(){
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types:['establishment'],
            componentRestrictions:{'country':['us']},
            fiels:['place_id','geometry', 'name']
        });
        autocomplete.addListener('place_changed',onPlaceChanged);
}


//distance(njit,stevens);
//First try to get the distance between two points
//var axios = require('axios'); does not work the above it's missing the map object reference
function distance(origin, destination){
    var mapObj = Maps.newDirectionFinder();
    mapObj.setOrigin(origin);
    mapObj.setDestination(destination);
    var directions = mapObj.getDirections();

    //pick the first and shorter routes
    var meters = directions["routes"][0]["legs"][0]["distance"]["value"];
    var distance = meters * 0.000621371;// converting meters to miles 
    Logger.log(distance);
    var duration = directions["routes"][0]["legs"][0]["duration"]["value"];
    var minutes = duration /60; // takes the number of seconds it takes to get to the destination
    Logger.log(minutes);
};



function onPlaceChanged(){
    var place = autocomplete.getPlace();
    if(!place.geometry){
        //user did not select a prediction; reset the input field
        document.getElementById('autocomplete').innerHTML = place.name;
    }else {
        //display details about the valid place
        document.getElementById('details').innerHTML=place.name;
    }
}


function initialize() {
    var address = (document.getElementById('pac-input'));
    var autocomplete = new google.maps.places.Autocomplete(address);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

    var address = '';
    if (place.address_components) {
        address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
    }
    /*********************************************************************/
    /* var address contain your autocomplete address *********************/
    /* place.geometry.location.lat() && place.geometry.location.lat() ****/
    /* will be used for current address latitude and longitude************/
    /*********************************************************************/
    document.getElementById('lat').innerHTML = place.geometry.location.lat();
    document.getElementById('long').innerHTML = place.geometry.location.lng();
    });
}


