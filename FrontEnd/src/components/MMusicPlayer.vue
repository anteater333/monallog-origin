<template>
    <audio autoplay
        ref="audioCtrl"
        v-if="hasMusic"
        @play="emitMusicInfo()"
        @ended="nextTrack()">
        <source :src="nowPlaying.URL"
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
            let music
            if (this.playingOrder === undefined || this.playingOrder.length === 0) {
                music = { URL: '', title: '', by: '' }
            } else {
                music = this.playlist[this.playingOrder[this.index]]
            }
            return music
        },
        hasMusic: function () {
            if (this.playlist.length === 0) {
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
        emitMusicInfo: function () {
            this.$emit('music-start', this.nowPlaying)
        },
        pause: function () {
            this.$refs.audioCtrl.pause()
        },
        play: function () {
            this.$refs.audioCtrl.play()
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
