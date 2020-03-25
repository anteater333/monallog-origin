<template>
  <div id="app">
    <monallog-header />
    <section class="main-view" >
      <global-background />
      <transition  name="fade">
        <router-view />
      </transition>
    </section>
    <monallog-footer />
  </div>
</template>

<script>
import MonHeader from '@/components/MonallogHeader'
import MonFooter from '@/components/MonallogFooter'
import GlbBg from '@/components/GlobalBackground'

import axios from 'axios'

export default {
    name: 'App',
    components: {
        'monallog-header': MonHeader,
        'monallog-footer': MonFooter,
        'global-background': GlbBg
    },
    computed: {
    },
    created () {
        if (!this.$store.getBgImgUrl) {
            axios.get(process.env.VUE_APP_API_SERVER)
                .then((response) => {
                    this.$store.dispatch('updateBgImg', { url: response.data.image })
                })
        }
    }
}
</script>

<style>
/* animation */
@import 'assets/css/v-animation.css';
</style>

<style>
:root {
  /* Color palette */
  --black: #000000;
  --white: #ffffff;
  --background: #161618;

  /* Default font */
  font-family: NanumBarunGothic;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  text-align: center;
  color: var(--white);
}

body {
    width: 100%;
    max-width: 1080px;

    margin: auto;

    background-color: var(--background);
}

.main-view {
    position: relative;
    height: 94vh;
    width: inherit;

    overflow: hidden;
}

</style>
