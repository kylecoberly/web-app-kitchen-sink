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
    @import "~@/styles/_breakpoints";

    .annotated-example {
        padding: 2rem 0rem;
        display: grid;
        grid-template: auto / 39% 1fr;
        grid-template-areas:
            "annotation code";
        @media (max-width: $large-screen){
            grid-template: auto 1fr / 1fr;
            grid-template-areas:
                "annotation"
                "code";
            }
        section {
            grid-template-area: annotation;
            padding-right: 3rem;
            h3 {
                @include tertiary-header-font;
            }
            .annotation {
                @include body-font;
                p, li {
                    max-width: 40em;
                }
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
                }
                code {
                    @include code-font;
                }
            }
        }
        pre {
            grid-template-area: code;
        }
    }
</style>
