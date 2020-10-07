<template>
    <div>
        <div class="home-page">
            <div class="banner">
                <div class="container">
                    <h1 class="logo-font">My Object</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div class="container page">
                <div class="row">
                    <div class="col-md-9">
                        <div class="feed-toggle">
                            <ul class="nav nav-pills outline-active">
                                <li class="nav-item" v-if="user">
                                    <nuxt-link
                                        class="nav-link"
                                        :class="{ active: tab === 'your_feed' }"
                                        exact
                                        :to="{
                                            name: 'home',
                                            query: {
                                                tab: 'your_feed'
                                            }
                                        }"
                                        >your_feed</nuxt-link
                                    >
                                </li>
                                <li class="nav-item">
                                    <nuxt-link
                                        class="nav-link"
                                        exact
                                        :class="{
                                            active: tab === 'global_feed'
                                        }"
                                        :to="{
                                            name: 'home'
                                        }"
                                        >global_feed</nuxt-link
                                    >
                                </li>
                                <li class="nav-item" v-if="tag">
                                    <nuxt-link
                                        class="nav-link"
                                        :class="{
                                            active: tab === 'tag'
                                        }"
                                        exact
                                        :to="{
                                            name: 'home',
                                            query: {
                                                tab: 'tag',
                                                tag: tag
                                            }
                                        }"
                                        >#{{ tag }}</nuxt-link
                                    >
                                </li>
                            </ul>
                        </div>

                        <div
                            class="article-preview"
                            :key="item.slug"
                            v-for="item in articles"
                        >
                            <div class="article-meta">
                                <nuxt-link
                                    :to="{
                                        name: 'profile',
                                        params: {
                                            username: item.author.username
                                        }
                                    }"
                                >
                                    <img :src="item.author.image" />
                                </nuxt-link>
                                <div class="info">
                                    <nuxt-link
                                        class="author"
                                        :to="{
                                            name: 'profile',
                                            params: {
                                                username: item.author.username
                                            }
                                        }"
                                    >
                                        {{ item.author.username }}
                                    </nuxt-link>
                                    <span class="date">{{
                                        item.createdAt | date("MMM DD, YYYY")
                                    }}</span>
                                </div>
                                <button
                                    class="btn btn-outline-primary btn-sm pull-xs-right"
                                    :class="{ active: item.favorited }"
                                    @click="onFavorite(item)"
                                    :disabled="item.favoriteDisabled"
                                >
                                    <i class="ion-heart"></i>
                                    {{ item.favoritesCount }}
                                </button>
                            </div>
                            <nuxt-link
                                :to="{
                                    name: 'article',
                                    params: {
                                        slug: item.slug
                                    }
                                }"
                                class="preview-link"
                            >
                                <h1>{{ item.title }}</h1>
                                <p>{{ item.body }}</p>
                                <span>Read more...</span>
                            </nuxt-link>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="sidebar">
                            <p>Popular Tags</p>
                            <div
                                class="tag-list"
                                v-for="item in tags"
                                :key="item"
                            >
                                <nuxt-link
                                    :to="{
                                        name: 'home',
                                        query: {
                                            tag: item,
                                            page: $route.query.page,
                                            tab: tab
                                        }
                                    }"
                                    class="tag-pill tag-default"
                                    :class="{ active: tags.includes(item) }"
                                    >{{ item }}</nuxt-link
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <nav>
                    <ul class="pagination">
                        <li
                            class="page-item "
                            v-for="item in totalPage"
                            :key="item"
                            :class="{ active: item === page }"
                        >
                            <nuxt-link
                                class="page-link"
                                :to="{
                                    name: 'home',
                                    query: {
                                        page: item,
                                        tag: $route.query.tag
                                    }
                                }"
                                >{{ item }}</nuxt-link
                            >
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getArticles,
    getTags,
    getYourFeed,
    addFavorite,
    deleteFavorite
} from "@/api/article"
import { mapState } from "vuex"
export default {
    name: "Home",
    async asyncData({ query }) {
        let page = Number.parseInt(query.page || 1)
        let limit = 20
        const tab = query.tab || "global_feed"
        const loadArticles = tab === "global_feed" ? getArticles : getYourFeed
        const [artData, tagData] = await Promise.all([
            loadArticles({
                limit: limit,
                offset: (page - 1) * limit,
                tag: query.tag
            }),
            getTags()
        ])
        const { articles, articlesCount } = artData.data
        let { tags } = tagData.data

        articles.forEach(item => (item.favoriteDisabled = false))
        return {
            articles,
            articlesCount,
            limit,
            page,
            tags,
            tag: query.tag,
            tab
        }
    },
    computed: {
        ...mapState(["user"]),
        totalPage() {
            return Math.ceil(this.articlesCount / this.limit)
        }
    },
    watchQuery: ["page", "tag", "tab"],
    data() {
        return {}
    },
    methods: {
        async onFavorite(item) {
            item.favoriteDisabled = true
            if (item.favorited) {
                await deleteFavorite(item.slug)
                item.favorited = false

                item.favoritesCount--
            } else {
                await addFavorite(item.slug)
                item.favorited = true
                item.favoritesCount++
            }
            item.favoriteDisabled = false
        }
    }
}
</script>
<style></style>
