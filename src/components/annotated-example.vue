<template>
    <div class="annotated-example">
        <section>
            <h3>{{heading}}</h3>
            <div class="annotation" v-html="parsedAnnotation"></div>
        </section>
        <code-example
            :code="code"
        ></code-example>
    </div>
</template>

<script>
    import CodeExample from "@/components/code-example";
    import Marked from "marked";

    export default {
        components: {
            codeExample: CodeExample
        },
        props: {
            heading: String,
            code: String,
            annotation: String
        },
        computed: {
            parsedAnnotation(){
                return Marked(this.annotation);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "~@/styles/_colors";
    @import "~@/styles/_typography";
    $medium-breakpoint: 800px;
    $column-width: 42rem;

    .annotated-example {
        padding: 2rem 1rem;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        pre {
            flex: 1;
            max-width: $column-width;
            @media (max-width: $medium-breakpoint) {
                flex: initial;
            }
        }
        section {
            flex: 1;
            padding-right: 3rem;
            max-width: $column-width;
            @media (max-width: $medium-breakpoint) {
                flex: initial;
            }
            h3 {
                @include tertiary-header-font;
            }
            .annotation {
                @include body-font;
            }
        }
    }
</style>
