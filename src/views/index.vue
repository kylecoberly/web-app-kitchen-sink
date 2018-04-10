<template>
    <section class="index">
        <p>The web app kitchen sink is a collection of coding, design, and integration patterns for use in web apps.</p>
    </section>
</template>

<script>
    import Store from "@/store";

    export default {
        beforeRouteEnter: (to, from, next) => {
            Store.dispatch("openNavigation");
            next();
        }
    };
</script>

<style scoped lang="scss">
    @import "~@/styles/_typography";

    .index {
        flex-grow: 1;
        padding: 2rem 1rem;
        display: flex;
        justify-content: center;
        p {
            margin-bottom: 1rem;
            max-width: 40rem;
            text-align: center;
        }
        h2 {
            @include secondary-header-font;
        }
        ul {
            width: 100%;
        }
    }
</style>
