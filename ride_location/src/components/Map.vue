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
        <form>
          <h3>Change address map coordinates</h3>
          <label for="lat"></label>
          <input type="text">
          <label for="lon"></label>
          <input type="text">
        </form>

    <br>
    <section class="ui two column centered grid">
      <div class="column">
        <form clas="ui segment large form">
          <div class="ui message red"></div>
          <div class="ui segment">
            <div class="field">
              <div class="ui right icon input large">
                <h3>Street name</h3>
                <input type="text" placeholder="Your current address" v-model="address"/>
                <i class="dot circle link icon" @click="locatorButtonPress"></i>
              </div>
            </div>
            <button class="ui button">GO</button>
          </div>
        </form>
      </div>
    </section>

    <section>
      <p>Map Below</p>
      <div id="map" style="width:50%;height:400px; justify-content: center" ></div>
    </section>   
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
  }

</style>


