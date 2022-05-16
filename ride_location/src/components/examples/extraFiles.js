
//From here and below are functions that are not used for now

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

