<template>
    <section class="api-details">
        <h2>{{heading}}</h2>
        <p>{{description}}</p>
        <ul>
            <li v-for="link in links">
                <a :href="link.url">{{link.label}}</a>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        props: {
            heading: String,
            description: String,
            links: Array
        }
    };
</script>

<style lang="scss">
    @import "~@/styles/_colors";
    @import "~@/styles/_typography";

    .api-details {
        background-color: lighten($primary-color-light, 45%);
        padding: 1rem 2rem;
        ul {
            text-align: right;
        }
        h2 {
            margin-top: 1rem;
            @include secondary-header-font;
        }
    }
</style>
