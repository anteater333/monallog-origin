<template>
    <div class="background">
      <div class="background-cover background-image" :style=styleBgImg></div>
      <transition name="fade" mode="out-in">
        <div v-show=!isFocused class="background-cover background-overlay"></div>
      </transition>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'global-background',
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'getBgFocus',
            'getBgImgUrl'
        ]),
        styleBgImg () {
            return {
                'background-image': `url(${this.getBgImgUrl})`
            }
        },
        isFocused () {
            return this.getBgFocus
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

.background-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.background-image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    text-transform: uppercase;
}
</style>
