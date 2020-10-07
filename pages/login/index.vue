<template>
    <div>
        <div class="auth-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-xs-12">
                        <h1 class="text-xs-center">
                            {{ isLogin ? "Sign in" : "sign up" }}
                        </h1>
                        <p class="text-xs-center">
                            <nuxt-link v-if="!isLogin" to="/login"
                                >Have an account?</nuxt-link
                            >
                            <nuxt-link v-else to="/register"
                                >Need an account?</nuxt-link
                            >
                        </p>

                        <ul class="error-messages">
                            <template v-for="(message, filed) in errors">
                                <li
                                    :key="index"
                                    v-for="(msg, index) in message"
                                >
                                    {{ filed }} {{ msg }}
                                </li>
                            </template>
                        </ul>

                        <form @submit.prevent="onSubmit">
                            <fieldset class="form-group" v-if="!isLogin">
                                <input
                                    class="form-control form-control-lg"
                                    type="text"
                                    placeholder="Your Name"
                                    v-model="user.username"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="email"
                                    placeholder="Email"
                                    v-model="user.email"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                    v-model="user.password"
                                />
                            </fieldset>
                            <button
                                class="btn btn-lg btn-primary pull-xs-right"
                            >
                                {{ isLogin ? "Sign in" : "sign up" }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { login, register } from "@/api/user"
const Cookie = process.client ? require('js-cookie') : undefined
export default {
	 middleware: "notAuthenticated",
    name: "Login",
    mounted() {
        console.log(this.$route.name)
    },
    computed: {
        isLogin() {
            return this.$route.name === "login"
        }
    },
    data() {
        return {
            user: {
                email: "",
                password: "",
                username: ""
            },
            errors: ""
        }
    },
    methods: {
        async onSubmit() {
            try {
                const { data } = this.isLogin
                    ? await login(this.user)
                    : await register(this.user)
				this.$store.commit('setUser', data.user)
				Cookie.set('user', data.user)
                this.$router.push("/")
            } catch (error) {
                this.errors = error.response.data.errors
            }
        }
    }
}
</script>
<style></style>
