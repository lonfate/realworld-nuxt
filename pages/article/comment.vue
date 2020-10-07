<template>
    <div>
        <form class="card comment-form" v-if="user">
            <div class="card-block">
                <textarea
                    class="form-control"
                    placeholder="Write a comment..."
                    rows="3"
                    v-model="message"
                ></textarea>
            </div>
            <div class="card-footer">
                <img :src="user.image" class="comment-author-img" />
                <button class="btn btn-sm btn-primary" @click="addComments">
                    Post Comment
                </button>
            </div>
        </form>

        <p show-authed="false" style="display: inherit;" v-else>
            <nuxt-link to="/login">Sign in</nuxt-link> or
            <nuxt-link to="/register">sign up</nuxt-link> to add comments on
            this article.
        </p>
        <div class="card" v-for="item in comments" :key="item.id">
            <div class="card-block">
                <p class="card-text">
                    {{ item.body }}
                </p>
            </div>
            <div class="card-footer">
                <a href="" class="comment-author">
                    <img :src="item.author.image" class="comment-author-img" />
                </a>
                &nbsp;
                <nuxt-link
                    :to="{
                        name: 'profile',
                        params: {
                            username: item.author.username
                        }
                    }"
                    class="comment-author"
                    >{{ item.author.username }}</nuxt-link
                >
                <span class="date-posted">{{
                    item.createdAt | date("MMM DD, YYYY")
                }}</span>
                <span class="mod-options" @click="deleteComments(item.id)">
                    <i class="ion-trash-a"></i>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import { getComments, removeComment, addComment } from "@/api/article"
import { mapState } from "vuex"
export default {
    name: "comments",
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState(["user"])
    },
    data() {
        return {
            comments: [],
            message: ""
        }
    },
    mounted() {
        this.getCommentsList()
    },
    methods: {
        async deleteComments(id) {
            await removeComment(this.article.slug, id)
            this.getCommentsList()
        },
        async getCommentsList() {
            const { data } = await getComments(this.article.slug)
            this.comments = data.comments
        },
        async addComments() {
            await addComment(this.article.slug, {
                comment: {
                    body: this.message
                }
            })
            this.getCommentsList()
        }
    }
}
</script>
