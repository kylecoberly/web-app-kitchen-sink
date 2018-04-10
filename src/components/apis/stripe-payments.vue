/* waks:start
This is front-end stripe payments commentary: templates
waks:example */
<template>
    <div class="stripe">
        <form action="/charge" method="post" id="payment-form">
            <label for="name">Name</label>
            <input id="name" placeholder="Kyle Coberly" type="text" required="requred" />
            <label for="amount">Dollars</label>
            <input id="amount" min="1" placeholder="$5" type="number" required="required" />
            <label for="card-element">Card</label>
            <div id="card-element"></div>
            <div id="card-errors" role="alert"></div>
            <input type="submit" value="Submit Payment" />
        </form>
    </div>
</template>
/* waks:end */

<script>
    export default {
        mounted(){
/* waks:start
This is front-end stripe payments commentary: code
waks:example */
            (function initializeStripe(clientKey){
                const stripe = Stripe(clientKey);
                const elements = stripe.elements();
                const card = elements.create("card");
                card.mount("#card-element")
                card.addEventListener("change", onCardChange);
                document.querySelector("#payment-form")
                    .addEventListener("submit", submitPaymentForm);
            })("pk_test_K23BCqS1ExD17Jr4blcPGq1t");

            function submitPaymentForm(event){
                event.preventDefault();

                const formData = new FormData(event.target);
                stripe.createToken(card).then(result => {
                    result.error
                        ? document.querySelector("#card-errors").textContent = result.error.message
                        : sendStripePayment({
                            name: formData.get("name"),
                            amount: formData.get("amount"),
                            token: result.token
                        });
                });
            }
            function onCardChange(event){
                document.querySelector("#card-errors").textContent = event.error
                    ? event.error.message
                    : "";
            }
            function sendStripePayment(parameters){
                fetch("https://web-app-kitchen-sink.herokuapp.com/stripe", {
                    method: "POST",
                    body: JSON.stringify(parameters)
                }).then(console.log)
                .catch(error => {
                    throw new Error(error);
                });
            }
        }
    };
/* waks:end */
</script>

<style scoped lang="scss">
/* waks:start
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
        }
    }
/* waks:end */
</style>
