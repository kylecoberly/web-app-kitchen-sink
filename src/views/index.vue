<template>
    <section class="index">
        <div class="content">
            <h2>Start with a working example.</h2>
            <p>Have you ever tried to integrate an API into your web app, but found that the documentation covered so many things, it may as well have covered nothing? Sometimes what you really need are examples and explanations.</p>
            <p>The web app kitchen sink is a collection of coding, design, and integration patterns for use in web apps. Feel free to use them for your own projects or study. All of the examples on the site are read live out of the source code via the Github API and the WAKS markup language.</p>
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
        flex-grow: 1;
        padding: 2rem 1rem;
        display: flex;
        justify-content: center;
        p {
            margin-bottom: 1rem;
            max-width: 40rem;
        }
        h2 {
            @include secondary-header-font;
            margin-top: 2rem;
        }
        ul {
            width: 100%;
        }
        .content {
            position: relative;
            &::after {
                content: "";
                background-image: url(/img/kitchen-sink.svg);
                background-repeat: no-repeat;
                z-index: -1;
                opacity: 0.1;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                transform: scale(1.5);
            }
        }
    }
</style>
