<template>
    <div>
        <div class="editor-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-10 offset-md-1 col-xs-12">
                        <form>
                            <fieldset>
                                <fieldset class="form-group">
                                    <input
                                        type="text"
                                        class="form-control form-control-lg"
                                        placeholder="Article Title"
                                        v-model="article.title"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="What's this article about?"
                                        v-model="article.description"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <textarea
                                        class="form-control"
                                        rows="8"
                                        placeholder="Write your article (in markdown)"
                                        v-model="article.body"
                                    ></textarea>
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter tags"
                                        v-model="article.tagList"
                                    />
                                    <div class="tag-list"></div>
                                </fieldset>
                                <button
                                    class="btn btn-lg pull-xs-right btn-primary"
                                    type="button"
                                    @click.prevent="update"
                                >
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { createArticle, getDetail, updateArticle } from "@/api/article"
export default {
    middleware: "authenticated",
    name: "editor",
    async created() {
        this.slug = this.$route.query.slug
        if (this.slug) {
            const { data } = await getDetail(this.slug)
            this.article = data.article
        }
    },
    data() {
        return {
            article: {
                title: "",
                description: "",
                tagList: "",
                body: ""
            }
        }
    },
    methods: {
        async update() {
            if (this.slug) {
                await updateArticle(this.slug, { article: this.article })
                this.$router.push({
                    name: "article",
                    params: {
                        slug: this.slug
                    }
                })
            } else {
                await createArticle({ article: this.article })
                this.$router.push("/")
            }
        }
    }
}
</script>
<style></style>
