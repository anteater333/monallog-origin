<template>
    <div class="music-player">
        <audio autoplay
            ref="audioCtrl"
            v-if="hasMusic"
            @play="emitMusicInfo()"
            @ended="nextTrack()">
            <source :src="nowPlaying.URL"
            type="audio/mpeg">
        </audio>
        <span
            class="music-control-note"
            :class="{ paused: isPaused }"
            @click="pause()">
            ♪
        </span>
    </div>
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
            playingOrder: Array,
            isPaused: false
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
            if (!this.isPaused) {
                this.$refs.audioCtrl.pause()
                this.isPaused = true
            } else {
                this.$refs.audioCtrl.play()
                this.isPaused = false
            }
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
.music-player {
    width: fit-content;
    margin: 1%;
}

.music-control-note {
    user-select: none;

    font-size: 4rem;
    font-weight: bolder;
    cursor: pointer;

    opacity: 0.2;

    transition: all 3s ease-in-out;
}

.music-control-note:hover {
    opacity: 0.75;

    transition: all .7s ease-in-out;
}

.music-control-note.paused {
    opacity: 0;

    transition: all 1s ease-in-out;
}

.music-control-note.paused:hover {
    opacity: 0.1;

    transition: all .7s ease-in-out;
}
</style>
