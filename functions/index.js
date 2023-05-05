const functions = require("firebase-functions");
const products = require("./data/shopdata.json");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors")({origin: true});
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

exports.getShopData = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    res.status(200).send(products);
  });
});

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const {amount} = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "aud",
        payment_method_types: ["card"],
      });

      res.status(200).send({clientSecret: paymentIntent.client_secret});
    } catch (error) {
      console.log({error});
      res.status(400).send({error});
    }
  });
});
