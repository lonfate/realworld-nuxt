<template>
    <div>
        <div class="settings-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-xs-12">
                        <h1 class="text-xs-center">Your Settings</h1>

                        <form>
                            <fieldset>
                                <fieldset class="form-group">
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder="URL of profile picture"
                                        v-model="user.image"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your Name"
                                        v-model="user.username"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <textarea
                                        class="form-control form-control-lg"
                                        rows="8"
                                        placeholder="Short bio about you"
                                        v-model="user.bio"
                                    ></textarea>
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
                                    @click.prevent="update"
                                    class="btn btn-lg btn-primary pull-xs-right"
                                >
                                    Update Settings
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
import { updateUser, getUser } from "@/api/user"
import { mapState } from "vuex"
export default {
    middleware: "authenticated",
    name: "settings",
    computed: {
        ...mapState(["user"])
    },
    data() {
        return {
            user: {
                username: "",
                email: "",
                password: "",
                bio: "",
                image: ""
            }
        }
    },
    async created() {
        const { data } = await getUser()
        this.user = data.user
    },
    methods: {
        async update() {
            await updateUser(this.user)
            this.$router.back()
        }
    }
}
</script>
<style></style>
