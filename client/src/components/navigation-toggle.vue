<template>
    <div @click="$emit('toggleNavigation')" class="navigation-toggle">
        <i class="material-icons toggle-navigation">menu</i>
        <span>NAV</span>
    </div>
</template>

<style scoped lang="scss">
    @import "~@/styles/_colors";

    .navigation-toggle {
        color: $dark-grey;
        display: flex;
        align-items: center;
        flex-flow: column nowrap;
        padding: 1rem;
        cursor: pointer;
        span {
            display: block;
            transform: rotate(-90deg);
            font-size: 1rem;
            line-height: 100%;
            height: 100%;
            font-weight: 400;
            padding-right: 2rem;
        }
    }
</style>
