<template>
            <div>
                <h1>My coordinates:</h1>
                <p>{{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude</p>
            </div>
</template>

<script>
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
        //get user's coordinates from browser request
        this.$getLocation({})
        .then(coordinates =>{
             this.coordinates = coordinates;
    });
    }

}
</script>

<style>

</style>>