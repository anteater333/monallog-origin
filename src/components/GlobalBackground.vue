<template>
    <div class="background">
      <div v-show=!isFocused class="background-overlay"></div>
      <div class="background-image" :style=styleBgImg></div>
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
    data() {
        return {
            bgImgUrl: 'assets/img/background.png', // placeholding
        }
    }, 
    computed: {
        styleBgImg() {
            return {
                'background-image': `url(${this.bgImgUrl})`
            }
        }
    }
}
</script>