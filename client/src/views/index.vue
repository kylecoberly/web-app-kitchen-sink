<template>
    <section class="index">
        <div class="content">
            <h2>Start with a working example.</h2>
            <p>Have you ever tried to integrate an API into your web app, but found that the documentation covered so many things, it may as well have covered nothing? Sometimes what you really need are examples and explanations.</p>
            <p>The web app kitchen sink is a collection of coding, design, and integration patterns for use in web apps. Feel free to use them for your own projects or study. All of the examples on the site are read live out of the source code via the Github API and the WAKS markup language.</p>
            <img src="../assets/stripe-animation.gif" alt="Web app kitchen sink demo" />
        </div>
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
        padding: 0 1rem 1rem 1rem;
        p {
            margin-bottom: 1rem;
            max-width: 40rem;
        }
        h2 {
            @include secondary-header-font;
        }
        ul {
            width: 100%;
        }
        img {
            max-width: 100%;
        }
    }
</style>
