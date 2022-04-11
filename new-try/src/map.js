
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
    }
};


let map;

function initMap() {
map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7424037, lng: -74.1770556 },
    zoom: 15,
});
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
*/

function showUserLocationOnTheMap(latitude,longitude){
    //creation of the map objects
    let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(latitude,longitude),
    mapTypeId: google.maps.mapTypeId.ROADMAP 
    })
};

