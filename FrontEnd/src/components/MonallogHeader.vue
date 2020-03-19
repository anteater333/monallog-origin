<template>
    <header class="header">
        <router-link class="small-logo" to="/">
            <img src="../assets/small-logo.png"
                srcset="../assets/small-logo@2x.png 2x,
                srcset=../assets/small-logo@3x.png 3x"
                class="small-logo-img">
        </router-link>
        <div v-if="!isAuthenticated" class="identification">
            <m-button class="sign-button sign-up"
            @click="signIn">
              SIGN UP
            </m-button>
            <m-button class="sign-button sign-in">
              SIGN IN
            </m-button>
            <!-- placeholding -->
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
import MButton from '@/components/MButton.vue'

export default {
  name: 'MonallogHeader',
  components: {
    'm-button' : MButton
  },
  data:
        function () {
          return {
            auth: false
          }
        },
  computed: {
    isAuthenticated: {
      get: function () {
        return this.auth
      },
      set: function (value) {
        this.auth = value
      }
    }
  },
  methods: {
    signIn: function() {
      alert("개발중임다.")
    }
  }
}
</script>

<style scoped>
.header {
    background-color: var(--black);
    
    height: 6vh;
    max-height: 75px;
    min-height: 45px;

    display: flex;
}

.small-logo, .identification {
    flex: none;

    margin-top: auto;
    margin-bottom: auto;
}

.small-logo {
    border: 0;
    outline: 0;
    
    margin-left: 2vw;
}

.identification {
    opacity: 0.5;

    margin-left: auto;
    margin-right: 1vw;
}

.sign-button {
    display: block;
    position: relative;
    float: left;

    margin-left: 5px;

    line-height: 30px;

    background-color: var(--black);
    color: var(--white);

    transition: .5s;
}

.sign-button:hover {
    background-color: var(--white);
    color: var(--black);
}

.profile {
    display: block;
    
    margin-left: 5px;

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
