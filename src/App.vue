<template>
    <div id="app">
        <header>
            <h1><router-link to="/">Web App Kitchen Sink</router-link></h1>
        </header>
        <main>
            <nav :class="{open:isOpen}">
                <navigation-toggle @toggleNavigation="toggleNavigation"></navigation-toggle>
                <ul>
                    <li>
                        <router-link :to="{name: 'apis', params: {component: 'stripe-payments'}}">
                            Stripe Payments
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'apis', params: {component: 's3-uploads'}}">
                            S3 File Uploads
                        </router-link>
                    </li>
                </ul>
            </nav>
            <router-view/>
        </main>
        <footer>
            <ul>
                <li><a href="https://github.com/kylecoberly/web-app-kitchen-sink" target="_BLANK">Client source code</a></li>
                <li><a href="https://github.com/kylecoberly/web-app-kitchen-sink-api" target="_BLANK">Server source code</a></li>
            </ul>
            <p>&copy; <a href="https://kylecoberly.com" target="_BLANK">Kyle Coberly</a>, 2018 &mdash; MIT License</p>
        </footer>
    </div>
</template>

<script>
    import NavigationToggle from "@/components/navigation-toggle";

    export default {
        components: {
            navigationToggle: NavigationToggle
        },
        methods: {
            toggleNavigation(){
                this.$store.dispatch("toggleNavigation");
            }
        },
        computed: {
            isOpen(){
                return this.$store.state.isNavigationOpen;
            }
        }
    };
</script>

<style lang="scss">
    @import "~@/styles/_resets";
    @import "~@/styles/_colors";
    @import "~@/styles/_typography";

    #app {
        > header {
            background-color: $primary-color-medium-dark;
            padding: 0.5rem 1rem;
            color: $white;
            h1 {
                @include primary-header-font;
                a {
                    color: inherit;
                    text-decoration: none;
                }
            }
        }
        > main {
            @include body-font;
            position: relative;
            min-height: calc(100vh - 5rem - 3rem);
            display: flex;
            nav {
                flex-basis: 0;
                transition: all 0.2s;
                background-color: $primary-color-medium-dark;
                position: relative;
                width: 0;
                &.open {
                    flex-basis: 12rem;
                    ul {
                        display: block;
                    }
                }
                ul {
                    display: none;
                    padding: 1rem;
                    a {
                        @include navigation-link-font;
                        color: $white;
                        &:visited {
                            color: $light-grey;
                        }
                    }
                }
                .navigation-toggle {
                    position: absolute;
                    right: -4rem;
                    color: black;
                }
            }
        }
        > footer {
            @include aside-font;
            background-color: $primary-color-dark;
            color: $white;
            padding: 2rem;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            ul {
                grid-area: "links";
            }
            p {
                grid-area: "copyright";
            }
            a {
                color: $white;
            }
        }
    }
</style>
