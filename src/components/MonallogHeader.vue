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

<style scoped>
.header {
    background-color: var(--black);
}

.identification {
    opacity: 0.5;
}

.sign-button {    
    width: 80px;
    height: 30px;

    border: medium;
    border-style: solid;
    border-color: var(--white);
    border-radius: 7px;

    font-size: 20px;
    font-weight: bold;

    text-align: center;
    text-decoration: none;
    line-height: 30px;
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

.sign-up {
    background-color: var(--white);
    color: var(--black);
}

.sign-in {
    background-color: var(--black);
    color: var(--white);
}
</style>