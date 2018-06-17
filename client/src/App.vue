<template>
    <div id="app">
        <header>
            <h1><router-link to="/">Web App Kitchen Sink</router-link></h1>
        </header>
        <nav>
            <h2>API Integrations</h2>
            <ul>
                <li>
                    <router-link :to="{name: 'api', params: {component: 'stripe-payments'}}">
                        Stripe Payments
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'api', params: {component: 's3-uploads'}}">
                        S3 File Uploads
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'api', params: {component: 'social-auth'}}">
                        Social Auth
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'api', params: {component: 'camera'}}">
                        Cameras
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'api', params: {component: 'camera'}}">
                        Cameras
                    </router-link>
                </li>
            </ul>
            <h2>Software Patterns</h2>
            <ul>
                <li>
                    <router-link :to="{name: 'pattern', params: {component: 'single-responsibility-principle'}}">
                        Single Responsibility Principle
                    </router-link>
                </li>
            </ul>
        </nav>
        <main>
            <router-view/>
        </main>
        <footer>
            <ul>
                <li><a href="https://github.com/kylecoberly/web-app-kitchen-sink" target="_BLANK">Source code</a></li>
                <li><router-link :to="{name: 'privacy'}">Privacy policy</router-link></li>
            </ul>
            <p>&copy; <a href="https://kylecoberly.com" target="_BLANK">Kyle Coberly</a>, 2018 &mdash; MIT License</p>
        </footer>
    </div>
</template>

<style lang="scss">
    @import "~@/styles/_resets";
    @import "~@/styles/_colors";
    @import "~@/styles/_typography";
    @import "~@/styles/_breakpoints";

    #app {
        display: grid;
        grid-template: auto 1fr auto / 15% 1fr;
        grid-template-areas:
            "header header"
            "nav main"
            "footer footer";
        @media (max-width: $large-screen){
            grid-template: auto 1fr auto auto / 1fr;
            grid-template-areas:
                "header"
                "main"
                "nav"
                "footer";
        }
        min-height: 100vh;
        > header {
            grid-area: header;
            padding: 1rem 1rem;
            h1 {
                @include primary-header-font;
                color: $primary-color-dark;
                a {
                    color: inherit;
                    text-decoration: none;
                }
            }
        }
        > nav {
            grid-area: nav;
            h2 {
                @include navigation-header-font;
                padding-left: 1rem;
            }
            ul {
                margin-left: 1rem;
                margin-bottom: 1rem;
                li {
                    margin-bottom: 5px;
                }
                a {
                    @include navigation-link-font;
                    &:visited {
                        color: $dark-grey;
                    }
                }
            }
        }
        > main {
            position: relative;
            grid-area: main;
            @include body-font;
        }
        > footer {
            grid-area: footer;
            @include aside-font;
            background-color: $primary-color-dark;
            color: $white;
            padding: 2rem 1rem;
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
