
const payments = Square.payments(appId, locationId);

const card = await payments.card({

  "postalCode" : "12345",

  "style": {

    "input": {

      "color": "red",

    }

    "@media screen and (max-width: 600px)": {

        "input": {

          "fontSize": "12px",

       }

     }

  }

});

await card.attach('#card');

const form = document.querySelector('#card-payment');

form.addEventListener('submit', async (event) => {

   event.preventDefault();

   const result = await card.tokenize(); // the card nonce

});