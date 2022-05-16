// Varibles
//Labels for the markers by clicking on the screen
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex =0;
let markers = [];
let userDestination ={};

var origin="";
var destination ="";
//random lat and lng 
//var njit = (40.742491, -74.178078);
//var random2 = {lat:37.186894,lng:-101.252379};

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
/*
const appId = '{sandbox-sq0idb-ffK_7oxLQqcm-0-qJc77MQ}';
const locationId = '{L6DHB8FP2F7KD}'; 

//payment with card
(async()=>{
  const payments = Square.payments(
    'sandbox-sq0idb-ffK_7oxLQqcm-0-qJc77MQ',
    'L6DHB8FP2F7KD'
  );
  const cardOptions ={
    style: {
      input: {
        backgroundColor: 'white'
      },
  }
};
try {
  const card = await payments.card(cardOptions);
  await card.attach('#card')
  const payButton = document.getElementById('pay');
  payButton.addEventListener('click', async()=>{
    const result = await card.tokenize();
    alert(JSON.stringify(result, null, 2));
  })
}catch(e){
  console.error(e)
  }
})()
*/


/*
//login to different bank accounts 
(async()=>{
  const payments = Square.payments(
    'sandbox-sq0idb-ffK_7oxLQqcm-0-qJc77MQ',
    'L6DHB8FP2F7KD'
  );
try {
  const ach = await payments.ach();
  const payButton = document.getElementById
  ('pay2');
  payButton.addEventListener('click', async ()=>{
    const accountHolderName = document.
    getElementById('account-holder-name');
    const result = await ach.tokenize({
      accountHolderName: accountHolderName.value
  });
    alert(JSON.stringify(result, null, 2));
  })
} catch(e){
  console.error(e)
  }
})()

 async function initializeCard(payments) {
   const card = await payments.card();
   await card.attach('#card-container'); 
   return card; 
 }

document.addEventListener('DOMContentLoaded', async function () {
  if (!window.Square) {
    throw new Error('Square.js failed to load properly');
  }
  const payments = window.Square.payments(appId, locationId);
  let card;
  try {
    card = await initializeCard(payments);
  } catch (e) {
    console.error('Initializing Card failed', e);
    return;
  }

  // Step 5.2: create card payment
});
*/

/*
//Google payment
(async()=>{
  const payments = Square.payments(
    'sandbox-sq0idb-ffK_7oxLQqcm-0-qJc77MQ',
    'L6DHB8FP2F7KD'
  );
  const paymentRequest = payments.paymentRequest({
    total:{
      amount:"1.00",
      label:"Total"
    },
    countryCode:"US",
    currencyCode:"USD"
  });
  try{
    const googlePay = await payments.googlePay
    (paymentRequest);
    await googlePay.attach('#google-pay');
    
    const googlePayButton = document.getElementById
    ('google-pay');
    googlePayButton.addEventListener('click', 
    async () => {
      const result = await googlePay.tokenize();
      alert(JSON.stringify(result, null, 2));
    })
  }catch (e){
    console.error(e)
  }
  })()
*/

/*
//apple pay currently not working 
 (async()=>{
  const payments = Square.payments(
    'sandbox-sq0idb-ffK_7oxLQqcm-0-qJc77MQ',
    'L6DHB8FP2F7KD'
  );
  const paymentRequest = ({
    total: {
      amount:"1.00",
      label:"Total"
    },
    countryCode:"US",
    currencyCode:"USD"
  });
  try{
    const applePay = await payments.applePay
    (paymentRequest);
    const applePayButton = document.getElementById
    ('apple-pay');
    applePayButton.style.display ='inherit';
    applePayButton.addEventListener('click', 
    async () => {
      const result = await applePay.tokenize();
      alert(JSON.stringify(result, null, 2));
    })
  }catch (e){
    console.error(e)
  }
  })()
*/

