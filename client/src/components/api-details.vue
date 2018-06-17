<template>
    <section class="api-details">
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
            description: String,
            links: Array
        }
    };
</script>

<style lang="scss">
    @import "~@/styles/_colors";

    .api-details {
        background-color: lighten($primary-color-light, 45%);
        padding: 21px;
        p {
            max-width: 40rem;
        }
        ul {
            text-align: right;
        }
    }
</style>
