<template>
    <section class="pattern-example">
        <h2>{{api.heading}}</h2>
        <p>Use for: {{api.problem}}</p>
        <div class="explanation">
            <div class="pattern-integration">
                <component :is="api.label"></component>
            </div>
            <api-details
                 :heading="api.heading"
                 :links="api.links"
                 :description="api.description"
            ></api-details>
        </div>
        <div v-if="loading" class="loading-spinner">
            <fingerprint-spinner
                :animation-duration="2000"
                :size="100"
                :color="'#999'"
            />
        </div>
        <p v-else-if="networkError">Error: {{networkError}}</p>
        <ul class="annotated-examples" v-else>
            <li v-for="annotatedExample in api.annotatedExamples">
                <annotated-example
                    :heading="annotatedExample.heading"
                    :annotation="annotatedExample.annotation"
                    :code="annotatedExample.example"
                ></annotated-example>
            </li>
        </ul>
    </section>
</template>

<script>
    import SingleResponsibilityPrinciple from "@/components/patterns/single-responsibility-principle";
    import FactoryMethod from "@/components/patterns/factory-method";

    import AnnotatedExample from "@/components/annotated-example";
    import ApiDetails from "@/components/api-details";
    import {FingerprintSpinner} from "epic-spinners";

    export default {
        components: {
            SingleResponsibilityPrinciple,
            FactoryMethod,
            AnnotatedExample,
            ApiDetails,
            FingerprintSpinner
        },
        props: {
            api: Object,
            loading: Boolean,
            networkError: String
        },
    };
</script>

<style scoped lang="scss">
    @import "~@/styles/_typography";
    @import "~@/styles/_breakpoints";

    .pattern-example {
        padding: 0 1rem;
        flex-grow: 1;
        flex-basis: 0;
        overflow-x: auto;
        h2 {
            @include secondary-header-font;
        }
        > .explanation {
            .api-details {
                max-width: 40rem;
                @media (max-width: $large-screen){
                    margin-top: 1rem;
                }
            }
            .api-integration {
                grid-template-area: demo;
                display: flex;
                justify-content: center;
            }
        }
        .annotated-examples {
            grid-template-area: annotations;
        }
        .loading-spinner {
            padding: 2rem;
            display: flex;
            justify-content: center;
        }
    }
</style>
