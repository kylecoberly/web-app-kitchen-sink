/* waks:start=HTML Form=start */
This is the HTML for a Stripe Elements form. Some things to note:

* The `#card-element` div will end up having the actual credit card entry field inserted into it by the Stripe.js library.
* The name, amount, and hidden description inputs are so you can collect that information- technically you can hard-code those values on the server if they never change.
* The `#card-message` element will be used to display any feedback we get, which might include:
    * Real-time error from not entering a valid credit card
    * Error message from your server
    * Success message from your server
<!-- waks:example -->
<template>
<div class="stripe">
    <form>
        <label for="name">Name</label>
        <input id="name" name="name" placeholder="Kyle Coberly" type="text" required />

        <label for="amount">Dollars</label>
        <input id="amount" name="amount" min="1" placeholder="$5" type="number" required />

        <!-- hidden value -->
        <input name="description" type="hidden" value="Large Pizza" />

        <label for="card-element">Card</label>
        <!-- Credit card input will be put here by Stripe -->
        <div id="card-element"></div>

        <div id="errors"></div>
        <div id="message"></div>

        <input type="submit" value="Submit Payment" />
    </form>
</div>
</template>
<!-- waks:end -->

<script>
    export default {
        mounted(){
/* waks:start=Client-Side Code=start
The key things you need with your client-side code are:

1. Create and insert Stripe's credit card input field
2. Listen for form submissions and errors
3. Turn the user's credit card into a token that you can safely send over a network
4. Send the token and any other relevant data to your server
5. Show a response when it's processed

Stripe's credit card input form is not a normal input field. It does lots of fraud-detecting magic, and some of it happens behind an `iframe`. This _also_ means that you can't directly write automated tests for it.

To get your client-side key, create a Stripe account and get it from the Stripe dashboard in the developer section. Note that there are 2 sets of keys (production and test), and 2 keys in each of them (client and server). Your client key can be published, your server should not be. Use the test keys in development and testing to prevent making any actual charges.

Note that you can test a stripe credit card form with `4242 4242 4242 4242 4/24 242` to do a fake transaction (try it above!). There are other numbers that will simulate specific types of transactions.

One important gotcha: the token that gets created has a lot of data on it. **The only thing you should send to the server is the `id` from it.**
waks:example */
// DOM elements we'll use
const $cardElement = document.querySelector("#card-element");
const $paymentForm = document.querySelector("form");
const $message = document.querySelector("#message");
const $errors = document.querySelector("#errors");

// Get yours from the Stripe dashboard in the developer section
const clientKey = "pk_test_K23BCqS1ExD17Jr4blcPGq1t";

// This initializes Stripe, creates the credit card element,
// and adds it to the page
const stripe = Stripe(clientKey);
const elements = stripe.elements();
const card = elements.create("card");
card.mount($cardElement);

(function attachEventListeners(){
    // Use `card` because the element is dynamically created
    // This validates the credit card as the user types
    card.addEventListener("change", onCardChange);
    $paymentForm.addEventListener("submit", submitPaymentForm);
})();

function onCardChange(event){
    $errors.textContent = event.error
        ? event.error.message
        : "";
}

function submitPaymentForm(event){
    // Prevent the browser from trying to submit the form as-is
    event.preventDefault();

    // Get all of the input data from the form
    const formData = new FormData(event.target);
    // Generate a token from the entered credit card number
    stripe.createToken(card).then(result => {
        result.error
            // If there's an error creating a token, show it
            ? displayError(result.error.message)
            // Otherwise, send it to your server
            : sendStripePayment({
                name: formData.get("name"),
                description: formData.get("description"),
                // Amounts are integers, and each represents 1 cent
                amount: formData.get("amount") * 100,
                // Easiest thing to mess up - the token has
                // lots of bonus information, just send the ID
                token: result.token.id
            });
    });
}

function sendStripePayment(parameters){
    // URL of the server that will process the payment
    const paymentURL = "https://web-app-kitchen-sink-api.herokuapp.com/apis/stripe-payments";
    // Send the token and any other data you want to your server
    fetch(paymentURL, {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify(parameters)
    }).then(response => response.json())
    .then(({data, error}) => {
        error
            // If there was an error, show it
            ? displayMessage(error, true)
            // Otherwise show a success message
            : displayMessage(data.outcome.seller_message);
    }).catch(error => {
        displayMessage(error.message, true);
        throw new Error(error);
    });
}

function displayMessage(message, isError){
    isError
        ? $errors.textContent = message
        : $message.textContent = message;
}
/* waks:end */
        }
    };
</script>

<style scoped lang="scss">
@import "~@/styles/_colors";

/* waks:start=Styles=start
The style on the form is basic form styling. The only exception is the element that's created by Stripe, which has the `.StripeElement` class and a few helper classes as seen below.
waks:example */
.stripe {
    padding: 1rem;
    form {
        max-width: 30rem;
        label {
            font-size: 1rem;
        }
        input {
            height: 2.5rem;
            padding: 0.5rem 1rem;
            width: 100%;
            border: none;
            box-shadow: 0px 0px 4px $light-grey;
            border-radius: 4px;
            &::placeholder {
                color: $light-grey;
            }
            &[type=submit] {
                margin-top: 1rem;
                font-size: 1rem;
                width: 100%;
                background-color: $primary-color-medium;
                color: $white;
                border: none;
                box-shadow: 1px 1px 4px hsl(0, 0%, 50%);
                cursor: pointer;
                &:hover {
                    background-color: lighten($primary-color-medium, 10%);
                }
            }
        }
        // These classes are created by Stripe and added
        // to the credit card input element
        .StripeElement {
            background-color: $pure-white;
            height: 2.5rem;
            padding: 0.75rem 1rem;
            border-radius: 4px;
            box-shadow: 0px 0px 4px $light-grey;
        }
        .StripeElement--focus {
            box-shadow: 0 1px 3px 0 #cfd7df;
        }
        .StripeElement--invalid {
            border-color: #fa755a;
        }
        .StripeElement--webkit-autofill {
            background-color: #fefde5 !important;
        }

        #card-errors, #card-message {
            margin-top: 1rem;
            font-size: 1rem;
        }
        #card-errors {
            color: hsl(0, 50%, 50%);
        }
        #card-message {
            color: $grey;
        }
    }
}
/* waks:end */
</style>
