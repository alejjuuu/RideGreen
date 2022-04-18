//npm install --save axios
//import axios from "axios";
//import { response } from "express";
var axios = require('axios');
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


//main google maps API
function initMap(latitude, longitude) {
    // The location of Uluru
    let center = { lat: latitude, lng: longitude };
    //The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 15,
    });
    new google.maps.Marker({
    position: center,
    map,
  });
}




//function to integate more markers on the map 
function marker(){
    marker = new google.maps.Marker({
    position: center,
    map: map,
    })
}
function showUserLocationOnTheMap(latitude,longitude){
//creation of the map objects
let map = new google.maps.Map(document.getElementById("map"), {
zoom: 15,
center: new google.maps.LatLng(latitude,longitude),
mapTypeId: google.maps.mapTypeId.ROADMAP 
    })
    
}


export default {
    data(){
        return{
            address:"",
            error:"",
            //mapCenter:{ lat:0, lng:0 },
            myCoordinates: {
                lat: 0,
                lng: 0,},
            mapCoordinates:{
                lat:0,
                lng:0 },
        };
    },
    created(){                   
        // Geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                this.myCoordinates.lat=position.coords.latitude;
                this.myCoordinates.lng=position.coords.longitude;
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                initMap(lat,lng);
            });
            (error) => {
                // console.log('Error', error.message);
                this.login_alert_msg = error.message;
            }
        } else {
            // console.log('Browser does not support geolocation');
        }}}
    
/*

function 

getAddressFrom(lat,long){
    axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlong=")
    + lat 
    + ","
    +long
    +"AIzaSyCSLoEe5amg_DqF7t-XQnFVtSrUFtksZS0")
    .then(respose=>{
        if(response.data.error_message){

        }else{
            console.log(response.data.results[0].formatted_address);
        }
    })
    .catch(error=>{
        console.log(error.message);
    })
}
map = new google.maps.Map(document.getElementById('map'), {
center: { lat: position.coords.latitude, lng: -74.7520844 },
zoom: 8
});
/*
var googleMaps = new google.maps.Map(document.getElementById('map'), {
center: { lat: position.coords.latitude, lng: -74.7520844 },
zoom: 8
});

showUserLocationOnTheMap(latitude,longitude){
//creation of the map objects
    let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(latitude,longitude),
    mapTypeId: google.maps.mapTypeId.ROADMAP 
    });
    }
}


    mounted(){
      this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
    },
        
function myMap() {
var mapProp= {
  center:new google.maps.LatLng(51.508742,-0.120850),
  zoom:5,
};
var map = new google.maps.Map(document.getElementById("map"),mapProp);
}

        <GmapMap
         :center="{lat:10,lng:10}">
        <GmapMarker
            v-for="(m, index) in markers"
            :key="index"
            :position="m.position"
            @click="center = m.position"
            /> 
</GmapMap>     
*/