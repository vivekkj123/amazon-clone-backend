const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HRG48FyQkicy6LeM5WVSGHsLMB9lusu4aTpm6PbK60RXLUsMa1OCuJHCj99OKO27XHPtJq4gPEjjnR0vYjJWB4800BvaJM5yA"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command

app.listen( 8000, () => console.log( `The application is listening on port 8000!` ) );

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api
