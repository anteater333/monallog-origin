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
            index: 0,
            playingOrder: Array
        }
    },
    computed: {
        nowPlaying: function () {
            const target = (this.playingOrder !== undefined) ? this.playingOrder[this.index] : this.index
            return this.playlist[target].URL
        },
        hasMusic: function () {
            if (!this.playlist) {
                return false
            }
            return true
        }
    },
    created () {
        this.playingOrder = [...Array(this.playlist.length).keys()]
        if (this.mode.isRandom) {
            this.shuffle()
        }
    },
    methods: {
        nextTrack: function () {
            const ctrl = this.$refs.audioCtrl

            this.index += 1

            if (this.index >= this.playlist.length) {
                this.index = this.index % this.playlist.length
                if (!this.mode.isLoop) {
                    this.shuffle()
                    ctrl.load()
                    return ctrl.pause()
                }
            }

            ctrl.load()
            ctrl.play()
        },
        shuffle: function () {
            this.playingOrder = this.playingOrder
                .map(a => [Math.random(), a])
                .sort((a, b) => a[0] - b[0])
                .map(a => a[1])
        }
    }
}
</script>

<style scoped>

</style>
