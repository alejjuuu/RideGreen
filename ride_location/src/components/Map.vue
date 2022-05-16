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
        <br>
      </div>
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
    <section>
      <br>
      <div id="map" style="width:800px;height:800px;" ></div>
      <!--
      <input
      id="pac-input"
      class="controls"
      type="text"
      placeholder="Search Box"/>
      --->
    </section>
    </div>
    <br>
    <div id="wrapper">
      <div id="card"></div>
      <button id="pay">Pay</button>
    </div>
    <br>
    <div id="wrapper">
      <input id="account-holder-name"
      placeholder="Account Holder Name" type="text"/>
      <button id="pay2">Pay ACH</button>
    </div>
    <hr>
    <br>
    <!--- GooglePay--->
    <div id="wrapper">
      <div id="google-pay"></div>
    </div>
    <br>
    <hr>
    <!--- Apple Pay --->
      <div id="apple-pay"></div>
    <br>
    <hr>
    <div id="wrapper">
      <div id="giftcard"></div>
      <button id="pay3">Pay</button>
    </div>
    <hr>
    <!--- Real payment method ---> 
    <form id="payment-form">
      <div id="card-container"></div>
      <button id="card-button" type="button">Pay $1.00</button>
    </form>
    <div id="payment-status-container"></div>
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
  /*
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
*/
</style>


