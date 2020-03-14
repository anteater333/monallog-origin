<template>
  <div id="app">
    <monallog-header />
    <section class="main-view" >
      <global-background :is-focused="bgFocus" />
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

export default {
  name: 'App',
  components: {
    'monallog-header': MonHeader,
    'monallog-footer': MonFooter,
    'global-background': GlbBg
  },
  computed: {
      bgFocus: function() {
        return this.$store.state.bgFocus
    }
  }
}
</script>

<style>
/* Base css */
@import 'assets/css/layout.css';
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
</style>
