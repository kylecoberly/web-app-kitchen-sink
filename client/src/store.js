import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const API_URL = "https://web-app-kitchen-sink-api.herokuapp.com";
import apis from "./data";

export default new Vuex.Store({
    state: {
        currentAPI: {},
        apis
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
        }
    },
    actions: {
        async setCurrentAPI(store, label){
            const api = findByLabel(store.state.apis, label);
            store.commit("setCurrentAPI", api);

            if (!api.annotatedExamples){
                const {data} = await getAPIData(label);
                store.commit("updateAnnotatedExamples", data);
            }

            await store.commit("setCurrentAPI", api);
        },
        clearCurrentAPI(store){
            store.commit("clearCurrentAPI");
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
