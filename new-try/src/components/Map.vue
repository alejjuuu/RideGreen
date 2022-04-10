<template>
    <div>
        <div stly='display: flex; align-items: center; justify-content: spca-between'>
        <h1>Your coordinates:</h1>
            <p>{{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude</p>
        </div>
        <div>
            <h1>Map coordinates:</h1>
            <p>{{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }} Longitude</p>
        </div>
        <!--
        <GmapMap
        :center="{lat:10,lng:10}">
        <GmapMarker
            v-for="(m, index) in markers"
            :key="index"
            :position="m.position"
            @click="center = m.position"
            /> 
</GmapMap>     -->
        <section>
            <p>Map</p>
            <div id="map" style="width:100%;height:400px;"></div>

        </section>
</div>

</template>
<script>
function myMap() {
var mapProp= {
  center:new google.maps.LatLng(51.508742,-0.120850),
  zoom:5,
};
var map = new google.maps.Map(document.getElementById("map"),mapProp);
}
//coordinates objects line 3-5
//data will be store here 

export default {
    data(){
        return{
            map:null,
            mapCenter:{ lat:0, lng:0 },
            myCoordinates: {
                lat: 0,
                lng: 0,},
            mapCoordinates:{
                lat:0,
                lng:0 },
        };
    },
    /*
    mounted(){
      this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
    },*/
    created(){                   
        // Geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                this.myCoordinates.lat=position.coords.latitude;
                this.myCoordinates.lng=position.coords.longitude;
                //console.log('Position latitude', position.coords.latitude);
                //console.log('Longitude', position.coords.longitude);
            },
            (error) => {
                // console.log('Error', error.message);
                this.login_alert_msg = error.message;
            },
            );
        } else {
            // console.log('Browser does not support geolocation');
        }
    }
};

/*
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
} */
</script>

<style>
  #map {
    height: 100%;
    padding: 10rem;
    background-color: grey;
  }
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>