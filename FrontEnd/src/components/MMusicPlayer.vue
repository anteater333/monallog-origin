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
        playlist: Array
    },
    data () {
        return {
            index: 0
        }
    },
    computed: {
        nowPlaying: function () {
            return this.playlist[this.index].URL
        },
        hasMusic: function () {
            if (!this.playlist[0]) {
                return false
            }
            return true
        }
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
</script>

<style scoped>

</style>
