import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isNavigationOpen: true,
        annotatedExamples: [{
            heading: "Payments with Stripe",
            annotation: `
At *vero* eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas

molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic

tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
            `,
            code: `(function initializeStripe(clientKey){
    const stripe = Stripe(clientKey);
    const elements = stripe.elements();
    elements.create("card").mount("#card-element")
        .addEventListener("change", onCardChange);
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
    .catch(console.error);
}
            `
        }]
    },
    mutations: {
        updateAnnotatedExamples(state, annotatedExamples){
            state.annotatedExamples = annotatedExamples;
        },
        toggleNavigation(state){
            state.isNavigationOpen = state.isNavigationOpen ? false : true;
        },
        openNavigation(state){
            state.isNavigationOpen = true;
        },
        closeNavigation(state){
            state.isNavigationOpen = false;
        }
    },
    actions: {
        getAnnotatedExamples(store){
            fetch("/apis/annotated-examples")
                .then(response => response.json())
                .then(({annotatedExamples}) => {
                    store.commit("updateAnnotatedExamples", annotatedExamples);
                });
        },
        toggleNavigation(store){
            store.commit("toggleNavigation");
        },
        openNavigation(store){
            store.commit("openNavigation");
        },
        closeNavigation(store){
            store.commit("closeNavigation");
        }
    }
});
