<template>
    <header class="header">
        <div class="small-logo">
            <router-link to="/">
                <img src="../assets/small-logo.png"
                    srcset="../assets/small-logo@2x.png 2x,
                    srcset=../assets/small-logo@3x.png 3x"
                    class="small-logo-img">
            </router-link>
        </div>
        <div v-if="!isAuthenticated" class="identification">
            <!-- placeholding -->
            <router-link class="sign-button sign-up" to="/">SIGN UP</router-link>
            <router-link class="sign-button sign-in" to="/">SIGN IN</router-link>
        </div>
        <div v-else class="identification">
            <router-link class="profile" to="/">
                <img src="../assets/profile-default.png"
                    class="profile-img">
            </router-link>
        </div>
    </header>
</template>
<script>
export default {
    name: "MonallogHeader",
    data: 
        function() {
            return { 
                auth: false
        }
    },
    computed: {
        isAuthenticated: {
            get: function() {
                return this.auth
            },
            set: function(value) {
                this.auth = value
            }
        }
    }
}
</script>