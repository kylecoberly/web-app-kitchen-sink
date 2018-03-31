<template>
    <section class="index">
        <h2>Coming soon</h2>
        <p>The web app kitchen sink will feature a collection of coding and integration patterns for use in web apps.</p>
    </section>
</template>

<script>
</script>

<style scoped lang="scss">
    @import "~@/styles/_typography";

    .index {
        padding: 6rem 1rem 1rem 1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        h2 {
            @include secondary-header-font;
        }
    }
</style>
