const functions = require("firebase-functions");


const stripe = require('stripe')('sk_test_51L0vEzDjx4QOpJ22GiTDEFCAAgns0zG08m1IbiuI4kqIJuhuO88eYiBYky38pOrTq0DvQuUQ12HfDZSL3SHzBTdc00ma5Ix57z')


exports.createStripeCharge = functions.firestore
.document('charges/{pushId}')
.onCreate(async (snap, context) => {
try {
    const charge = {
        amount : snap.data().amount * 100,
        source: snap.data().source.id,
        currency: 'cad'
    }
    const idempotencyKey = context.params.pushId
    const response = await stripe.charges.create(charge, {
        idempotency_key: idempotencyKey
    })

    await snap.ref.set(response, {
        merge: true
    })

}  catch (error) {
    await snap.ref.set({
        error: userFacingMessage(error)
    }, {
        merge: true
    })
}
})

function userFacingMessage(error) {
    return error.type ? error.message : 'An error occurred, developers have been alerted';

}


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
