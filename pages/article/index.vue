<template>
    <div>
        <div class="article-page">
            <div class="banner">
                <div class="container">
                    <h1>{{ article.title }}</h1>
                    <article-meta :data="article"></article-meta>
                </div>
            </div>

            <div class="container page">
                <div class="row article-content">
                    <div class="col-md-12" v-html="article.body">
                        <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                        <p>
                            It's a great solution for learning how other
                            frameworks work.
                        </p>
                    </div>
                </div>

                <hr />

                <div class="article-actions">
                    <article-meta :data="article"></article-meta>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-8 offset-md-2">
                        <comment :article="article"></comment>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getDetail } from "@/api/article"
import MarkdownIt from "markdown-it"
import articleMeta from "./article-meta"
import comment from "./comment"
function doMarkdown(msg) {
    const md = new MarkdownIt()
    return md.render(msg)
}

export default {
    name: "article",
    async asyncData({ params }) {
        const { data } = await getDetail(params.slug)
        data.article.body = doMarkdown(data.article.body)
        return {
            article: data.article
        }
    },
    components: {
        articleMeta,
        comment
    },
    methods: {},
    head() {
        return {
            title: this.article.title + "-Realworld",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.article.description
                }
            ]
        }
    },
    watch: {
        article: {
            deep: true
        }
    }
}
</script>
<style></style>
