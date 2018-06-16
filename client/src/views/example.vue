<template>
    <component
        :is="currentExample.type"
        :api="currentExample"
        :loading="loading"
        :networkError="networkError"
    />
</template>

<script>
    import ApiExample from "@/components/api-example";

    export default {
        components: {"apiExample": ApiExample},
        watch: {
            "$route": "setCurrentExample"
        },
        created(){
            this.setCurrentExample();
        },
        data(){
            return {
                networkError: null,
                loading: true
            };
        },
        computed: {
            currentExample(){
                return this.$store.state.currentExample;
            }
        },
        methods: {
            async setCurrentExample(){
                this.loading = true;
                this.$store.dispatch("clearCurrentExample");
                try {
                    await this.$store.dispatch("setCurrentExample", this.$route.params.component);
                    this.loading = false;
                } catch(error){
                    this.loading = false;
                    console.error(error);
                    this.networkError = error.message;
                }
            }
        }
    };
</script>
