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
            CodeExample
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

<style lang="scss">
    @import "~@/styles/_colors";
    @import "~@/styles/_typography";
    $medium-breakpoint: 800px;
    $column-width: 42rem;

    .annotated-example {
        padding: 2rem 0rem;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        section {
            flex: 0.7;
            padding-right: 3rem;
            @media (max-width: $medium-breakpoint) {
                flex: initial;
            }
            h3 {
                @include tertiary-header-font;
            }
            .annotation {
                @include body-font;
                ul {
                    list-style: circle;
                    margin-left: 2rem;
                    margin-bottom: 2rem;
                }
                ol {
                    list-style: decimal;
                    margin-left: 2rem;
                    margin-bottom: 2rem;
                }
                li {
                    margin-bottom: 0.5rem;
                }
                code {
                    @include code-font;
                }
            }
        }
        pre {
            flex: 1.3;
            max-width: 50rem;
            @media (max-width: $medium-breakpoint) {
                flex: initial;
            }
        }
    }
</style>
