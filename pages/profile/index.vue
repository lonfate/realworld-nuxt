<template>
    <div>
        <div class="profile-page">
            <div class="user-info">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-md-10 offset-md-1">
                            <img :src="u.image" class="user-img" />
                            <h4>{{ u.username }}</h4>
                            <p>
                                {{ u.bio }}
                            </p>
                            <nuxt-link
                                :to="{
                                    name: 'settings'
                                }"
                                class="btn btn-sm btn-outline-secondary action-btn"
                            >
                                <i class="ion-gear-a"></i> Edit Profile Settings
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <div class="articles-toggle">
                            <ul class="nav nav-pills outline-active">
                                <li class="nav-item">
                                    <nuxt-link
                                        class="nav-link"
                                        :class="{
                                            active: tab === 'My Article'
                                        }"
                                        exact
                                        :to="{
                                            name: 'profile',
                                            query: {
                                                tab: 'My Article'
                                            }
                                        }"
                                        >My Articles</nuxt-link
                                    >
                                </li>
                                <li class="nav-item">
                                    <nuxt-link
                                        class="nav-link"
                                        :class="{
                                            active: tab === 'Favorited Articles'
                                        }"
                                        exact
                                        :to="{
                                            name: 'profile',
                                            query: {
                                                tab: 'Favorited Articles'
                                            }
                                        }"
                                        >Favorited Articles</nuxt-link
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
                                            name: 'profile',
                                            query: {
                                                page: item,
                                                tab: $route.query.tab
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
        </div>
    </div>
</template>
<script>
import { getProfile } from "@/api/profile"
import { getArticles, addFavorite, deleteFavorite } from "@/api/article"
export default {
    middleware: "authenticated",
    name: "profile",
    computed: {
        // ...mapState(["user"]),
        totalPage() {
            return Math.ceil(this.articlesCount / this.limit)
        }
    },
    async asyncData({ params, query }) {
        let page = Number.parseInt(query.page || 1)
        let limit = 5
        const tab = query.tab || "My Article"
        const loadArticle = tab === "My Article" ? "author" : "favorited"
        const [profileRes, articlesRes] = await Promise.all([
            getProfile(params.username),
            getArticles({
                limit: limit,
                offset: (page - 1) * limit,
                [loadArticle]: params.username
            })
        ])
        const u = profileRes.data.profile
        const { articles, articlesCount } = articlesRes.data
        articles.forEach(item => (item.favoriteDisabled = false))
        console.log(1111, articles)
        return {
            articles,
            tab,
            u,
            articlesCount,
            limit,
            page
        }
    },
    watchQuery: ["page", "tab"],
    data() {
        return {}
    },
    created() {},
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
            this.$router.go(0)
        }
    }
}
</script>
<style></style>
