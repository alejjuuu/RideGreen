// Varibles
//Labels for the markers by clicking on the screen
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex =0;
let markers = [];
let userDestination ={};

var origin="";
var destination ="";

$(function () {
    // add input listeners
    google.maps.event.addDomListener(window, "load", function () {
        var from_places = new google.maps.places.Autocomplete(
            document.getElementById("from_places")
        );
        var to_places = new google.maps.places.Autocomplete(
            document.getElementById("to_places")
        );

        google.maps.event.addListener(
            from_places,
            "place_changed",
            function () {
                var from_place = from_places.getPlace();
                var from_address = from_place.formatted_address;
                $("#origin").val(from_address);
            }
        );

        google.maps.event.addListener(
            to_places,
            "place_changed",
            function () {
                var to_place = to_places.getPlace();
                var to_address = to_place.formatted_address;
                $("#destination").val(to_address);
            }
        );
    });
    // calculate distance
    function calculateDistance() {
        origin = $("#origin").val();
        destination = $("#destination").val();
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
                // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
                avoidHighways: false,
                avoidTolls: false,
            },
            callback
        );
    }
    // get distance results
    function callback(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            $("#result").html(err);
        } else {
            var origin = response.originAddresses[0];
            console.log(origin);
            var destination = response.destinationAddresses[0];
            console.log(destination);
            if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                $("#result").html("Better get on a plane. There are no roads between " +
                    origin +
                    " and " +
                    destination
                );
            } else {
                var distance = response.rows[0].elements[0].distance;
                //console.log(distance);
                var duration = response.rows[0].elements[0].duration;
                //console.log(duration);
                //console.log(response.rows[0].elements[0].distance);
                var distance_in_kilo = distance.value / 1000; // the kilom
                var distance_in_mile = distance.value / 1609.34; // the mile
                //console.log(distance_in_kilo);
                //console.log(distance_in_mile);
                var duration_text = duration.text;
                var duration_value = duration.value;
                $("#mile").html(`Distance in Miles: ${distance_in_mile.toFixed(2)}`);
                $("#kilo").html(`Distance in Kilometers: ${distance_in_kilo.toFixed(2)}`);
                $("#text").html(`Distance in Minutes: ${duration_text}`); 
                $("#minute").html(`Distance in Seconds: ${duration_value}`);
                $("#from").html(`Distance From: ${origin}`);
                $("#to").text(`Distance to: ${destination}`);
            }
        }
    }
    // print results on submit the form initialize a new map search 
    $("#distance_form").submit(function (e) {
        e.preventDefault();
        calculateDistance();
        getLocation();
    });
});

//gets current location 
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

//main google maps API
function initMap(latitude, longitude) {
    const userLocation = { lat: latitude, lng: longitude };
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

 //--------------------------//directions route here!-------------------------
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map); // Existing map object displays directions
  // Create route from existing points used for markers
  const route = {
      origin: origin,
      destination: destination,
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

//function to integate more markers on the map where location is the center lat lng
function addMarker(location, map){
    new google.maps.Marker({
        position:location,//{ lat:latitude, lng:longitude},
        label: labels[labelIndex++ % labels.length],
        map:map,
        draggable:true
    });
}


//---------------------------------------
//--------------Payment-------------

const appId = 'sandbox-sq0idb-ffK_7oxLQqcm-0-qJc77MQ';
const locationId = 'L6DHB8FP2F7KD'; 
/*
async function main() {

    const payments = Square.payments(appId, locationId);
    const card = await payments.card();
    await card.attach('#card-container');
    async function eventHandler(event) {
      event.preventDefault();
      try {
        const result = await card.tokenize();
        if (result.status === 'OK') {
          console.log(`Payment token is ${result.token}`);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const cardButton = document.getElementById('card-button');
    cardButton.addEventListener('click', eventHandler);
  }
  main();
  */


  /*
  try {
  const response = await client.paymentsApi.createPayment({
    sourceId: 'cnon:card-nonce-ok',
    idempotencyKey: '205351ed-b34c-445c-9c64-3c417082cc1e',
    amountMoney: {
      amount: 2000,
      currency: 'USD'
    },
    delayDuration: 'PT36H',
    autocomplete: true,
    orderId: '1',
    customerId: '1',
    locationId: 'LX3XK8AVD4EWT',
    referenceId: '1'
  });

  console.log(response.result);
} catch(error) {
  console.log(error);
}
*/