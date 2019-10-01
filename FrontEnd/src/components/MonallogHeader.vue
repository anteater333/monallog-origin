<template>
    <header class="header">
        <router-link class="small-logo" to="/">
            <img src="../assets/small-logo.png"
                srcset="../assets/small-logo@2x.png 2x,
                srcset=../assets/small-logo@3x.png 3x"
                class="small-logo-img">
        </router-link>
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

<style scoped>
.header {
    background-color: var(--black);
}

.small-logo {
    border: 0;
    outline: 0;
}

.identification {
    opacity: 0.5;
}

.sign-button {
    height: 30px;

    border: medium;
    border-style: solid;
    border-color: var(--white);
    border-radius: 7px;

    padding: 0.1em 0.3em;

    font-size: 20px;

    text-align: center;
    text-decoration: none;
    line-height: 1.5;

    font-family: Relancer;

    background-color: var(--black);
    color: var(--white);

    transition: .5s;
}

.sign-button:hover {
    background-color: var(--white);
    color: var(--black);
}

.profile {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    
    border: medium;
    border-style: solid;
    border-color: var(--white);

    background-color: var(--white);

    overflow: hidden;
}

.profile-img {
    display: inline-block;
    margin: auto;

    height: 100%;
    width: 100%;
}
</style>