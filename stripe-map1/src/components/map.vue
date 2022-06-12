<template>
  <div class="container p-5 my-5 border">
    <div class="row">
      <div class="col-md-12">
        <form id="distance_form">
          <div class="form-group">
            <label>Origin: </label>
            <input class="form-control" id="from_places" placeholder="Enter a location" />
            <input id="origin" name="origin" required="" type="hidden" />
          </div>
          <div class="form-group">
            <label>Destination: </label>
            <input class="form-control" id="to_places" placeholder="Enter a location" />
            <input id="destination" name="destination" required="" type="hidden" />
          </div>
          <br>
          <input class="btn btn-primary" type="submit" value="Calculate" />
        </form>
      </div>
      <br>
      <div id="result">
        <ul class="list-group">
          <li id="mile" class="list-group-item d-flex justify-content-between align-items-center">
            Distance in Miles:
          </li>
          <li id="kilo" class="list-group-item d-flex justify-content-between align-items-center">
            Distance in Kilometers:
          </li>
          <li id="text" class="list-group-item d-flex justify-content-between align-items-center">
            Total minutes:
          </li>
          <li id="minute" class="list-group-item d-flex justify-content-between align-items-center">
            Total seconds:
          </li>
          <li id="from" class="list-group-item d-flex justify-content-between align-items-center">
            FROM:
          </li>
          <li id="to" class="list-group-item d-flex justify-content-between align-items-center">
            TO:
          </li>
        </ul>
      </div>
      <br>
      <div class="map" id="map"></div>
      <br>
    </div>
  </div>
</template>

<style>

 #map {
   width: 100%;
   height: 400px;
   background-color: grey;
 }
 
</style>

<script src="../components/map.js">

// @ is an alias to /src
import map from '@/components/map.vue'

export default {
  name: 'ridemap',
  components: {
    map
  }
}
</script>