/*
//giftcard
 (async()=>{
  const payments = Square.payments(
    'sandbox-sq0idb-ffK_7oxLQqcm-0-qJc77MQ',
    'L6DHB8FP2F7KD'
  );
  const giftCardOptions = {
    style: {
      input:{
      backgroundColor: "white"
    },
  }
};
  try{
    const giftCard = await payments.giftCard
    (giftCardOptions);
    await giftCard.attach('#giftcard')
    const payButton = document.getElementById
    ('pay3');
    PayButton.addEventListener('click', 
    async () => {
      const result = await giftCard.tokenize();
      alert(JSON.stringify(result, null, 2));
    })
  }catch (e){
    console.error(e)
  }
})()
*/



//--------------------------------------------------------

/*
//payment with card
(async()=>{
  const payments = Square.payments(
    'sandbox-sq0idb-ffK_7oxLQqcm-0-qJc77MQ',
    'L6DHB8FP2F7KD'
  );
  const cardOptions ={
    style: {
      input: {
        backgroundColor: 'white'
      },
  }
};
try {
  const card = await payments.card(cardOptions);
  await card.attach('#card')
  const payButton = document.getElementById('pay');
  payButton.addEventListener('click', async()=>{
    const result = await card.tokenize();
    alert(JSON.stringify(result, null, 2));
  })
}catch(e){
  console.error(e)
  }
})()
*/

/*
 async function initializeCard(payments) {
   const card = await payments.card();
   await card.attach('#card-container'); 
   return card; 
 }

document.addEventListener('DOMContentLoaded', async function () {
  if (!window.Square) {
    throw new Error('Square.js failed to load properly');
  }
  const payments = window.Square.payments(appId, locationId);
  let card;
  try {
    card = await initializeCard(payments);
  } catch (e) {
    console.error('Initializing Card failed', e);
    return;
  }

  // Step 5.2: create card payment
});

 // Call this function to send a payment token, buyer name, and other details
 // to the project server code so that a payment can be created with 
 // Payments API
 async function createPayment(token) {
   const body = JSON.stringify({
     locationId,
     sourceId: token,
   });
   const paymentResponse = await fetch('/payment', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body,
   });
   if (paymentResponse.ok) {
     return paymentResponse.json();
   }
   const errorBody = await paymentResponse.text();
   throw new Error(errorBody);
 }

 // This function tokenizes a payment method. 
 // The ‘error’ thrown from this async function denotes a failed tokenization,
 // which is due to buyer error (such as an expired card). It is up to the
 // developer to handle the error and provide the buyer the chance to fix
 // their mistakes.
 async function tokenize(paymentMethod) {
   const tokenResult = await paymentMethod.tokenize();
   if (tokenResult.status === 'OK') {
     return tokenResult.token;
   } else {
     let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
     if (tokenResult.errors) {
       errorMessage += ` and errors: ${JSON.stringify(
         tokenResult.errors
       )}`;
     }
     throw new Error(errorMessage);
   }
 }

 // Helper method for displaying the Payment Status on the screen.
 // status is either SUCCESS or FAILURE;
 function displayPaymentResults(status) {
   const statusContainer = document.getElementById(
     'payment-status-container'
   );
   if (status === 'SUCCESS') {
     statusContainer.classList.remove('is-failure');
     statusContainer.classList.add('is-success');
   } else {
     statusContainer.classList.remove('is-success');
     statusContainer.classList.add('is-failure');
   }

   statusContainer.style.visibility = 'visible';
 }    
 /*
 async function handlePaymentMethodSubmission(event, paymentMethod) {
   event.preventDefault();

   try {
     // disable the submit button as we await tokenization and make a
     // payment request.
     cardButton.disabled = true;
     const token = await tokenize(paymentMethod);
     const paymentResults = await createPayment(token);
     displayPaymentResults('SUCCESS');

     console.debug('Payment Success', paymentResults);
   } catch (e) {
     cardButton.disabled = false;
     displayPaymentResults('FAILURE');
     console.error(e.message);
   }
 }

 const cardButton = document.getElementById(
   'card-button'
 );
 cardButton.addEventListener('click', async function (event) {
   await handlePaymentMethodSubmission(event, card);
 });
 */
