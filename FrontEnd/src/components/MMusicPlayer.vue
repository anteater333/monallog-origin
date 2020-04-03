<template>
    <audio autoplay controls
        ref="audioCtrl"
        v-if="hasMusic"
        @ended="nextTrack()">
        <source :src="nowPlaying"
        type="audio/mpeg">
    </audio>
</template>

<script>
export default {
    name: 'MMusicPlayer',
    props: {
        playlist: Array,
        mode: {
            isRandom: Boolean,
            isLoop: Boolean
        }
    },
    data () {
        return {
            index: 0
        }
    },
    computed: {
        playingOrder: function () {
            let order = [...Array(this.playlist.length).keys()]
            if (this.mode.isRandom) {
                order = shuffle(order)
            }
            return order
        },
        nowPlaying: function () {
            const URL = (this.playingOrder !== undefined) ? this.playlist[this.playingOrder[this.index]] : ''
            return URL
        },
        hasMusic: function () {
            if (this.playlist.length === 0) {
                return false
            }
            return true
        }
    },
    created () {

    },
    methods: {
        nextTrack: function () {
            const ctrl = this.$refs.audioCtrl

            this.index = (this.index + 1) % this.playlist.length
            ctrl.load()
            ctrl.play()
        }
    }
}

const shuffle = arr => arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])

</script>

<style scoped>

</style>
