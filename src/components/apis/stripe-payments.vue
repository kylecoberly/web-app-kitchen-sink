/* waks:start=HTML Form=start */
This is front-end stripe payments commentary: templates

<template>
<!-- waks:example -->
<div class="stripe">
    <form action="/charge" method="post" id="payment-form">
        <label for="name">Name</label>
        <input id="name" name="name" placeholder="Kyle Coberly" type="text" required="requred" />
        <label for="amount">Dollars</label>
        <input id="amount" name="amount" min="1" placeholder="$5" type="number" required="required" />
        <label for="card-element">Card</label>
        <input name="description" type="hidden" value="Hard coded description" />
        <div id="card-element"></div>
        <div id="card-errors" role="alert"></div>
        <div id="card-message"></div>
        <input type="submit" value="Submit Payment" />
    </form>
</div>
<!-- waks:end -->
</template>

<script>
    export default {
        mounted(){
/* waks:start=Code is Here=start
This is front-end stripe payments commentary: code
waks:example */
const clientKey = "pk_test_K23BCqS1ExD17Jr4blcPGq1t";
const stripe = Stripe(clientKey);
const elements = stripe.elements();
const card = elements.create("card");

const $errors = document.querySelector("#card-errors");
const $card = document.querySelector("#card-element");
const $payment = document.querySelector("#payment-form");
const $message = document.querySelector("#card-message");

(function initializeStripe(clientKey){
    card.mount($card)
    card.addEventListener("change", onCardChange);
    $payment.addEventListener("submit", submitPaymentForm);
})();

function submitPaymentForm(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    stripe.createToken(card).then(tokenHandler);

    function tokenHandler(result){
        result.error
            ? displayError(result.error.message)
            : sendStripePayment({
                name: formData.get("name"),
                description: formData.get("description"),
                amount: formData.get("amount") * 100,
                token: result.token.id
            });
    }
}

function onCardChange(event){
    $errors.textContent = event.error
        ? event.error.message
        : "";
}

function sendStripePayment(parameters){
    const paymentURL = "https://web-app-kitchen-sink-api.herokuapp.com/apis/stripe-payments";
    fetch(paymentURL, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(parameters)
    }).then(response => response.json())
    .then(({data, error}) => {
        error
            ? displayError(error)
            : displayMessage(data.outcome.seller_message);
    }).catch(error => {
        displayError(error.message);
        throw new Error(error);
    });
}

function displayMessage(message){
    $message.textContent = message;
}

function displayError(message){
    $errors.textContent = message;
}
/* waks:end */
        }
    };
</script>

<style scoped lang="scss">
/* waks:start=SASS Styles=start
This is front-end stripe payments commentary: style
waks:example */
@import "~@/styles/_colors";
@import "~@/styles/_typography";

.stripe {
    padding: 1rem;
    h2 {
        margin-bottom: 1rem;
    }
    .StripeElement {
        background-color: white;
        height: 2.5rem;
        padding: 0.5rem 1rem;
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
                color: white;
                border: none;
                box-shadow: 1px 1px 4px hsl(0, 0%, 50%);
                cursor: pointer;
            }
        }
        #card-errors {
            margin-top: 1rem;
            font-size: 1rem;
            color: hsl(0, 50%, 50%);
        }
        #card-message {
            margin-top: 1rem;
            font-size: 1rem;
            color: $grey;
        }
    }
}
/* waks:end */
</style>
