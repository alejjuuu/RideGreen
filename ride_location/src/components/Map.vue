<template>
  <div id='container'>
    <!---
    <div class="row">
      <div class="col-md-6">
          <h1>Your coordinates:</h1>
          <p>{{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude</p>
      </div>
      <div class="col-md-6">
        <h1>Destination:</h1>
        <p>{{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }} Longitude</p>
      </div>
    </div>
    --->
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
        <br>
      </div>
      <div id="result">
          <ul class="list-group">
              <li id="mile" class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
               ">
                Distance In Mile :
              </li>
              <li id="kilo" class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                ">
                Distance is Kilograms:
              </li>
                <li id="text" class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                ">
                IN TEXT:
              </li>
                <li id="minute" class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                ">
                IN MINUTES:
                </li>
                <li id="from" class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
              ">
                          FROM:
                      </li>
                      <li id="to" class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
              ">
                          TO:
          </li>
        </ul>
      </div>
    <!--
      <div class="col-md-12">
        <form>
          <h3>Add a new marker</h3>
          <label for="lat"></label>
          <input type="text" placeholder="Enter lat">
          <label for="lon"></label>
          <input type="text" placeholder="Enter lng">
        </form>
      </div>--->
    <section>
      <br>
      <div id="map" style="width:800px;height:800px;" ></div>
      <input
      id="pac-input"
      class="controls"
      type="text"
      placeholder="Search Box"
    />
    </section>
    </div>   
  </div> 
</template>

<script src="../../src/map.js"> </script>

<style>
.ui.button,
.dot.circle.icon{
  background-color: rgb(169, 85, 85);
  color: white;
}

  #map {
    height: 100%;
    padding: 10rem;
    background-color: grey;
    align-content: center;
    display: flex;
    justify-content: center;
  }
#pac-input {
  background-color: #fff;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  margin-left: 12px;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 400px;
}

</style>


