<template>
    <div class="background">
        <div class="background-cover background-image" :style=styleBgImg></div>
        <div v-show=!isFocused class="background-cover background-overlay"></div>
    </div>
</template>
<script>
export default {
  name: 'global-background',
  props: {
    'isFocused': {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      bgImgUrl: '/assets/img/background.png' // placeholding
    }
  },
  computed: {
    styleBgImg () {
      return {
        'background-image': `url(${this.bgImgUrl})`
      }
    }
  }
}
</script>

<style>
.background-overlay {
    /* Darker */
    background-color: var(--black);
    opacity: 0.5;
}

.background-image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    text-transform: uppercase;
}
</style>
