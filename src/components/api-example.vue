<template>
    <section class="api-example">
        <h2>{{heading}}</h2>
        <div class="api-integration">
            <component :is="component"></component>
        </div>
        <ul>
            <li v-for="annotatedExample in annotatedExamples">
                <annotated-example
                    :heading="annotatedExample.heading"
                    :annotation="annotatedExample.annotation"
                    :code="annotatedExample.code"
                ></annotated-example>
            </li>
        </ul>
    </section>
</template>

<script>
    import StripePayments from "@/components/apis/stripe-payments";
    import AnnotatedExample from "@/components/annotated-example";

    export default {
        components: {
            "annotatedExample": AnnotatedExample,
            "stripePayments": StripePayments
        },
        props: {
            annotatedExamples: Array,
            component: String,
            heading: String
        }
    };
</script>

<style scoped lang="scss">
    .api-example {
        padding: 2rem 1rem;
        flex-grow: 1;
        max-width: 100%;
        h2 {
            margin-top: 2rem;
            text-align: center;
        }
        .api-integration {
            display: flex;
            justify-content: center;
        }
    }
</style>
