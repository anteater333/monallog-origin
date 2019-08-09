<template>
  <div id="app">
    <monallog-header />
    <router-view class="main-section">
    </router-view>
    <monallog-footer />
  </div>
</template>
<script>
import MonHeader from "@/components/MonallogHeader"
import MonFooter from "@/components/MonallogFooter"

export default {
  name: "App",
  components: {
    "monallog-header": MonHeader,
    "monallog-footer": MonFooter
  }
}
</script>