import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const API_URL = "https://web-app-kitchen-sink-api.herokuapp.com";
import apis from "./data";

export default new Vuex.Store({
    state: {
        isNavigationOpen: true,
        currentAPI: {},
        apis,
    },
    mutations: {
        updateAnnotatedExamples(state, data){
            const api = findByLabel(state.apis, data.label);
            api.annotatedExamples = data.annotatedExamples;
        },
        setCurrentAPI(state, api){
            state.currentAPI = api;
        },
        clearCurrentAPI(state){
            state.currentAPI = null;
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
        setCurrentAPI(store, label){
            const api = findByLabel(store.state.apis, label);
            store.commit("setCurrentAPI", api);
            return Promise.resolve().then(() => {
                if (!api.annotatedExamples){
                    return getAPIData(label).then(({data}) => {
                        store.commit("updateAnnotatedExamples", data);
                    });
                }
            }).then(() => {
                store.commit("setCurrentAPI", api);
            });
        },
        clearCurrentAPI(store){
            store.commit("clearCurrentAPI");
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

function findByLabel(list, label){
    return list.filter(item => item.label === label)[0];
}
function getAPIData(label){
    return fetch(`${API_URL}/examples/${label}`)
        .then(response => response.json());
}
