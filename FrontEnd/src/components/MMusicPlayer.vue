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
        <span v-if="!paused"
            class="music-control-note music-pause-button"
            @click="pause()">
            ♪
        </span>
        <span v-else
            class="music-control-note music-play-button"
            @click="play()">
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
            paused: false
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
            this.paused = true
        },
        play: function () {
            this.$refs.audioCtrl.play()
            this.paused = false
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

    opacity: 0.75;
}

.music-play-button {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: var(--white);
    -webkit-text-fill-color: transparent;
}
</style>
