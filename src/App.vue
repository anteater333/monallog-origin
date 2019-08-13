<template>
  <div id="app">
    <monallog-header />
    <section class="main-view">
      <global-background :is-focused="bgFocus" />
      <router-view />
    </section>
    <monallog-footer />
  </div>
</template>
<script>
import MonHeader from "@/components/MonallogHeader"
import MonFooter from "@/components/MonallogFooter"
import GlbBg from "@/components/GlobalBackground"

export default {
  name: "App",
  components: {
    "monallog-header": MonHeader,
    "monallog-footer": MonFooter,
    "global-background": GlbBg
  },
  data() { // 교체 예정
           // state 사용 시 props가 아니라 컴포넌트 내부에서 끝날 것.
    return {
      bgFocus: false
    }
  }
}
</script>