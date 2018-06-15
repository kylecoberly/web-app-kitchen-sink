<template>
    <api-example
        :component="$route.params.component"
        :api="currentAPI"
        :loading="loading"
        :networkError="networkError"
    ></api-example>
</template>

<script>
    import ApiExample from "@/components/api-example";
    import Store from "@/store";

    export default {
        components: {"apiExample": ApiExample},
        watch: {
            "$route": "setCurrentAPI"
        },
        created(){
            this.setCurrentAPI();
        },
        data(){
            return {
                networkError: null,
                loading: true
            };
        },
        computed: {
            currentAPI(){
                return this.$store.state.currentAPI;
            }
        },
        methods: {
            setCurrentAPI(){
                this.loading = true;
                this.$store.dispatch("clearCurrentAPI");
                this.$store.dispatch("setCurrentAPI", this.$route.params.component)
                    .then(result => {
                        this.loading = false;
                    }).catch(error => {
                        this.loading = false;
                        console.error(error);
                        this.networkError = error.message;
                    });
            }
        }
    };
</script>
