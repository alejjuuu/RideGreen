
import axios from 'axios'

//coordinates objects line 3-5
//data will be store here 

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
                //console.log('Position latitude', position.coords.latitude);
                //console.log('Longitude', position.coords.longitude);
            });
            /*this.showUserLocationOnTheMap(
              position.coords.latitude,
              position.coords.longitude
            );*/
            (error) => {
                // console.log('Error', error.message);
                this.login_alert_msg = error.message;
            }
        } else {
            // console.log('Browser does not support geolocation');
        }},

    methods:{
      locatorButtonPressed(){
        if(navigator.geolocation){

        }else{
          console.log("Browser not supported")
        }
      },
      getAddressFrom(lat,long){
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="
        + lat+
        ","+
        long+
        "&key=AIzaSyCSLoEe5amg_DqF7t-XQnFVtSrUFtksZS0")
        .then(response => {
          if(response.data.error_message){
            this.error=response.data.error_message;
            console.log(response.data.error_message);
          }else{
            this.address= response.data.results[0].formatted_address
            //console.log(response.data.results[0].formatted_address);
          }
        })
        .catch(error => {
          this.error=error_message;
          console.log(error.message);
        });
      },
      showUserLocationOnTheMap(latitude,longitude){
        //creation of the map objects
        let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(latitude,longitude),
        mapTypeId: google.maps.mapTypeId.ROADMAP 
      });

      //google marker
      new google.maps.Marker({
        position: new google.maps.LatLng(latitude,longitude),
        map: map
      });
    }
  }
};
