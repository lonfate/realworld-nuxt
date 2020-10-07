<template>
    <div class="article-meta">
        <nuxt-link
            :to="{
                name: 'profile',
                params: {
                    username: data.author.username
                }
            }"
            ><img :src="data.author.image"
        /></nuxt-link>
        <div class="info">
            <nuxt-link
                class="author"
                :to="{
                    name: 'profile',
                    params: {
                        username: data.author.username
                    }
                }"
                >{{ data.author.username }}</nuxt-link
            >
            <span class="date">{{
                data.createdAt | date("MMM DD, YYYY")
            }}</span>
        </div>
        <template v-if="user.username === data.author.username">
            <nuxt-link
                class="btn btn-outline-secondary btn-sm"
                :to="{
                    name: 'editor',
                    query: { slug: data.slug }
                }"
            >
                <i class="ion-edit"></i> Edit Article
            </nuxt-link>
            <button @click="deleteArt" class="btn btn-outline-danger btn-sm">
                <i class="ion-trash-a"></i> Delete Article
            </button>
        </template>
        <template v-else>
            <button
                class="btn btn-sm btn-outline-secondary"
                :class="{ active: data.author.following }"
                @click="onFollowing(data.author.following)"
            >
                <i class="ion-plus-round"></i>
                &nbsp; {{ data.author.following ? "UnFollow" : "Follow" }}
                {{ data.author.username }}
                <!-- <span class="counter">({{ data.following }})</span> -->
            </button>
            &nbsp;&nbsp;
            <button
                class="btn btn-sm btn-outline-primary"
                :class="{ active: data.favorited }"
                @click="onFavorite(data.favorited)"
            >
                <i class="ion-heart"></i>
                &nbsp;
                {{
                    data.favorited ? " UnFavorite Article " : `Favorite Article`
                }}
                <span class="counter">({{ data.favoritesCount }})</span>
            </button>
        </template>
    </div>
</template>
<script>
import {
    addFollow,
    deleteFollow,
    addFavorite,
    deleteFavorite,
    deleteArticle
} from "@/api/article"
import { mapState } from "vuex"
export default {
    props: ["data"],
    data() {
        return {}
    },
    computed: {
        ...mapState(["user"])
    },
    mounted() {
        console.log(this.data)
    },
    methods: {
        async deleteArt() {
            await deleteArticle(this.data.slug)
            this.$router.back()
        },
        async onFollowing(f) {
            if (f) {
                await deleteFollow(this.data.author.username)
            } else {
                await addFollow(this.data.author.username)
            }
            this.$router.go(0)
        },
        async onFavorite(f) {
            if (f) {
                await deleteFavorite(this.data.slug)
            } else {
                await addFavorite(this.data.slug)
            }
            this.$router.go(0)
        }
    }
}
</script>
