<template>
    <api-example
         :component="$route.params.component"
         :annotatedExamples="annotatedExamples"
         :heading="'Payments with Stripe'"
    ></api-example>
</template>

<script>
    import ApiExample from "@/components/api-example";
    import Store from "@/store";

    export default {
        components: {"apiExample": ApiExample},
        beforeRouteEnter: (to, from, next) => {
            Store.dispatch("closeNavigation");
            next();
        },
        computed: {
            annotatedExamples(){
                return this.$store.state.annotatedExamples;
            }
        }
    };
</script>
