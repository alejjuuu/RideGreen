//google maps
function initMap(latitude, longitude) {
    // The location of Uluru
    let center = { lat: latitude, lng: longitude };
    //The map, centered at Uluru
    let map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 15,
    })
}
    //marker 
function marker(){
const marker = new google.maps.Marker({
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