<template>
    <section class="api-example">
        <h2>{{api.heading}}</h2>
        <div class="api-integration">
            <component :is="component"></component>
        </div>
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
    import {FingerprintSpinner} from "epic-spinners";

    export default {
        components: {
            AnnotatedExample,
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

    .api-example {
        padding: 2rem 1rem;
        flex-grow: 1;
        overflow-x: auto;
        h2 {
            margin-top: 1rem;
            text-align: center;
            @include secondary-header-font;
        }
        .api-integration {
            display: flex;
            justify-content: center;
        }
        .loading-spinner {
            padding: 2rem;
            display: flex;
            justify-content: center;
        }
    }
</style>
