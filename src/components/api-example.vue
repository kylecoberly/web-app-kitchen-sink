<template>
    <section class="api-example">
        <header>
            <api-details
                 :heading="api.heading"
                 :links="api.links"
                 :description="api.description"
            ></api-details>
            <div class="api-integration">
                <component :is="component"></component>
            </div>
        </header>
        <div v-if="loading" class="loading-spinner">
            <fingerprint-spinner
                :animation-duration="2000"
                :size="100"
                :color="'#999'"
            />
        </div>
        <p v-else-if="networkError">Error: {{networkError}}</p>
        <ul v-else>
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
    import StripePayments from "@/components/apis/stripe-payments";
    import S3Uploads from "@/components/apis/s3-uploads";
    import AnnotatedExample from "@/components/annotated-example";
    import ApiDetails from "@/components/api-details";
    import {FingerprintSpinner} from "epic-spinners";

    export default {
        components: {
            AnnotatedExample,
            ApiDetails,
            S3Uploads,
            StripePayments,
            FingerprintSpinner
        },
        props: {
            component: String,
            api: Object,
            loading: Boolean,
            networkError: String
        },
    };
</script>

<style scoped lang="scss">
    @import "~@/styles/_typography";

    $medium-breakpoint: 800px;
    $column-width: 42rem;

    .api-example {
        padding: 2rem;
        flex-grow: 1;
        flex-basis: 0;
        overflow-x: auto;
        > header {
            display: flex;
            flex-flow: row wrap;
            .api-details {
                order: 2;
                flex: 0.7;
                width: 100%;
                @media (max-width: $medium-breakpoint) {
                    flex: initial;
                }
            }
            .api-integration {
                order: 1;
                flex: 1.3;
                display: flex;
                justify-content: center;
                @media (max-width: $medium-breakpoint){
                    order: 3;
                }
            }
        }
        .loading-spinner {
            padding: 2rem;
            display: flex;
            justify-content: center;
        }
    }
</style>
