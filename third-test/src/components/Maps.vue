<template>
    <div>
        <h1>Your coordinates:</h1>
        <p>{{ coordinates.lat }} Latitude, {{ coordinates.lng }} Longitude</p>
    </div>

</template>

<script>
//coordinates objects line 3-5
/*        <GmapMap
            :center="{lat:10,lng:10}"
            :zoom="7"
            style="width:640px; height:360px"
        ></GmapMap>*/
//data will be store here 
    export default {
        data(){
            return{
                coordinates: {
                        lat: 0,
                        lng: 0
                }
            }
        },
    created(){
        //get user's coordinates from browser request when the component loads up
        this.$getLocation({})
            .then(coordinates => {
                console.log(coordinates)
                this.coordinates = coordinates;
            })
            .catch(error=> alert(error));
    }

}
</script>

<style>

</style>>