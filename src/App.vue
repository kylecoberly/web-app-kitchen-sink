<template>
    <div id="app">
        <header>
            <h1>Web App Kitchen Sink</h1>
        </header>
        <main>
            <router-view/>
        </main>
        <footer>&copy; Kyle Coberly, 2018 &mdash; MIT License</footer>
    </div>
</template>

<style lang="scss">
    @import "~@/styles/_resets";
    @import "~@/styles/_colors";
    @import "~@/styles/_typography";

    header {
        background-color: $primary-color-medium-dark;
        padding: 0.5rem 1rem;
        color: $white;
        h1 {
            @include primary-header-font;
        }
    }
    main {
        @include body-font;
        width: 100%;
        min-height: calc(100vh - 5rem - 3rem);
    }
    footer{
        @include aside-font;
        background-color: $primary-color-dark;
        color: $white;
        padding: 2.5rem 1rem 1.5rem 1rem;
        text-align: right;
    }
</style>
