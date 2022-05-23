// STRIPE payment
// Including Stripe.js
<script src="https://js.stripe.com/v3/"></script>

//initilize stripe
var stripe = Stripe('pk_test_51L0vEzDjx4QOpJ22C9T8lcYNss9g6viO1382VSv096t4MiZ7Y4CO5GguDHZf9LP0Hxm3VC92DHLNHX4WBX7BBEpt003irItIuf');

//create an elements instance
var elements = stripe.elements({
  clientSecret: 'CLIENT_SECRET',
});

//update elements
elements.update({locale: 'fr'});

//fetch server updates
elements.fetchUpdates()
  .then(function(result) {
    // Handle result.error
  });

//create a payment element
  var paymentElement = elements.create('payment');



  //create a payment with customized fields
  // Customize which fields are collected by the Payment Element
var paymentElement = elements.create('payment', {
  fields: {
    billingDetails: {
      name: 'never',
      email: 'never',
    }
  }
});

// If you disable collecting fields in the Payment Element, you
// must pass equivalent data when calling `stripe.confirmPayment`.
form.addEventListener('submit', async (event) => {
  stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: 'https://example.com', //website where the user is sent to 
      payment_method_data: {
        billing_details: {
          name: 'Jenny Rosen', // fill out the information with the customer data 
          email: 'jenny.rosen@example.com',
        }
      },
    },
  })
  .then(function(result) {
    if (result.error) {
      // Inform the customer that there was an error.
    }
  });
});



//get a payment element
var paymentElement = elements.getElement('payment');


// Update a Payment Element after creation
var paymentElement = elements.getElement('payment');
paymentElement.update({business: {name: 'Stripe Shop'}});



// get a payment element
// Collapse a Payment Elememt
var paymentElement = elements.getElement('payment');
paymentElement.collapse();


//create a card element
var cardElement = elements.create('card');

//get an element
var cardElement = elements.getElement('card');


// Update an element with details collected elsewhere on your page
var myPostalCodeField = document.querySelector('input[name="my-postal-code"]');
myPostalCodeField.addEventListener('change', function(event) {
  cardElement.update({value: {postalCode: event.target.value}});
});

// Dynamically change the styles of an element
window.addEventListener('resize', function(event) {
  if (window.innerWidth <= 320) {
    cardElement.update({style: {base: {fontSize: '13px'}}});
  } else {
    cardElement.update({style: {base: {fontSize: '16px'}}});
  }
});

