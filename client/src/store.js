import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const API_URL = "https://web-app-kitchen-sink-api.herokuapp.com";
import examples from "./data";

export default new Vuex.Store({
    state: {
        currentExample: {},
        examples
    },
    mutations: {
        updateAnnotatedExamples(state, data){
            const example = findByLabel(state.examples, data.label);
            example.annotatedExamples = data.annotatedExamples;
        },
        setCurrentExample(state, example){
            state.currentExample = example;
        },
        clearCurrentExample(state){
            state.currentExample = null;
        }
    },
    actions: {
        async setCurrentExample(store, label){
            const example = findByLabel(store.state.examples, label);
            store.commit("setCurrentExample", example);

            if (!example.annotatedExamples){
                const {data} = await getAPIData(label);
                store.commit("updateAnnotatedExamples", data);
            }

            await store.commit("setCurrentExample", example);
        },
        clearCurrentExample(store){
            store.commit("clearCurrentExample");
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
