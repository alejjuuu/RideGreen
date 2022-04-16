<template>
  <div id='container'>
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
      <br>
    <div class="row">
    <div class="col-md-6">
        <div class="column">
          <form clas="ui segment large form">
            <div class="ui message red"></div>
            <div class="ui segment">
              <div class="field">
                <div class="ui right icon input large">
                  <h3>Street name</h3>
                  <input id="autocomplete" placeholder="autofilled on" type="text"/>
                </div>
              </div>
              <button class="ui button">GO</button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6">
        <form>
          <h3>Add a new marker</h3>
          <label for="lat"></label>
          <input type="text" placeholder="Enter lat">
          <label for="lon"></label>
          <input type="text" placeholder="Enter lng">
        </form>
      </div>
    <section>
      <br>
      <div id="map" style="width:400px;height:400px;" ></div>
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


</style>


