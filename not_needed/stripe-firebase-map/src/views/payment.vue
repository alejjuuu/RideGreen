<template>
    <section class="row payment-form">
        <h5 class="#e0e0e0 grey lighten-4">
            Payment Method
            <span class="right">${{amount}}</span>
        </h5>

        <div class="error red center-align white-text">
            {{stripeValidationError}}</div>

        <div class="col s12 card-element">
            <label>Card Number</label>
            <div id="card-number-element" class="input-value"></div>
        </div>

        <div class="col s6 card-element">
            <label>Expiry Date</label>
            <div id="card-expiry-element"></div>
        </div>

        <div class="col s6 card-element">
            <label>CVC</label>
            <div id="card-cvc-element"></div>
        </div>

        <div class="col s12 place-order-button-block">
            <button class="btn col s12 " @click="placeOrderButtonPressed">Place Order</button>
        </div>
        <br>
        <form>
        <div>
            <label>Name</label>
            <input class="my-input">
        </div>
        <div>
            <label>Card</label>
            <!-- Using the same "my-input" class on the -->
            <!-- regular input above and on this container. -->
            <div class="my-input" id="card-element"></div>
        </div>
        </form>
        <br>
    </section>
</template>

<script>
//src='../components/payment.js'
//import firebase from 'firebase'
export default {
    data() {
        return {
            stripe: null,
            cardNumberElement: null,
            cardExpiryElement: null,
            cardCVCElement: null,
            stripeValidationError: "",
            amount:25
        };
    },
    mounted() {
  this.stripe = Stripe("pk_test_51L0vEzDjx4QOpJ22C9T8lcYNss9g6viO1382VSv096t4MiZ7Y4CO5GguDHZf9LP0Hxm3VC92DHLNHX4WBX7BBEpt003irItIuf");
        this.createAndMountFormElements();
    },
    methods: {
        createAndMountFormElements() {
            var elements = this.stripe.elements();
            this.cardNumberElement = elements.create("cardNumber");
            this.cardNumberElement.mount("#card-number-element");

            this.cardExpiryElement = elements.create("cardExpiry");
            this.cardExpiryElement.mount("#card-expiry-element");
            
            this.cardCvcElement = elements.create("cardCvc");
            this.cardCvcElement.mount("#card-cvc-element");
            
            this.cardNumberElement.on("change", this.setValidationError);
            this.cardExpiryElement.on("change", this.setValidationError);
            this.cardCvcElement.on("change", this.setValidationError);
        },
        setValidationError(event) {
            this.stripeValidationError = event.error ? event.error.message : "";
        },
        placeOrderButtonPressed() {
            this.stripe.createToken(this.cardNumberElement).then(result => {
                if (result.error) {
                    this.stripeValidationError = result.error.message;
                } else {
                    var stripeObject = {
                        amount: this.amount,
                        source: result.token
                    };
                    this.saveDataToFireStore(stripeObject);
                }
            });
        },
        saveDataToFireStore(stripeObject) {

            const db = firebase.firestore()
            const chargesRef = db.collection("charges")
            const pushId = chargesRef.doc().id
            
            db.collection("charges").doc(pushId).set(stripeObject)
            chargesRef.doc(pushId).onSnapshot(snapShot => {
                const charge = snapShot.data();
                if (charge.error) {
                    alert(charge.error);
                    chargesRef
                    .doc(pushId)
                    .delete();
                    return;
                }
                if (charge.status && charge.status == "succeeded") {
                    alert(charge.status);
                }
            })
        }
    }
};
</script>

<style>
.payment-form {
    max-width: 400px;
    margin: 20px auto;
    border: 1px solid #000000;
}
.payment-form h5 {
    margin: 0;
    padding: 10px;
    font-size: 1.2rem;
}
.card-element {
    margin-top: 5px;
}
#card-number-element,
#card-expiry-element,
#card-cvc-element {
    background: white;
    padding: 5px;
    border: 1px solid #050505;
    height: 30px;
}
.place-order-button-block {
    margin: 10px 0;
}
.my-input {
    padding: 10px;
    border: 1px solid #ccc;
}

/*
.my-input {
padding: 10px;
border: 1px solid #ccc;
}
*/
</style>




