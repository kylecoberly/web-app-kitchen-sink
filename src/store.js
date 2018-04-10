import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const API_URL = "https://web-app-kitchen-sink-api.herokuapp.com";

export default new Vuex.Store({
    state: {
        isNavigationOpen: true,
        annotatedExamples: [{
            heading: "Payments with Stripe",
            annotation: ``,
            code: ``
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
        getAnnotatedExamples(store, {label}){
            fetch(`${API_URL}/examples/${label}`)
                .then(response => response.json())
                .then(({data}) => {
                    store.commit("updateAnnotatedExamples", data);
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
