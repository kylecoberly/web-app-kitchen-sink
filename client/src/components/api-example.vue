<template>
    <section class="api-example">
        <h2>{{api.heading}}</h2>
        <div class="demo">
            <div class="api-integration">
                <component :is="component"></component>
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
    import StripePayments from "@/components/apis/stripe-payments";
    import S3Uploads from "@/components/apis/s3-uploads";
    import SocialAuth from "@/components/apis/social-auth";
    import Camera from "@/components/apis/camera";
    import AnnotatedExample from "@/components/annotated-example";
    import ApiDetails from "@/components/api-details";
    import {FingerprintSpinner} from "epic-spinners";

    export default {
        components: {
            AnnotatedExample,
            ApiDetails,
            S3Uploads,
            StripePayments,
            SocialAuth,
            Camera,
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
    @import "~@/styles/_breakpoints";

    .api-example {
        padding: 0 1rem;
        flex-grow: 1;
        flex-basis: 0;
        overflow-x: auto;
        h2 {
            @include secondary-header-font;
        }
        > .demo {
            display: grid;
            grid-template: auto / 1fr 30%;
            grid-template-areas:
                "demo details";
            @media (max-width: $large-screen){
                grid-template: 1fr auto / auto;
                grid-template-areas:
                    "demo"
                    "details";
            }
            .api-details {
                @media (max-width: $large-screen){
                    margin-top: 1rem;
                }
                width: 100%;
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
